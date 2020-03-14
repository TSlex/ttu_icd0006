import {Calculator} from "./brain.js";

let calculator = document.getElementsByClassName("cal_body")[0];
let buttons = calculator.querySelectorAll(".cal_butt, .cal_butt_c2, .cal_control");
let display = calculator.querySelector(".cal_display");

let brain = new Calculator();

for (let button of buttons) {
    button.addEventListener('click', evt => {
        let key = button.dataset.value;
        brain.handleKey(key);
        display.innerText = brain.getItems();
    })
}
