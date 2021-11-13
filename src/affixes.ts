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
 * @param {Word} word- Fwew Word on which to track affixes
 * @param {string} target - string to try to match
 * @param {string} previousAttempt - previous attempt at matching target
 * @return {string} a new attempt at matching target, having added any applicable prefixes
 */
export function prefix(word: Word, target: string, previousAttempt: string): string {
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
    } else if (target.includes('ketsuk') || target.includes("tsuk")) {
      reString = '(a)?(ketsuk|tsuk)?'
    } else if (target.includes('siyu') && word.data.PartOfSpeech === 'vin.') {
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
        return previousAttempt // Not a type that has a prefix, return word without attempting.
    }
  }

  if (target.startsWith('me') || target.startsWith('pxe') || target.startsWith('pe')) {
    if (previousAttempt.startsWith('e')) {
      reString = reString + '(e)?'
      previousAttempt = previousAttempt.slice(1)
    } else if (previousAttempt.startsWith("'e")) {
      reString = reString + "('e)?"
      previousAttempt = previousAttempt.slice(2)
    }
  }

  // soaiä replacement
  if (word.data.Navi == 'soaia' && target.endsWith('soaiä')) {
    previousAttempt = previousAttempt.replaceAll("soaia", "soai")
  }

  reString = reString + previousAttempt + '.*'

  re = new RegExp(reString, 'g')

  const tmp = Array.from(target.matchAll(re))
  if (tmp && tmp.length > 0 && tmp[0].length >= 1) {
    matchPrefixes = tmp[0].slice(1)
  }
  matchPrefixes = deleteEmpty(matchPrefixes)

  // no productive prefixes found; why bother to continue?
  if (matchPrefixes.length == 0) {
    return previousAttempt
  }

  // only allow lenition after lenition-causing prefixes when prefixes and lenition present
  if (word.data.Affixes.Lenition.length > 0 && matchPrefixes.length > 0) {
    if (containsArr(matchPrefixes, ['fne', 'munsna'])) {
      return previousAttempt
    }
    const lenPre = ['pep', 'pem', 'pe', 'fray', 'tsay', 'fay', 'pay', 'ay', 'me', 'pxe']
    if (containsArr(matchPrefixes, ['fì', 'tsa', 'fra']) && !containsArr(matchPrefixes, lenPre)) {
      return previousAttempt
    }
  }

  // build what prefixes to put on
  for (const p of matchPrefixes) {
    attempt += p
  }

  previousAttempt = attempt + previousAttempt

  matchPrefixes = deleteElement(matchPrefixes, 'e')
  if (matchPrefixes.length > 0) {
    const combined = combineArrays(word.data.Affixes.Prefix, matchPrefixes)
    if (combined != null) {
      word.data.Affixes.Prefix = combined
    }
  }

  return previousAttempt
}

/**
 * try to add suffixes to the word. Return the attempt with placed suffixes
 * Has to be provided with a previousAttempt, the word to go from and add suffixes to.
 *
 * @param {Word} word- Fwew Word on which to track affixes
 * @param {string} target - string to try to match
 * @param {string} previousAttempt - previous attempt at matching target
 * @return {string} a new attempt at matching target, having added any applicable suffixes
 */
export function suffix(word: Word, target: string, previousAttempt: string): string {
  let re: RegExp
  let reString: string = ''
  let attempt: string = ''
  let matchSuffixes: string[] = []

  const adjSufRe = '(a|sì)?$'
  const nSufRe = "(nga'|tsyìp|tu)?(o)?(pe)?(mungwrr|kxamlä|tafkip|pxisre|pximaw|ftumfa|mìkam|nemfa|takip|lisre|talun|krrka|teri|fkip|pxaw|pxel|luke|rofa|fpi|ftu|kip|vay|lok|maw|sìn|sre|few|kam|kay|nuä|sko|yoa|äo|eo|fa|hu|ka|mì|na|ne|ta|io|uo|ro|wä|sì|ìri|ìl|eyä|yä|ä|it|ri|ru|ti|ur|l|r|t)?$"
  const ngey = 'ngey'

  // hardcoded hack for tseyä
  if (target == 'tseyä' && word.data.Navi == 'tsaw') {
    word.data.Affixes.Suffix = ['yä']
    return 'tseyä'
  }

  // hardcoded hack for oey
  if (target == 'oey' && word.data.Navi == 'oe') {
    word.data.Affixes.Suffix = ['y']
    return 'oey'
  }

  // hardcoded hack for ngey
  if (target == ngey && word.data.Navi == 'nga') {
    word.data.Affixes.Suffix = ['y']
    return ngey
  }

  // verbs
  if (!word.data.PartOfSpeech.includes('adv.') && word.data.PartOfSpeech.includes('v') || word.data.PartOfSpeech == '') {
    const inf = word.data.Affixes.Infix
    const pre = word.data.Affixes.Prefix
    // word is verb with <us> or <awn>
    if (inf.length == 1 && (inf[0] == 'us' || inf[0] == 'awn')) {
      // it's a tì-<us> gerund; treat it like a noun
      if (pre.length > 0 && pre.includes('tì') && inf[0] == 'us') {
        reString = nSufRe
        // Just a regular <us> or <awn> verb
      } else {
        reString = adjSufRe
      }
      // It's a tsuk/ketsuk adj from a verb
    } else if (inf.length == 0 && containsArr(pre, ['tsuk', 'ketsuk'])) {
      reString = adjSufRe
    } else if (target.includes('tswo')) {
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
        return previousAttempt // Not a type that has a suffix, return word without attempting.
    }
  }

  // soaiä support
  if (word.data.Navi == 'soaia' && target.endsWith('soaiä')) {
    previousAttempt = previousAttempt.replaceAll('soaia', 'soai')
    reString = previousAttempt + reString
    // o -> e vowel shift support
  } else if (previousAttempt.endsWith('o')) {
    reString = previousAttempt.replaceAll('o', '[oe]') + reString
    // a -> e vowel shift support
  } else if (previousAttempt.endsWith('a')) {
    reString = previousAttempt.replaceAll('a', '[ae]') + reString
  } else if (word.data.Navi == 'tsaw') {
    const tsaSuf = [
      'mungwrr', 'kxamlä', 'tafkip', 'pxisre', 'pximaw', 'ftumfa', 'mìkam', 'nemfa', 'takip', 'lisre', 'talun',
      'krrka', 'teri', 'fkip', 'pxaw', 'pxel', 'luke', 'rofa', 'fpi', 'ftu', 'kip', 'vay', 'lok', 'maw', 'sìn', 'sre',
      'few', 'kam', 'kay', 'nuä', 'sko', 'yoa', 'äo', 'eo', 'fa', 'hu', 'ka', 'mì', 'na', 'ne', 'ta', 'io', 'uo',
      'ro', 'wä', 'ìri', 'ri', 'ru', 'ti', 'r'
    ]
    for (let s of tsaSuf) {
      if (target.endsWith('tsa' + s) || target.endsWith('sa' + s)) {
        previousAttempt = previousAttempt.replace('aw', 'a')
        reString = previousAttempt + reString
      }
    }
  } else {
    reString = previousAttempt + reString
  }

  re = new RegExp(reString, 'g')

  let tmp: RegExpMatchArray[]
  if (target.endsWith('siyu')) {
    tmp = Array.from(target.replaceAll('siyu', ' siyu').matchAll(re))
  } else {
    tmp = Array.from(target.matchAll(re))
  }
  if (tmp.length > 0 && tmp[0].length >= 1) {
    matchSuffixes = tmp[0].slice(1)
  }
  matchSuffixes = deleteEmpty(matchSuffixes)

  // no productive prefixes found; why bother to continue?
  if (matchSuffixes.length == 0) {
    return previousAttempt
  }

  // build what prefixes to put on
  for (let p of matchSuffixes) {
    attempt = attempt + p
  }

  // o -> e vowel shift support for pronouns with -yä
  if (word.data.PartOfSpeech == 'pn.' && matchSuffixes.includes('yä')) {
    if (previousAttempt.endsWith('o')) {
      previousAttempt = previousAttempt.slice(0, -1) + 'e'
      // a -> e vowel shift support
    } else if (previousAttempt.endsWith('a')) {
      previousAttempt = previousAttempt.slice(0, -1) + 'e'
    }
  }
  previousAttempt = previousAttempt + attempt
  if (previousAttempt.includes(' ') && previousAttempt.endsWith('siyu')) {
    previousAttempt = previousAttempt.replaceAll(' siyu', 'siyu')
  }

  const combined = combineArrays(word.data.Affixes.Suffix, matchSuffixes)
  if (combined != null) {
    word.data.Affixes.Suffix = combined
  }

  return previousAttempt
}

/**
 * try to add infixes to the word.
 *
 * @param {Word} word - the Fwew Word on which to track infixes
 * @param {string} target - string to try to match
 * @returns {string} the attempt with placed infixes
 */
export function infix(word: Word, target: string): string {
  // Have we already attempted infixes?
  if (word.data.Affixes.Infix.length !== 0) {
    return ""
  }

  // Does the word even have infix positions??
  if (word.data.InfixLocations === "NULL") {
    return ""
  }

  let re: RegExp
  let reString: string = ''
  let attempt: string = ''
  let pos0InfixRe = "(äp)?(eyk)?"
  let pos1InfixRe = "(ìyev|iyev|ìlm|ìly|ìrm|ìry|ìsy|alm|aly|arm|ary|asy|ìm|imv|ilv|irv|ìy|am|ay|er|iv|ol|us|awn)?"
  let pos2InfixRe = "(eiy|ei|äng|eng|ats|uy)?"
  let pos0InfixString: string = ''
  let pos1InfixString: string = ''
  let pos2InfixString: string = ''
  let matchInfixes: string[] = []

  // Hardcode hack for z**enke
  if (word.data.Navi == "zenke" && (target.includes("uy") || target.includes("ats"))) {
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
  const tmp = Array.from(target.matchAll(re))
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
    const combined = combineArrays(word.data.Affixes.Infix, matchInfixes)
    if (combined != null) {
      word.data.Affixes.Infix = combined
    }
  }

  return attempt
}

/**
 * Lenite the word, based on the attempt. The target is not relevant here, so not given.
 * Returns the lenite attempt.
 * 
 * @param {Word} word - the Fwew Word on which to track lenition
 * @param {string} attempt - current attempt at reconstructing the user's word
 * @return {string} The lenited version of this word
 */
export function lenite(word: Word, attempt: string): string {
  const { Navi, Affixes: { Lenition }, } = word.data
  // Have we already attempted lenition?
  if (Lenition.length !== 0) {
    return attempt
  }

  // replace the first phoneme of the word with the lenited version, if applicable
  for (const [k, v] of Object.entries(getLenitionTable())) {
    if (Navi.toLowerCase().startsWith(k)) {
      attempt = attempt.replace(k, v)
      Lenition.push(`${k}→${v}`)
      return attempt
    }
  }

  // word did not start with a phoneme eligible for lenition, so return the input without modification
  return attempt
}

/**
 * Reconstruct is the main function of affixes.go, responsible for the affixing algorithm
 * This will try to reconstruct a Word, so it matches with the target.
 * Returns true if word got reconstructed into target!
 */
export function reconstruct(word: Word, target: string): boolean {
  let attempt = word.data.Navi

  // only try to infix verbs
  if (word.data.PartOfSpeech.startsWith("v") || word.data.PartOfSpeech.startsWith('svin.')) {
    attempt = word.infix(target)

    if (attempt == target) {
      return true
    }
  }

  attempt = word.prefix(target, attempt)

  if (attempt == target) {
    return true
  }

  attempt = word.suffix(target, attempt)

  if (attempt == target) {
    return true
  }

  attempt = word.lenite(attempt)

  if (attempt == target) {
    return true
  }

  // try it another time, with different guess order!

  // clean up word
  word.data.Affixes = { Prefix: [], Infix: [], Suffix: [], Lenition: [] }

  attempt = word.lenite(word.data.Navi)

  if (attempt == target) {
    return true
  }

  attempt = word.prefix(target, attempt)

  if (attempt == target) {
    return true
  }

  attempt = word.suffix(target, attempt)

  if (attempt == target) {
    return true
  }

  return false
}
