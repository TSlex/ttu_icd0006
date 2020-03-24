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
