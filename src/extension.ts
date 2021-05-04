import * as vscode from "vscode";

import { registerCommands } from "./commands/register";
import { registerProviders } from "./providers/register";

import languageStore from "./data/languageStore";
import pasteStore from "./data/pasteStore";

export function activate(context: vscode.ExtensionContext) {
    // Register the commands and providers and acknowledge their subscriptions.
    context.subscriptions.push(...registerCommands(), ...registerProviders());
}

export function deactivate() {
    // Clear the stores so no data remains when the extension is deactivated.
    pasteStore.clear();
    languageStore.clear();
}
