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

    // Select files to paste
    let p = vscode.window.createQuickPick();
    p.placeholder = "Select files to send to PasteMyst";
    p.items = [...items];
    p.canSelectMany = true;
    p.show();
    p.onDidAccept(() => {
        setPaste(p.selectedItems);
        p.hide();
    });

    // yes this whole set thing is jank i know. im so sorry xd
    function setPaste(selection : readonly vscode.QuickPickItem[]){
        setTitle(selection);
    }

    async function setTitle(selection : readonly vscode.QuickPickItem[]){
        let title = await vscode.window.showInputBox({
            prompt: "Enter paste title. Leave this blank for no title.",
            placeHolder: "Title",
        });
        setDuration(selection, title);
    };

    async function setDuration(selection : readonly vscode.QuickPickItem[], t : any){
        let title = await vscode.window.showQuickPick(["never", "1h", "2h", "10h", "1d", "2d", "1w", "1m", "1y"], {placeHolder: "Choose expiration time. 'Never' by default."});
        sendPaste(selection, t, title);
    }
    
    // Send the paste to PasteMyst
    function sendPaste(selection : readonly vscode.QuickPickItem[], title : string, duration : any){

        let pastes : Omit<pastemyst.Pasty, "_id">[] = [];
        
        // Make a pasty for each file
        selection.forEach(p => {
            let filename = p.label.split("\\");
            let title = filename[filename.length - 1];
            let langext = title.split(".");
            let lang = "autodetect"; // autodetect by default until I get lang detection working
            pastemyst.data.getLanguageByExtension(langext[langext.length - 1]).then(l => {
                lang = l?.name!;
            });
            let pst : Omit<pastemyst.Pasty, "_id"> = {title: title, language: lang, code: p.detail!};
            pastes.push(pst);
        });

        // Create a new paste of pasties
        let paste = pastemyst.pastes.createPaste({
            title: title,
            expiresIn: duration,
            pasties: [...pastes]
        }).then(p => {

            // Make sure there is no error in making a paste
            if (pastes.length === 0){
                vscode.window.showErrorMessage("Error: Cannot create paste. No files selected.");
                return;
            }
            else if (p?._id === undefined){
                vscode.window.showErrorMessage("Error: Cannot create paste. Paste Id is undefined.");
                return;
            }
            else if (!paste){
                vscode.window.showErrorMessage("Error: Cannot create paste.");
                return;
            }
            
            // Send ye to the pastemyst link
            let uri = `https://paste.myst.rs/${p?._id}`;
            vscode.window
            .showInformationMessage(`Paste successfully created at: ${uri}!`, "Open page")
            .then(() => {open(uri);});
        });
    }
}
