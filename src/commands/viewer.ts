import pasteStore from "../data/pasteStore";
import { openPastyDocument } from "../utils/editor";
import pasteViewProvider, {
    PasteViewItem,
    PastyViewItem,
} from "../providers/pasteViewProvider";

/**
 * Unloads the specified paste from the store. Also updates the provider view,
 * to ensure that no stale pastes are rendered.
 *
 * @param item The item that should be unloaded.
 */
export function unloadPaste(item: PasteViewItem) {
    pasteStore.remove(item.paste._id);
    pasteViewProvider.refresh();
}

/**
 * Shows the specified paste/pasty document. Note that currently only
 * pasty items are supported.
 *
 * @param item The item to show the document for.
 */
export function showPasty(item: PastyViewItem | PasteViewItem) {
    if (item instanceof PastyViewItem) {
        openPastyDocument(item.parent, item.pasty);
    }
}
