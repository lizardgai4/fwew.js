import { FwewError, FwewNumber } from './types';
/**
 * Convert a decimal integer in closed range [0,32767] to Na'vi
 * @param num number to convert to Na'vi;
 * @returns {Promise<FwewNumber | FwewError>}
 */
export declare function numberToNavi(num: number): Promise<FwewNumber | FwewError>;
/**
 * Convert a Na'vi number word to decimal and octal
 * @param word Na'vi number word
 * @returns {Promise<FwewNumber | FwewError>}
 */
export declare function naviToNumber(word: string): Promise<FwewNumber | FwewError>;
