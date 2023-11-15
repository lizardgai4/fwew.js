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
 * @param {Word} inputWord- Fwew Word on which to track affixes
 * @return {Word} a new Word after attempt at matching target, having added any applicable prefixes
 */
export declare function prefix(inputWord: Word): Word;
/**
 * try to add suffixes to the word. Return the attempt with placed suffixes
 * Has to be provided with a previousAttempt, the word to go from and add suffixes to.
 *
 * @param {Word} inputWord - Fwew Word on which to track affixes
 * @return {Word} a new Word, after attempt at matching target, having added any applicable suffixes
 */
export declare function suffix(inputWord: Word): Word;
/**
 * try to add infixes to the word.
 *
 * @param {Word} inputWord - the Fwew Word on which to track infixes
 * @returns {Word} a new Word after attempt at matching target, having added any applicable infixes
 */
export declare function infix(inputWord: Word): Word;
/**
 * Lenite the word, based on the attempt. The target is not relevant here, so not given.
 * Returns the lenite attempt.
 *
 * @param {Word} inputWord - the Fwew Word on which to track lenition
 * @return {Word} The lenited version of this word
 */
export declare function lenite(inputWord: Word): Word;
/**
 * Reconstruct is the main function of affixes.ts, responsible for the affixing algorithm
 * This will try to reconstruct a Word, so it matches with the target.
 *
 * @param {Word} inputWord - word to use as base of reconstruction
 * @param {string} target - goal form to produce from inputWord
 * @returns Word if word got reconstructed into target, undefined if it did not
 */
export declare function reconstruct(inputWord: Word, target: string): Word | undefined;
