import * as vscode from "vscode";

import pasteStore from "../data/pasteStore";

/**
 * Represents a document provider for stored pastes and pasties.
 */
export default new (class PastyDocumentProvider
    implements vscode.TextDocumentContentProvider {
    /**
     * Fetches the corresponding content of a pasty specified by a URI.
     */
    provideTextDocumentContent(uri: vscode.Uri): string {
        // Checks if the URI path is valid.
        const path = uri.path;
        if (/^(\w+\/){2}([\w ]+)(\.\w+)?$/.test(path) === false) {
            vscode.window.showErrorMessage("Invalid PasteMyst URI.");
            return "";
        }

        // Extract the data from the path and fetch the pasty.
        const [pasteId, pastyId, filename] = path.split("/");
        const pasty = pasteStore
            .get(pasteId)
            ?.pasties.find((p) => p._id === pastyId);

        // Ensure that a pasty was found.
        if (!pasty) {
            vscode.window.showErrorMessage(
                `No pasty was found with ID '${pasteId}/${pastyId}'.`
            );
            return "";
        }

        return pasty.code;
    }
})();
