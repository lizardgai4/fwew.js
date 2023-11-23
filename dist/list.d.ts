import type { Word } from './types';
/**
 * Get a list of all words or Get a list of words filtered by args
 * @param {string | undefined} args filter arguments e.g., 'word has kx' or 'word has kx and pos is vin.'
 * @returns {Promise<Word[]>}
 */
export declare function list(args?: string): Promise<Word[]>;
