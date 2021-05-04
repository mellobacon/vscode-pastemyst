import * as vscode from "vscode";

import * as viewer from "./viewer";
import viewPaste from "./viewPaste";

export function registerCommands(): vscode.Disposable[] {
    return [
        vscode.commands.registerCommand("pastemyst.commands.view", viewPaste),
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
