import type { AdjectiveMode, Dialect, NameEnding, NounMode } from './types';
/**
 * Generate a single Na'vi first name
 * @param {string} n number of names to generate
 * @param {string} s number of syllables per name
 * @param {Dialect} dialect dialect to use
 * @returns {Promise<string>}
 */
export declare function nameSingle(n: string, s: string, dialect: Dialect): Promise<string>;
/**
 * Generate a Na'vi full name
 * @param {NameEnding} ending 'ite for female, 'itan for male
 * @param {string} n number of names to generate
 * @param {string} s1 number of syllables in first name
 * @param {string} s2 number of syllables in family name
 * @param {string} s3 number of syllables in parent's name
 * @param {Dialect} dialect dialect to use
 * @returns {Promise<string>}
 */
export declare function nameFull(ending: NameEnding, n: string, s1: string, s2: string, s3: string, dialect: string): Promise<string>;
/**
 * Generate a Na'vi name with alu
 * @param {string} n number of names to generate
 * @param {string} s number of syllables in first name
 * @param {NounMode} nm noun mode
 * @param {AdjectiveMode} am adjective mode
 * @param {Dialect} dialect dialect to use
 * @returns {Promise<string>}
 */
export declare function nameAlu(n: string, s: string, nm: NounMode, am: AdjectiveMode, dialect: Dialect): Promise<string>;
