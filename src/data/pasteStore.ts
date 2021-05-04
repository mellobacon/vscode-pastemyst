import * as pastemyst from "pastemyst-ts";

import { DataStore } from "./store";

/**
 * Represents a store of cached pastes.
 */
export default new (class extends DataStore<string, pastemyst.Paste> {})();
