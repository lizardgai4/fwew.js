import type { PhonemeFrequencyMap, Word } from './types';
/**
 * Returns all the words with multiple IPAs
 * @param {RequestInit | undefined} init fetch options (optional)
 * @returns {Promise<Word[][]>}
 */
declare function multiIPA(init?: RequestInit): Promise<Word[][]>;
/**
 * Returns all the words which fall outside of normal Na'vi phonotactics
 * @param {RequestInit | undefined} init fetch options (optional)
 * @returns {Promise<Word[][]>}
 */
declare function oddballs(init?: RequestInit): Promise<Word[][]>;
/**
 * Returns all the words with more than one dictionary entry
 * @param {RequestInit | undefined} init fetch options (optional)
 * @returns {Promise<Word[][]>}
 */
declare function homonyms(init?: RequestInit): Promise<Word[][]>;
/**
 * Returns whether or not the given string is valid Na'vi
 * @param {RequestInit | undefined} init fetch options (optional)
 * @param {string} words words to search
 * @returns {Promise<String>}
 */
declare function valid(words: string, init?: RequestInit): Promise<String>;
/**
 * Returns a string saying how long the dict is
 * @param {RequestInit | undefined} init fetch options (optional)
 * @returns {Promise<String>}
 */
declare function dictLen(init?: RequestInit): Promise<String>;
/**
 * Returns whether or not the given string is valid Na'vi
 * @param {RequestInit | undefined} init fetch options (optional)
 * @param {string} words words to search
 * @returns {Promise<String[]>}
 */
declare function reefMe(words: string, init?: RequestInit): Promise<String[]>;
/**
 * Returns whether or not the given string is valid Na'vi
 * @param {RequestInit | undefined} init fetch options (optional)
 * @returns {Promise<PhonemeFrequencyMap>}
 */
declare function phonemeFrequency(init?: RequestInit): Promise<PhonemeFrequencyMap>;
export { dictLen, homonyms, multiIPA, oddballs, phonemeFrequency, reefMe, valid };
