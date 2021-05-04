import * as vscode from "vscode";
import * as pastemyst from "pastemyst-ts";

export async function openPastyDocument(pasty: pastemyst.Pasty) {
    const uri = vscode.Uri.parse(`pastemyst:${pasty._id}`);
    const doc = await vscode.workspace.openTextDocument(uri);
    await vscode.window.showTextDocument(doc, { preview: false });
}
