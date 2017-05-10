"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class RDictionary {
    constructor(init = {}) {
        this._keys = [];
        this._values = [];
        for (let key in init) {
            let value = init[key];
            this[key] = value;
            this._keys.push(key);
            this._values.push(value);
        }
    }
    get length() {
        return this._keys.length;
    }
    get keys() {
        return this._keys;
    }
    get values() {
        return this._values;
    }
    add(key, value) {
        this[key] = value;
        this._keys.push(key);
        this._values.push(value);
    }
    remove(key) {
        let index = this._keys.indexOf(key, 0);
        this._keys.splice(index, 1);
        this._values.splice(index, 1);
        delete this[key];
    }
    containsOfKey(key) {
        if (typeof this[key] === "undefined") {
            return false;
        }
        return true;
    }
    containsOfValue(value) {
        if (this._values.indexOf(value) >= 0) {
            return true;
        }
        return false;
    }
    keysForValue(value) {
        let keys = [];
        let i;
        let l = this._values.length;
        for (i = 0; i < l; ++i) {
            let item = this._values[i];
            if (item === value) {
                keys.push(this._keys[i]);
            }
        }
        return keys;
    }
    toLookup() {
        return this;
    }
}
exports.RDictionary = RDictionary;
//# sourceMappingURL=dictionary.js.map