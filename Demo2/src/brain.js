'use strict';

export class Calculator {

    constructor() {
        this.items = [];
    }

    isValidKey(key) {
        return key in [
            "0", "1", "2", "3", "4", "5", "6", "7", "8", "9",
            ".", "=", "+", "-", "*", "/", "%", "+/-", "C"];
    }

    handleKey(key) {
        if (this.isValidKey(key) || true) {
            this.items.push(new Item(key))
        }

        return this.getItems()
    }

    getItems(){
        return this.items.join(" ")
    }
}

class Item {
    constructor(value) {
        this.value = value;
    }
}

Item.prototype.toString = function () {
    return this.value
};