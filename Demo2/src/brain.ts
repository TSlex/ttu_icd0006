'use strict';

export class Calculator {
    private items: Item[];

    constructor() {
        this.items = [];
    }

    isValidKey(key: string) {
        return key in [
            "0", "1", "2", "3", "4", "5", "6", "7", "8", "9",
            ".", "=", "+", "-", "*", "/", "%", "+/-", "C"];
    }

    handleKey(key: string) {
        if (this.isValidKey(key) || true) {
            this.items.push(new Item(key))
        }
    }

    getItems() {
        return this.items.join(" ")
    }
}

class Item {
    public value: string;

    constructor(value: string) {
        this.value = value;
    }
}

Item.prototype.toString = function () {
    return this.value
};