'use strict';
import * as c from './constants.js';

let body = document.body;

const menuItems = [
    {title: "Start Game (PVP)", command: startGameDefault},
    {title: "Start Game (AI)", command: startGameAi}
];

window.addEventListener('load', ev => {
    // drawGame();
    drawMenu();
});


//=============         draw functions          =============//

//menu section
function createMenuBox() {
    return createElement("menu_box");
}

function createMenuItems() {
    let box = createElement("menu_items");

    for (let item of menuItems) {
        let elem = createElement("menu_item");
        elem.innerHTML = item.title;
        elem.addEventListener("click", (item.command));
        box.appendChild(elem)
    }

    return box
}

function createMenuOptionsBox() {
    let box = createElement("menu_options");

    box.innerHTML = "" +
        "<span>" +
        "<label for='IsRockFirst'>Is Nuts moves first?</label><br>" +
        "<input type=\"checkbox\" name='IsNutsFirst'>" +
        "</span>";

    return box
}

function drawMenu() {
    clearBody();

    let box = createMenuBox();
    body.appendChild(box);
    box.appendChild(createMenuItems());
    box.appendChild(createMenuOptionsBox());

    placeCentered(box);
}

//game section
function createStatsBar() {
    let box = createElement("game_stats_bar");

    let msg1 = createElement("text1", null, "msg1");
    let msg2 = createElement("text2", null, "msg2");

    box.append(msg1);
    box.append(msg2);

    msg1.innerText = "There's nothing yet";
    msg2.innerText = "Don't blame me, it was your idea";

    return box;
}

function createControlsBar() {
    let box = createElement("game_controls_bar");

    let restartButton = createElement("game_controls");
    let returnButton = createElement("game_controls");

    box.append(restartButton);
    box.append(returnButton);

    restartButton.innerHTML = "Restart";
    returnButton.addEventListener("click", drawMenu);

    returnButton.innerHTML = "Back To Menu";
    returnButton.addEventListener("click", drawMenu);

    return box;
}

function createGameField() {
    let box = createElement("game_field");

    for (let y = 0; y < 5; y++) {
        let row = createElement("game_row");

        for (let x = 0; x < 6; x++) {
            let cell = createElement("game_cell");
            row.append(cell);
        }

        box.append(row);
    }

    return box;
}


function drawGame() {
    clearBody();

    let statsBar = createStatsBar();
    let gameField = createGameField();
    let controlsBar = createControlsBar();

    body.appendChild(statsBar);
    body.appendChild(gameField);
    body.appendChild(controlsBar);

    placeCentered(gameField);
    placeAbove(gameField, statsBar);
    placeBelow(gameField, controlsBar);

}

//=============         game functions          =============//

function startGameDefault() {
    startGame(false, true)
}

function startGameAi() {
    startGame(true, true)
}

function startGame(isAIMode = false, IsNutsFirst = true) {
    drawGame();
}

function restartGame() {
    drawGame();
}


//=============         help functions          =============//

function createElement(className, tagName = "div", id = null) {
    let elem = document.createElement(tagName || "div");
    elem.className = className;

    if (id != null) {
        elem.id = id.toString();
    }

    return elem
}

function clearBody() {
    body.innerHTML = '';

}

function placeCentered(element) {
    // element.visibility = "hidden";
    element.style.position = "absolute";
    element.style.left = c.windows_width / 2 - element.offsetWidth / 2 + "px";
    element.style.top = c.windows_height / 2 - element.offsetHeight / 2 + "px";
    // element.visibility = "visible";
}

function placeAbove(anchorElement, targetElement) {
    placeToElement(anchorElement, targetElement, "above")
}

function placeBelow(anchorElement, targetElement) {
    placeToElement(anchorElement, targetElement, "below")
}

function placeToElement(anchorElement, targetElement, position) {
    const spaceBetween = 10.;

    let anchorTop = parseFloat(anchorElement.style.top.slice(0, -2));
    let anchorLeft = parseFloat(anchorElement.style.left.slice(0, -2));
    let anchorWidth = anchorElement.offsetWidth;
    let anchorHeight = anchorElement.offsetHeight;

    let height = targetElement.offsetHeight;
    let width = targetElement.offsetWidth;

    // console.log(height);

    targetElement.style.position = "absolute";

    // console.log((width - anchorWidth));
    // console.log((anchorLeft - (width - anchorWidth) / 2));

    switch (position) {
        case "above":
            targetElement.style.left = anchorLeft - (width - anchorWidth) / 2 + "px";
            targetElement.style.top = anchorTop - height - spaceBetween + "px";
            break;

        case "below":
            targetElement.style.left = anchorLeft - (width - anchorWidth) / 2 + "px";
            targetElement.style.top = anchorTop + anchorHeight + spaceBetween + "px";
            break;

        default:
            break;
    }

}