export interface NumTableEntry {
    [key: string]: number;
}
/**
 * Translate a Na'vi number word to the actual integer.
 * Na'vi numbers are octal values, so the integer is defined as octal number, and can easily be displayed as decimal number.
 * If no translation is found, `NoTranslationFound` is returned as error!
 *
 * @param {string} input - Na'vi number word like mevosìng
 * @returns {number} integer represented by the given Na'vi number
 */
export declare function naviToNumber(input: string): number;
/**
 * Translate an octal-integer into the Na'vi number word.
 *
 * @param {number} input integer to translate
 * @returns {string} Na'vi number word representing the input number
 */
export declare function numberToNavi(input: number): string;
