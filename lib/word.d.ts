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
    data: WordData;
    constructor(data: WordData);
    /**
     * Get the number of syllables of a Na'vi word
     *
     * @returns the syllable count of this word
     */
    syllableCount(): number;
    /**
     * Calculate similarity score between user's word and current Na'vi word
     *
     * @param {Word} word - Fwew Word with which to calculate similarity
     * @param {string} other - other Na'vi word to compare to this Na'vi word
     * @return {number} the similarity score, in range [0, 1.0] (representing from 0% up to 100% similarity)
     */
    similarity(other: string): number;
    /**
     * try to add prefixes to the word. Return the attempt with placed prefixes
     * Has to be provided with a previousAttempt, the word to go from and add prefixes to.
     *
     * @param {string} target - string to try to match
     * @param {string} previousAttempt - previous attempt at matching target
     * @return {string} a new attempt at matching target, having added any applicable prefixes
     */
    prefix(target: string, attempt: string): string;
    /**
     * try to add suffixes to the word. Return the attempt with placed suffixes
     * Has to be provided with a previousAttempt, the word to go from and add suffixes to.
     *
     * @param {Word} word - Fwew Word on which to track affixes
     * @param {string} target - string to try to match
     * @param {string} previousAttempt - previous attempt at matching target
     * @return {string} a new attempt at matching target, having added any applicable suffixes
     */
    suffix(target: string, previousAttempt: string): string;
    /**
     * try to add infixes to the word.
     *
     * @param {string} target - string to try to match
     * @returns {string} the attempt with placed infixes
     */
    infix(target: string): string;
    /**
     * Lenite the word, based on the attempt. The target is not relevant here, so not given.
     * Returns the lenite attempt.
     *
     * @param {string} attempt - current attempt at reconstructing the user's word
     * @return {string} The lenited version of this word
     */
    lenite(attempt: string): string;
    /**
     * Reconstruct is the main function of affixes.go, responsible for the affixing algorithm
     * This will try to reconstruct a Word, so it matches with the target.
     * Returns true if word got reconstructed into target!
     */
    reconstruct(target: string): boolean;
}
