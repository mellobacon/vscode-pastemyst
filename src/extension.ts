import * as vscode from "vscode";

import { registerCommands } from "./commands/register";
import { registerProviders } from "./providers/register";

export function activate(context: vscode.ExtensionContext) {
    console.log('Loaded "vscode-pastemyst".');

    context.subscriptions.push(...registerCommands(), ...registerProviders());
}

export function deactivate() {}
