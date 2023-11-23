export type Affixes = {
  Prefix: string[] | null
  Infix: string[] | null
  Suffix: string[] | null
  Lenition: string[] | null
  Comment: string[] | null
}

export type Word = {
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
  Affixes: Affixes
}

export type FwewNumber = {
  navi: string
  octal: string
  decimal: string
}

export type FwewError = {
  message: string
}

export type Dialect = 'forest' | 'reef'

export type NounMode = 'normal noun' | 'verb-er'

export type AdjectiveMode =
  | 'none'
  | 'any'
  | 'normal adjective'
  | 'genitive noun'
  | 'origin noun'
  | 'participle verb'
  | 'active participle verb'
  | 'passive participle verb'

export type NameEnding = "'ite" | "'itan"

export type LanguageCode =
  | 'DE'
  | 'EN'
  | 'ET'
  | 'FR'
  | 'HU'
  | 'NL'
  | 'PL'
  | 'RU'
  | 'SV'
  | 'TR'

export type LenitionTable = {
  kx: string
  px: string
  tx: string
  k: string
  p: string
  t: string
  ts: string
  "'": string
}

export type Version = {
  APIVersion: string
  FwewVersion: string
  DictVersion: string
}
