
//
// console.log(Object.getOwnPropertyDescriptor(Math, "PI"));
//
// Object.defineProperty(Math, "PI3", {value: 3});
//
// console.log(Object.getOwnPropertyDescriptor(Math, "PI3"));

// let x = {
// };
//
// x.__proto__.toString = () => {return "LOL"};
//
// console.log(x);

// Date.prototype.toRussian = function(){
//     return new Date(this.setHours(this.getHours() + 1)).toTimeString()
// };
//
// let date = new Date();
//
// console.log(date.toRussian());

// class myCustom{
//     constructor() {
//         this.[[prototype]].toString =  () => {return "LOL"};
//     }
// }
//
// let custom = new myCustom();
//
// console.log(custom);

// class Person {
//     constructor(firstName, lastName) {
//         this.firstName = firstName;
//         this.lastName = lastName;
//     }
//
//     getFullName(){
//         return this.firstName + " " + this.lastName;
//     }
// }
//
// let x = new Person("Aleksandr", "Ivanov");
// console.log(x.getFullName());

import {sayHi} from './sayHi'

sayHi();