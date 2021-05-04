import * as vscode from "vscode";
import * as pastemyst from "pastemyst-ts";

import { pasteStorage } from "../data/pasteStorage";

export class PasteViewProvider
    implements vscode.TreeDataProvider<IPasteViewItem> {
    constructor() {}

    private _onDidChangeTreeData: vscode.EventEmitter<
        IPasteViewItem | undefined | null | void
    > = new vscode.EventEmitter<IPasteViewItem | undefined | null | void>();
    readonly onDidChangeTreeData: vscode.Event<
        IPasteViewItem | undefined | null | void
    > = this._onDidChangeTreeData.event;

    getTreeItem(element: IPasteViewItem): vscode.TreeItem {
        return element as vscode.TreeItem;
    }

    getChildren(element?: IPasteViewItem): IPasteViewItem[] {
        if (element) {
            if (element instanceof PasteViewItem) {
                const pasties = element.paste.pasties;
                return pasties.map((p) => new PastyViewItem(p));
            } else {
                return [];
            }
        } else {
            const pastes = Array.from(pasteStorage.values());
            return pastes.map((p) => new PasteViewItem(p));
        }
    }

    refresh(): void {
        this._onDidChangeTreeData.fire();
    }
}
export default new PasteViewProvider();

export interface IPasteViewItem {}

export class PasteViewItem extends vscode.TreeItem implements IPasteViewItem {
    constructor(public paste: pastemyst.Paste) {
        super(paste.title, vscode.TreeItemCollapsibleState.Collapsed);
        this.contextValue = "paste";
    }
}

export class PastyViewItem extends vscode.TreeItem implements IPasteViewItem {
    constructor(public pasty: pastemyst.Pasty) {
        super(pasty.title, vscode.TreeItemCollapsibleState.None);
        this.contextValue = "pasty";
    }
}
