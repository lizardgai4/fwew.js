import type { Word } from './types';
/**
 * Get a list of all words or Get a list of words filtered by args
 * @param {string | undefined} args
 * @returns {Word[]}
 */
export declare function list(args?: string): Promise<Word[]>;
