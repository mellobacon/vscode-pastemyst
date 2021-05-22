import * as vscode from "vscode";
import * as pastemyst from "pastemyst-ts";

import pasteViewProvider from "../providers/pasteViewProvider";
import pasteStore from "../data/pasteStore";
import languageStore from "../data/languageStore";

import * as authtoken from "./getAuthToken";

/**
 * Retrieves all the pastes from the authorized user's account.
 */
export default async function viewPastesFromAccount(): Promise<void> {

    // Authorize token if provided.
    const token = authtoken.getToken();
    if (token !== undefined){
        pastemyst.authorize(token);

        // Retrieve the pastes.
        vscode.window.withProgress({title: "Retrieving all user's pastes...", cancellable: false, location: vscode.ProgressLocation.Notification}, getPastes);
    }
    else {
        vscode.window.showErrorMessage("Authorization token needed for this action.");
        return;
    }
}

async function getPastes(){
    
    // Get each paste in the users account.
    let pastes = await pastemyst.users.getOwnPasteIDs();

    for (const pasteId of pastes){
        // Fetch the paste from the API.
        const paste = await pastemyst.pastes.getPaste(pasteId);

        // Add the paste to the store and make sure all required languages are loaded.
        pasteStore.set(pasteId, paste!);
        await languageStore.ensureLanguages(paste!);
    }

    // Refresh the paste overview.
    pasteViewProvider.refresh();
}