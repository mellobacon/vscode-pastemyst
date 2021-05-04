import * as vscode from "vscode";
import * as pastemyst from "pastemyst-ts";

import { pasteStorage } from "../data/pasteStorage";

export class PastyDocumentProvider
    implements vscode.TextDocumentContentProvider {
    provideTextDocumentContent(uri: vscode.Uri): string {
        const pastes = Array.from(pasteStorage.values());
        const pasties = [].concat.apply(
            [],
            pastes.map((pasties) => pasties.pasties) as any[]
        ) as pastemyst.Pasty[];
        return pasties.find((p) => p._id === uri.path)?.code || "";
    }
}
