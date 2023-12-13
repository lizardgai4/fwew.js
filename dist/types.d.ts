type Affixes = {
    Prefix: string[] | null;
    Infix: string[] | null;
    Suffix: string[] | null;
    Lenition: string[] | null;
    Comment: string[] | null;
};
type Word = {
    ID: string;
    Navi: string;
    IPA: string;
    InfixLocations: string;
    PartOfSpeech: string;
    Source: string;
    Stressed: string;
    Syllables: string;
    InfixDots: string;
    DE: string;
    EN: string;
    ET: string;
    FR: string;
    HU: string;
    NL: string;
    PL: string;
    RU: string;
    SV: string;
    TR: string;
    Affixes: Affixes;
};
type FwewNumber = {
    name: string;
    octal: string;
    decimal: string;
};
type FwewError = {
    message: string;
};
type Dialect = 'interdialect' | 'forest' | 'reef';
type NounMode = 'something' | 'normal noun' | 'verb-er';
type AdjectiveMode = 'any' | 'something' | 'none' | 'normal adjective' | 'genitive noun' | 'origin noun' | 'participle verb' | 'active participle verb' | 'passive participle verb';
type NameEnding = 'random' | "'ite" | "'itan" | "'itu";
type LanguageCode = 'de' | 'en' | 'et' | 'fr' | 'hu' | 'nl' | 'pl' | 'ru' | 'sv' | 'tr';
type LenitionTable = {
    kx: string;
    px: string;
    tx: string;
    k: string;
    p: string;
    t: string;
    ts: string;
    "'": string;
};
type Version = {
    APIVersion: string;
    FwewVersion: string;
    DictVersion: string;
};
export type { AdjectiveMode, Affixes, Dialect, FwewError, FwewNumber, LanguageCode, LenitionTable, NameEnding, NounMode, Version, Word };
