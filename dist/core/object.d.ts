export declare class RObject {
    constructor(...args: any[]);
    static InitError(context: any, initializerName: string, argTypeNames?: string[]): void;
    static Types(args: any[]): string[];
    static InitializerName(args: any[]): string;
}
