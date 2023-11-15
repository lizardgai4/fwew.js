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

export interface TextMap {
  [key: string]: string
}

let texts: TextMap = {
  // <what> strings
  w_pos: 'pos',
  w_word: 'word',
  w_words: 'words',
  w_syllables: 'syllables',
  w_stress: 'stress',
  // <cond> strings
  c_is: 'is',
  c_has: 'has',
  c_like: 'like',
  c_starts: 'starts',
  c_ends: 'ends',
  'c_not-is': 'not-is',
  'c_not-has': 'not-has',
  'c_not-like': 'not-like',
  'c_not-starts': 'not-starts',
  'c_not-ends': 'not-ends',
  c_first: 'first',
  c_last: 'last'
}

// Text function is the accessor for texts string[]
export function text(s: string): string {
  return texts[s]
}
