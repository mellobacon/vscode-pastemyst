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
        const path = uri.path;

        //TODO: This is throwing false even though the path seems correct. Disabling it until fix is found - mello
        // Checks if the URI path is valid.
        /*
        if (/^(\w+\/){2}([\w ]+)(\.\w+)?$/.test(path) === false) {
            vscode.window.showErrorMessage("Invalid PasteMyst URI.");
            return "";
        }
        */

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
