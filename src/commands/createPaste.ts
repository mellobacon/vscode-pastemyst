import * as vscode from "vscode";
import * as pastemyst from "pastemyst-ts";
import * as open from "open";

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
    
    // make a pasty for each file
    let pastes : Omit<pastemyst.Pasty, "_id">[] = [];
    files.forEach(file => {
        let filename = file.fileName.split("\\");
        let title = filename[filename.length - 1];
        let lang = "autodetect"; // something something temporary
        let pst : Omit<pastemyst.Pasty, "_id"> = {title: title, language: lang, code: file.getText()};
        pastes.push(pst);
    });

    // Create a new paste of pasties
    let paste = await pastemyst.pastes.createPaste({
        pasties: [...pastes]
    });

    // Make sure there is no error in making a paste
    if (!paste){
        vscode.window.showErrorMessage("Error: Cannot create paste.");
        return;
    }
    
    // Send ye to the pastemyst link
    let uri = `https://paste.myst.rs/${paste._id}`;
    vscode.window
    .showInformationMessage("Paste successfully created at: " + uri + "!", "Open page")
    .then(() => {open(uri);});
}