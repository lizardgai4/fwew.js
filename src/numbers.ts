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

const naviVocab: string[][] = [
  // 0 1 2 3 4 5 6 7 actual
  ['kew', "'aw", 'mune', 'pxey', 'tsìng', 'mrr', 'pukap', 'kinä'],
  // 0 1 2 3 4 5 6 7 last digit
  ['', 'aw', 'mun', 'pey', 'sìng', 'mrr', 'fu', 'hin'],
  // 0 1 2 3 4 5 6 7 first or middle digit
  ['', '', 'me', 'pxe', 'tsì', 'mrr', 'pu', 'ki'],
  // 0 1 2 3 4 powers of 8
  ['', 'vo', 'za', 'vozam', 'zazam'],
  // 0 1 2 3 4 powers of 8 last digit
  ['', 'l', '', '', '']
]

export interface NumTableEntry {
  [key: string]: number
}

// "word number portion": octal value
// the upper array is the digit.
const numTable: NumTableEntry[] = [
  {
    kizazam: 0o70000,
    kizaza: 0o70000,
    puzazam: 0o60000,
    puzaza: 0o60000,
    mrrzazam: 0o50000,
    mrrzaza: 0o50000,
    rrzazam: 0o50000,
    rrzaza: 0o50000,
    tsìzazam: 0o40000,
    tsìzaza: 0o40000,
    pxezazam: 0o30000,
    pxezaza: 0o30000,
    mezazam: 0o20000,
    mezaza: 0o20000,
    ezazam: 0o20000,
    ezaza: 0o20000,
    zazam: 0o10000,
    zaza: 0o10000
  },
  {
    kivozam: 0o7000,
    kivoza: 0o7000,
    puvozam: 0o6000,
    puvoza: 0o6000,
    mrrvozam: 0o5000,
    mrrvoza: 0o5000,
    rrvozam: 0o5000,
    rrvoza: 0o5000,
    tsìvozam: 0o4000,
    tsìvoza: 0o4000,
    pxevozam: 0o3000,
    pxevoza: 0o3000,
    mevozam: 0o2000,
    mevoza: 0o2000,
    evozam: 0o2000,
    evoza: 0o2000,
    vozam: 0o1000,
    voza: 0o1000
  },
  {
    kizam: 0o700,
    kiza: 0o700,
    puzam: 0o600,
    puza: 0o600,
    mrrzam: 0o500,
    mrrza: 0o500,
    rrzam: 0o500,
    rrza: 0o500,
    tsìzam: 0o400,
    tsìza: 0o400,
    pxezam: 0o300,
    pxeza: 0o300,
    mezam: 0o200,
    meza: 0o200,
    ezam: 0o200,
    eza: 0o200,
    zam: 0o100,
    za: 0o100
  },
  {
    kivol: 0o70,
    kivo: 0o70,
    puvol: 0o60,
    puvo: 0o60,
    mrrvol: 0o50,
    mrrvo: 0o50,
    rrvol: 0o50,
    rrvo: 0o50,
    tsìvol: 0o40,
    tsìvo: 0o40,
    pxevol: 0o30,
    pxevo: 0o30,
    mevol: 0o20,
    mevo: 0o20,
    evol: 0o20,
    evo: 0o20,
    vol: 0o10,
    vo: 0o10
  },
  {
    hin: 0o7,
    fu: 0o6,
    mrr: 0o5,
    rr: 0o5,
    sìng: 0o4,
    pey: 0o3,
    mun: 0o2,
    un: 0o2,
    aw: 0o1
  }
]

// The regex values for the different values.
// The upper array is the digit.
const numTableRegexp: string[][] = [
  [
    'kizazam?',
    'puzazam?',
    'm?rrzazam?',
    'tsìzazam?',
    'pxezazam?',
    'm?ezazam?',
    'zazam?'
  ],
  [
    'kivozam?',
    'puvozam?',
    'm?rrvozam?',
    'tsìvozam?',
    'pxevozam?',
    'm?evozam?',
    'vozam?'
  ],
  ['kizam?', 'puzam?', 'm?rrzam?', 'tsìzam?', 'pxezam?', 'm?ezam?', 'zam?'],
  ['kivol?', 'puvol?', 'm?rrvol?', 'tsìvol?', 'pxevol?', 'm?evol?', 'vol?'],
  ['hin', 'fu', 'mrr', 'rr', 'sìng', 'pey', 'mun', 'un', 'aw']
]

/**
 * Translate a Na'vi number word to the actual integer.
 * Na'vi numbers are octal values, so the integer is defined as octal number, and can easily be displayed as decimal number.
 * If no translation is found, `NoTranslationFound` is returned as error!
 *
 * @param {string} input - Na'vi number word like mevosìng
 * @returns {number} integer represented by the given Na'vi number
 */
export function naviToNumber(input: string): number {
  input = input.toLowerCase()
  // kew
  if (input === 'kew') {
    return 0
  }

  // 'aw mune pxey tsìng mrr pukap kinä
  // literal numbers 1-7
  for (let [i, w] of Object.entries(naviVocab[0])) {
    if (input === w && w !== '') {
      return Number(i)
    }
  }

  // build regexp for all other numbers
  // regex for big values
  let regexpString: string = ''
  for (let digit of numTableRegexp) {
    regexpString += '('
    let first = true

    for (let number of digit) {
      if (!first) {
        regexpString += '|'
      }
      regexpString += number
      first = false
    }
    regexpString += ')?'
  }

  const re = new RegExp(regexpString)
  let tmp = input.match(re)
  let n: number = 0

  if (tmp && tmp.length > 0 && tmp[0].length > 0) {
    for (let [i, v] of Object.entries(tmp.slice(1))) {
      const value = numTable[Number(i)][v]
      if (value) {
        n += value
      }
    }
  } else {
    return 0
  }

  return n
}

/**
 * Translate an octal-integer into the Na'vi number word.
 *
 * @param {number} input integer to translate
 * @returns {string} Na'vi number word representing the input number
 */
export function numberToNavi(input: number): string {
  // check if inside max-min
  if (input < 0) {
    return ''
  } else if (input > 0o77777) {
    return ''
  }

  // only one digit
  if (input <= 0o7) {
    return naviVocab[0][input]
  }

  // rest calculate digit by digit
  var output: string = ''
  var previousDigit: number = 0
  var firstDigit: number = 0

  // maximal 5 possible digits
  for (let i = 0; i < 5; i++) {
    if (i === 0) {
      // last digit is written differently
      let n = input % 0o10
      output = naviVocab[1][n] + output
      previousDigit = n
      firstDigit = n
    } else {
      input = input >> 3
      let n = input % 0o10

      // only run, when not 0, 0 is just kept out
      if (n !== 0) {
        let future = naviVocab[2][n] + naviVocab[3][i]

        // override to add `l` to vo, if at second digit and last digit is 0|1
        if (
          i === 1 &&
          n !== 0 &&
          (previousDigit === 0 || previousDigit === 1)
        ) {
          future = future + 'l'
        }

        // override to add `m` to za
        // only run if at third digit and second digit is not 0|1, also run when digits are x00|x01
        if (
          i === 2 &&
          n !== 0 &&
          ((previousDigit !== 0 && previousDigit !== 1) ||
            (previousDigit === 0 && (firstDigit === 0 || firstDigit === 1)))
        ) {
          future = future + 'm'
        }

        output = future + output
      }
      previousDigit = n
    }
  }

  output = output.replace(/mm/g, 'm')

  return output
}
