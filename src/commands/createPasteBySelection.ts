import * as vscode from "vscode";
import * as pastemyst from "pastemyst-ts";
import * as open from "open";
import * as authtoken from "./getAuthToken";

/**
 * Prompts the user for a selection of text and makes a paste of that selection.
 * Gives the choice of selecting multiple selections from different files.
 */
export default async function createPasteBySelection(): Promise<void>{

    let pastes : Omit<pastemyst.Pasty, "_id">[] = [];
    let code : string;

    // Prompt user for selection.
    promptUser();
    
    async function promptUser(){
        await vscode.window.showInformationMessage("Select text to send to PasteMyst. Press OK when done.", "OK")
        .then(next => {

            // Dont continue if the user closes the prompt.
            if (!next) { return; }

            // Get the selected text.
            getSelection();

            // Make sure there is text selected.
            if (code === "" || undefined){
                vscode.window.showErrorMessage("Error: Cannot create paste. No selection provided");
                return;
            }

            // Prompt user for another selection or just create the paste.
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

    async function getSelection(){
        let editor = vscode.window.activeTextEditor;

        // Set the title of the paste as the file name.
        let filename = editor?.document.fileName.split("\\")!;
        let title = filename[filename?.length - 1];

        // User gets selection.
        let selection = editor?.selections;

        // Format the text for each selection in the file.
        let text : string[] = [];
        selection?.forEach(selection => {
            let selectedtext = vscode.window.activeTextEditor?.document.getText(selection);

            // Make sure there is text in the selection.
            if (selectedtext === "" || selectedtext === "\n") { return; }
            
            text.push(`${selectedtext}\n`);
        });

        // Set language based on file extension.
        let langext = title.split(".");
        let lang = await pastemyst.data.getLanguageByExtension(langext[langext.length - 1]);
        
        code = text.join("\n");

        // Create pasties.
        let pst : Omit<pastemyst.Pasty, "_id"> = {title: title, language: lang!.name, code: code};
        pastes.push(pst);
    };

    // TODO: Needs to be refactored
    async function setTitle(){
        let pastetitle = await vscode.window.showInputBox({
            prompt: "Enter paste title. Leave this blank for no title.",
            placeHolder: "Title",
        });
        setDuration(pastetitle);
    };

    async function setDuration(pastetitle : any){
        let duration = await vscode.window.showQuickPick(["never", "1h", "2h", "10h", "1d", "2d", "1w", "1m", "1y"], {placeHolder: "Choose expiration time. 'never' by default."});
        createPaste(pastetitle, duration);
    }

    function createPaste(pastetitle : string, duration : any){

        // Authorize token if provided.
        const token = authtoken.getToken();
        if (token !== undefined){
            pastemyst.authorize(token);
        }

        // Create paste.
        let paste = pastemyst.pastes.createPaste({
            title: pastetitle,
            expiresIn: duration,
            pasties: [...pastes]
        })
        .then(p => {
            // Make sure there is no error in making a paste.
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
            
            // Generate PasteMyst link.
            let uri = `https://paste.myst.rs/${p?._id}`;
            vscode.window
            .showInformationMessage(`Paste successfully created at: ${uri}!`, "Open page")
            .then(() => {open(uri);});
        });
    };
}
