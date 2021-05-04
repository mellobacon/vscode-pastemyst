/**
 * Represents an abstract store to hold mappable data.
 */
export abstract class DataStore<K, T> {
    private lookup = new Map<K, T>();

    /**
     * Returns all values from the store as a copied array.
     */
    public all(): T[] {
        return Array.from(this.lookup.values());
    }
    /**
     * Clears the store.
     */
    public clear(): void {
        this.lookup.clear();
    }
    /**
     * Checks if the store contains an item with the specified key.
     */
    public has(key: K): boolean {
        return this.lookup.has(key);
    }
    /**
     * Fetches an item by its key. Returns undefined if no matching key was found.
     */
    public get(key: K): T | undefined {
        return this.lookup.get(key);
    }
    /**
     * Saves a value into the store.
     */
    public set(key: K, value: T): void {
        this.lookup.set(key, value);
    }
    /**
     * Deletes a specified key and the corresponding value from the store.
     */
    public remove(key: K): boolean {
        return this.lookup.delete(key);
    }
}
