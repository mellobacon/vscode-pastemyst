import * as vscode from "vscode";
import * as pastemyst from "pastemyst-ts";

let token : string | undefined;
export default async function getAuthToken(): Promise<void>{
    
    token = await vscode.window.showInputBox({
        prompt: "Enter authorization token",
        placeHolder: "Api token",
        password: true
    });
    if (token === ""){
        vscode.window.showErrorMessage("No token provided");
        return;
    }
    // put token check here
    vscode.window.showInformationMessage("Token successfully authorized!");
}

export function getToken() : string | undefined{
    return token;
}