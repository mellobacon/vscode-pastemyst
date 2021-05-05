import * as vscode from "vscode";
import * as pastemyst from "pastemyst-ts";

export default async function createPaste(): Promise<void>{
    const files = vscode.workspace.textDocuments;

    // Collect all workspace files as a quickpick item
    var items : vscode.QuickPickItem[] = [];
    files.forEach(ele => {
        let item : vscode.QuickPickItem = {label: ele.fileName, description: ele.languageId};
        items.push(item);
    });

    // Show the list of files in the workspace
    await vscode.window.showQuickPick([...items] , {
        placeHolder: "Select files to send to PasteMyst",
        canPickMany: true
    });   

    // placeholder. will get back to this later
    let pastes = await pastemyst.pastes.createPaste({
        pasties: [{title: "e", language: "", code: "e"}]
    });
}