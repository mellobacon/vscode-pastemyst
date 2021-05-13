import * as vscode from "vscode";
import createPaste from "./createPaste";
import createPasteBySelection from "./createPasteBySelection";

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
        vscode.commands.registerCommand("pastemyst.commands.create", createPaste),
        vscode.commands.registerCommand("pastemyst.commands.createBySelection", createPasteBySelection),
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
