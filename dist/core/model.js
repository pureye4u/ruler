"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const object_1 = require("./object");
const dictionary_1 = require("./dictionary");
class Model extends object_1.RObject {
    init() { }
    initWithObject(object) {
        let thisClass = this.constructor;
        object = this.pipe(thisClass._map, 'run', object);
        object = this.pipe(thisClass._filter, 'run', object);
        if (thisClass._required) {
            thisClass._required.check(object);
        }
        for (let key in object) {
            this[key] = object[key];
        }
    }
    pipe(target, selector, argument) {
        if (typeof target === 'object' &&
            typeof selector === 'string' &&
            typeof target[selector] === 'function') {
            return target[selector](argument);
        }
        return argument;
    }
}
exports.Model = Model;
class RModelMap extends object_1.RObject {
    init() { }
    initWithObject(object) {
        for (let key in object) {
            let item = object[key];
            if (typeof item != 'string') {
                console.log('ModelMap argument must be {string: string} key value type');
                return;
            }
        }
        this.dictionary = new dictionary_1.RDictionary(object);
    }
    run(origin) {
        if (!this.dictionary) {
            return origin;
        }
        let mapped = {};
        for (let key in origin) {
            let value = origin[key];
            let mappedkeys = this.dictionary.containsOfValue(key) ? this.dictionary.keysForValue(key) : [key];
            for (let mappedKey of mappedkeys) {
                mapped[mappedKey] = value;
            }
        }
        return mapped;
    }
}
exports.RModelMap = RModelMap;
class RModelFilter extends object_1.RObject {
    init() { }
    initWithObject(object) {
        for (let key in object) {
            let item = object[key];
            if (typeof item != 'function') {
                console.log('ModelFilter argument must be {string: function} key value type');
                return;
            }
        }
        this.dictionary = new dictionary_1.RDictionary(object);
    }
    run(origin) {
        if (!this.dictionary) {
            return origin;
        }
        let filtered = {};
        for (let key in origin) {
            let value = origin[key];
            filtered[key] = this.dictionary.containsOfKey(key) ? (filtered[key] = this.dictionary[key](value)) : (value);
        }
        return filtered;
    }
}
exports.RModelFilter = RModelFilter;
class RModelRequired extends object_1.RObject {
    init() { }
    initWithArray(array) {
        for (let item of array) {
            if (typeof item != 'string') {
                console.log('ModelRequired argument must be string[] array type');
                return;
            }
        }
        this.requires = array;
    }
    check(origin) {
        if (!this.requires) {
            return true;
        }
        for (let item of this.requires) {
            if (typeof origin[item] === 'undefined') {
                console.error('Attribute required error: This model must have ' + item + ' property!');
                return false;
            }
        }
        return true;
    }
}
exports.RModelRequired = RModelRequired;
class RModelTypes extends object_1.RObject {
    init() { }
    initWithObject(object) {
        for (let key in object) {
            let item = object[key];
            if (typeof item != 'string') {
                console.log('ModelTypes argument must be {string: string} key value type');
                return;
            }
        }
        this.dictionary = new dictionary_1.RDictionary(object);
    }
    check(origin) {
        if (!this.dictionary) {
            return true;
        }
        let validated = true;
        for (let key in origin) {
            let value = origin[key];
            let typeOrigin = typeof value;
            let typeValid = this.dictionary[key];
            if (this.dictionary.containsOfKey(key) &&
                typeOrigin != typeValid) {
                validated = false;
                console.error('Type error: The type of ' + key + ' is ' + typeOrigin + ' must be ' + typeValid + '!');
            }
        }
        return validated;
    }
}
exports.RModelTypes = RModelTypes;
//# sourceMappingURL=model.js.map