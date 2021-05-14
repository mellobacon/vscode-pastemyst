import * as vscode from "vscode";
import * as pastemyst from "pastemyst-ts";
import * as open from "open";
import * as authtoken from "./getAuthToken";

export default async function createPasteBySelection(): Promise<void>{

    let pastes : Omit<pastemyst.Pasty, "_id">[] = [];
    let title : string;
    let lang : string = "autodetect";
    let code : string;

    // Prompt user for selection
    promptUser();
    
    async function promptUser(){
        await vscode.window.showInformationMessage("Select text to send to PasteMyst", "OK")
        .then(next => {

            // Dont continue if the user closes the prompt
            if (!next) { return; }

            // Get the selected text
            getSelection();

            // Make sure there is text selected
            if (code === "" || undefined){
                vscode.window.showErrorMessage("Error: Cannot create paste. No selection provided");
                return;
            }

            // Prompt user for another selection or just create the paste
            vscode.window.showInformationMessage("Select more text or send the paste", ...["Select more text", "Create Paste"])
            .then(selection => {
                if (selection === "Select more text"){
                    promptUser();
                }
                else if (selection === "Create Paste"){
                    setTitle();
                }
            });
        });
    };

    function getSelection(){
        let editor = vscode.window.activeTextEditor;

        // Get the file name
        let filename = editor?.document.fileName.split("\\")!;
        title = filename[filename?.length - 1];

        // User gets selection
        let selection = editor?.selections;

        // Format the text for each selection in the file so that it looks like this:
        /*
        ...
        selected text
        ...
        more selected text
        ...
        */
        let text : string[] = ["...\n"];
        selection?.forEach(selection => {
            let selectedtext = vscode.window.activeTextEditor?.document.getText(selection);
            if (selectedtext === "" || selectedtext === "\n") { return; }
            text.push(`${selectedtext}\n...\n`);
        });
        
        code = text.join("\n");

        // Text must be provided
        if (code === text[0]){
            code = "";
        }

        // Create Pasties
        let pst : Omit<pastemyst.Pasty, "_id"> = {title: title, language: lang, code: code};
        pastes.push(pst);
    };

    // yes yes something something still jank
    async function setTitle(){
        let pastetitle = await vscode.window.showInputBox({
            prompt: "Enter paste title. Leave this blank for no title.",
            placeHolder: "Title",
        });
        setDuration(pastetitle);
    };

    async function setDuration(pastetitle : any){
        let duration = await vscode.window.showQuickPick(["never", "1h", "2h", "10h", "1d", "2d", "1w", "1m", "1y"], {placeHolder: "Choose expiration time. 'Never' by default."});
        createPaste(pastetitle, duration);
    }

    function createPaste(pastetitle : string, duration : any){

        // Authorize token if provided
        const token = authtoken.getToken();
        if (token !== undefined){
            pastemyst.authorize(token);
        }

        // Create paste
        let paste = pastemyst.pastes.createPaste({
            title: pastetitle,
            expiresIn: duration,
            pasties: [...pastes]
        })
        .then(p => {
            // Make sure there is no error in making a paste
            if (pastes.length === 0){
                vscode.window.showErrorMessage("Error: Cannot create paste. No files selected.");
                return;
            }
            else if (p?._id === undefined){
                vscode.window.showErrorMessage("Error: Cannot create paste. Paste ID is undefined.");
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
    };
}
