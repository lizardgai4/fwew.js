import { FwewError, FwewNumber } from './types';
/**
 * Convert a decimal integer in closed range [0,32767] to Na'vi
 * @param num number to convert to Na'vi;
 * @param {RequestInit | undefined} init fetch options (optional)
 * @returns {Promise<FwewNumber | FwewError>}
 */
export declare function numberToNavi(num: number, init?: RequestInit): Promise<FwewNumber | FwewError>;
/**
 * Convert a Na'vi number word to decimal and octal
 * @param word Na'vi number word
 * @param {RequestInit | undefined} init fetch options (optional)
 * @returns {Promise<FwewNumber | FwewError>}
 */
export declare function naviToNumber(word: string, init?: RequestInit): Promise<FwewNumber | FwewError>;
