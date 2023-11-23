import { LenitionTable, Version } from './types';
/**
 * Get the Na'vi lenition table
 * @returns {Promise<LenitionTable>}
 */
export declare function lenition(): Promise<LenitionTable>;
/**
 * Get the version of fwew-api, fwew-lib, and the dictionary
 * @returns {Promise<Version>}
 */
export declare function version(): Promise<Version>;
