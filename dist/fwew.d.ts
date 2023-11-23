import type { LanguageCode, Word } from './types';
/**
 * Search 1 or more words in both directions (Na'vi first)
 * @param {LanguageCode} lang language code ("de" | "en" | "et" | "fr" | "hu" | "nl" | "pl" | "ru" | "sv" | "tr")
 * @param {string} words words to search
 * @returns {Promise<Word[][]>}
 */
declare function search(lang: LanguageCode, words: string): Promise<Word[][]>;
/**
 * Search 1 or more words Na'vi -> Local
 * @param {string} navi Na'vi words to search
 * @returns {Promise<Word[][]>}
 */
declare function fwew(navi: string): Promise<Word[][]>;
/**
 * Search 1 or more words Local -> Na'vi
 * @param {LanguageCode} lang language code ("de" | "en" | "et" | "fr" | "hu" | "nl" | "pl" | "ru" | "sv" | "tr")
 * @param {string} local local words to search
 * @returns {Promise<Word[][]>}
 */
declare function fwewReverse(lang: LanguageCode, local: string): Promise<Word[][]>;
/**
 * Search 1 or more words Na'vi -> Local, return only 1D array
 * @param {string} navi Na'vi words to search
 * @returns {Promise<Word[]>}
 */
declare function fwew1D(navi: string): Promise<Word[]>;
/**
 * Search 1 or more words Local -> Na'vi, return only 1D array
 * @param {LanguageCode} lang language code ("de" | "en" | "et" | "fr" | "hu" | "nl" | "pl" | "ru" | "sv" | "tr")
 * @param {string} local local words to search
 * @returns {Promise<Word[]>}
 */
declare function fwew1DReverse(lang: LanguageCode, local: string): Promise<Word[]>;
/**
 * Search 1 or more words Na'vi -> Local, ignoring all affixed words
 * Use this only when you know you are searching a listed root word
 * @param {string} navi Na'vi words to search
 * @returns {Promise<Word[][]>}
 */
declare function fwewSimple(navi: string): Promise<Word[][]>;
export { fwew, fwew1D, fwew1DReverse, fwewReverse, fwewSimple, search };
