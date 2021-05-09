import * as vscode from "vscode";
import * as pastemyst from "pastemyst-ts";
import * as open from "open";

export default async function createPaste(): Promise<void>{
    const files = vscode.workspace.textDocuments;

    // Collect all workspace files as a quickpick item
    let items : vscode.QuickPickItem[] = [];
    files.forEach(file => {
        let item : vscode.QuickPickItem = {label: file.fileName, description: file.languageId, detail: file.getText()};
        items.push(item);
    });

    // Show the list of files in the workspace
    let p = vscode.window.createQuickPick();
    p.placeholder = "Select files to send to PasteMyst";
    p.items = [...items];
    p.canSelectMany = true;
    p.show();
    p.onDidAccept(() => {
        sendPaste(p.selectedItems);
        p.hide();
    });
    
    
    function sendPaste(selection : readonly vscode.QuickPickItem[]){
        // Make a pasty for each file
        let pastes : Omit<pastemyst.Pasty, "_id">[] = [];

        selection.forEach(p => {
            let filename = p.label.split("\\");
            let title = filename[filename.length - 1];
            let pst : Omit<pastemyst.Pasty, "_id"> = {title: title, language: "autodetect", code: p.detail!};
            pastes.push(pst);
        });

        // Create a new paste of pasties
        let paste = pastemyst.pastes.createPaste({
            isPrivate: true,
            pasties: [...pastes]
        }).then(p => {
            // Make sure there is no error in making a paste
            if (!paste){
                vscode.window.showErrorMessage("Error: Cannot create paste.");
                return;
            }
            
            // Send ye to the pastemyst link
            let uri = `https://paste.myst.rs/${p?._id}`;
            vscode.window
            .showInformationMessage("Paste successfully created at: " + uri + "!", "Open page")
            .then(() => {open(uri);});
            });
    }
}