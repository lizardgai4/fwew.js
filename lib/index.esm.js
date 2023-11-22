const API_BASE = 'https://tirea.learnnavi.org/api';
const endpoints = {
    fwew_url: `${API_BASE}/fwew/{nav}`,
    fwew_1d_url: `${API_BASE}/fwew-1d/{nav}`,
    fwew_simple_url: `${API_BASE}/fwew-simple/{nav}`,
    fwew_reverse_url: `${API_BASE}/fwew/r/{lang}/{local}`,
    fwew_1d_reverse_url: `${API_BASE}/fwew-1d/r/{lang}/{local}`,
    search_url: `${API_BASE}/search/{lang}/{words}}`,
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
    name_alu_url: `${API_BASE}/name/alu/{n}/{s}/{nm}/{am}/{dialect`
};

/**
 * Search 1 or more words in both directions (Na'vi first)
 * @param {LanguageCode} lang
 * @param {string} words
 * @returns {Word[][]}
 */
async function search(lang, words) {
    if (words === '')
        return [[]];
    const url = endpoints.search_url
        .replace('{lang}', lang)
        .replace('{words}', words);
    const response = await fetch(url);
    const data = (await response.json());
    return data;
}
/**
 * Search 1 or more words Na'vi -> Local
 * @param {string} navi
 * @returns {Word[][]}
 */
async function fwew(navi) {
    if (navi === '')
        return [[]];
    const url = endpoints.fwew_url.replace('{nav}', navi);
    const response = await fetch(url);
    const data = (await response.json());
    return data;
}
/**
 * Search 1 or more words Local -> Na'vi
 * @param {LanguageCode} lang
 * @param {string} local
 * @returns {Word[][]}
 */
async function fwewReverse(lang, local) {
    if (local === '')
        return [[]];
    const url = endpoints.fwew_reverse_url
        .replace('{lang}', lang)
        .replace('{local}', local);
    const response = await fetch(url);
    const data = (await response.json());
    return data;
}
/**
 * Search 1 or more words Na'vi -> Local, return only 1D array
 * @param {string} navi
 * @returns {Word[]}
 */
async function fwew1D(navi) {
    if (navi === '')
        return [];
    const url = endpoints.fwew_1d_url.replace('{nav}', navi);
    const response = await fetch(url);
    const data = (await response.json());
    return data;
}
/**
 * Search 1 or more words Local -> Na'vi, return only 1D array
 * @param {LanguageCode} lang
 * @param {string} local
 * @returns {Word[]}
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
 * @param {string} navi
 * @returns {Word[][]}
 */
async function fwewSimple(navi) {
    if (navi === '')
        return [[]];
    const url = endpoints.fwew_simple_url.replace('{nav}', navi);
    const response = await fetch(url);
    const data = (await response.json());
    return data;
}

/**
 * Get a list of all words or Get a list of words filtered by args
 * @param {string | undefined} args
 * @returns {Word[]}
 */
async function list(args) {
    const url = args
        ? new URL(endpoints.list_filter_url.replace('{args}', args).replace('%', '%25'))
        : new URL(endpoints.list_url);
    const response = await fetch(url.toString());
    const data = (await response.json());
    return data;
}

async function nameSingle(n, s, dialect) {
    const url = endpoints.name_single_url
        .replace('{n}', n)
        .replace('{s}', s)
        .replace('{dialect}', dialect);
    const response = await fetch(url);
    const data = (await response.json());
    return data;
}
async function nameFull(ending, n, s1, s2, s3, dialect) {
    const url = endpoints.name_full_url
        .replace('{ending}', ending)
        .replace('{n}', n)
        .replace('{s1}', s1)
        .replace('{s2}', s2)
        .replace('{s3}', s3)
        .replace('{dialect}', dialect);
    const response = await fetch(url);
    const data = (await response.json());
    return data;
}
async function nameAlu(n, s, nm, am, dialect) {
    const url = endpoints.name_alu_url
        .replace('{n}', n)
        .replace('{s}', s)
        .replace('{nm}', nm)
        .replace('{am}', am)
        .replace('{dialect}', dialect);
    const response = await fetch(url);
    const data = (await response.json());
    return data;
}

async function numberToNavi(num) {
    const url = endpoints.number_to_navi_url.replace('{num}', num.toString());
    const response = await fetch(url);
    const data = (await response.json());
    return data;
}
async function naviToNumber(word) {
    const url = endpoints.navi_to_number_url.replace('{word}', word);
    const response = await fetch(url);
    const data = (await response.json());
    return data;
}

async function random(n, args) {
    if (args) {
        const url = endpoints.random_filter_url
            .replace('{n}', n.toString())
            .replace('{args}', args);
        const response = await fetch(url);
        const data = (await response.json());
        return data;
    }
    const url = endpoints.random_url.replace('{n}', n.toString());
    const response = await fetch(url);
    const data = (await response.json());
    return data;
}

async function lenition() {
    const url = endpoints.lenition_url;
    const response = await fetch(url);
    const data = (await response.json());
    return data;
}
async function version() {
    const url = endpoints.version_url;
    const response = await fetch(url);
    const data = (await response.json());
    return data;
}

export { fwew, fwew1D, fwew1DReverse, fwewReverse, fwewSimple, lenition, list, nameAlu, nameFull, nameSingle, naviToNumber, numberToNavi, random, search, version };
