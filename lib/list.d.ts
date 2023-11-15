import { Word } from './word';
/**
 * Filter the dictionary based on the args.
 * args can be empty, if so, the whole Dict will be returned (This also happens if < 3 args are given)
 * It will try to always get 3 args and an `and` in between. If less than 3 exist, than it will wil return the previous results.
 *
 * @param {string[]} args - arguments specifying what properties all the words in the list should have
 * @returns {Word[]} list of Word
 */
export declare function list(args: string[]): Word[];
