import { Word } from './word';
/**
 * Get list of Random Na'vi words
 *
 * @param {number} amount of Na'vi words to get
 * @param {string[]} args the arguments specifying which properties all the words should have
 * @returns list of size amount of Na'vi words having properties specified by args
 */
export declare function random(amount: number, args: string[]): Word[];
