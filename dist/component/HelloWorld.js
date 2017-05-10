"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@angular/core");
let HelloWorld = class HelloWorld {
    constructor() {
        this.message = "Click Me ...";
    }
    onClick() {
        this.message = "Hello World!!!";
        console.log(this.message);
    }
};
HelloWorld = __decorate([
    core_1.Component({
        selector: 'hello-world',
        styles: [`
       h1 {
            color: blue;
        }
    `],
        template: `<div>
                  <h1 (click)="onClick()">{{message}}</h1>
               </div>`
    })
], HelloWorld);
exports.HelloWorld = HelloWorld;
//# sourceMappingURL=HelloWorld.js.map