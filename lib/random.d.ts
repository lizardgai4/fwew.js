import type { Word } from './types';
/**
 * Get given number of random words
 * @param {number} n number of random words to get
 * @param {string | undefined} args arguments to filter by (e.g., "word has tx")
 * @returns {Promise<Word[]>}
 */
export declare function random(n: number, args?: string): Promise<Word[]>;
