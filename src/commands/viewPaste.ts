import * as vscode from "vscode";
import * as pastemyst from "pastemyst-ts";

import pasteViewProvider from "../providers/pasteViewProvider";
import pasteStore from "../data/pasteStore";
import languageStore from "../data/languageStore";
import { openPastyDocument } from "../utils/editor";

import * as authtoken from "./getAuthToken";

/**
 * Prompts the user for a paste ID and views it afterwards.
 */
export default async function viewPaste(): Promise<void> {
    // Prompts for an ID.
    const pasteId = await vscode.window.showInputBox({
        prompt: "Enter the ID of the paste you want to view. Example: chl1mswb",
        placeHolder: "Paste ID",
    });

    // Make sure that a valid ID was entered.
    if (pasteId === undefined || /^\w+$/.test(pasteId) === false) {
        return;
    }

    // Authorize token if provided.
    const token = authtoken.getToken();
    if (token !== undefined){
        pastemyst.authorize(token);
    }

    // Fetch the paste from the API.
    const paste = await pastemyst.pastes.getPaste(pasteId);

    // Ensure that a paste was found.
    if (!paste) {
        vscode.window.showErrorMessage(
            `A paste with the ID '${pasteId}' could not be found. (Is it a private paste?)`
        );
        return;
    }

    // Add the paste to the store and make sure all required languages are loaded.
    pasteStore.set(pasteId, paste);
    await languageStore.ensureLanguages(paste);

    // Open all pasties in the paste as seperate documents.
    for (const pasty of paste.pasties) {
        await openPastyDocument(paste, pasty);
    }

    // Refresh the paste overview.
    pasteViewProvider.refresh();
}
