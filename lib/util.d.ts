export interface IntersectionMap {
    [key: string]: boolean;
}
/**
 * Check if an array contains any of the specified strings
 *
 * @param {string[]} arr1 - array being searched
 * @param {string[]} arr2 - array of strings to search for
 * @returns {boolean} true if any string in arr2 is in arr1, false otherwise
 */
export declare function containsArr(arr1: string[], arr2: string[]): boolean;
/**
 * Delete all occurrences of str in array
 *
 * @param {string[]} arr - array from which to delete strings
 * @param {string} str - string to delete
 * @returns {string[]} new array containing original items minus all str
 */
export declare function deleteElement(arr: string[], str: string): string[];
/**
 * Delete all occurrences of empty string, null, and undefined in array
 *
 * @param {string[]} arr - array from which to delete empty strings, nulls, and undefined
 * @returns {string[]} new array containing original items minus all instances of empty string, null, or undefined
 */
export declare function deleteEmpty(arr: string[] | null): string[];
/**
 * Check if string is a letter
 *
 * @param {string} str - string to check
 * @returns {boolean} true if string is an alphabet letter or apostrophe
 */
export declare function isLetter(str: string): boolean;
/**
 * Reverse a string
 *
 * @param {string} str - string to reverse
 * @returns {string} - reversed copy of str
 */
export declare function reverse(str: string): string;
/**
 * StripChars strips all the characters in chr out of str
 *
 * @param {string} str - string from which to strip characters
 * @param {string} chr - characters to be stripped out
 * @returns {string} a new copy of str without any of the characters specified in chr
 */
export declare function stripChars(str: string, chr: string): string;
/**
 * Compute the intersection between two strings
 *
 * @param {string} a - first string
 * @param {string} b - second string
 * @return {string} the sequence of characters that both strings have in common, from left to right
 */
export declare function intersection(a: string | undefined, b: string | undefined): string | undefined;
/**
 * test a string pattern, potentially containing globs, against a subject string. The result is a simple true/false,
 * determining whether or not the glob pattern matched the subject text.
 *
 * @param {string} pattern - glob pattern
 * @param {string} subj - subject text
 * @returns {boolean} true if the glob pattern matched the subject text, false otherwise
 */
export declare function glob(pattern: string, subj: string): boolean;
/**
 * Combine two arrays together into a new array
 *
 * @param {Array} arr1 - first array
 * @param {Array} arr2 - second array
 * @returns {Array} - a new array containing all items from first array, then all items from second array
 */
export declare function combineArrays<T>(arr1: T[], arr2: T[]): T[] | undefined;
