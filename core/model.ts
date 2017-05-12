import { RObject} from './object';
import { RDictionary } from './dictionary';

export class Model extends RObject {
    static _map: RModelMap;
    static _filter: RModelFilter;
    static _required: RModelRequired;
    static _types: RModelTypes;

    init() {}

    initWithObject(object: Object) {
        let thisClass: any = this.constructor;
        object = this.pipe(thisClass._map, 'run', object);
        object = this.pipe(thisClass._filter, 'run', object);
        if(thisClass._required) {
            thisClass._required.check(object);
        }
        for(let key in object) {
            this[key] = object[key];
        }
    }

    pipe(target: Object, selector: string, argument: any): any {
        if(typeof target === 'object' &&
            typeof selector === 'string' &&
            typeof target[selector] === 'function') {

            return target[selector](argument);
        }
        return argument;
    }

}

export class RModelMap extends RObject {

    dictionary: RDictionary;

    init() {}

    initWithObject(object: Object) {
        for(let key in object) {
            let item = object[key];
            if(typeof item != 'string') {
                console.log('ModelMap argument must be {string: string} key value type');
                return;
            }
        }
        this.dictionary = new RDictionary(object);
    }

    run(origin: Object): Object {
        if(!this.dictionary) {
            return origin;
        }

        let mapped = {};
        for(let key in origin) {
            let value = origin[key];
            let mappedkeys = this.dictionary.containsOfValue(key) ? this.dictionary.keysForValue(key) : [key];
            for(let mappedKey of mappedkeys) {
                mapped[mappedKey] = value;
            }
        }
        return mapped;
    }

}

export class RModelFilter extends RObject {

    dictionary: RDictionary;

    init() {}

    initWithObject(object: Object) {
        for(let key in object) {
            let item = object[key];
            if(typeof item != 'function') {
                console.log('ModelFilter argument must be {string: function} key value type');
                return;
            }
        }
        this.dictionary = new RDictionary(object);
    }

    run(origin: Object): Object {
        if(!this.dictionary) {
            return origin;
        }

        let filtered = {};
        for(let key in origin) {
            let value = origin[key];
            filtered[key] = this.dictionary.containsOfKey(key) ? (
                filtered[key] = this.dictionary[key](value)
            ) : (
                value
            );
        }
        return filtered;
    }

}

export class RModelRequired extends RObject {

    requires: string[];

    init() {}

    initWithArray(array: string[]) {
        for(let item of array) {
            if(typeof item != 'string') {
                console.log('ModelRequired argument must be string[] array type');
                return;
            }
        }
        this.requires = array;
    }

    check(origin: any): boolean {
        if(!this.requires) {
            return true;
        }

        for(let item of this.requires) {
            if(typeof origin[item] === 'undefined') {
                console.error('Attribute required error: This model must have ' + item + ' property!');
                return false;
            }
        }

        return true;
    }

}

export class RModelTypes extends RObject {

    dictionary: RDictionary;

    init() {}

    initWithObject(object: Object) {
        for(let key in object) {
            let item = object[key];
            if(typeof item != 'string') {
                console.log('ModelTypes argument must be {string: string} key value type');
                return;
            }
        }
        this.dictionary = new RDictionary(object);
    }

    check(origin: Object): boolean {
        if(!this.dictionary) {
            return true;
        }

        let validated = true;
        for(let key in origin) {
            let value = origin[key];
            let typeOrigin = typeof value;
            let typeValid = this.dictionary[key];
            if(
                this.dictionary.containsOfKey(key) &&
                typeOrigin != typeValid
            ) {
                validated = false;
                console.error('Type error: The type of ' + key + ' is ' + typeOrigin + ' must be ' + typeValid + '!');
            }
        }

        return validated;
    }

}
