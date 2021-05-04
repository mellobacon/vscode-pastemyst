import * as vscode from "vscode";
import * as pastemyst from "pastemyst-ts";

import pasteViewProvider from "../providers/pasteViewProvider";
import { pasteStorage } from "../data/pasteStorage";
import { openPastyDocument } from "../utils/editor";

export default async function () {
    const id = await vscode.window.showInputBox({
        prompt: "Enter the ID of the paste you want to view.",
    });

    if (!id) {
        vscode.window.showWarningMessage("No ID was entered.");
        return;
    }

    const paste = await pastemyst.pastes.getPaste(id);
    if (!paste) {
        vscode.window.showErrorMessage(
            `A paste with the ID \`${id}\` could not be found.`
        );
        return;
    }

    pasteStorage.set(id, paste);
    pasteViewProvider.refresh();

    openPastyDocument(paste.pasties[0]);
}
