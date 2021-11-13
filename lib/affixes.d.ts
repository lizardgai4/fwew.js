import { Word } from './word';
export interface LenitionTable {
    [key: string]: string;
}
/**
* get table of all the possible lenition changes
*
* @return {LenitionTable} table of all possible lenition changes
*/
export declare function getLenitionTable(): LenitionTable;
/**
 * try to add prefixes to the word. Return the attempt with placed prefixes
 * Has to be provided with a previousAttempt, the word to go from and add prefixes to.
 *
 * @param {Word} word- Fwew Word on which to track affixes
 * @param {string} target - string to try to match
 * @param {string} previousAttempt - previous attempt at matching target
 * @return {string} a new attempt at matching target, having added any applicable prefixes
 */
export declare function prefix(word: Word, target: string, previousAttempt: string): string;
/**
 * try to add suffixes to the word. Return the attempt with placed suffixes
 * Has to be provided with a previousAttempt, the word to go from and add suffixes to.
 *
 * @param {Word} word- Fwew Word on which to track affixes
 * @param {string} target - string to try to match
 * @param {string} previousAttempt - previous attempt at matching target
 * @return {string} a new attempt at matching target, having added any applicable suffixes
 */
export declare function suffix(word: Word, target: string, previousAttempt: string): string;
/**
 * try to add infixes to the word.
 *
 * @param {Word} word - the Fwew Word on which to track infixes
 * @param {string} target - string to try to match
 * @returns {string} the attempt with placed infixes
 */
export declare function infix(word: Word, target: string): string;
/**
 * Lenite the word, based on the attempt. The target is not relevant here, so not given.
 * Returns the lenite attempt.
 *
 * @param {Word} word - the Fwew Word on which to track lenition
 * @param {string} attempt - current attempt at reconstructing the user's word
 * @return {string} The lenited version of this word
 */
export declare function lenite(word: Word, attempt: string): string;
/**
 * Reconstruct is the main function of affixes.go, responsible for the affixing algorithm
 * This will try to reconstruct a Word, so it matches with the target.
 * Returns true if word got reconstructed into target!
 */
export declare function reconstruct(word: Word, target: string): boolean;
