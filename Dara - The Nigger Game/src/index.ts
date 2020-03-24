'use strict';
import * as c from "./game.constants";
import {GameBrain} from './game.brain';
// import {GameCell} from "./game.cell";

let body = document.body;
let brain: GameBrain;

const menuItems = [
    {title: "Start Game (PVP)", command: startGameDefault},
    {title: "Start Game (AI)", command: startGameAi},
    {title: "Load Game", command: loadGame}
];

const fieldY = ["A", "B", "C", "D", "E", "F", "G", "J"];
const fieldX = ["1", "2", "3", "4", "5", "6", "7", "8"];

window.addEventListener('load', ev => {
    // drawGame();
    drawMenu();
    // openHelpMenu()
    // startGame(false)
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
        "<input type=\"checkbox\" name='IsNutsFirst' checked>" +
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

    let help = createHelpButton();
    body.append(help);
    placeAtCorner(box, help, "right-up")
}

//game section
function createStatsBar() {
    let box = createElement("game_stats_bar");

    let msg1 = createElement("text1", undefined, "msg1");
    let msg2 = createElement("text2", undefined, "msg2");

    box.append(msg1);
    box.append(msg2);

    // msg1.innerText = "There's nothing yet";
    // msg2.innerText = "Don't blame me, it was your idea";

    let gameStatus = brain.getGameStatus();

    msg1.innerHTML = gameStatus[0];
    msg2.innerHTML = gameStatus[1];

    return box;
}

function createControlsBar() {
    let box = createElement("game_controls_bar");

    let restartButton = createElement("game_controls");
    let returnButton = createElement("game_controls");
    let saveButton = createElement("game_controls");
    let undoButton = createElement("game_controls");

    box.append(restartButton);
    box.append(returnButton);
    box.append(saveButton);
    box.append(undoButton);

    restartButton.innerHTML = "Restart";
    restartButton.addEventListener("click", restartGame);

    returnButton.innerHTML = "Back To Menu";
    returnButton.addEventListener("click", drawMenu);

    saveButton.innerHTML = "Save";
    saveButton.addEventListener("click", saveGame);

    undoButton.innerHTML = "Undo";
    undoButton.addEventListener("click", undoMove);

    return box;
}

function createGameField() {
    let box = createElement("game_field");
    let gameField = brain.getGameField();

    for (let y = 0; y < c.GAME_HEIGHT; y++) {
        let row = createElement("game_row");

        for (let x = 0; x < c.GAME_WIDTH; x++) {
            let cellImage = createElement("cell_image");

            let yLab = createElement("cell_y");
            yLab.innerText = fieldY[y];

            let xLab = createElement("cell_x");
            xLab.innerText = fieldX[x];

            let cell = createElement("game_cell");
            let _cell = gameField[y][x];

            cell.dataset.yPos = _cell.yPos;
            cell.dataset.xPos = _cell.xPos;
            cell.dataset.value = _cell.value;
            cell.dataset.state = _cell.state;

            cell.append(cellImage);
            cell.append(yLab);
            cell.append(xLab);

            switch (_cell.value) {
                case 1:
                    cell.classList.toggle("nut");
                    break;
                case 2:
                    cell.classList.toggle("stick");
                    break;
            }

            switch (_cell.state) {
                case 1:
                    cell.classList.toggle("blocked");
                    break;
                case 2:
                    cell.classList.toggle("available");
                    break;
                case 3:
                    cell.classList.toggle("selected");
                    break;
            }

            cell.addEventListener('click', ev => {
                gameClick(_cell.yPos, _cell.xPos)
            });

            row.append(cell);
        }

        box.append(row);
    }

    return box;
}

function drawGame() {
    if (!brain) {
        console.error("GameBrain is not initialised!");
        return;
    }

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

    let help = createHelpButton();
    body.append(help);
    placeAtCorner(statsBar, help, "right-up")
}

//help section
function createHelpButton() {
    let btn = createElement("help_button");
    btn.innerText = "?";
    btn.addEventListener('click', () => {openHelpMenu()});

    return btn;
}

function createHelpMenu() {
    let menu = createElement("help_menu");

    let text = createElement("help_text");
    text.innerHTML = "" +
        "<h2>Game play and rules:</h2>" +
        "<hr>" +
        "<ol>" +
        "<li>Players decide among themselves who starts first</li>" +
        "<li>The board is empty in the beginning. Players take turn placing their figures onto the empty cells of the board</li>" +
        "<li>This is known as <b>Drop phase</b></li>" +
        "<li>After all 24 stones have been dropped, <b>Move Phase</b> begins!." +
        "Players will then take turns moving their pieces orthogonally into an adjacent empty cell</li>" +
        "<li>Players attempt to make a three-in-a-row with their own pieces. Four or more pieces formed in-a-row not count.</li>" +
        "<li>If a three-in-a-row is made by a player, he or she can remove one enemy piece from the board <b>which is not part of a three-in-a-row itself</b>.</li>" +
        "<li>Player loses when he or she has less than 3 figures on board</li>" +
        "</ol>" +
        "<p>It is not allowed to make a three or more in-a-row during the <b>Drop phase</b></p>" +
        "<p>The three-in-a-row must be orthogonal and not diagonal</p>" +
        "<p>At once only one enemy piece can be removed.</p>";


        let controls = createElement("help_controls");

    let btn = createElement("game_controls");
    btn.innerText = "Close";

    btn.addEventListener('click', () => removeElement(menu));

    menu.append(text);
    menu.append(controls);
    controls.append(btn);

    return menu;
}

function openHelpMenu() {
    if (document.querySelector("[class='help_menu']")){
        return
    }

    let menu = createHelpMenu();
    body.append(menu);

    placeCentered(menu)
}

//game loading
function loadGame() {
    loadFile()
}

function _loadGame(fileContent: string) {
    // console.log(fileContent);

    try{
        brain = JSON.parse(fileContent) as GameBrain;
        brain = new GameBrain(false, false, brain);
        drawGame();
    }
    catch (e) {
        console.log("Cannot load game file")
    }
}

function loadFile() {
    let input = document.createElement('input');
    let fileContent: string | ArrayBuffer | null;

    input.type = 'file';

    input.onchange = e => {
        // getting a hold of the file reference
        let file = (e.target! as any).files[0];

        // setting up the reader
        let reader = new FileReader();
        reader.readAsText(file,'UTF-8');

        // here we tell the reader what to do when it's done reading...
        reader.onload = readerEvent => {
            fileContent = readerEvent.target!.result; // this is the content!
            // console.log( fileContent );
            if (fileContent){
                _loadGame(fileContent.toString())
            }
        }
    };

    input.click();
}

function saveGame(){
    let file = new Blob([JSON.stringify(brain)]);
    let filename = Date.now().toString();

    if (window.navigator.msSaveOrOpenBlob) // IE10+
        window.navigator.msSaveOrOpenBlob(file, filename);
    else { // Others
        var a = document.createElement("a"),
            url = URL.createObjectURL(file);
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        setTimeout(function() {
            document.body.removeChild(a);
            window.URL.revokeObjectURL(url);
        }, 0);
    }
}

function undoMove() {
    let lastMove = brain.getLastMove();
    if (lastMove){
        // console.log(lastMove);
        brain = JSON.parse(lastMove) as GameBrain;
        brain = new GameBrain(false, false, brain);

        drawGame();
    }
}

//=============         game functions          =============//

function startGameDefault() {
    startGame(false)
}

function startGameAi() {
    startGame(true)
}

function startGame(isAIMode = false) {

    let checkbox: HTMLInputElement | null = document.querySelector('[name="IsNutsFirst"]');
    let IsNutsFirst: boolean = !!checkbox?.checked;

    brain = new GameBrain(isAIMode, IsNutsFirst);
    brain.startGame();

    drawGame();
}

function restartGame() {
    brain.startGame();

    drawGame();
}

function gameClick(yPos: number, xPos: number) {
    brain.handleClick(yPos, xPos);
    drawGame();
}


//=============         help functions          =============//

function createElement(className: string, tagName?: string, id?: string) {
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

function removeElement(element: HTMLElement) {
    element!.parentElement?.removeChild(element)
}

function placeCentered(element: HTMLElement) {
    // element.visibility = "hidden";
    element.style.position = "absolute";
    element.style.left = c.windows_width() / 2 - element.offsetWidth / 2 + "px";
    element.style.top = c.windows_height() / 2 - element.offsetHeight / 2 + "px";
    // element.visibility = "visible";
}

function placeAbove(anchorElement: HTMLElement, targetElement: HTMLElement) {
    placeToElement(anchorElement, targetElement, "above")
}

function placeBelow(anchorElement: HTMLElement, targetElement: HTMLElement) {
    placeToElement(anchorElement, targetElement, "below")
}

function placeAtCorner(anchorElement: HTMLElement, targetElement: HTMLElement, corner: "right-up") {
    placeToElement(anchorElement, targetElement, corner)

}

function placeToElement(anchorElement: HTMLElement, targetElement: HTMLElement, position: string) {
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

        case "right-up":
            targetElement.style.left = anchorLeft + anchorWidth + "px";
            targetElement.style.top = anchorTop - height + "px";
            break;

        default:
            break;
    }

}