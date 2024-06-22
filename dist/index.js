'use strict';

const API_BASE = 'https://tirea.learnnavi.org/api';
const endpoints = {
    fwew_url: `${API_BASE}/fwew/{nav}`,
    fwew_1d_url: `${API_BASE}/fwew-1d/{nav}`,
    fwew_simple_url: `${API_BASE}/fwew-simple/{nav}`,
    fwew_reverse_url: `${API_BASE}/fwew/r/{lang}/{local}`,
    fwew_1d_reverse_url: `${API_BASE}/fwew-1d/r/{lang}/{local}`,
    search_url: `${API_BASE}/search/{lang}/{words}`,
    list_url: `${API_BASE}/list`,
    list_filter_url: `${API_BASE}/list/{args}`,
    random_url: `${API_BASE}/random/{n}`,
    random_filter_url: `${API_BASE}/random/{n}/{args}`,
    number_to_navi_url: `${API_BASE}/number/r/{num}`,
    navi_to_number_url: `${API_BASE}/number/{word}`,
    lenition_url: `${API_BASE}/lenition`,
    version_url: `${API_BASE}/version`,
    name_single_url: `${API_BASE}/name/single/{n}/{s}/{dialect}`,
    name_full_url: `${API_BASE}/name/full/{ending}/{n}/{s1}/{s2}/{s3}/{dialect}`,
    name_alu_url: `${API_BASE}/name/alu/{n}/{s}/{nm}/{am}/{dialect}`,
    homonyms_url: `${API_BASE}/homonyms`,
    oddballs_url: `${API_BASE}/oddballs`,
    multi_ipa_url: `${API_BASE}/multi-ipa`,
    dict_len_url: `${API_BASE}/total-words`,
    reef_ipa_url: `${API_BASE}/reef/{i}`,
    validity_url: `${API_BASE}/valid/{i}`
};

/**
 * Search 1 or more words in both directions (Na'vi first)
 * @param {LanguageCode} lang language code
 * @param {string} words words to search
 * @param {RequestInit | undefined} init fetch options (optional)
 * @returns {Promise<Word[][]>}
 */
async function search(lang, words, init) {
    if (words === '')
        return [[]];
    const url = endpoints.search_url
        .replace('{lang}', lang)
        .replace('{words}', words);
    const response = await fetch(url, init);
    const data = (await response.json());
    return data;
}
/**
 * Search 1 or more words Na'vi -> Local
 * @param {string} navi Na'vi words to search
 * @param {RequestInit | undefined} init fetch options (optional)
 * @returns {Promise<Word[][]>}
 */
async function fwew(navi, init) {
    if (navi === '')
        return [[]];
    const url = endpoints.fwew_url.replace('{nav}', navi);
    const response = await fetch(url, init);
    const data = (await response.json());
    return data;
}
/**
 * Search 1 or more words Local -> Na'vi
 * @param {LanguageCode} lang language code
 * @param {string} local local words to search
 * @param {RequestInit | undefined} init fetch options (optional)
 * @returns {Promise<Word[][]>}
 */
async function fwewReverse(lang, local, init) {
    if (local === '')
        return [[]];
    const url = endpoints.fwew_reverse_url
        .replace('{lang}', lang)
        .replace('{local}', local);
    const response = await fetch(url, init);
    const data = (await response.json());
    return data;
}
/**
 * Search 1 or more words Na'vi -> Local, return only 1D array
 * @param {string} navi Na'vi words to search
 * @param {RequestInit | undefined} init fetch options (optional)
 * @returns {Promise<Word[]>}
 */
async function fwew1D(navi, init) {
    if (navi === '')
        return [];
    const url = endpoints.fwew_1d_url.replace('{nav}', navi);
    const response = await fetch(url, init);
    const data = (await response.json());
    return data;
}
/**
 * Search 1 or more words Local -> Na'vi, return only 1D array
 * @param {LanguageCode} lang language code
 * @param {string} local local words to search
 * @param {RequestInit | undefined} init fetch options (optional)
 * @returns {Promise<Word[]>}
 */
async function fwew1DReverse(lang, local) {
    if (local === '')
        return [];
    const url = endpoints.fwew_1d_reverse_url
        .replace('{lang}', lang)
        .replace('{local}', local);
    const response = await fetch(url);
    const data = (await response.json());
    return data;
}
/**
 * Search 1 or more words Na'vi -> Local, ignoring all affixed words
 * Use this only when you know you are searching a listed root word
 * @param {string} navi Na'vi words to search
 * @param {RequestInit | undefined} init fetch options (optional)
 * @returns {Promise<Word[][]>}
 */
async function fwewSimple(navi, init) {
    if (navi === '')
        return [[]];
    const url = endpoints.fwew_simple_url.replace('{nav}', navi);
    const response = await fetch(url, init);
    const data = (await response.json());
    return data;
}

/**
 * Get a list of all words or Get a list of words filtered by args
 * @param {string | undefined} args filter arguments e.g., 'word has kx' or 'word has kx and pos is vin.'
 * @param {RequestInit | undefined} init fetch options (optional)
 * @returns {Promise<Word[]>}
 */
async function list(args, init) {
    const url = args
        ? new URL(endpoints.list_filter_url.replace('{args}', args).replace('%', '%25'))
        : new URL(endpoints.list_url);
    const response = await fetch(url.toString(), init);
    const data = (await response.json());
    return data;
}

/**
 * Generate a single Na'vi first name
 * @param {string} n number of names to generate [1-50]
 * @param {string} s number of syllables per name [0-4]
 * @param {Dialect} dialect dialect to use ('interdialect' | 'forest' | 'reef')
 * @param {RequestInit | undefined} init fetch options (optional)
 * @returns {Promise<string>}
 */
async function nameSingle(n, s, dialect, init) {
    const url = endpoints.name_single_url
        .replace('{n}', n)
        .replace('{s}', s)
        .replace('{dialect}', dialect);
    const response = await fetch(url, init);
    const data = (await response.json());
    return data;
}
/**
 * Generate a Na'vi full name
 * @param {NameEnding} ending random for random, 'ite for female, 'itan for male, 'itu for non-binary
 * @param {string} n number of names to generate [1-50]
 * @param {string} s1 number of syllables in first name [0-4]
 * @param {string} s2 number of syllables in family name [0-4]
 * @param {string} s3 number of syllables in parent's name [0-4]
 * @param {Dialect} dialect dialect to use ('interdialect' | 'forest' | 'reef')
 * @param {RequestInit | undefined} init fetch options (optional)
 * @returns {Promise<string>}
 */
async function nameFull(ending, n, s1, s2, s3, dialect, init) {
    const url = endpoints.name_full_url
        .replace('{ending}', ending)
        .replace('{n}', n)
        .replace('{s1}', s1)
        .replace('{s2}', s2)
        .replace('{s3}', s3)
        .replace('{dialect}', dialect);
    const response = await fetch(url, init);
    const data = (await response.json());
    return data;
}
/**
 * Generate a Na'vi name with alu
 * @param {string} n number of names to generate [1-50]
 * @param {string} s number of syllables in first name [0-4]
 * @param {NounMode} nm noun mode
 * @param {AdjectiveMode} am adjective mode
 * @param {Dialect} dialect dialect to use ('interdialect' | 'forest' | 'reef')
 * @param {RequestInit | undefined} init fetch options (optional)
 * @returns {Promise<string>}
 */
async function nameAlu(n, s, nm, am, dialect, init) {
    const url = endpoints.name_alu_url
        .replace('{n}', n)
        .replace('{s}', s)
        .replace('{nm}', nm)
        .replace('{am}', am)
        .replace('{dialect}', dialect);
    const response = await fetch(url, init);
    const data = (await response.json());
    return data;
}

/**
 * Returns all the words which fall outside of normal Na'vi phonotactics
 * @param {RequestInit | undefined} init fetch options (optional)
 * @returns {Promise<Word[][]>}
 */
async function oddballs(init) {
    const url = endpoints.oddballs_url;
    const response = await fetch(url, init);
    const data = (await response.json());
    return data;
}
  
/**
 * Returns all the words with more than one dictionary entry
 * @param {RequestInit | undefined} init fetch options (optional)
 * @returns {Promise<Word[][]>}
 */
async function homonyms(init) {
  const url = endpoints.homonyms_url;
  const response = await fetch(url, init);
  const data = (await response.json());
  return data;
}
  
/**
 * Returns whether or not the given string is valid Na'vi
 * @param {RequestInit | undefined} init fetch options (optional)
 * @param {string} words words to search
 * @returns {Promise<String>}
 */
async function valid(words, init) {
  const url = endpoints.validity_url.replace('{i}', words);
  const response = await fetch(url, init);
  const data = (await response.json());
  return data;
}
  
/**
 * Returns a string saying how long the dict is
 * @param {RequestInit | undefined} init fetch options (optional)
 * @returns {Promise<String>}
 */
async function dictLen(init) {
  const url = endpoints.dict_len_url;
  const response = await fetch(url, init);
  const data = (await response.json());
  return data;
}
  
/**
 * Returns whether or not the given string is valid Na'vi
 * @param {RequestInit | undefined} init fetch options (optional)
 * @param {string} words words to search
 * @returns {Promise<String[]>}
 */
async function reefMe(words, init) {
  const url = endpoints.reef_ipa_url.replace('{i}', words);
  const response = await fetch(url, init);
  const data = (await response.json());
  return data;
}
  
/**
 * Returns whether or not the given string is valid Na'vi
 * @param {RequestInit | undefined} init fetch options (optional)
 * @returns {Promise<Map<string,Map<string,Map<string,number>>>>}
 */
async function phonemeFrequency(init) {
  const url = endpoints.reef_ipa_url;
  const response = await fetch(url, init);
  const data = (await response.json());
  return data;
}

/**
 * Returns Na'vi swear words
 * @param {RequestInit | undefined} init fetch options (optional)
 * @returns {Promise<String[]>}
 */
async function profanity(init) {
    const url = endpoints.reef_ipa_url;
    const response = await fetch(url, init);
    const data = (await response.json());
    return data
}

/**
 * Convert a decimal integer in closed range [0,32767] to Na'vi
 * @param num number to convert to Na'vi;
 * @param {RequestInit | undefined} init fetch options (optional)
 * @returns {Promise<FwewNumber | FwewError>}
 */
async function numberToNavi(num, init) {
    const url = endpoints.number_to_navi_url.replace('{num}', num.toString());
    const response = await fetch(url, init);
    const data = (await response.json());
    return data;
}
/**
 * Convert a Na'vi number word to decimal and octal
 * @param word Na'vi number word
 * @param {RequestInit | undefined} init fetch options (optional)
 * @returns {Promise<FwewNumber | FwewError>}
 */
async function naviToNumber(word, init) {
    const url = endpoints.navi_to_number_url.replace('{word}', word);
    const response = await fetch(url, init);
    const data = (await response.json());
    return data;
}

/**
 * Get given number of random words, optionally filtered by args
 * @param {number} n number of random words to get
 * @param {string | undefined} args filter arguments e.g., 'word has kx' or 'word has kx and pos is vin.'
 * @param {RequestInit | undefined} init fetch options (optional)
 * @returns {Promise<Word[]>}
 */
async function random(n, args, init) {
    if (args) {
        const url = endpoints.random_filter_url
            .replace('{n}', n.toString())
            .replace('{args}', args);
        const response = await fetch(url, init);
        const data = (await response.json());
        return data;
    }
    const url = endpoints.random_url.replace('{n}', n.toString());
    const response = await fetch(url, init);
    const data = (await response.json());
    return data;
}

/**
 * Returns all the words with multiple IPAs
 * @param {RequestInit | undefined} init fetch options (optional)
 * @returns {Promise<Word[][]>}
 */
async function multiIPA(init) {
    const url = endpoints.multi_ipa_url;
    const response = await fetch(url, init);
    const data = (await response.json());
    return data;
}
/**
 * Returns all the words which fall outside of normal Na'vi phonotactics
 * @param {RequestInit | undefined} init fetch options (optional)
 * @returns {Promise<Word[][]>}
 */
async function oddballs(init) {
    const url = endpoints.oddballs_url;
    const response = await fetch(url, init);
    const data = (await response.json());
    return data;
}
/**
 * Returns all the words with more than one dictionary entry
 * @param {RequestInit | undefined} init fetch options (optional)
 * @returns {Promise<Word[][]>}
 */
async function homonyms(init) {
    const url = endpoints.homonyms_url;
    const response = await fetch(url, init);
    const data = (await response.json());
    return data;
}
/**
 * Returns whether or not the given string is valid Na'vi
 * @param {RequestInit | undefined} init fetch options (optional)
 * @param {string} words words to search
 * @returns {Promise<String>}
 */
async function valid(words, init) {
    const url = endpoints.validity_url.replace('{i}', words);
    const response = await fetch(url, init);
    const data = (await response.json());
    return data;
}
/**
 * Returns a string saying how long the dict is
 * @param {RequestInit | undefined} init fetch options (optional)
 * @returns {Promise<String>}
 */
async function dictLen(init) {
    const url = endpoints.dict_len_url;
    const response = await fetch(url, init);
    const data = (await response.json());
    return data;
}
/**
 * Returns whether or not the given string is valid Na'vi
 * @param {RequestInit | undefined} init fetch options (optional)
 * @param {string} words words to search
 * @returns {Promise<String[]>}
 */
async function reefMe(words, init) {
    const url = endpoints.reef_ipa_url.replace('{i}', words);
    const response = await fetch(url, init);
    const data = (await response.json());
    return data;
}
/**
 * Returns whether or not the given string is valid Na'vi
 * @param {RequestInit | undefined} init fetch options (optional)
 * @returns {Promise<PhonemeFrequencyMap>}
 */
async function phonemeFrequency(init) {
    const url = endpoints.reef_ipa_url;
    const response = await fetch(url, init);
    const data = (await response.json());
    return data;
}

/**
 * Get the Na'vi lenition table
 * @returns {Promise<LenitionTable>}
 */
async function lenition() {
    const url = endpoints.lenition_url;
    const response = await fetch(url);
    const data = (await response.json());
    return data;
}
/**
 * Get the version of fwew-api, fwew-lib, and the dictionary
 * @returns {Promise<Version>}
 */
async function version() {
    const url = endpoints.version_url;
    const response = await fetch(url);
    const data = (await response.json());
    return data;
}

exports.dictLen = dictLen;
exports.fwew = fwew;
exports.fwew1D = fwew1D;
exports.fwew1DReverse = fwew1DReverse;
exports.fwewReverse = fwewReverse;
exports.fwewSimple = fwewSimple;
exports.homonyms = homonyms;
exports.lenition = lenition;
exports.list = list;
exports.multiIPA = multiIPA;
exports.nameAlu = nameAlu;
exports.nameFull = nameFull;
exports.nameSingle = nameSingle;
exports.oddballs = oddballs;
exports.homonyms = homonyms;
exports.valid = valid;
exports.dictLen = dictLen;
exports.reefMe = reefMe;
exports.phonemeFrequency = phonemeFrequency;
exports.profanity = profanity;
exports.naviToNumber = naviToNumber;
exports.numberToNavi = numberToNavi;
exports.oddballs = oddballs;
exports.phonemeFrequency = phonemeFrequency;
exports.random = random;
exports.reefMe = reefMe;
exports.search = search;
exports.valid = valid;
exports.version = version;
