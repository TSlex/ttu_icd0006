import {GameCellState, GameCellValue} from "./game.constants";

export class GameCell {

    public value: GameCellValue;
    public state: GameCellState;
    public yPos: number;
    public xPos: number;

    constructor(yPos: number, xPos: number) {
        this.value = GameCellValue.empty;
        this.state = GameCellState.empty;
        this.yPos = yPos;
        this.xPos = xPos;
    }
}

const fieldY = ["A", "B", "C", "D", "E", "F", "G", "J"];
const fieldX = ["1", "2", "3", "4", "5", "6", "7", "8"];

GameCell.prototype.toString = function () {
    return `(y:${fieldY[this.yPos]}; x ${fieldX[this.xPos]})`
};
