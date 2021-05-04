import { pasteStorage } from "../data/pasteStorage";
import { openPastyDocument } from "../utils/editor";
import pasteViewProvider, {
    PasteViewItem,
    PastyViewItem,
} from "../providers/pasteViewProvider";

export function unloadPaste(item: PasteViewItem) {
    pasteStorage.delete(item.paste._id);
    pasteViewProvider.refresh();
}

export function showPasty(item: PastyViewItem | PasteViewItem) {
    if (item instanceof PastyViewItem) {
        openPastyDocument(item.pasty);
    }
}
