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
import { text } from './txt'
import { glob } from './util'

/**
 * Filter the dictionary based on the args.
 * args can be empty, if so, the whole Dict will be returned (This also happens if < 3 args are given)
 * It will try to always get 3 args and an `and` in between. If less than 3 exist, than it will wil return the previous results.
 *
 * @param {string[]} args - arguments specifying what properties all the words in the list should have
 * @returns {Word[]} list of Word
 */
export function list(args: string[]): Word[] {
  let results: Word[] = getWords()

  while (args.length >= 3) {
    // get 3 args and remove 4th
    let simpleArgs = args.slice(0, 3)

    results = listWords(simpleArgs, results)

    // remove first 4 elements
    if (args.length > 4) {
      args = args.slice(4)
    } else {
      break
    }
  }

  return results
}

function listWords(args: string[], words: Word[]): Word[] {
  const results: Word[] = []

  const what = args[0].toLowerCase()
  const cond = args[1].toLowerCase()
  const spec = args[2].toLowerCase()

  // /list what cond spec

  const wordsLen = words.length

  for (const [i, word] of Object.entries(words)) {
    let ispec: number
    switch (what) {
      case text("w_pos"):
        const pos = word.data.PartOfSpeech.toLowerCase()
        switch (cond) {
          case text("c_starts"):
            if (pos.startsWith(spec)) {
              results.push(word)
            }
            break
          case text("c_ends"):
            if (pos.endsWith(spec)) {
              results.push(word)
            }
            break
          case text("c_is"):
            if (pos === spec) {
              results.push(word)
            }
            break
          case text("c_has"):
            if (pos.includes(spec)) {
              results.push(word)
            }
            break
          case text("c_like"):
            if (glob(spec, pos)) {
              results.push(word)
            }
            break
          case text("c_not-starts"):
            if (!pos.startsWith(spec)) {
              results.push(word)
            }
            break
          case text("c_not-ends"):
            if (!pos.endsWith(spec)) {
              results.push(word)
            }
            break
          case text("c_not-is"):
            if (pos !== spec) {
              results.push(word)
            }
            break
          case text("c_not-has"):
            if (!pos.includes(spec)) {
              results.push(word)
            }
            break
          case text("c_not-like"):
            if (!glob(spec, pos)) {
              results.push(word)
            }
        }
        break
      case text("w_word"):
        const navi = word.data.Navi.toLowerCase()
        switch (cond) {
          case text("c_starts"):
            if (navi.startsWith(spec)) {
              results.push(word)
            }
            break
          case text("c_ends"):
            if (navi.endsWith(spec)) {
              results.push(word)
            }
            break
          case text("c_has"):
            if (navi.includes(spec)) {
              results.push(word)
            }
            break
          case text("c_like"):
            if (glob(spec, navi)) {
              results.push(word)
            }
            break
          case text("c_not-starts"):
            if (!navi.startsWith(spec)) {
              results.push(word)
            }
            break
          case text("c_not-ends"):
            if (!navi.endsWith(spec)) {
              results.push(word)
            }
            break
          case text("c_not-has"):
            if (!navi.includes(spec)) {
              results.push(word)
            }
            break
          case text("c_not-like"):
            if (!glob(spec, navi)) {
              results.push(word)
            }
        }
        break
      case text("w_words"):
        const specNumber = +spec
        if (isNaN(specNumber)) {
          return words
        }
        switch (cond) {
          case text("c_first"):
            if (Number(i) < specNumber) {
              results.push(word)
            }
            break
          case text("c_last"):
            if (Number(i) >= wordsLen - specNumber && Number(i) <= wordsLen) {
              results.push(word)
            }
        }
        break
      case text("w_syllables"):
        ispec = +spec
        if (isNaN(ispec)) {
          return words
        }
        switch (cond) {
          case "<":
            if (word.syllableCount() < ispec) {
              results.push(word)
            }
            break
          case "<=":
            if (word.syllableCount() <= ispec) {
              results.push(word)
            }
            break
          case "=":
            if (word.syllableCount() === ispec) {
              results.push(word)
            }
            break
          case ">=":
            if (word.syllableCount() >= ispec) {
              results.push(word)
            }
            break
          case ">":
            if (word.syllableCount() > ispec) {
              results.push(word)
            }
            break
          case "!=":
            if (word.syllableCount() != ispec) {
              results.push(word)
            }
        }
        break
      case text("w_stress"):
        ispec = +spec
        if (isNaN(ispec)) {
          return words
        }
        const istress = +word.data.Stressed
        switch (cond) {
          case "<":
            if (istress < ispec) {
              results.push(word)
            }
            break
          case "<=":
            if (istress <= ispec) {
              results.push(word)
            }
            break
          case "=":
            if (ispec < 0) {
              if (word.syllableCount() + ispec + 1 === istress) {
                results.push(word)
              }
            } else if (istress === ispec) {
              results.push(word)
            }
            break
          case ">=":
            if (istress >= ispec) {
              results.push(word)
            }
            break
          case ">":
            if (istress > ispec) {
              results.push(word)
            }
            break
          case "!=":
            if (ispec < 0) {
              if (word.syllableCount() + ispec + 1 !== istress) {
                results.push(word)
              }
            } else if (istress !== ispec) {
              results.push(word)
            }
        }
    }
  }

  return results
}
