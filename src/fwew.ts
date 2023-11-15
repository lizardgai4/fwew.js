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
import { Word, getWords } from './word'
import { stripChars } from './util'

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
export function translateFromNavi(searchNaviWord: string): Word[] {
  let fwewResults: Word[] = []

  // remove all the sketchy chars from arguments
  for (const c of '~@#$%^&*()[]{}<>_/.,;:!?|+\\') {
    searchNaviWord = searchNaviWord.replace(`/${c}/g`, '')
  }

  // normalize tìftang character
  searchNaviWord = searchNaviWord.replace(/[’‘]/g, '')

  // find everything lowercase
  searchNaviWord = searchNaviWord.toLowerCase()

  // No Results if empty string after removing sketch chars
  if (searchNaviWord.length === 0) {
    return []
  }

  /**
   * fwew function: searches for Na'vi words in the dictionary
   *
   * Will run on each entry of the dictionary, appending matching Word entries to the previously-defined results array
   *
   * @param {Word} word in the dictionary we are currently comparing to the user's search input
   */
  const fwew = (word: Word): void => {
    // save original Navi word, we want to add "+" or "--" later again
    const naviWord = word.data.Navi

    // remove "+" and "--", we want to be able to search with and without those!
    word.data.Navi = word.data.Navi.replace(/[+-]/g, '')
    word.data.Navi = word.data.Navi.toLowerCase()

    // exact match, add this to the results array and go no further in the dictionary
    if (word.data.Navi === searchNaviWord) {
      word.data.Navi = naviWord
      fwewResults.push(word)
      return
    }

    // skip words that obviously won't work
    const similarityScore = word.similarity(searchNaviWord)
    if (similarityScore < 0.5 && !searchNaviWord.endsWith('eyä')) {
      return
    }

    // check if applying affix rules to word will yield any matches against the user's search input, and add them if so
    const result = word.reconstruct(searchNaviWord)
    if (result != null) {
      result.data.Navi = naviWord
      fwewResults.push(result)
    }
  }

  // run the fwew function on each word in the dictionary, to populate the results array
  getWords().forEach(fwew)

  return fwewResults
}

/**
 * Translate some localized text
 *
 * @param {string} searchWord - localized word to lookup
 * @param {string} langCode - language code
 * @returns {Word[]} array of matching Fwew Word
 */
export function translateToNavi(searchWord: string, langCode: string): Word[] {
  let fwewReverseResults: Word[] = []

  /**
   * fwewReverse function: searches for Na'vi words in the dictionary in the reverse direction
   *
   * Will run on each entry of the dictionary, appending matching Word entries to the previously-defined results array
   *
   * @param {Word} word in the dictionary we are currently comparing to the user's search input
   */
  const fwewReverse = (word: Word): void => {
    let wordString: string = ''
    switch (langCode) {
      case 'de':
        wordString += word.data.DE
        break
      case 'en':
        wordString += word.data.EN
        break
      case 'et':
        wordString += word.data.ET
        break
      case 'fr':
        wordString += word.data.FR
        break
      case 'hu':
        wordString += word.data.HU
        break
      case 'nl':
        wordString += word.data.NL
        break
      case 'pl':
        wordString += word.data.PL
        break
      case 'ru':
        wordString += word.data.RU
        break
      case 'sv':
        wordString += word.data.SV
        break
      case 'tr':
        wordString += word.data.TR
    }
    wordString = stripChars(wordString, '.,;()')
    wordString = wordString.toLowerCase()
    searchWord = searchWord.toLowerCase()

    // whole-word matching
    for (let w of wordString.split(' ')) {
      if (w === searchWord) {
        fwewReverseResults.push(word)
        break
      }
    }
  }

  // run the fwewReverse function on each word in the dictionary, to populate the results array
  // words.map((w: WordData) => new Word(w)).forEach(fwewReverse)
  getWords().forEach(fwewReverse)

  return fwewReverseResults
}
