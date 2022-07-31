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
import { containsArr, deleteElement, deleteEmpty, combineArrays } from './util'
import { Word } from './word'

export interface LenitionTable {
  [key: string]: string
}

/**
* get table of all the possible lenition changes
*
* @return {LenitionTable} table of all possible lenition changes
*/
export function getLenitionTable(): LenitionTable {
  return {
    "kx": "k",
    "px": "p",
    "tx": "t",
    "k": "h",
    "p": "f",
    "ts": "s",
    "t": "s",
    "'": "",
  }
}

/**
 * try to add prefixes to the word. Return the attempt with placed prefixes
 * Has to be provided with a previousAttempt, the word to go from and add prefixes to.
 *
 * @param {Word} inputWord- Fwew Word on which to track affixes
 * @return {Word} a new Word after attempt at matching target, having added any applicable prefixes
 */
export function prefix(inputWord: Word): Word {
  const word = inputWord.clone()
  let re: RegExp
  let reString: string = ''
  let attempt: string = ''
  let matchPrefixes: string[] = []

  // pull this out of the switch because the pos data for verbs is so irregular,
  // the switch condition would be like 25 possibilities long
  if (word.data.PartOfSpeech.startsWith('v') || word.data.PartOfSpeech.startsWith('svin') || word.data.PartOfSpeech === '') {
    const inf = word.data.Affixes.Infix
    if (inf.length > 0 && (inf[0] === 'us' || inf[0] === 'awn')) {
      reString = '(a|tì)?'
    } else if (word.target.includes('ketsuk') || word.target.includes("tsuk")) {
      reString = '(a)?(ketsuk|tsuk)?'
    } else if (word.target.includes('siyu') && word.data.PartOfSpeech === 'vin.') {
      reString = '^(pep|pem|pe|fray|tsay|fay|pay|fra|fì|tsa)?(ay|me|pxe|pe)?(fne)?(munsna)?'
    }
  } else {
    switch (word.data.PartOfSpeech) {
      case 'n.':
      case 'pn.':
      case 'prop.n.':
        reString = '^(pep|pem|pe|fray|tsay|fay|pay|fra|fì|tsa)?(ay|me|pxe|pe)?(fne)?(munsna)?'
        break
      case 'adj.':
        reString = '^(nìk|nì|a)?(ke|a)?'
        break
      default:
        return word // Not a type that has a prefix, return word without attempting.
    }
  }

  if (word.target.startsWith('me') || word.target.startsWith('pxe') || word.target.startsWith('pe')) {
    if (word.attempt.startsWith('e')) {
      reString = reString + '(e)?'
      word.attempt = word.attempt.slice(1)
    } else if (word.attempt.startsWith("'e")) {
      reString = reString + "('e)?"
      word.attempt = word.attempt.slice(2)
    }
  }

  // soaiä replacement
  if (word.data.Navi === 'soaia' && word.target.endsWith('soaiä')) {
    word.attempt = word.attempt.replace(/soaia/g, 'soai')
  }

  reString = reString + word.attempt + '.*'

  re = new RegExp(reString, 'g')

  const tmp = Array.from(word.target.matchAll(re))
  if (tmp && tmp.length > 0 && tmp[0].length >= 1) {
    matchPrefixes = tmp[0].slice(1)
  }
  matchPrefixes = deleteEmpty(matchPrefixes)

  // no productive prefixes found; why bother to continue?
  if (matchPrefixes.length === 0) {
    return word
  }

  // only allow lenition after lenition-causing prefixes when prefixes and lenition present
  if (word.data.Affixes.Lenition.length > 0 && matchPrefixes.length > 0) {
    if (containsArr(matchPrefixes, ['fne', 'munsna'])) {
      return word
    }
    const lenPre = ['pep', 'pem', 'pe', 'fray', 'tsay', 'fay', 'pay', 'ay', 'me', 'pxe']
    if (containsArr(matchPrefixes, ['fì', 'tsa', 'fra']) && !containsArr(matchPrefixes, lenPre)) {
      return word
    }
  }

  // build what prefixes to put on
  for (const p of matchPrefixes) {
    attempt += p
  }

  word.attempt = attempt + word.attempt

  matchPrefixes = deleteElement(matchPrefixes, 'e')
  if (matchPrefixes.length > 0) {
    const combined = combineArrays(word.data.Affixes.Prefix, matchPrefixes)
    if (combined != null) {
      word.data.Affixes.Prefix = combined
    }
  }

  return word
}

/**
 * try to add suffixes to the word. Return the attempt with placed suffixes
 * Has to be provided with a previousAttempt, the word to go from and add suffixes to.
 *
 * @param {Word} inputWord - Fwew Word on which to track affixes
 * @return {Word} a new Word, after attempt at matching target, having added any applicable suffixes
 */
export function suffix(inputWord: Word): Word {
  const word = inputWord.clone()
  let re: RegExp
  let reString: string = ''
  let attempt: string = ''
  let matchSuffixes: string[] = []

  const adjSufRe = '(a|sì)?$'
  const nSufRe = "(nga'|tsyìp|tu)?(o)?(pe)?(mungwrr|kxamlä|tafkip|pxisre|pximaw|ftumfa|mìkam|nemfa|takip|lisre|talun|krrka|teri|fkip|pxaw|pxel|luke|rofa|fpi|ftu|kip|vay|lok|maw|sìn|sre|few|kam|kay|nuä|sko|yoa|äo|eo|fa|hu|ka|mì|na|ne|ta|io|uo|ro|wä|sì|ìri|ìl|eyä|yä|ä|it|ri|ru|ti|ur|l|r|t)?$"
  const ngey = 'ngey'

  // hardcoded hack for tseyä
  if (word.target === 'tseyä' && word.data.Navi === 'tsaw') {
    word.data.Affixes.Suffix = ['yä']
    word.attempt = 'tseyä'
    return word
  }

  // hardcoded hack for oey
  if (word.target === 'oey' && word.data.Navi === 'oe') {
    word.data.Affixes.Suffix = ['y']
    word.attempt = 'oey'
    return word
  }

  // hardcoded hack for ngey
  if (word.target === ngey && word.data.Navi === 'nga') {
    word.data.Affixes.Suffix = ['y']
    word.attempt = ngey
    return word
  }

  // verbs
  if (!word.data.PartOfSpeech.includes('adv.') && word.data.PartOfSpeech.includes('v') || word.data.PartOfSpeech === '') {
    const inf = word.data.Affixes.Infix
    const pre = word.data.Affixes.Prefix
    // word is verb with <us> or <awn>
    if (inf.length === 1 && (inf[0] === 'us' || inf[0] === 'awn')) {
      // it's a tì-<us> gerund; treat it like a noun
      if (pre.length > 0 && pre.includes('tì') && inf[0] === 'us') {
        reString = nSufRe
        // Just a regular <us> or <awn> verb
      } else {
        reString = adjSufRe
      }
      // It's a tsuk/ketsuk adj from a verb
    } else if (inf.length === 0 && containsArr(pre, ['tsuk', 'ketsuk'])) {
      reString = adjSufRe
    } else if (word.target.includes('tswo')) {
      reString = '(tswo)?' + nSufRe
    } else {
      reString = '(yu)?$'
    }
  } else {
    switch (word.data.PartOfSpeech) {
      // nouns and noun-likes
      case 'n.':
      case 'pn.':
      case 'prop.n.':
      case 'inter.':
      case 'dem.':
      case 'dem., pn.':
        reString = nSufRe
        break
      // adjectives
      case 'adj.':
        reString = adjSufRe
        break
      // numbers
      case 'num.':
        reString = '(ve)?(a)?'
        break
      default:
        return word // Not a type that has a suffix, return word without attempting.
    }
  }

  // soaiä support
  if (word.data.Navi === 'soaia' && word.target.endsWith('soaiä')) {
    word.attempt = word.attempt.replace(/soaia/g, 'soai')
    reString = word.attempt + reString
    // o -> e vowel shift support
  } else if (word.attempt.endsWith('o')) {
    reString = word.attempt.replace(/o/g, '[oe]') + reString
    // a -> e vowel shift support
  } else if (word.attempt.endsWith('a')) {
    reString = word.attempt.replace(/a/g, '[ae]') + reString
  } else if (word.data.Navi === 'tsaw') {
    const tsaSuf = [
      'mungwrr', 'kxamlä', 'tafkip', 'pxisre', 'pximaw', 'ftumfa', 'mìkam', 'nemfa', 'takip', 'lisre', 'talun',
      'krrka', 'teri', 'fkip', 'pxaw', 'pxel', 'luke', 'rofa', 'fpi', 'ftu', 'kip', 'vay', 'lok', 'maw', 'sìn', 'sre',
      'few', 'kam', 'kay', 'nuä', 'sko', 'yoa', 'äo', 'eo', 'fa', 'hu', 'ka', 'mì', 'na', 'ne', 'ta', 'io', 'uo',
      'ro', 'wä', 'ìri', 'ri', 'ru', 'ti', 'r'
    ]
    for (let s of tsaSuf) {
      if (word.target.endsWith('tsa' + s) || word.target.endsWith('sa' + s)) {
        word.attempt = word.attempt.replace('aw', 'a')
        reString = word.attempt + reString
      }
    }
  } else {
    reString = word.attempt + reString
  }

  re = new RegExp(reString, 'g')

  let tmp: RegExpMatchArray[]
  if (word.target.endsWith('siyu')) {
    tmp = Array.from(word.target.replace(/siyu/g, ' siyu').matchAll(re))
  } else {
    tmp = Array.from(word.target.matchAll(re))
  }
  if (tmp.length > 0 && tmp[0].length >= 1) {
    matchSuffixes = tmp[0].slice(1)
  }
  matchSuffixes = deleteEmpty(matchSuffixes)

  // no productive prefixes found; why bother to continue?
  if (matchSuffixes.length === 0) {
    return word
  }

  // build what prefixes to put on
  for (let p of matchSuffixes) {
    attempt = attempt + p
  }

  // o -> e vowel shift support for pronouns with -yä
  if (word.data.PartOfSpeech === 'pn.' && matchSuffixes.includes('yä')) {
    if (word.attempt.endsWith('o')) {
      word.attempt = word.attempt.slice(0, -1) + 'e'
      // a -> e vowel shift support
    } else if (word.attempt.endsWith('a')) {
      word.attempt = word.attempt.slice(0, -1) + 'e'
    }
  }
  word.attempt = word.attempt + attempt
  if (word.attempt.includes(' ') && word.attempt.endsWith('siyu')) {
    word.attempt = word.attempt.replace(/ siyu/g, 'siyu')
  }

  const combined = combineArrays(word.data.Affixes.Suffix, matchSuffixes)
  if (combined != null) {
    word.data.Affixes.Suffix = combined
  }

  return word
}

/**
 * try to add infixes to the word.
 *
 * @param {Word} inputWord - the Fwew Word on which to track infixes
 * @returns {Word} a new Word after attempt at matching target, having added any applicable infixes
 */
export function infix(inputWord: Word): Word {
  const word = inputWord.clone()
  // Have we already attempted infixes or does the word even have infix positions??
  if (word.data.Affixes.Infix.length !== 0 || word.data.InfixLocations === "NULL") {
    return word
  }

  let re: RegExp
  let reString: string
  let attempt: string
  let pos0InfixRe = "(äp)?(eyk)?"
  let pos1InfixRe = "(ìyev|iyev|ìlm|ìly|ìrm|ìry|ìsy|alm|aly|arm|ary|asy|ìm|imv|ilv|irv|ìy|am|ay|er|iv|ol|us|awn)?"
  let pos2InfixRe = "(eiy|ei|äng|eng|ats|uy)?"
  let pos0InfixString: string = ''
  let pos1InfixString: string = ''
  let pos2InfixString: string = ''
  let matchInfixes: string[] = []

  // Hardcode hack for z**enke
  if (word.data.Navi === "zenke" && (word.target.includes("uy") || word.target.includes("ats"))) {
    word.data.InfixLocations = word.data.InfixLocations.replace(/ke$/, 'eke')
  }

  reString = word.data.InfixLocations.replace("<0>", pos0InfixRe)

  // handle <ol>ll and <er>rr
  if (reString.includes("<1>ll")) {
    reString = reString.replace("<1>ll", pos1InfixRe + "(ll)?")
  } else if (word.data.InfixLocations.includes("<1>rr")) {
    reString = reString.replace("<1>rr", pos1InfixRe + "(rr)?")
  } else {
    reString = reString.replace("<1>", pos1InfixRe)
  }
  reString = reString.replace("<2>", pos2InfixRe)

  re = new RegExp(reString, 'g')
  const tmp = Array.from(word.target.matchAll(re))
  if (tmp.length > 0 && tmp[0].length >= 1) {
    matchInfixes = tmp[0].slice(1)
  }
  matchInfixes = deleteEmpty(matchInfixes)
  matchInfixes = deleteElement(matchInfixes, "ll")
  matchInfixes = deleteElement(matchInfixes, "rr")

  for (const i of matchInfixes) {
    if (i === "äp" || i === "eyk") {
      pos0InfixString = pos0InfixString + i
    } else if (["eiy", "ei", "äng", "eng", "ats", "uy"].includes(i)) {
      pos2InfixString = i
    } else {
      pos1InfixString = i
    }
  }

  attempt = word.data.InfixLocations.replace("<0>", pos0InfixString)
  attempt = attempt.replace("<1>", pos1InfixString)
  attempt = attempt.replace("<2>", pos2InfixString)

  // eiy override?
  if (matchInfixes.includes("eiy")) {
    const eiy = matchInfixes.indexOf("eiy")
    matchInfixes[eiy] = "ei"
  }

  // handle <ol>ll and <er>rr
  if (attempt.includes("olll")) {
    attempt = attempt.replace("olll", "ol")
  } else if (attempt.includes("errr")) {
    attempt = attempt.replace("errr", "er")
  }

  if (matchInfixes.length !== 0) {
    const combined = combineArrays<string>(word.data.Affixes.Infix, matchInfixes)
    if (combined != null) {
      word.data.Affixes.Infix = combined
    }
  }

  word.attempt = attempt
  return word
}

/**
 * Lenite the word, based on the attempt. The target is not relevant here, so not given.
 * Returns the lenite attempt.
 * 
 * @param {Word} inputWord - the Fwew Word on which to track lenition
 * @return {Word} The lenited version of this word
 */
export function lenite(inputWord: Word): Word {
  const word = inputWord.clone()
  // Have we already attempted lenition?
  if (word.data.Affixes.Lenition.length !== 0) {
    return word
  }

  // replace the first phoneme of the word with the lenited version, if applicable
  for (const [k, v] of Object.entries(getLenitionTable())) {
    if (word.data.Navi.toLowerCase().startsWith(k)) {
      word.attempt = word.attempt.replace(k, v)
      word.data.Affixes.Lenition.push(`${k}→${v}`)
      return word
    }
  }

  // word did not start with a phoneme eligible for lenition, so return the input without modification
  return word
}

/**
 * Reconstruct is the main function of affixes.ts, responsible for the affixing algorithm
 * This will try to reconstruct a Word, so it matches with the target.
 *
 * @param {Word} inputWord - word to use as base of reconstruction
 * @param {string} target - goal form to produce from inputWord
 * @returns Word if word got reconstructed into target, undefined if it did not
 */
export function reconstruct(inputWord: Word, target: string): Word | undefined {
  let word = inputWord.clone()
  word.target = target
  word.attempt = word.data.Navi

  // only try to infix verbs
  if (word.data.PartOfSpeech.startsWith("v") || word.data.PartOfSpeech.startsWith('svin.')) {
    word = word.infix()

    if (word.attempt === word.target) {
      return word
    }
  }

  word = prefix(word)

  if (word.attempt === word.target) {
    return word
  }

  word = suffix(word)

  if (word.attempt === word.target) {
    return word
  }

  word = lenite(word)

  if (word.attempt === word.target) {
    return word
  }

  // try it another time, with different guess order!

  // clean up word
  let word2 = word.clone()
  word2.target = target
  word2.attempt = word2.data.Navi
  word2.data.Affixes = { Prefix: [], Infix: [], Suffix: [], Lenition: [] }

  word2 = lenite(word2)

  if (word2.attempt === word2.target) {
    return word2
  }

  word2 = prefix(word2)

  if (word2.attempt === word2.target) {
    return word2
  }

  word2 = suffix(word2)

  if (word2.attempt === word2.target) {
    return word2
  }
  return undefined;
}
