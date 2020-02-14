'use strict';
//
// let x = {};
//
// console.log(x);
// console.log(JSON.stringify(x));
//
// x.name = "сася :з";
// x['firstName'] = "Aleksandr";
// x['lastName'] = "Ivanov";
//
// for (let key in x){
//     console.log(`${key}: ${x[key]}`)
// }
//
// let codes = {
//     372: "estonia",
//     7: "russia",
//     8: "russia",
//     x: "pipos"
// };
//
// console.log(Object.keys(codes));

//===============================

// let objA = {
//     name: 'Alex',
//     printName: function () {
//         console.log(this.name)
//     },
//     printName2: () => {
//         console.log(this.name)
//     },
// };
//
// objA.printName();
// objA.printName2();

//===============================

let arr = [1, 2, 3, 4, 5, 6];
let [a, , b] = arr;
let [one, ...others] = arr;

console.log(a);
console.log(b);
console.log(one);
console.log(others);

