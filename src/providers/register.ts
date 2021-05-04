import * as vscode from "vscode";
import pasteViewProvider from "./pasteViewProvider";
import { PastyDocumentProvider } from "./pastyDocumentProvider";

export function registerProviders(): vscode.Disposable[] {
    const viewer = vscode.window.createTreeView("pastemyst.viewer", {
        treeDataProvider: pasteViewProvider,
        showCollapseAll: true,
        canSelectMany: false,
    });
    viewer.onDidChangeSelection((e) =>
        vscode.commands.executeCommand(
            "pastemyst.commands.viewer.show",
            e.selection[0]
        )
    );

    return [
        viewer,
        vscode.workspace.registerTextDocumentContentProvider(
            "pastemyst",
            new PastyDocumentProvider()
        ),
    ];
}
