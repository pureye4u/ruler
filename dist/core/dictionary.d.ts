export interface IRDictionary {
    add(key: string, value: any): void;
    remove(key: string): void;
    containsOfKey(key: string): boolean;
    containsOfValue(value: any): boolean;
    keysForValue(value: any): string[];
    keys: string[];
    values: any[];
    length: number;
}
export declare class RDictionary {
    _keys: string[];
    _values: any[];
    constructor(init?: Object);
    readonly length: number;
    readonly keys: string[];
    readonly values: any[];
    add(key: string, value: any): void;
    remove(key: string): void;
    containsOfKey(key: string): boolean;
    containsOfValue(value: any): boolean;
    keysForValue(value: any): string[];
    toLookup(): IRDictionary;
}
