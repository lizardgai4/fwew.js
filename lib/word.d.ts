export interface Affix {
    Prefix: string[];
    Infix: string[];
    Suffix: string[];
    Lenition: string[];
}
export interface WordData {
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
    Affixes: Affix;
}
/**
 * Get all words
 *
 * @returns list of all words in the dictionary
 */
export declare function getWords(): Word[];
/**
 * Represents a Word in the Fwew Dictionary
 */
export declare class Word {
    attempt: string;
    target: string;
    data: WordData;
    constructor(data?: WordData);
    /**
     * Clone a Fwew Word with deep copy
     *
     * @return deep copy clone of this Word
     */
    clone(): Word;
    /**
     * Get the number of syllables of a Na'vi word
     *
     * @returns the syllable count of this word
     */
    syllableCount(): number;
    /**
     * Calculate similarity score between user's word and current Na'vi word
     *
     * @param {string} other - other Na'vi word to compare to this Na'vi word
     * @return {number} the similarity score, in range [0, 1.0] (representing from 0% up to 100% similarity)
     */
    similarity(other: string): number;
    /**
     * try to add prefixes to the word. Return the attempt with placed prefixes
     * Has to be provided with a previousAttempt, the word to go from and add prefixes to.
     *
     * @return {Word} a new Word after attempt at matching target, having added any applicable prefixes
     */
    prefix(): Word;
    /**
     * try to add suffixes to the word. Return the attempt with placed suffixes
     * Has to be provided with a previousAttempt, the word to go from and add suffixes to.
     *
     * @return {Word} a new Word after attempt at matching target, having added any applicable suffixes
     */
    suffix(): Word;
    /**
     * try to add infixes to the word.
     *
     * @returns {Word} a new Word after attempt at matching target, having added any applicable infixes
     */
    infix(): Word;
    /**
     * Lenite the word, based on the attempt. The target is not relevant here, so not given.
     * Returns the lenite attempt.
     *
     * @return {Word} The lenited version of this word
     */
    lenite(): Word;
    /**
     * Reconstruct is the main function of affixes.go, responsible for the affixing algorithm
     * This will try to reconstruct a Word, so it matches with the target.
     * Returns true if word got reconstructed into target!
     */
    reconstruct(target: string): Word | undefined;
}
