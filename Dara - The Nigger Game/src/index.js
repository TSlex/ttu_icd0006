'use strict';
import * as c from './constants.js';

//variables
let body = document.body;

const menuItems = [
    {title: "Start Game (PVP)"},
    {title: "Start Game (AI)"}
];

//start section
drawMenu();

//menu section

function createMenuBox() {
    let box = document.createElement("div");
    box.className = "menu_box";
    return box
}

function createMenuItems() {
    let box = document.createElement("div");
    box.className = "menu_items";

    for (let item of menuItems) {
        let elem = document.createElement("div");
        elem.className = "menu_item";
        elem.innerHTML = item.title;
        box.appendChild(elem)
    }

    return box
}

function createMenuOptionsBox() {
    let box = document.createElement("div");
    box.className = "menu_options";

    box.innerHTML = "" +
        "<span>" +
        "<label for='IsRockFirst'>Is Rock moves first?</label><br>" +
        "<input type=\"checkbox\" name='IsRockFirst'>" +
        "</span>";

    return box
}

function drawMenu() {
    body.innerHTML = '';

    let box = createMenuBox();
    body.appendChild(box);
    box.appendChild(createMenuItems());
    box.appendChild(createMenuOptionsBox());

    setCentered(box);
}

//game section
function drawGame() {

}

function startGame(isAIMode, IsRockFirst) {

}

function setCentered(element) {
    element.style.position = "absolute";
    element.style.left = c.windows_width / 2 - element.offsetWidth / 2 + "px";
    element.style.top = c.windows_height / 2 - element.offsetHeight / 2 + "px";
}