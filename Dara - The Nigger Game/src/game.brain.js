import {GAME_HEIGHT, GAME_WIDTH, FLAGS_COUNT, GameCellValue, GameCellState, GamePhase} from "./constants.js"

export class GameBrain {
    constructor(isAIMode, isNutsFirst) {
        this.isAIMode = isAIMode;
        this.isNutsFirst = isNutsFirst;

    }

    startGame() {
        this.gamePhase = GamePhase.drop;

        this.gameField = this.initField();
        this.isNutsMove = this.isNutsFirst;

        this.selectedCell = null;

        this.nuts = [];
        this.sticks = [];

        this.nutsLeft = FLAGS_COUNT;
        this.sticksLeft = FLAGS_COUNT;

        this.setAllCellState(GameCellState.available);

        this.gameStatus1 = "Now is the DROP PHASE";
        this.gameStatus2 = `Player ${this.isNutsMove ? "NUTS" : "STICKS"}, place your figure`;
    }

    getGameStatus() {
        return [this.gameStatus1, this.gameStatus2]
    }

    /**
     * @see https://www.samanthaming.com/tidbits/70-3-ways-to-clone-objects/
     */
    getGameField() {
        return JSON.parse(JSON.stringify(this.gameField))
    }

    handleClick(yPos, xPos) {
        if (this.gamePhase === GamePhase.over) {
        } else if (this.gamePhase === GamePhase.drop) {
            this.placeFlag(yPos, xPos);
        } else {
            if (this.selectedCell === null && this.gameField[yPos][xPos].value !== GameCellValue.empty){
                this.selectCell(yPos, xPos)
            }
            else if (this.selectedCell === this.gameField[yPos][xPos]){
                this.unselectCell(yPos, xPos)
            }
            else{
                // this.moveCell(yPos, xPos)
            }
        }

        this.updateStatus();
    }

    removeCell(yPos, xPos){
        this.gameField[yPos][xPos].value = GameCellValue.empty;
    }

    moveCell(yPos, xPos){
        this.selectedCell = null
    }

    selectCell(yPos, xPos){
        let cell = this.gameField[yPos][xPos];
        cell.state = GameCellState.selected;

        this.selectedCell = cell;
    }

    unselectCell(){
        this.selectedCell.state = GameCellState.none;
        this.selectedCell = null;
    }

    placeFlag(yPos, xPos) {
        if (this.gamePhase !== GamePhase.drop ||
            this.gameField[yPos][xPos].value !== GameCellValue.empty ||
            this.gameField[yPos][xPos].state !== GameCellState.available)
            return -1;

        if (this.isNutsMove && this.nutsLeft > 0) {
            this.gameField[yPos][xPos].value = GameCellValue.nut;
            this.nutsLeft--;
        } else if (!this.isNutsMove && this.sticksLeft > 0) {
            this.gameField[yPos][xPos].value = GameCellValue.stick;
            this.sticksLeft--;
        }

        this.checkDropMove();

        this.isNutsMove = !this.isNutsMove;

        if (this.nutsLeft <= 0 && this.sticksLeft <= 0) {
            this.gamePhase = GamePhase.move;
            // this.setAllCellState(GameCellState.none);
            this.checkMoveMode()
        }

        // if (this.isAIMode && this.isNutsFirst !== this.isNutsMove) {
        //     this.ai_placeFlag();
        // }

        if (this.gamePhase === GamePhase.drop){
            this.ai_placeFlag();
        }

    }

    ai_placeFlag() {
        console.log("AI move");
        while (true) {
            let yPos = randomIndex(GAME_HEIGHT);
            let xPos = randomIndex(GAME_WIDTH);

            if (this.placeFlag(yPos, xPos) !== -1) {
                break
            }
        }
    }

    initField() {
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

    setAllCellState(state){
        for (let y = 0; y < GAME_HEIGHT; y++) {
            for (let x = 0; x < GAME_WIDTH; x++) {
                this.gameField[y][x].state = state
            }
        }
    }

    updateStatus() {
        if (this.gamePhase === GamePhase.over) {
            this.gameStatus1 = "Game Over";
            this.gameStatus2 = "[] wins";
        } else if (this.gamePhase === GamePhase.drop) {
            this.gameStatus1 = "Now is the DROP PHASE";
            this.gameStatus2 = `Player ${this.isNutsMove ? "NUTS" : "STICKS"}, place your figure`;
        } else {
            this.gameStatus1 = "Now is the MOVE PHASE";
            this.gameStatus2 = ``;
        }
    }

    checkMoveMode(){
        let acceptedValue = this.isNutsMove ? GameCellValue.stick : GameCellValue.nut;

        for (let y = 0; y < GAME_HEIGHT; y++) {
            for (let x = 0; x < GAME_WIDTH; x++) {
                if (this.selectedCell === null && this.gameField[y][x].value === acceptedValue){
                    this.gameField[y][x].state = GameCellState.available;
                }
                else{
                    this.gameField[y][x].state = GameCellState.none;
                }
            }
        }
    }

    checkDropMove() {
        for (let y = 0; y < GAME_HEIGHT; y++) {
            for (let x = 0; x < GAME_WIDTH; x++) {
                if (this.gameField[y][x].value !== GameCellValue.empty || this.checkInThree(y, x)) {
                    this.gameField[y][x].state = GameCellState.blocked
                } else {
                    this.gameField[y][x].state = GameCellState.available
                }
            }
        }
    }

    getCellSafe(yPos, xPos) {
        if (yPos < 0 || yPos >= this.gameField.length ||
            xPos < 0 || xPos >= this.gameField[0].length) {
            return null;
        }


        return this.gameField[yPos][xPos];
    }

    checkInThree(yPos, xPos) {
        let checker = this.checkThreeStrike.bind(this);
        let getCell = this.getCellSafe.bind(this);

        if (checker(getCell(yPos, xPos), getCell(yPos, xPos + 1), getCell(yPos, xPos + 2))) {
            return true
        } else if (checker(getCell(yPos, xPos - 1), getCell(yPos, xPos), getCell(yPos, xPos + 1))) {
            return true
        } else if (checker(getCell(yPos, xPos - 2), getCell(yPos, xPos - 1), getCell(yPos, xPos))) {
            return true
        } else if (checker(getCell(yPos, xPos), getCell(yPos + 1, xPos), getCell(yPos + 2, xPos))) {
            return true
        } else if (checker(getCell(yPos, xPos), getCell(yPos - 1, xPos), getCell(yPos + 1, xPos))) {
            return true
        } else if (checker(getCell(yPos, xPos), getCell(yPos - 1, xPos), getCell(yPos - 2, xPos))) {
            return true
        } else {
            return false
        }
    }

    checkThreeStrike(cell1, cell2, cell3) {
        if (cell1 === null || cell2 === null || cell3 === null) {
            return false;
        }

        let acceptedValue = this.isNutsMove ? GameCellValue.stick : GameCellValue.nut;

        if (
            cell2.value === acceptedValue &&
            cell2.value === cell3.value &&
            cell2.value !== cell1.value &&
            cell1.value === GameCellValue.empty) {

            return true;

        } else if (
            cell1.value === acceptedValue &&
            cell1.value === cell3.value &&
            cell1.value !== cell2.value &&
            cell2.value === GameCellValue.empty) {

            return true;

        } else if (
            cell2.value === acceptedValue &&
            cell2.value === cell1.value &&
            cell2.value !== cell3.value &&
            cell3.value === GameCellValue.empty) {

            return true;
        }
        return false;
    }
}

export class GameCell {
    constructor(yPos, xPos) {
        this.value = GameCellValue.empty;
        this.state = GameCellState.empty;
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