import * as vscode from "vscode";
import * as pastemyst from "pastemyst-ts";

import { registerCommands } from "./commands/register";
import { registerProviders } from "./providers/register";

import languageStore from "./data/languageStore";
import pasteStore from "./data/pasteStore";

export function activate(context: vscode.ExtensionContext) {
    const config = vscode.workspace.getConfiguration("pastemyst");

    // Authorize requests using the API.
    const token = config.get<string>("apiToken");
    token && pastemyst.authorize(token);

    // Register the commands and providers and acknowledge their subscriptions.
    context.subscriptions.push(...registerCommands(), ...registerProviders());
}

export function deactivate() {
    // Clear the stores so no data remains when the extension is deactivated.
    pasteStore.clear();
    languageStore.clear();
}
