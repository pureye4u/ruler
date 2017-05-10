import { RObject } from './object';
import { RDictionary } from './dictionary';
export declare class Model extends RObject {
    static _map: RModelMap;
    static _filter: RModelFilter;
    static _required: RModelRequired;
    static _types: RModelTypes;
    init(): void;
    initWithObject(object: Object): void;
    pipe(target: Object, selector: string, argument: any): any;
}
export declare class RModelMap extends RObject {
    dictionary: RDictionary;
    init(): void;
    initWithObject(object: Object): void;
    run(origin: Object): Object;
}
export declare class RModelFilter extends RObject {
    dictionary: RDictionary;
    init(): void;
    initWithObject(object: Object): void;
    run(origin: Object): Object;
}
export declare class RModelRequired extends RObject {
    requires: string[];
    init(): void;
    initWithArray(array: string[]): void;
    check(origin: any): boolean;
}
export declare class RModelTypes extends RObject {
    dictionary: RDictionary;
    init(): void;
    initWithObject(object: Object): void;
    check(origin: Object): boolean;
}
