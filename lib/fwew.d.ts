import { Word } from './word';
/**
 * Translate some Na'vi text.
 *
 * !! Only one word is allowed, if spaces are found, they will be treated like part of the word !!
 * This will return an array of Words, that fit the input text
 * One Navi-Word can have multiple meanings and words (e.g. synonyms)
 *
 * @param {string} searchNaviWord word to search
 * @return {Word[]} array of matching Fwew Word
 */
export declare function translateFromNavi(searchNaviWord: string): Word[];
/**
 * Translate some localized text
 *
 * @param {string} searchWord - localized word to lookup
 * @param {string} langCode - language code
 * @returns {Word[]} array of matching Fwew Word
 */
export declare function translateToNavi(searchWord: string, langCode: string): Word[];
