import {GAME_HEIGHT, GAME_WIDTH, FLAGS_COUNT, GameCellValue, GameCellState, GamePhase} from "./constants.js"

export class GameBrain {
    constructor(isAIMode, isNutsFirst) {
        this.isAIMode = isAIMode;
        this.isNutsFirst = isNutsFirst;

        // this.gamePhase = GamePhase.drop;
        //
        // this.gameField = this.initField();
        // this.isNutsMove = this.isNutsFirst;
        //
        // this.nuts = [];
        // this.sticks = [];
        //
        // this.nutsLeft = FLAGS_COUNT;
        // this.sticksLeft = FLAGS_COUNT;
        //
        // this.gameStatus1 = "Now is the DROP PHASE";
        // this.gameStatus2 = "Player [NUTS], place your figure";
    }

    startGame(){
        this.gamePhase = GamePhase.drop;

        this.gameField = this.initField();
        this.isNutsMove = this.isNutsFirst;

        this.nuts = [];
        this.sticks = [];

        this.nutsLeft = FLAGS_COUNT;
        this.sticksLeft = FLAGS_COUNT;

        this.gameStatus1 = "Now is the DROP PHASE";
        this.gameStatus2 = "Player [NUTS], place your figure";
    }

    getGameStatus(){
        return [this.gameStatus1, this.gameStatus2]
    }

    /**
     * @see https://www.samanthaming.com/tidbits/70-3-ways-to-clone-objects/
     */
    getGameField(){
        return JSON.parse(JSON.stringify(this.gameField))
    }

    handleClick(yPos, xPos){
        if (this.gamePhase === GamePhase.over){
        }

        else if (this.gamePhase === GamePhase.drop){
            this.placeFlag(yPos, xPos)
        }

        else{

        }

        this.updateBoard();
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

        if (this.isAIMode && this.isNutsFirst !== this.isNutsMove){
            this.ai_placeFlag();
        }
    }

    ai_placeFlag(){
        console.log("AI move");
        while (true){
            let yPos = randomIndex(GAME_HEIGHT);
            let xPos = randomIndex(GAME_WIDTH);

            if (this.placeFlag(yPos, xPos) !== -1){
                break
            }
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

    updateBoard(){
    }

    checkInThree(yPos, xPos){
        let field = this.gameField;
        let checker = this.checkThreeEquals;

        if (checker(field[yPos][xPos], field[yPos][xPos + 1], field[yPos][xPos + 2])){
            return true
        }
        else if (checker(field[yPos][xPos - 1], field[yPos][xPos], field[yPos][xPos + 1])){
            return true
        }
        else if (checker(field[yPos][xPos - 2], field[yPos][xPos - 1], field[yPos][xPos])){
            return true
        }
        else if (checker(field[yPos][xPos], field[yPos + 1][xPos], field[yPos + 2][xPos])){
            return true
        }
        else if (checker(field[yPos][xPos], field[yPos - 1][xPos], field[yPos + 1][xPos])){
            return true
        }
        else if (checker(field[yPos][xPos], field[yPos - 1][xPos], field[yPos - 2][xPos])){
            return true
        }
        else {
            return false
        }
    }

    checkThreeEquals(cell1, cell2, cell3){
        return cell1 === cell2 && cell2 === cell3;
    }
}

export class GameCell{
    constructor(yPos, xPos) {
        this.value = GameCellValue.empty;
        this.state = GameCellState.available;
        this.yPos = yPos;
        this.xPos = xPos;
    }
}

//help functions

/**
 * @see https://www.w3schools.com/js/js_random.asp
 * @see https://stackoverflow.com/questions/4959975/generate-random-number-between-two-numbers-in-javascript
 */
function randomBetween(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min) //both included
}

function randomIndex(maxLength) {
    return randomBetween(0, maxLength - 1)
}