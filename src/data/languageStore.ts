import * as pastemyst from "pastemyst-ts";

import { DataStore } from "./store";

/**
 * Represents a store of cached PasteMyst languages.
 */
export default new (class extends DataStore<string, pastemyst.Language> {
    /**
     * Ensures that all languages in the specified paste are stored.
     */
    public async ensureLanguages(paste: pastemyst.Paste): Promise<void> {
        for (const pasty of paste.pasties) {
            if (!this.has(pasty.language)) {
                const language = await pastemyst.data.getLanguageByName(
                    // Language needs to be escaped because the wrapper does not URL-encode it.
                    escape(pasty.language)
                );

                if (language) {
                    this.set(pasty.language, language);
                }
            }
        }
    }
})();
