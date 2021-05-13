import * as vscode from "vscode";

let token : string | undefined;
export default async function getAuthToken(): Promise<void>{
    
    token = await vscode.window.showInputBox({
        prompt: "Enter authorization token",
        placeHolder: "Api token",
        password: true
    });
    if (token === "" || undefined){
        vscode.window.showErrorMessage("No token provided");
        return;
    }
    if (token){
        // Check for valid token
        if ((/(\w)|(\W)/.test(token) && token?.length === 44) === false){
            vscode.window.showErrorMessage("Invalid token");
        }
        else {
            vscode.window.showInformationMessage("Token successfully authorized!");
        }
    }
}

export function getToken() : string | undefined{
    return token;
}