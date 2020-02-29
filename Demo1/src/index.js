// 'use strict';

// window.addEventListener("load", ev => {
//     document.body.style.background = "red"
// });

// document.body.style.background = "red";
// window.document.body.style.background = "red";

// function test() {
//     document.body.style.background = "red";
// }

window.addEventListener("load",
    (
        function () {
            document.body.style.background = "red";
        }
    )()
);