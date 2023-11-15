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

// Get random words out of the dictionary.
// If args are applied, the dict will be filtered for args before random words are chosen.
// args will be put into the `List()` algorithm.
import { Word } from './word'
import { list } from './list'

/**
 * Get random integer in range [0, n)
 *
 * @param {number} n - max random number
 * @returns random integer between 0 and n
 */
function randomInt(n: number): number {
  return Math.floor(Math.random() * n)
}

/**
 * Create pseudo-random permutation of the integers from 0 to n
 *
 * @param {number} n - number of elements to create a permutation of
 * @returns an array of numbers in range [0, n)
 */
function permutation(n: number): number[] {
  const m: number[] = []
  for (let i = 0; i < n; i++) {
    const j = randomInt(i + 1)
    m[i] = m[j]
    m[j] = i
  }
  return m
}

/**
 * Get list of Random Na'vi words
 *
 * @param {number} amount of Na'vi words to get
 * @param {string[]} args the arguments specifying which properties all the words should have
 * @returns list of size amount of Na'vi words having properties specified by args
 */
export function random(amount: number, args: string[]): Word[] {
  const results: Word[] = []
  const allWords = list(args)
  const dictLength = allWords.length

  // return empty array if the dictionary didn't load
  if (dictLength === 0) {
    return results
  }

  // create random number
  if (amount <= 0) {
    amount = randomInt(dictLength)
  }

  // return all words in the case requested amount is greater than the number of words
  if (amount > dictLength) {
    return allWords
  }

  // get random numbers for allWords array
  const perm = permutation(dictLength)

  for (let i of perm.slice(0, amount)) {
    results.push(allWords[i])
  }

  return results
}
