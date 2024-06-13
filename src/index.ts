import {
  fwew,
  fwew1D,
  fwew1DReverse,
  fwewReverse,
  fwewSimple,
  search
} from './fwew'
import { list } from './list'
import { nameAlu, nameFull, nameSingle } from './names'
import { naviToNumber, numberToNavi } from './numbers'
import { random } from './random'
import {
  dictLen,
  homonyms,
  multiIPA,
  oddballs,
  phonemeFrequency,
  reefMe,
  valid
} from './toybox'
import type {
  AdjectiveMode,
  Affixes,
  Dialect,
  FwewError,
  FwewNumber,
  LanguageCode,
  LenitionTable,
  NameEnding,
  NounMode,
  PhonemeFrequencyMap,
  Version,
  Word
} from './types'
import { lenition, version } from './util'

export {
  dictLen,
  fwew,
  fwew1D,
  fwew1DReverse,
  fwewReverse,
  fwewSimple,
  homonyms,
  lenition,
  list,
  multiIPA,
  nameAlu,
  nameFull,
  nameSingle,
  naviToNumber,
  numberToNavi,
  oddballs,
  phonemeFrequency,
  random,
  reefMe,
  search,
  valid,
  version
}

export type {
  AdjectiveMode,
  Affixes,
  Dialect,
  FwewError,
  FwewNumber,
  LanguageCode,
  LenitionTable,
  NameEnding,
  NounMode,
  PhonemeFrequencyMap,
  Version,
  Word
}
