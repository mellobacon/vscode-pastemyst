import * as vscode from "vscode";
import * as pastemyst from "pastemyst-ts";

import pasteStore from "../data/pasteStore";

/**
 * Represents a tree view for paste objects.
 */
export default new (class PasteViewProvider
    implements vscode.TreeDataProvider<IPasteViewItem> {
    private _onDidChangeTreeData: vscode.EventEmitter<
        IPasteViewItem | undefined | null | void
    > = new vscode.EventEmitter<IPasteViewItem | undefined | null | void>();
    public readonly onDidChangeTreeData: vscode.Event<
        IPasteViewItem | undefined | null | void
    > = this._onDidChangeTreeData.event;

    /**
     * Converts a paste view item into a tree view item.
     */
    public getTreeItem(element: IPasteViewItem): vscode.TreeItem {
        return element as vscode.TreeItem;
    }

    /**
     * Retrieves the children of the specified element, Or the root elements if no
     * element was specified.
     */
    public getChildren(element?: IPasteViewItem): IPasteViewItem[] {
        if (element) {
            return element instanceof PasteViewItem
                ? element.paste.pasties.map(
                      (p) => new PastyViewItem(p, element.paste)
                  )
                : [];
        } else {
            return pasteStore.all().map((p) => new PasteViewItem(p));
        }
    }

    /**
     * Refreshes the view.
     */
    refresh(): void {
        this._onDidChangeTreeData.fire();
    }
})();

/**
 * Represents the common interface of items in the paste view.
 */
export interface IPasteViewItem {}

/**
 * Represents a view item of a paste.
 */
export class PasteViewItem extends vscode.TreeItem implements IPasteViewItem {
    constructor(public paste: pastemyst.Paste) {
        super(paste.title, vscode.TreeItemCollapsibleState.Expanded);

        this.iconPath = new vscode.ThemeIcon("files");
        this.contextValue = "paste";
    }
}

/**
 * Represents a view item of a pasty.
 */
export class PastyViewItem extends vscode.TreeItem implements IPasteViewItem {
    constructor(public pasty: pastemyst.Pasty, public parent: pastemyst.Paste) {
        super(pasty.title, vscode.TreeItemCollapsibleState.None);

        this.iconPath = new vscode.ThemeIcon("file-code");
        this.contextValue = "pasty";
        this.description = pasty.language;
    }
}
