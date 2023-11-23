import type { Word } from './types';
/**
 * Get given number of random words, optionally filtered by args
 * @param {number} n number of random words to get
 * @param {string | undefined} args filter arguments e.g., 'word has kx' or 'word has kx and pos is vin.'
 * @returns {Promise<Word[]>}
 */
export declare function random(n: number, args?: string): Promise<Word[]>;
