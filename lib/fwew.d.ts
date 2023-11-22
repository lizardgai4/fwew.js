import type { LanguageCode, Word } from './types';
/**
 * Search 1 or more words in both directions (Na'vi first)
 * @param {LanguageCode} lang
 * @param {string} words
 * @returns {Word[][]}
 */
declare function search(lang: LanguageCode, words: string): Promise<Word[][]>;
/**
 * Search 1 or more words Na'vi -> Local
 * @param {string} navi
 * @returns {Word[][]}
 */
declare function fwew(navi: string): Promise<Word[][]>;
/**
 * Search 1 or more words Local -> Na'vi
 * @param {LanguageCode} lang
 * @param {string} local
 * @returns {Word[][]}
 */
declare function fwewReverse(lang: LanguageCode, local: string): Promise<Word[][]>;
/**
 * Search 1 or more words Na'vi -> Local, return only 1D array
 * @param {string} navi
 * @returns {Word[]}
 */
declare function fwew1D(navi: string): Promise<Word[]>;
/**
 * Search 1 or more words Local -> Na'vi, return only 1D array
 * @param {LanguageCode} lang
 * @param {string} local
 * @returns {Word[]}
 */
declare function fwew1DReverse(lang: LanguageCode, local: string): Promise<Word[]>;
/**
 * Search 1 or more words Na'vi -> Local, ignoring all affixed words
 * Use this only when you know you are searching a listed root word
 * @param {string} navi
 * @returns {Word[][]}
 */
declare function fwewSimple(navi: string): Promise<Word[][]>;
export { fwew, fwew1D, fwew1DReverse, fwewReverse, fwewSimple, search };
