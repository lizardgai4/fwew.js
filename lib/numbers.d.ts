import { FwewError, FwewNumber } from './types';
export declare function numberToNavi(num: number): Promise<FwewNumber | FwewError>;
export declare function naviToNumber(word: string): Promise<FwewNumber | FwewError>;
