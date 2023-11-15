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
import { intersection } from './util'
import * as affixes from './affixes'
const words = require('./words.json')
let dictionary: Word[] = []

export interface Affix {
  Prefix: string[]
  Infix: string[]
  Suffix: string[]
  Lenition: string[]
}

export interface WordData {
  ID: string
  Navi: string
  IPA: string
  InfixLocations: string
  PartOfSpeech: string
  Source: string
  Stressed: string
  Syllables: string
  InfixDots: string
  DE: string
  EN: string
  ET: string
  FR: string
  HU: string
  NL: string
  PL: string
  RU: string
  SV: string
  TR: string
  Affixes: Affix
}

/**
 * Get all words
 *
 * @returns list of all words in the dictionary
 */
export function getWords(): Word[] {
  if (dictionary.length === 0) {
    dictionary = words.map((w: WordData) => new Word(w).clone())
  }
  return dictionary
}

/**
 * Represents a Word in the Fwew Dictionary
 */
export class Word {
  attempt: string = ''
  target: string = ''
  data: WordData

  constructor(data?: WordData) {
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
      TR: '',
      Affixes: { Prefix: [], Infix: [], Suffix: [], Lenition: [] }
    }
  }

  /**
   * Clone a Fwew Word with deep copy
   *
   * @return deep copy clone of this Word
   */
  clone(): Word {
    const clone = new Word(JSON.parse(JSON.stringify(this.data)))
    clone.attempt = this.attempt
    clone.target = this.target
    return clone
  }

  /**
   * Get the number of syllables of a Na'vi word
   *
   * @returns the syllable count of this word
   */
  syllableCount(): number {
    // function to compress digraphs
    const compress = (word: string): string => {
      // compression map
      const cMap: { [key: string]: string } = {
        aw: '0',
        ay: '1',
        ew: '2',
        ey: '3',
        kx: '4',
        ll: '5',
        ng: '6',
        px: '7',
        rr: '8',
        ts: '9',
        tx: 'Q'
      }
      for (const c in cMap) {
        word = word.replace(c, cMap[c])
      }
      return word
    }

    let numSyllables = 0
    const vowels = [
      'a',
      'ä',
      'e',
      'é',
      'i',
      'ì',
      'o',
      'u',
      'aw',
      'ay',
      'ew',
      'ey',
      'll',
      'rr'
    ].map((v) => compress(v))
    const word = compress(this.data.Navi.toLowerCase())

    for (let p of vowels) {
      numSyllables += word.split('').filter((x) => x === p).length
    }

    return numSyllables
  }

  /**
   * Calculate similarity score between user's word and current Na'vi word
   *
   * @param {string} other - other Na'vi word to compare to this Na'vi word
   * @return {number} the similarity score, in range [0, 1.0] (representing from 0% up to 100% similarity)
   */
  similarity(other: string): number {
    // exact match gets similarity score of 1.0 (100%) and we go no further.
    if (this.data.Navi === other) {
      return 1.0
    }

    // hardcoded fix for 'ngey'; it should be counted as a 100% match because it comes from the same word
    if (this.data.Navi === 'nga' && other === 'ngey') {
      return 1.0
    }

    // not a match if this listed root word is longer.
    // the addition of 1 makes the difference have to be slightly more significant to rule out the match
    if (this.data.Navi.length > other.length + 1) {
      return 0.0
    }

    // the set of Na'vi vowel characters. l and r are here because of ll and rr
    const vowels = 'aäeiìoulr'
    // the sequence of vowels present in this listed root word, from left to right
    const thisWordVowels = intersection(this.data.Navi, vowels)
    // the sequence of vowels present in the other word, from left to right
    const otherWordVowels = intersection(other, vowels)
    // the sequence of characters that this listed root word and the other word have in common, from left to right
    const wordIntersection = intersection(this.data.Navi, other)
    // the sequence of vowels that the other word has in common with this listed root word's vowels, from left to right
    const thisWordVowelsOther = intersection(thisWordVowels, other)

    // empty intersection yields 0 similarity score
    if (
      thisWordVowels == null ||
      otherWordVowels == null ||
      wordIntersection == null ||
      thisWordVowelsOther == null
    ) {
      return 0.0
    }

    // not a match if this listed root word has more vowels than the other word has in total
    if (thisWordVowels.length > otherWordVowels.length) {
      return 0.0
    }

    // not a match the other word has no vowels in common with this listed root word
    if (thisWordVowelsOther.length === 0) {
      return 0.0
    }

    /** the number of characters that this word and the other word have in common */
    const intersectionSize = wordIntersection.length
    /**
     * percentage of this word's total characters that are also in the other word
     *
     * is at most 1.0 (the length of this word, divided by itself)
     */
    const intersectionRatio = intersectionSize / this.data.Navi.length
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
    const lengthRatio = this.data.Navi.length / other.length
    /**
     * the final similarity score.
     *
     * In the average case, intersectionRatio and lengthRatio tend to be in range (0, 1),
     * hence the normalizing division by a constant of 2.
     */
    return (intersectionRatio + lengthRatio) / 2
  }

  /**
   * try to add prefixes to the word. Return the attempt with placed prefixes
   * Has to be provided with a previousAttempt, the word to go from and add prefixes to.
   *
   * @return {Word} a new Word after attempt at matching target, having added any applicable prefixes
   */
  prefix(): Word {
    return affixes.prefix(this)
  }

  /**
   * try to add suffixes to the word. Return the attempt with placed suffixes
   * Has to be provided with a previousAttempt, the word to go from and add suffixes to.
   *
   * @return {Word} a new Word after attempt at matching target, having added any applicable suffixes
   */
  suffix(): Word {
    return affixes.suffix(this)
  }

  /**
   * try to add infixes to the word.
   *
   * @returns {Word} a new Word after attempt at matching target, having added any applicable infixes
   */
  infix(): Word {
    return affixes.infix(this)
  }

  /**
   * Lenite the word, based on the attempt. The target is not relevant here, so not given.
   * Returns the lenite attempt.
   *
   * @return {Word} The lenited version of this word
   */
  lenite(): Word {
    return affixes.lenite(this)
  }

  /**
   * Reconstruct is the main function of affixes.go, responsible for the affixing algorithm
   * This will try to reconstruct a Word, so it matches with the target.
   * Returns true if word got reconstructed into target!
   */
  reconstruct(target: string): Word | undefined {
    return affixes.reconstruct(this, target)
  }
}
