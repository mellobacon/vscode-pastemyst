import * as vscode from "vscode";
import * as pastemyst from "pastemyst-ts";
import languageStore from "../data/languageStore";

export async function openPastyDocument(
    paste: pastemyst.Paste,
    pasty: pastemyst.Pasty
) {
    let uri = `pastemyst:${paste._id}/${pasty._id}/${pasty.title}`;

    const language = languageStore.get(pasty.language);
    if (language && language.ext && language.ext.length > 0) {
        uri += "." + language.ext[0];
    }

    const doc = await vscode.workspace.openTextDocument(vscode.Uri.parse(uri));
    await vscode.window.showTextDocument(doc, { preview: false });
}
