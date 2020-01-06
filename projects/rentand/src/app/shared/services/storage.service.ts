import { Injectable } from '@angular/core';
import { ForageLocalService } from './forage-local.service';

@Injectable({
    providedIn: 'root'
})
export class StorageService {

    constructor(private storage: ForageLocalService) {
    }

    /**
     * Removes every key from the database, returning it to a blank slate.
     *
     * clear() will remove <b>every item in the offline store</b>. Use this method with caution.
     */
    clear(): Promise<void> {
        return this.storage.clear();
    }

    /**
     * Make a clone of the instance
     */
    clone(config?) {
        return this.storage.clone(config);
    }

    /**
     * Gets an item from the storage library.
     * If the key does not exist, getItem() will return null.
     */
    getItem<T>(key: string): Promise<T> {
        return this.storage.getItem(key);
    }

    /**
     * Iterate over all value/key pairs in datastore.
     * <i>iteratee</i> is called once for each pair, with the following arguments:
     * <ol>
     *   <li>Value</li>
     *   <li>Key</li>
     *   <li>iterationNumber - one-based number</li>
     * </ol>
     * iterate() supports early exit by returning non undefined value inside iteratorCallback callback.
     */
    iterate<T, U>(iteratee: (value: T, key: string, iterationNumber: number) => U): Promise<U> {
        return this.storage.iterate(iteratee);
    }

    /**
     * Get the name of a key based on its ID.
     */
    key(index: number): Promise<string> {
        return this.storage.key(index);
    }

    /**
     * Get the list of all keys in the datastore.
     */
    keys(): Promise<string[]> {
        return this.storage.keys();
    }

    /**
     * Gets the number of keys in the offline store (i.e. its “length”).
     */
    length(): Promise<number> {
        return this.storage.length();
    }

    /**
     * Even though localForage queues up all of its data API method calls,
     * ready() provides a way to determine whether the asynchronous driver initialization process has finished.
     * That’s useful in cases like when we want to know which driver localForage has settled down using.
     */
    ready(): Promise<void> {
        return this.storage.ready();
    }

    /**
     * Removes the value of a key from the offline store.
     */
    removeItem(key: string): Promise<void> {
        return this.storage.removeItem(key);
    }

    /**
     * Saves data to an offline store. You can store the following types of JavaScript objects:
     * <ul>
     *  <li>Array</li>
     *  <li>ArrayBuffer</li>
     *  <li>Blob</li>
     *  <li>Float32Array</li>
     *  <li>Float64Array</li>
     *  <li>Int8Array</li>
     *  <li>Int16Array</li>
     *  <li>Int32Array</li>
     *  <li>Number</li>
     *  <li>Object</li>
     *  <li>Uint8Array</li>
     *  <li>Uint8ClampedArray</li>
     *  <li>Uint16Array</li>
     *  <li>Uint32Array</li>
     *  <li>String</li>
     * </ul>
     */
    setItem<T>(key: string, data: T): Promise<T> {
        return this.storage.setItem(key, data);
    }

    /**
     * Check whether the given driver is supported/registered.
     */
    supports(driver: string): boolean {
        return this.storage.supports(driver);
    }
}
