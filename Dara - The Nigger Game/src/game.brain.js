const GAME_HEIGHT = 5;
const GAME_WIDTH = 6;
const FLAGS_COUNT = 12;

export class GameBrain {
    constructor(isAIMode, isNutsFirst) {
        this.isAIMode = isAIMode;
        this.isNutsFirst = isNutsFirst;

        this.gamePhase = GamePhase.drop;

        this.gameField = this.initField();
        this.isNutsMove = this.isNutsFirst;

        this.nuts = [];
        this.sticks = [];

        this.nutsLeft = FLAGS_COUNT;
        this.sticksLeft = FLAGS_COUNT;

        this.gameStatus = "";
    }

    startGame(){
    }

    placeFlag(yPos, xPos){
        if (this.gamePhase !== GamePhase.drop ||
            this.gameField[yPos][xPos].value !== GameCellValue.empty)
            return -1;

        if (this.isNutsMove && this.nutsLeft > 0){
            this.gameField[yPos][xPos].value = GameCellValue.nut;
            this.nutsLeft--;
        }
        else if (!this.isNutsMove && this.sticksLeft > 0){
            this.gameField[yPos][xPos].value = GameCellValue.stick;
            this.sticksLeft--;
        }

        this.isNutsMove = !this.isNutsMove;

        if (this.nutsLeft <= 0 && this.sticksLeft <= 0){
            this.gamePhase = GamePhase.move;
        }
    }

    ai_placeFlag(){
        while (true){

        }
    }

    initField(){
        let gameField = [];

        for (let y = 0; y < GAME_HEIGHT; y++) {
            let gameRow = [];

            for (let x = 0; x < GAME_WIDTH; x++) {
                gameRow.push(new GameCell(y, x))
            }

            gameField.push(gameRow)
        }

        return gameField;
    }
}

class GameCell{
    constructor(yPos, xPos) {
        this.value = GameCellValue.empty;
        this.yPos = yPos;
        this.xPos = xPos;
    }
}

/**
 * Kind a enum
 * @see https://stackoverflow.com/questions/287903/what-is-the-preferred-syntax-for-defining-enums-in-javascript
 * @type {Readonly<{rock: number, stick: number, empty: number}>}
 */
export const GameCellValue = Object.freeze({"empty":0, "nut":1, "stick":2});
export const GamePhase = Object.freeze({"drop":0, "move":1, "over":2});