import * as vscode from "vscode";
import createPaste from "./createPaste";
import createPasteBySelection from "./createPasteBySelection";
import getAuthToken from "./getAuthToken";
import viewPastesFromAccount from "./viewAccountPastes";

import * as viewer from "./viewer";
import viewPaste from "./viewPaste";

/**
 * Registers the extension's commands into the editor.
 *
 * @returns The disposable commands.
 */
export function registerCommands(): vscode.Disposable[] {
    return [
        vscode.commands.registerCommand("pastemyst.commands.view", viewPaste),
        vscode.commands.registerCommand("pastemyst.commands.viewAll", viewPastesFromAccount),
        vscode.commands.registerCommand("pastemyst.commands.create", createPaste),
        vscode.commands.registerCommand("pastemyst.commands.createBySelection", createPasteBySelection),
        vscode.commands.registerCommand("pastemyst.commands.getAuthToken", getAuthToken),
        vscode.commands.registerCommand(
            "pastemyst.commands.viewer.unload",
            viewer.unloadPaste
        ),
        vscode.commands.registerCommand(
            "pastemyst.commands.viewer.show",
            viewer.showPasty
        ),
    ];
}
