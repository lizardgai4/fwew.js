'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

//  This file is part of fwew.js.
//  fwew.js is free software: you can redistribute it and/or modify
//   it under the terms of the GNU General Public License as published by
//   the Free Software Foundation, either version 3 of the License, or
//   (at your option) any later version.
//
//  fwew.js is distributed in the hope that it will be useful,
//  but WITHOUT ANY WARRANTY; without even implied warranty of
//  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
//  GNU General Public License for more details.
//
//  You should have received a copy of the GNU General Public License
//  along with fwew.js.  If not, see http://gnu.org/licenses/
/* spell-checker: disable */
/**
 * Check if an array contains any of the specified strings
 *
 * @param {string[]} arr1 - array being searched
 * @param {string[]} arr2 - array of strings to search for
 * @returns {boolean} true if any string in arr2 is in arr1, false otherwise
 */
function containsArr(arr1, arr2) {
    if (arr2.length === 0 || arr1.length === 0) {
        return false;
    }
    for (var _i = 0, arr2_1 = arr2; _i < arr2_1.length; _i++) {
        var x = arr2_1[_i];
        for (var _a = 0, arr1_1 = arr1; _a < arr1_1.length; _a++) {
            var y = arr1_1[_a];
            if (y === x) {
                return true;
            }
        }
    }
    return false;
}
/**
 * Delete all occurrences of str in array
 *
 * @param {string[]} arr - array from which to delete strings
 * @param {string} str - string to delete
 * @returns {string[]} new array containing original items minus all str
 */
function deleteElement(arr, str) {
    return arr.filter(function (s) { return s !== str; });
}
/**
 * Delete all occurrences of empty string, null, and undefined in array
 *
 * @param {string[]} arr - array from which to delete empty strings, nulls, and undefined
 * @returns {string[]} new array containing original items minus all instances of empty string, null, or undefined
 */
function deleteEmpty(arr) {
    if (arr == null)
        return [];
    return arr.filter(function (s) { return s !== '' && s != null; });
}
/**
 * Check if string is a letter
 *
 * @param {string} str - string to check
 * @returns {boolean} true if string is an alphabet letter or apostrophe
 */
function isLetter(str) {
    if (str == null)
        return false;
    return ['\'', '‘'].includes(str) || str.toLowerCase() !== str.toUpperCase();
}
/**
 * Reverse a string
 *
 * @param {string} str - string to reverse
 * @returns {string} - reversed copy of str
 */
function reverse(str) {
    if (str == null)
        return str;
    var n = str.length;
    var chars = [];
    for (var _i = 0, str_1 = str; _i < str_1.length; _i++) {
        var char = str_1[_i];
        n--;
        chars[n] = char;
    }
    return chars.join('');
}
/**
 * StripChars strips all the characters in chr out of str
 *
 * @param {string} str - string from which to strip characters
 * @param {string} chr - characters to be stripped out
 * @returns {string} a new copy of str without any of the characters specified in chr
 */
function stripChars(str, chr) {
    if (str == null || chr == null)
        return str;
    if (str === '' || chr === '')
        return str;
    var result = '';
    for (var _i = 0, str_2 = str; _i < str_2.length; _i++) {
        var c = str_2[_i];
        if (!chr.includes(c)) {
            result += c;
        }
    }
    return result;
}
/**
 * Compute the intersection between two strings
 *
 * @param {string} a - first string
 * @param {string} b - second string
 * @return {string} the sequence of characters that both strings have in common, from left to right
 */
function intersection(a, b) {
    if (a == null || b == null)
        return undefined;
    // initialize the map with all the characters in a
    var intersectionMap = {};
    for (var _i = 0, a_1 = a; _i < a_1.length; _i++) {
        var char = a_1[_i];
        intersectionMap[char] = true;
    }
    // populate the result for each character of b that is in the map of characters in a
    var result = '';
    for (var _a = 0, b_1 = b; _a < b_1.length; _a++) {
        var char = b_1[_a];
        if (intersectionMap[char]) {
            result += char;
        }
    }
    return result;
}
/**
 * test a string pattern, potentially containing globs, against a subject string. The result is a simple true/false,
 * determining whether or not the glob pattern matched the subject text.
 *
 * @param {string} pattern - glob pattern
 * @param {string} subj - subject text
 * @returns {boolean} true if the glob pattern matched the subject text, false otherwise
 */
function glob(pattern, subj) {
    var GLOB = '%';
    // Empty pattern can only match empty subject
    if (pattern === '' || pattern == null) {
        return subj === pattern;
    }
    // If the pattern _is_ a glob, it matches everything
    if (pattern === GLOB) {
        return true;
    }
    var parts = pattern.split(GLOB);
    if (parts.length === 1) {
        // No globs in pattern, so test for equality
        return subj === pattern;
    }
    var leadingGlob = pattern.startsWith(GLOB);
    var trailingGlob = pattern.endsWith(GLOB);
    var end = parts.length - 1;
    // Go over the leading parts and ensure they match.
    for (var i = 0; i < end; i++) {
        var idx = subj.indexOf(parts[i]);
        switch (i) {
            case 0:
                if (!leadingGlob && idx !== 0) {
                    return false;
                }
            default:
                if (idx < 0) {
                    return false;
                }
        }
        // Trim evaluated text from subj as we loop over the pattern.
        subj = subj.slice(idx + parts[i].length);
    }
    // Reached the last section. Requires special handling.
    return trailingGlob || subj.endsWith(parts[end]);
}
/**
 * Combine two arrays together into a new array
 *
 * @param {Array} arr1 - first array
 * @param {Array} arr2 - second array
 * @returns {Array} - a new array containing all items from first array, then all items from second array
 */
function combineArrays(arr1, arr2) {
    if (arr1 == null || arr1.length === 0) {
        return arr2 == null ? undefined : arr2;
    }
    if (arr2 == null || arr2.length === 0) {
        return arr1;
    }
    var result = [];
    for (var _i = 0, arr1_2 = arr1; _i < arr1_2.length; _i++) {
        var t = arr1_2[_i];
        result.push(t);
    }
    for (var _a = 0, arr2_2 = arr2; _a < arr2_2.length; _a++) {
        var t = arr2_2[_a];
        result.push(t);
    }
    return result;
}

var util = /*#__PURE__*/Object.freeze({
  __proto__: null,
  containsArr: containsArr,
  deleteElement: deleteElement,
  deleteEmpty: deleteEmpty,
  isLetter: isLetter,
  reverse: reverse,
  stripChars: stripChars,
  intersection: intersection,
  glob: glob,
  combineArrays: combineArrays
});

//  This file is part of fwew.js.
/**
* get table of all the possible lenition changes
*
* @return {LenitionTable} table of all possible lenition changes
*/
function getLenitionTable() {
    return {
        "kx": "k",
        "px": "p",
        "tx": "t",
        "k": "h",
        "p": "f",
        "ts": "s",
        "t": "s",
        "'": "",
    };
}
/**
 * try to add prefixes to the word. Return the attempt with placed prefixes
 * Has to be provided with a previousAttempt, the word to go from and add prefixes to.
 *
 * @param {Word} inputWord- Fwew Word on which to track affixes
 * @return {Word} a new Word after attempt at matching target, having added any applicable prefixes
 */
function prefix(inputWord) {
    var word = inputWord.clone();
    var re;
    var reString = '';
    var attempt = '';
    var matchPrefixes = [];
    // pull this out of the switch because the pos data for verbs is so irregular,
    // the switch condition would be like 25 possibilities long
    if (word.data.PartOfSpeech.startsWith('v') || word.data.PartOfSpeech.startsWith('svin') || word.data.PartOfSpeech === '') {
        var inf = word.data.Affixes.Infix;
        if (inf.length > 0 && (inf[0] === 'us' || inf[0] === 'awn')) {
            reString = '(a|tì)?';
        }
        else if (word.target.includes('ketsuk') || word.target.includes("tsuk")) {
            reString = '(a)?(ketsuk|tsuk)?';
        }
        else if (word.target.includes('siyu') && word.data.PartOfSpeech === 'vin.') {
            reString = '^(pep|pem|pe|fray|tsay|fay|pay|fra|fì|tsa)?(ay|me|pxe|pe)?(fne)?(munsna)?';
        }
    }
    else {
        switch (word.data.PartOfSpeech) {
            case 'n.':
            case 'pn.':
            case 'prop.n.':
                reString = '^(pep|pem|pe|fray|tsay|fay|pay|fra|fì|tsa)?(ay|me|pxe|pe)?(fne)?(munsna)?';
                break;
            case 'adj.':
                reString = '^(nìk|nì|a)?(ke|a)?';
                break;
            default:
                return word; // Not a type that has a prefix, return word without attempting.
        }
    }
    if (word.target.startsWith('me') || word.target.startsWith('pxe') || word.target.startsWith('pe')) {
        if (word.attempt.startsWith('e')) {
            reString = reString + '(e)?';
            word.attempt = word.attempt.slice(1);
        }
        else if (word.attempt.startsWith("'e")) {
            reString = reString + "('e)?";
            word.attempt = word.attempt.slice(2);
        }
    }
    // soaiä replacement
    if (word.data.Navi === 'soaia' && word.target.endsWith('soaiä')) {
        word.attempt = word.attempt.replaceAll("soaia", "soai");
    }
    reString = reString + word.attempt + '.*';
    re = new RegExp(reString, 'g');
    var tmp = Array.from(word.target.matchAll(re));
    if (tmp && tmp.length > 0 && tmp[0].length >= 1) {
        matchPrefixes = tmp[0].slice(1);
    }
    matchPrefixes = deleteEmpty(matchPrefixes);
    // no productive prefixes found; why bother to continue?
    if (matchPrefixes.length === 0) {
        return word;
    }
    // only allow lenition after lenition-causing prefixes when prefixes and lenition present
    if (word.data.Affixes.Lenition.length > 0 && matchPrefixes.length > 0) {
        if (containsArr(matchPrefixes, ['fne', 'munsna'])) {
            return word;
        }
        var lenPre = ['pep', 'pem', 'pe', 'fray', 'tsay', 'fay', 'pay', 'ay', 'me', 'pxe'];
        if (containsArr(matchPrefixes, ['fì', 'tsa', 'fra']) && !containsArr(matchPrefixes, lenPre)) {
            return word;
        }
    }
    // build what prefixes to put on
    for (var _i = 0, matchPrefixes_1 = matchPrefixes; _i < matchPrefixes_1.length; _i++) {
        var p = matchPrefixes_1[_i];
        attempt += p;
    }
    word.attempt = attempt + word.attempt;
    matchPrefixes = deleteElement(matchPrefixes, 'e');
    if (matchPrefixes.length > 0) {
        var combined = combineArrays(word.data.Affixes.Prefix, matchPrefixes);
        if (combined != null) {
            word.data.Affixes.Prefix = combined;
        }
    }
    return word;
}
/**
 * try to add suffixes to the word. Return the attempt with placed suffixes
 * Has to be provided with a previousAttempt, the word to go from and add suffixes to.
 *
 * @param {Word} inputWord - Fwew Word on which to track affixes
 * @return {Word} a new Word, after attempt at matching target, having added any applicable suffixes
 */
function suffix(inputWord) {
    var word = inputWord.clone();
    var re;
    var reString = '';
    var attempt = '';
    var matchSuffixes = [];
    var adjSufRe = '(a|sì)?$';
    var nSufRe = "(nga'|tsyìp|tu)?(o)?(pe)?(mungwrr|kxamlä|tafkip|pxisre|pximaw|ftumfa|mìkam|nemfa|takip|lisre|talun|krrka|teri|fkip|pxaw|pxel|luke|rofa|fpi|ftu|kip|vay|lok|maw|sìn|sre|few|kam|kay|nuä|sko|yoa|äo|eo|fa|hu|ka|mì|na|ne|ta|io|uo|ro|wä|sì|ìri|ìl|eyä|yä|ä|it|ri|ru|ti|ur|l|r|t)?$";
    var ngey = 'ngey';
    // hardcoded hack for tseyä
    if (word.target === 'tseyä' && word.data.Navi === 'tsaw') {
        word.data.Affixes.Suffix = ['yä'];
        word.attempt = 'tseyä';
        return word;
    }
    // hardcoded hack for oey
    if (word.target === 'oey' && word.data.Navi === 'oe') {
        word.data.Affixes.Suffix = ['y'];
        word.attempt = 'oey';
        return word;
    }
    // hardcoded hack for ngey
    if (word.target === ngey && word.data.Navi === 'nga') {
        word.data.Affixes.Suffix = ['y'];
        word.attempt = ngey;
        return word;
    }
    // verbs
    if (!word.data.PartOfSpeech.includes('adv.') && word.data.PartOfSpeech.includes('v') || word.data.PartOfSpeech === '') {
        var inf = word.data.Affixes.Infix;
        var pre = word.data.Affixes.Prefix;
        // word is verb with <us> or <awn>
        if (inf.length === 1 && (inf[0] === 'us' || inf[0] === 'awn')) {
            // it's a tì-<us> gerund; treat it like a noun
            if (pre.length > 0 && pre.includes('tì') && inf[0] === 'us') {
                reString = nSufRe;
                // Just a regular <us> or <awn> verb
            }
            else {
                reString = adjSufRe;
            }
            // It's a tsuk/ketsuk adj from a verb
        }
        else if (inf.length === 0 && containsArr(pre, ['tsuk', 'ketsuk'])) {
            reString = adjSufRe;
        }
        else if (word.target.includes('tswo')) {
            reString = '(tswo)?' + nSufRe;
        }
        else {
            reString = '(yu)?$';
        }
    }
    else {
        switch (word.data.PartOfSpeech) {
            // nouns and noun-likes
            case 'n.':
            case 'pn.':
            case 'prop.n.':
            case 'inter.':
            case 'dem.':
            case 'dem., pn.':
                reString = nSufRe;
                break;
            // adjectives
            case 'adj.':
                reString = adjSufRe;
                break;
            // numbers
            case 'num.':
                reString = '(ve)?(a)?';
                break;
            default:
                return word; // Not a type that has a suffix, return word without attempting.
        }
    }
    // soaiä support
    if (word.data.Navi === 'soaia' && word.target.endsWith('soaiä')) {
        word.attempt = word.attempt.replaceAll('soaia', 'soai');
        reString = word.attempt + reString;
        // o -> e vowel shift support
    }
    else if (word.attempt.endsWith('o')) {
        reString = word.attempt.replaceAll('o', '[oe]') + reString;
        // a -> e vowel shift support
    }
    else if (word.attempt.endsWith('a')) {
        reString = word.attempt.replaceAll('a', '[ae]') + reString;
    }
    else if (word.data.Navi === 'tsaw') {
        var tsaSuf = [
            'mungwrr', 'kxamlä', 'tafkip', 'pxisre', 'pximaw', 'ftumfa', 'mìkam', 'nemfa', 'takip', 'lisre', 'talun',
            'krrka', 'teri', 'fkip', 'pxaw', 'pxel', 'luke', 'rofa', 'fpi', 'ftu', 'kip', 'vay', 'lok', 'maw', 'sìn', 'sre',
            'few', 'kam', 'kay', 'nuä', 'sko', 'yoa', 'äo', 'eo', 'fa', 'hu', 'ka', 'mì', 'na', 'ne', 'ta', 'io', 'uo',
            'ro', 'wä', 'ìri', 'ri', 'ru', 'ti', 'r'
        ];
        for (var _i = 0, tsaSuf_1 = tsaSuf; _i < tsaSuf_1.length; _i++) {
            var s = tsaSuf_1[_i];
            if (word.target.endsWith('tsa' + s) || word.target.endsWith('sa' + s)) {
                word.attempt = word.attempt.replace('aw', 'a');
                reString = word.attempt + reString;
            }
        }
    }
    else {
        reString = word.attempt + reString;
    }
    re = new RegExp(reString, 'g');
    var tmp;
    if (word.target.endsWith('siyu')) {
        tmp = Array.from(word.target.replaceAll('siyu', ' siyu').matchAll(re));
    }
    else {
        tmp = Array.from(word.target.matchAll(re));
    }
    if (tmp.length > 0 && tmp[0].length >= 1) {
        matchSuffixes = tmp[0].slice(1);
    }
    matchSuffixes = deleteEmpty(matchSuffixes);
    // no productive prefixes found; why bother to continue?
    if (matchSuffixes.length === 0) {
        return word;
    }
    // build what prefixes to put on
    for (var _a = 0, matchSuffixes_1 = matchSuffixes; _a < matchSuffixes_1.length; _a++) {
        var p = matchSuffixes_1[_a];
        attempt = attempt + p;
    }
    // o -> e vowel shift support for pronouns with -yä
    if (word.data.PartOfSpeech === 'pn.' && matchSuffixes.includes('yä')) {
        if (word.attempt.endsWith('o')) {
            word.attempt = word.attempt.slice(0, -1) + 'e';
            // a -> e vowel shift support
        }
        else if (word.attempt.endsWith('a')) {
            word.attempt = word.attempt.slice(0, -1) + 'e';
        }
    }
    word.attempt = word.attempt + attempt;
    if (word.attempt.includes(' ') && word.attempt.endsWith('siyu')) {
        word.attempt = word.attempt.replaceAll(' siyu', 'siyu');
    }
    var combined = combineArrays(word.data.Affixes.Suffix, matchSuffixes);
    if (combined != null) {
        word.data.Affixes.Suffix = combined;
    }
    return word;
}
/**
 * try to add infixes to the word.
 *
 * @param {Word} inputWord - the Fwew Word on which to track infixes
 * @returns {Word} a new Word after attempt at matching target, having added any applicable infixes
 */
function infix(inputWord) {
    var word = inputWord.clone();
    // Have we already attempted infixes or does the word even have infix positions??
    if (word.data.Affixes.Infix.length !== 0 || word.data.InfixLocations === "NULL") {
        return word;
    }
    var re;
    var reString;
    var attempt;
    var pos0InfixRe = "(äp)?(eyk)?";
    var pos1InfixRe = "(ìyev|iyev|ìlm|ìly|ìrm|ìry|ìsy|alm|aly|arm|ary|asy|ìm|imv|ilv|irv|ìy|am|ay|er|iv|ol|us|awn)?";
    var pos2InfixRe = "(eiy|ei|äng|eng|ats|uy)?";
    var pos0InfixString = '';
    var pos1InfixString = '';
    var pos2InfixString = '';
    var matchInfixes = [];
    // Hardcode hack for z**enke
    if (word.data.Navi === "zenke" && (word.target.includes("uy") || word.target.includes("ats"))) {
        word.data.InfixLocations = word.data.InfixLocations.replace(/ke$/, 'eke');
    }
    reString = word.data.InfixLocations.replace("<0>", pos0InfixRe);
    // handle <ol>ll and <er>rr
    if (reString.includes("<1>ll")) {
        reString = reString.replace("<1>ll", pos1InfixRe + "(ll)?");
    }
    else if (word.data.InfixLocations.includes("<1>rr")) {
        reString = reString.replace("<1>rr", pos1InfixRe + "(rr)?");
    }
    else {
        reString = reString.replace("<1>", pos1InfixRe);
    }
    reString = reString.replace("<2>", pos2InfixRe);
    re = new RegExp(reString, 'g');
    var tmp = Array.from(word.target.matchAll(re));
    if (tmp.length > 0 && tmp[0].length >= 1) {
        matchInfixes = tmp[0].slice(1);
    }
    matchInfixes = deleteEmpty(matchInfixes);
    matchInfixes = deleteElement(matchInfixes, "ll");
    matchInfixes = deleteElement(matchInfixes, "rr");
    for (var _i = 0, matchInfixes_1 = matchInfixes; _i < matchInfixes_1.length; _i++) {
        var i = matchInfixes_1[_i];
        if (i === "äp" || i === "eyk") {
            pos0InfixString = pos0InfixString + i;
        }
        else if (["eiy", "ei", "äng", "eng", "ats", "uy"].includes(i)) {
            pos2InfixString = i;
        }
        else {
            pos1InfixString = i;
        }
    }
    attempt = word.data.InfixLocations.replace("<0>", pos0InfixString);
    attempt = attempt.replace("<1>", pos1InfixString);
    attempt = attempt.replace("<2>", pos2InfixString);
    // eiy override?
    if (matchInfixes.includes("eiy")) {
        var eiy = matchInfixes.indexOf("eiy");
        matchInfixes[eiy] = "ei";
    }
    // handle <ol>ll and <er>rr
    if (attempt.includes("olll")) {
        attempt = attempt.replace("olll", "ol");
    }
    else if (attempt.includes("errr")) {
        attempt = attempt.replace("errr", "er");
    }
    if (matchInfixes.length !== 0) {
        var combined = combineArrays(word.data.Affixes.Infix, matchInfixes);
        if (combined != null) {
            word.data.Affixes.Infix = combined;
        }
    }
    word.attempt = attempt;
    return word;
}
/**
 * Lenite the word, based on the attempt. The target is not relevant here, so not given.
 * Returns the lenite attempt.
 *
 * @param {Word} inputWord - the Fwew Word on which to track lenition
 * @return {Word} The lenited version of this word
 */
function lenite(inputWord) {
    var word = inputWord.clone();
    // Have we already attempted lenition?
    if (word.data.Affixes.Lenition.length !== 0) {
        return word;
    }
    // replace the first phoneme of the word with the lenited version, if applicable
    for (var _i = 0, _a = Object.entries(getLenitionTable()); _i < _a.length; _i++) {
        var _b = _a[_i], k = _b[0], v = _b[1];
        if (word.data.Navi.toLowerCase().startsWith(k)) {
            word.attempt = word.attempt.replace(k, v);
            word.data.Affixes.Lenition.push(k + "\u2192" + v);
            return word;
        }
    }
    // word did not start with a phoneme eligible for lenition, so return the input without modification
    return word;
}
/**
 * Reconstruct is the main function of affixes.ts, responsible for the affixing algorithm
 * This will try to reconstruct a Word, so it matches with the target.
 *
 * @param {Word} inputWord - word to use as base of reconstruction
 * @param {string} target - goal form to produce from inputWord
 * @returns Word if word got reconstructed into target, undefined if it did not
 */
function reconstruct(inputWord, target) {
    var word = inputWord.clone();
    word.target = target;
    word.attempt = word.data.Navi;
    // only try to infix verbs
    if (word.data.PartOfSpeech.startsWith("v") || word.data.PartOfSpeech.startsWith('svin.')) {
        word = word.infix();
        if (word.attempt === word.target) {
            return word;
        }
    }
    word = prefix(word);
    if (word.attempt === word.target) {
        return word;
    }
    word = suffix(word);
    if (word.attempt === word.target) {
        return word;
    }
    word = lenite(word);
    if (word.attempt === word.target) {
        return word;
    }
    // try it another time, with different guess order!
    // clean up word
    var word2 = word.clone();
    word2.target = target;
    word2.attempt = word2.data.Navi;
    word2.data.Affixes = { Prefix: [], Infix: [], Suffix: [], Lenition: [] };
    word2 = lenite(word2);
    if (word2.attempt === word2.target) {
        return word2;
    }
    word2 = prefix(word2);
    if (word2.attempt === word2.target) {
        return word2;
    }
    word2 = suffix(word2);
    if (word2.attempt === word2.target) {
        return word2;
    }
    return undefined;
}

//  This file is part of fwew.js.
var words = require('./words.json');
var dictionary = [];
/**
 * Get all words
 *
 * @returns list of all words in the dictionary
 */
function getWords() {
    if (dictionary.length === 0) {
        dictionary = words.map(function (w) { return new Word(w).clone(); });
    }
    return dictionary;
}
/**
 * Represents a Word in the Fwew Dictionary
 */
var Word = /** @class */ (function () {
    function Word(data) {
        this.attempt = '';
        this.target = '';
        this.data = data || {
            ID: '',
            Navi: '',
            IPA: '',
            InfixLocations: '',
            PartOfSpeech: '',
            Source: '',
            Stressed: '',
            Syllables: '',
            InfixDots: '',
            DE: '',
            EN: '',
            ET: '',
            FR: '',
            HU: '',
            NL: '',
            PL: '',
            RU: '',
            SV: '',
            Affixes: { Prefix: [], Infix: [], Suffix: [], Lenition: [] }
        };
    }
    /**
     * Clone a Fwew Word with deep copy
     *
     * @return deep copy clone of this Word
     */
    Word.prototype.clone = function () {
        var clone = new Word(JSON.parse(JSON.stringify(this.data)));
        clone.attempt = this.attempt;
        clone.target = this.target;
        return clone;
    };
    /**
     * Get the number of syllables of a Na'vi word
     *
     * @returns the syllable count of this word
     */
    Word.prototype.syllableCount = function () {
        // function to compress digraphs
        var compress = function (word) {
            // compression map
            var cMap = { aw: '0', ay: '1', ew: '2', ey: '3', kx: '4', ll: '5', ng: '6', px: '7', rr: '8', ts: '9', tx: 'Q' };
            for (var c in cMap) {
                word = word.replace(c, cMap[c]);
            }
            return word;
        };
        var numSyllables = 0;
        var vowels = ["a", "ä", "e", "é", "i", "ì", "o", "u", "aw", "ay", "ew", "ey", "ll", "rr"].map(function (v) { return compress(v); });
        var word = compress(this.data.Navi.toLowerCase());
        var _loop_1 = function (p) {
            numSyllables += word.split('').filter(function (x) { return x === p; }).length;
        };
        for (var _i = 0, vowels_1 = vowels; _i < vowels_1.length; _i++) {
            var p = vowels_1[_i];
            _loop_1(p);
        }
        return numSyllables;
    };
    /**
     * Calculate similarity score between user's word and current Na'vi word
     *
     * @param {string} other - other Na'vi word to compare to this Na'vi word
     * @return {number} the similarity score, in range [0, 1.0] (representing from 0% up to 100% similarity)
     */
    Word.prototype.similarity = function (other) {
        // exact match gets similarity score of 1.0 (100%) and we go no further.
        if (this.data.Navi === other) {
            return 1.0;
        }
        // hardcoded fix for 'ngey'; it should be counted as a 100% match because it comes from the same word
        if (this.data.Navi === 'nga' && other === 'ngey') {
            return 1.0;
        }
        // not a match if this listed root word is longer.
        // the addition of 1 makes the difference have to be slightly more significant to rule out the match
        if (this.data.Navi.length > other.length + 1) {
            return 0.0;
        }
        // the set of Na'vi vowel characters. l and r are here because of ll and rr
        var vowels = 'aäeiìoulr';
        // the sequence of vowels present in this listed root word, from left to right
        var thisWordVowels = intersection(this.data.Navi, vowels);
        // the sequence of vowels present in the other word, from left to right
        var otherWordVowels = intersection(other, vowels);
        // the sequence of characters that this listed root word and the other word have in common, from left to right
        var wordIntersection = intersection(this.data.Navi, other);
        // the sequence of vowels that the other word has in common with this listed root word's vowels, from left to right
        var thisWordVowelsOther = intersection(thisWordVowels, other);
        // empty intersection yields 0 similarity score
        if (thisWordVowels == null || otherWordVowels == null || wordIntersection == null || thisWordVowelsOther == null) {
            return 0.0;
        }
        // not a match if this listed root word has more vowels than the other word has in total
        if (thisWordVowels.length > otherWordVowels.length) {
            return 0.0;
        }
        // not a match the other word has no vowels in common with this listed root word
        if (thisWordVowelsOther.length === 0) {
            return 0.0;
        }
        /** the number of characters that this word and the other word have in common */
        var intersectionSize = wordIntersection.length;
        /**
         * percentage of this word's total characters that are also in the other word
         *
         * is at most 1.0 (the length of this word, divided by itself)
         */
        var intersectionRatio = intersectionSize / this.data.Navi.length;
        /**
         * the ratio of this word's length to the other word's length.
         *
         * values in range (0, 1) mean this word is shorter,
         * values > 1 mean the other word is shorter,
         * value of 1 means same both words have the same length.
         *
         * min value is 1 / the length of the longest word in the language.
         *
         * max value is the length of this word (in the case where other word's length is 1 char)
         */
        var lengthRatio = this.data.Navi.length / other.length;
        /**
         * the final similarity score.
         *
         * In the average case, intersectionRatio and lengthRatio tend to be in range (0, 1),
         * hence the normalizing division by a constant of 2.
         */
        return (intersectionRatio + lengthRatio) / 2;
    };
    /**
     * try to add prefixes to the word. Return the attempt with placed prefixes
     * Has to be provided with a previousAttempt, the word to go from and add prefixes to.
     *
     * @return {Word} a new Word after attempt at matching target, having added any applicable prefixes
     */
    Word.prototype.prefix = function () {
        return prefix(this);
    };
    /**
     * try to add suffixes to the word. Return the attempt with placed suffixes
     * Has to be provided with a previousAttempt, the word to go from and add suffixes to.
     *
     * @return {Word} a new Word after attempt at matching target, having added any applicable suffixes
     */
    Word.prototype.suffix = function () {
        return suffix(this);
    };
    /**
     * try to add infixes to the word.
     *
     * @returns {Word} a new Word after attempt at matching target, having added any applicable infixes
     */
    Word.prototype.infix = function () {
        return infix(this);
    };
    /**
     * Lenite the word, based on the attempt. The target is not relevant here, so not given.
     * Returns the lenite attempt.
     *
     * @return {Word} The lenited version of this word
     */
    Word.prototype.lenite = function () {
        return lenite(this);
    };
    /**
     * Reconstruct is the main function of affixes.go, responsible for the affixing algorithm
     * This will try to reconstruct a Word, so it matches with the target.
     * Returns true if word got reconstructed into target!
     */
    Word.prototype.reconstruct = function (target) {
        return reconstruct(this, target);
    };
    return Word;
}());

//  This file is part of fwew.js.
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
function translateFromNavi(searchNaviWord) {
    var fwewResults = [];
    // remove all the sketchy chars from arguments
    for (var _i = 0, _a = '~@#$%^&*()[]{}<>_/.,;:!?|+\\'; _i < _a.length; _i++) {
        var c = _a[_i];
        searchNaviWord = searchNaviWord.replaceAll(c, '');
    }
    // normalize tìftang character
    searchNaviWord = searchNaviWord.replaceAll("’", "'");
    searchNaviWord = searchNaviWord.replaceAll("‘", "'");
    // find everything lowercase
    searchNaviWord = searchNaviWord.toLowerCase();
    // No Results if empty string after removing sketch chars
    if (searchNaviWord.length === 0) {
        return [];
    }
    /**
     * fwew function: searches for Na'vi words in the dictionary
     *
     * Will run on each entry of the dictionary, appending matching Word entries to the previously-defined results array
     *
     * @param {Word} word in the dictionary we are currently comparing to the user's search input
     */
    var fwew = function (word) {
        // save original Navi word, we want to add "+" or "--" later again
        var naviWord = word.data.Navi;
        // remove "+" and "--", we want to be able to search with and without those!
        word.data.Navi = word.data.Navi.replaceAll("+", "");
        word.data.Navi = word.data.Navi.replaceAll("--", "");
        word.data.Navi = word.data.Navi.toLowerCase();
        // exact match, add this to the results array and go no further in the dictionary
        if (word.data.Navi === searchNaviWord) {
            word.data.Navi = naviWord;
            fwewResults.push(word);
            return;
        }
        // skip words that obviously won't work
        var similarityScore = word.similarity(searchNaviWord);
        if (similarityScore < 0.50 && !searchNaviWord.endsWith("eyä")) {
            return;
        }
        // check if applying affix rules to word will yield any matches against the user's search input, and add them if so
        var result = word.reconstruct(searchNaviWord);
        if (result != null) {
            result.data.Navi = naviWord;
            fwewResults.push(result);
        }
    };
    // run the fwew function on each word in the dictionary, to populate the results array
    getWords().forEach(fwew);
    return fwewResults;
}
/**
 * Translate some localized text
 *
 * @param {string} searchWord - localized word to lookup
 * @param {string} langCode - language code
 * @returns {Word[]} array of matching Fwew Word
 */
function translateToNavi(searchWord, langCode) {
    var fwewReverseResults = [];
    /**
     * fwewReverse function: searches for Na'vi words in the dictionary in the reverse direction
     *
     * Will run on each entry of the dictionary, appending matching Word entries to the previously-defined results array
     *
     * @param {Word} word in the dictionary we are currently comparing to the user's search input
     */
    var fwewReverse = function (word) {
        var wordString = '';
        switch (langCode) {
            case 'de':
                wordString += word.data.DE;
                break;
            case 'en':
                wordString += word.data.EN;
                break;
            case 'et':
                wordString += word.data.ET;
                break;
            case 'fr':
                wordString += word.data.FR;
                break;
            case 'hu':
                wordString += word.data.HU;
                break;
            case 'nl':
                wordString += word.data.NL;
                break;
            case 'pl':
                wordString += word.data.PL;
                break;
            case 'ru':
                wordString += word.data.RU;
                break;
            case 'sv':
                wordString += word.data.SV;
        }
        wordString = stripChars(wordString, '.,;()');
        wordString = wordString.toLowerCase();
        searchWord = searchWord.toLowerCase();
        // whole-word matching
        for (var _i = 0, _a = wordString.split(' '); _i < _a.length; _i++) {
            var w = _a[_i];
            if (w === searchWord) {
                fwewReverseResults.push(word);
                break;
            }
        }
    };
    // run the fwewReverse function on each word in the dictionary, to populate the results array
    // words.map((w: WordData) => new Word(w)).forEach(fwewReverse)
    getWords().forEach(fwewReverse);
    return fwewReverseResults;
}

var fwew = /*#__PURE__*/Object.freeze({
  __proto__: null,
  translateFromNavi: translateFromNavi,
  translateToNavi: translateToNavi
});

//  This file is part of fwew.js.
//  fwew.js is free software: you can redistribute it and/or modify
//   it under the terms of the GNU General Public License as published by
//   the Free Software Foundation, either version 3 of the License, or
//   (at your option) any later version.
//
//  fwew.js is distributed in the hope that it will be useful,
//  but WITHOUT ANY WARRANTY; without even implied warranty of
//  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
//  GNU General Public License for more details.
//
//  You should have received a copy of the GNU General Public License
//  along with fwew.js.  If not, see http://gnu.org/licenses/
/* spell-checker: disable */
var texts = {
    // <what> strings
    "w_pos": "pos",
    "w_word": "word",
    "w_words": "words",
    "w_syllables": "syllables",
    "w_stress": "stress",
    // <cond> strings
    "c_is": "is",
    "c_has": "has",
    "c_like": "like",
    "c_starts": "starts",
    "c_ends": "ends",
    "c_not-is": "not-is",
    "c_not-has": "not-has",
    "c_not-like": "not-like",
    "c_not-starts": "not-starts",
    "c_not-ends": "not-ends",
    "c_first": "first",
    "c_last": "last"
};
// Text function is the accessor for texts string[]
function text(s) {
    return texts[s];
}

//  This file is part of fwew.js.
/**
 * Filter the dictionary based on the args.
 * args can be empty, if so, the whole Dict will be returned (This also happens if < 3 args are given)
 * It will try to always get 3 args and an `and` in between. If less than 3 exist, than it will wil return the previous results.
 *
 * @param {string[]} args - arguments specifying what properties all the words in the list should have
 * @returns {Word[]} list of Word
 */
function list(args) {
    var results = getWords();
    while (args.length >= 3) {
        // get 3 args and remove 4th
        var simpleArgs = args.slice(0, 3);
        results = listWords(simpleArgs, results);
        // remove first 4 elements
        if (args.length > 4) {
            args = args.slice(4);
        }
        else {
            break;
        }
    }
    return results;
}
function listWords(args, words) {
    var results = [];
    var what = args[0].toLowerCase();
    var cond = args[1].toLowerCase();
    var spec = args[2].toLowerCase();
    // /list what cond spec
    var wordsLen = words.length;
    for (var _i = 0, _a = Object.entries(words); _i < _a.length; _i++) {
        var _b = _a[_i], i = _b[0], word = _b[1];
        var ispec = void 0;
        switch (what) {
            case text("w_pos"):
                var pos = word.data.PartOfSpeech.toLowerCase();
                switch (cond) {
                    case text("c_starts"):
                        if (pos.startsWith(spec)) {
                            results.push(word);
                        }
                        break;
                    case text("c_ends"):
                        if (pos.endsWith(spec)) {
                            results.push(word);
                        }
                        break;
                    case text("c_is"):
                        if (pos === spec) {
                            results.push(word);
                        }
                        break;
                    case text("c_has"):
                        if (pos.includes(spec)) {
                            results.push(word);
                        }
                        break;
                    case text("c_like"):
                        if (glob(spec, pos)) {
                            results.push(word);
                        }
                        break;
                    case text("c_not-starts"):
                        if (!pos.startsWith(spec)) {
                            results.push(word);
                        }
                        break;
                    case text("c_not-ends"):
                        if (!pos.endsWith(spec)) {
                            results.push(word);
                        }
                        break;
                    case text("c_not-is"):
                        if (pos !== spec) {
                            results.push(word);
                        }
                        break;
                    case text("c_not-has"):
                        if (!pos.includes(spec)) {
                            results.push(word);
                        }
                        break;
                    case text("c_not-like"):
                        if (!glob(spec, pos)) {
                            results.push(word);
                        }
                }
                break;
            case text("w_word"):
                var navi = word.data.Navi.toLowerCase();
                switch (cond) {
                    case text("c_starts"):
                        if (navi.startsWith(spec)) {
                            results.push(word);
                        }
                        break;
                    case text("c_ends"):
                        if (navi.endsWith(spec)) {
                            results.push(word);
                        }
                        break;
                    case text("c_has"):
                        if (navi.includes(spec)) {
                            results.push(word);
                        }
                        break;
                    case text("c_like"):
                        if (glob(spec, navi)) {
                            results.push(word);
                        }
                        break;
                    case text("c_not-starts"):
                        if (!navi.startsWith(spec)) {
                            results.push(word);
                        }
                        break;
                    case text("c_not-ends"):
                        if (!navi.endsWith(spec)) {
                            results.push(word);
                        }
                        break;
                    case text("c_not-has"):
                        if (!navi.includes(spec)) {
                            results.push(word);
                        }
                        break;
                    case text("c_not-like"):
                        if (!glob(spec, navi)) {
                            results.push(word);
                        }
                }
                break;
            case text("w_words"):
                var specNumber = +spec;
                if (isNaN(specNumber)) {
                    return words;
                }
                switch (cond) {
                    case text("c_first"):
                        if (Number(i) < specNumber) {
                            results.push(word);
                        }
                        break;
                    case text("c_last"):
                        if (Number(i) >= wordsLen - specNumber && Number(i) <= wordsLen) {
                            results.push(word);
                        }
                }
                break;
            case text("w_syllables"):
                ispec = +spec;
                if (isNaN(ispec)) {
                    return words;
                }
                switch (cond) {
                    case "<":
                        if (word.syllableCount() < ispec) {
                            results.push(word);
                        }
                        break;
                    case "<=":
                        if (word.syllableCount() <= ispec) {
                            results.push(word);
                        }
                        break;
                    case "=":
                        if (word.syllableCount() === ispec) {
                            results.push(word);
                        }
                        break;
                    case ">=":
                        if (word.syllableCount() >= ispec) {
                            results.push(word);
                        }
                        break;
                    case ">":
                        if (word.syllableCount() > ispec) {
                            results.push(word);
                        }
                        break;
                    case "!=":
                        if (word.syllableCount() !== ispec) {
                            results.push(word);
                        }
                }
                break;
            case text("w_stress"):
                ispec = +spec;
                if (isNaN(ispec)) {
                    return words;
                }
                var istress = +word.data.Stressed;
                switch (cond) {
                    case "<":
                        if (istress < ispec) {
                            results.push(word);
                        }
                        break;
                    case "<=":
                        if (istress <= ispec) {
                            results.push(word);
                        }
                        break;
                    case "=":
                        if (ispec < 0) {
                            if (word.syllableCount() + ispec + 1 === istress) {
                                results.push(word);
                            }
                        }
                        else if (istress === ispec) {
                            results.push(word);
                        }
                        break;
                    case ">=":
                        if (istress >= ispec) {
                            results.push(word);
                        }
                        break;
                    case ">":
                        if (istress > ispec) {
                            results.push(word);
                        }
                        break;
                    case "!=":
                        if (ispec < 0) {
                            if (word.syllableCount() + ispec + 1 !== istress) {
                                results.push(word);
                            }
                        }
                        else if (istress !== ispec) {
                            results.push(word);
                        }
                }
        }
    }
    return results;
}

//  This file is part of fwew.js.
/**
 * Get random integer in range [0, n)
 *
 * @param {number} n - max random number
 * @returns random integer between 0 and n
 */
function randomInt(n) {
    return Math.floor(Math.random() * n);
}
/**
 * Create pseudo-random permutation of the integers from 0 to n
 *
 * @param {number} n - number of elements to create a permutation of
 * @returns an array of numbers in range [0, n)
 */
function permutation(n) {
    var m = [];
    for (var i = 0; i < n; i++) {
        var j = randomInt(i + 1);
        m[i] = m[j];
        m[j] = i;
    }
    return m;
}
/**
 * Get list of Random Na'vi words
 *
 * @param {number} amount of Na'vi words to get
 * @param {string[]} args the arguments specifying which properties all the words should have
 * @returns list of size amount of Na'vi words having properties specified by args
 */
function random(amount, args) {
    var results = [];
    var allWords = list(args);
    var dictLength = allWords.length;
    // return empty array if the dictionary didn't load
    if (dictLength === 0) {
        return results;
    }
    // create random number
    if (amount <= 0) {
        amount = randomInt(dictLength);
    }
    // return all words in the case requested amount is greater than the number of words
    if (amount > dictLength) {
        return allWords;
    }
    // get random numbers for allWords array
    var perm = permutation(dictLength);
    for (var _i = 0, _a = perm.slice(0, amount); _i < _a.length; _i++) {
        var i = _a[_i];
        results.push(allWords[i]);
    }
    return results;
}

//  This file is part of fwew.js.
//  fwew.js is free software: you can redistribute it and/or modify
//   it under the terms of the GNU General Public License as published by
//   the Free Software Foundation, either version 3 of the License, or
//   (at your option) any later version.
//
//  fwew.js is distributed in the hope that it will be useful,
//  but WITHOUT ANY WARRANTY; without even implied warranty of
//  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
//  GNU General Public License for more details.
//
//  You should have received a copy of the GNU General Public License
//  along with fwew.js.  If not, see http://gnu.org/licenses/
/* spell-checker: disable */
var naviVocab = [
    // 0 1 2 3 4 5 6 7 actual
    ["kew", "'aw", "mune", "pxey", "tsìng", "mrr", "pukap", "kinä"],
    // 0 1 2 3 4 5 6 7 last digit
    ["", "aw", "mun", "pey", "sìng", "mrr", "fu", "hin"],
    // 0 1 2 3 4 5 6 7 first or middle digit
    ["", "", "me", "pxe", "tsì", "mrr", "pu", "ki"],
    // 0 1 2 3 4 powers of 8
    ["", "vo", "za", "vozam", "zazam"],
    // 0 1 2 3 4 powers of 8 last digit
    ["", "l", "", "", ""],
];
// "word number portion": octal value
// the upper array is the digit.
var numTable = [
    {
        "kizazam": 28672,
        "kizaza": 28672,
        "puzazam": 24576,
        "puzaza": 24576,
        "mrrzazam": 20480,
        "mrrzaza": 20480,
        "rrzazam": 20480,
        "rrzaza": 20480,
        "tsìzazam": 16384,
        "tsìzaza": 16384,
        "pxezazam": 12288,
        "pxezaza": 12288,
        "mezazam": 8192,
        "mezaza": 8192,
        "ezazam": 8192,
        "ezaza": 8192,
        "zazam": 4096,
        "zaza": 4096,
    },
    {
        "kivozam": 3584,
        "kivoza": 3584,
        "puvozam": 3072,
        "puvoza": 3072,
        "mrrvozam": 2560,
        "mrrvoza": 2560,
        "rrvozam": 2560,
        "rrvoza": 2560,
        "tsìvozam": 2048,
        "tsìvoza": 2048,
        "pxevozam": 1536,
        "pxevoza": 1536,
        "mevozam": 1024,
        "mevoza": 1024,
        "evozam": 1024,
        "evoza": 1024,
        "vozam": 512,
        "voza": 512,
    },
    {
        "kizam": 448,
        "kiza": 448,
        "puzam": 384,
        "puza": 384,
        "mrrzam": 320,
        "mrrza": 320,
        "rrzam": 320,
        "rrza": 320,
        "tsìzam": 256,
        "tsìza": 256,
        "pxezam": 192,
        "pxeza": 192,
        "mezam": 128,
        "meza": 128,
        "ezam": 128,
        "eza": 128,
        "zam": 64,
        "za": 64,
    },
    {
        "kivol": 56,
        "kivo": 56,
        "puvol": 48,
        "puvo": 48,
        "mrrvol": 40,
        "mrrvo": 40,
        "rrvol": 40,
        "rrvo": 40,
        "tsìvol": 32,
        "tsìvo": 32,
        "pxevol": 24,
        "pxevo": 24,
        "mevol": 16,
        "mevo": 16,
        "evol": 16,
        "evo": 16,
        "vol": 8,
        "vo": 8,
    },
    {
        "hin": 7,
        "fu": 6,
        "mrr": 5,
        "rr": 5,
        "sìng": 4,
        "pey": 3,
        "mun": 2,
        "un": 2,
        "aw": 1,
    },
];
// The regex values for the different values.
// The upper array is the digit.
var numTableRegexp = [
    [
        "kizazam?",
        "puzazam?",
        "m?rrzazam?",
        "tsìzazam?",
        "pxezazam?",
        "m?ezazam?",
        "zazam?",
    ],
    [
        "kivozam?",
        "puvozam?",
        "m?rrvozam?",
        "tsìvozam?",
        "pxevozam?",
        "m?evozam?",
        "vozam?",
    ],
    [
        "kizam?",
        "puzam?",
        "m?rrzam?",
        "tsìzam?",
        "pxezam?",
        "m?ezam?",
        "zam?",
    ],
    [
        "kivol?",
        "puvol?",
        "m?rrvol?",
        "tsìvol?",
        "pxevol?",
        "m?evol?",
        "vol?",
    ],
    [
        "hin",
        "fu",
        "mrr",
        "rr",
        "sìng",
        "pey",
        "mun",
        "un",
        "aw",
    ],
];
/**
 * Translate a Na'vi number word to the actual integer.
 * Na'vi numbers are octal values, so the integer is defined as octal number, and can easily be displayed as decimal number.
 * If no translation is found, `NoTranslationFound` is returned as error!
 *
 * @param {string} input - Na'vi number word like mevosìng
 * @returns {number} integer represented by the given Na'vi number
 */
function naviToNumber(input) {
    input = input.toLowerCase();
    // kew
    if (input === "kew") {
        return 0;
    }
    // 'aw mune pxey tsìng mrr pukap kinä
    // literal numbers 1-7
    for (var _i = 0, _a = Object.entries(naviVocab[0]); _i < _a.length; _i++) {
        var _b = _a[_i], i = _b[0], w = _b[1];
        if (input === w && w !== "") {
            return Number(i);
        }
    }
    // build regexp for all other numbers
    // regex for big values
    var regexpString = '';
    for (var _c = 0, numTableRegexp_1 = numTableRegexp; _c < numTableRegexp_1.length; _c++) {
        var digit = numTableRegexp_1[_c];
        regexpString += '(';
        var first = true;
        for (var _d = 0, digit_1 = digit; _d < digit_1.length; _d++) {
            var number = digit_1[_d];
            if (!first) {
                regexpString += "|";
            }
            regexpString += number;
            first = false;
        }
        regexpString += ")?";
    }
    var re = new RegExp(regexpString);
    var tmp = input.match(re);
    var n = 0;
    if (tmp && tmp.length > 0 && tmp[0].length > 0) {
        for (var _e = 0, _f = Object.entries(tmp.slice(1)); _e < _f.length; _e++) {
            var _g = _f[_e], i = _g[0], v = _g[1];
            var value = numTable[Number(i)][v];
            if (value) {
                n += value;
            }
        }
    }
    else {
        return 0;
    }
    return n;
}
/**
 * Translate an octal-integer into the Na'vi number word.
 *
 * @param {number} input integer to translate
 * @returns {string} Na'vi number word representing the input number
 */
function numberToNavi(input) {
    // check if inside max-min
    if (input < 0) {
        return '';
    }
    else if (input > 32767) {
        return '';
    }
    // only one digit
    if (input <= 7) {
        return naviVocab[0][input];
    }
    // rest calculate digit by digit
    var output = '';
    var previousDigit = 0;
    var firstDigit = 0;
    // maximal 5 possible digits
    for (var i = 0; i < 5; i++) {
        if (i === 0) {
            // last digit is written differently
            var n = input % 8;
            output = naviVocab[1][n] + output;
            previousDigit = n;
            firstDigit = n;
        }
        else {
            input = input >> 3;
            var n = input % 8;
            // only run, when not 0, 0 is just kept out
            if (n !== 0) {
                var future = naviVocab[2][n] + naviVocab[3][i];
                // override to add `l` to vo, if at second digit and last digit is 0|1
                if (i === 1 && n !== 0 && (previousDigit === 0 || previousDigit === 1)) {
                    future = future + "l";
                }
                // override to add `m` to za
                // only run if at third digit and second digit is not 0|1, also run when digits are x00|x01
                if (i === 2 && n !== 0 && ((previousDigit !== 0 && previousDigit !== 1) || (previousDigit === 0 && (firstDigit === 0 || firstDigit === 1)))) {
                    future = future + "m";
                }
                output = future + output;
            }
            previousDigit = n;
        }
    }
    output = output.replaceAll("mm", "m");
    return output;
}

var numbers = /*#__PURE__*/Object.freeze({
  __proto__: null,
  naviToNumber: naviToNumber,
  numberToNavi: numberToNavi
});

exports.Word = Word;
exports.fwew = fwew;
exports.getLenitionTable = getLenitionTable;
exports.getWords = getWords;
exports.infix = infix;
exports.lenite = lenite;
exports.list = list;
exports.numbers = numbers;
exports.prefix = prefix;
exports.random = random;
exports.reconstruct = reconstruct;
exports.suffix = suffix;
exports.util = util;
