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

export interface IntersectionMap {
  [key: string]: boolean
}

/**
 * Check if an array contains any of the specified strings
 *
 * @param {string[]} arr1 - array being searched
 * @param {string[]} arr2 - array of strings to search for
 * @returns {boolean} true if any string in arr2 is in arr1, false otherwise
 */
export function containsArr(arr1: string[], arr2: string[]): boolean {
  if (arr2.length === 0 || arr1.length === 0) {
    return false
  }
  for (let x of arr2) {
    for (let y of arr1) {
      if (y === x) {
        return true
      }
    }
  }
  return false
}

/**
 * Delete all occurrences of str in array
 *
 * @param {string[]} arr - array from which to delete strings
 * @param {string} str - string to delete
 * @returns {string[]} new array containing original items minus all str
 */
export function deleteElement(arr: string[], str: string): string[] {
  return arr.filter(s => s !== str)
}

/**
 * Delete all occurrences of empty string, null, and undefined in array
 *
 * @param {string[]} arr - array from which to delete empty strings, nulls, and undefined
 * @returns {string[]} new array containing original items minus all instances of empty string, null, or undefined
 */
export function deleteEmpty(arr: string[] | null): string[] {
  if (arr == null) return []
  return arr.filter(s => s !== '' && s != null)
}

/**
 * Check if string is a letter
 *
 * @param {string} str - string to check
 * @returns {boolean} true if string is an alphabet letter or apostrophe
 */
export function isLetter(str: string): boolean {
  if (str == null) return false
  return ['\'', '‘'].includes(str) || str.toLowerCase() !== str.toUpperCase()
}

/**
 * Reverse a string
 *
 * @param {string} str - string to reverse
 * @returns {string} - reversed copy of str
 */
export function reverse(str: string): string {
  if (str == null) return str
  let n = str.length
  let chars: string[] = []
  for (let char of str) {
    n--
    chars[n] = char
  }
  return chars.join('')
}

/**
 * StripChars strips all the characters in chr out of str
 *
 * @param {string} str - string from which to strip characters
 * @param {string} chr - characters to be stripped out
 * @returns {string} a new copy of str without any of the characters specified in chr
 */
export function stripChars(str: string, chr: string): string {
  if (str == null || chr == null) return str
  if (str === '' || chr === '') return str
  let result: string = ''
  for (let c of str) {
    if (!chr.includes(c)) {
      result += c
    }
  }
  return result
}

/**
 * Compute the intersection between two strings
 *
 * @param {string} a - first string
 * @param {string} b - second string
 * @return {string} the sequence of characters that both strings have in common, from left to right
 */
export function intersection(a: string | undefined, b: string | undefined): string | undefined {
  if (a == null || b == null) return undefined

  // initialize the map with all the characters in a
  const intersectionMap: IntersectionMap = {}
  for (let char of a) {
    intersectionMap[char] = true
  }

  // populate the result for each character of b that is in the map of characters in a
  let result = ''
  for (let char of b) {
    if (intersectionMap[char]) {
      result += char
    }
  }

  return result
}

/**
 * test a string pattern, potentially containing globs, against a subject string. The result is a simple true/false,
 * determining whether or not the glob pattern matched the subject text.
 *
 * @param {string} pattern - glob pattern
 * @param {string} subj - subject text
 * @returns {boolean} true if the glob pattern matched the subject text, false otherwise
 */
export function glob(pattern: string, subj: string): boolean {
  const GLOB = '%'

  // Empty pattern can only match empty subject
  if (pattern === '' || pattern == null) {
    return subj === pattern
  }

  // If the pattern _is_ a glob, it matches everything
  if (pattern === GLOB) {
    return true
  }

  const parts = pattern.split(GLOB)

  if (parts.length === 1) {
    // No globs in pattern, so test for equality
    return subj === pattern
  }

  const leadingGlob = pattern.startsWith(GLOB)
  const trailingGlob = pattern.endsWith(GLOB)
  const end = parts.length - 1

  // Go over the leading parts and ensure they match.
  for (let i = 0; i < end; i++) {
    const idx = subj.indexOf(parts[i])

    switch (i) {
      case 0:
        // Check the first section. Requires special handling.
        if (!leadingGlob && idx !== 0) {
          return false
        }
      default:
        // Check that the middle parts match.
        if (idx < 0) {
          return false
        }
    }

    // Trim evaluated text from subj as we loop over the pattern.
    subj = subj.slice(idx + parts[i].length)
  }

  // Reached the last section. Requires special handling.
  return trailingGlob || subj.endsWith(parts[end])
}

/**
 * Combine two arrays together into a new array
 *
 * @param {T[]} arr1 - first array
 * @param {T[]} arr2 - second array
 * @returns {T[]} - a new array containing all items from first array, then all items from second array
 */
export function combineArrays<T>(arr1: T[], arr2: T[]): T[] | undefined {
  if (arr1 == null || arr1.length === 0) {
    return arr2 == null ? undefined : arr2
  }

  if (arr2 == null || arr2.length === 0) {
    return arr1
  }

  let result: T[] = []
  for (const t of arr1) {
    result.push(t)
  }
  for (const t of arr2) {
    result.push(t)
  }
  return result
}
