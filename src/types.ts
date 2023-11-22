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
  message: 'string'
}

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
