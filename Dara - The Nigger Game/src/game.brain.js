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
        this.isRemovingCell = false;

        this.acceptedValue = () => this.isNutsMove ? GameCellValue.nut : GameCellValue.stick;

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
        let cell = this.getCellSafe(yPos, xPos);

        if (this.gamePhase === GamePhase.drop) {
            this.placeFlag(yPos, xPos);

        } else if (this.gamePhase === GamePhase.move) {
            if (this.selectedCell === null &&
                cell.state === GameCellState.available &&
                cell.value === this.acceptedValue()) {
                this.selectCell(yPos, xPos)

            } else if (this.selectedCell === cell) {
                this.unselectCell(yPos, xPos)

            } else if (this.selectedCell !== null && cell.state === GameCellState.available) {
                this.moveCell(yPos, xPos)

            } else if (this.isRemovingCell && cell.state === GameCellState.available) {
                this.removeCell(yPos, xPos)
            }

        } else {
        }

        console.clear();
        console.log(`current move: ${this.isNutsMove ? "NUTS" : "STICKS"}`);
        console.log(`selected cell: ${this.selectedCell === null ? "null" : yPos + ":" + xPos}`);
        console.log(`isRemovingCell: ${this.isRemovingCell}`);

        this.updateStatus();
    }

    removeCell(yPos, xPos) {
        this.gameField[yPos][xPos].value = GameCellValue.empty;
        this.isRemovingCell = false;

        if (this.isNutsMove) {
            this.sticksLeft--;
        }
        else{
            this.nutsLeft--;
        }

        if (this.nutsLeft < 3 || this.sticksLeft < 3){
            this.gamePhase = GamePhase.over;
            this.setAllCellState(GameCellState.none)

        } else {
            this.isNutsMove = !this.isNutsMove;
            this.checkMovePhase();
        }
    }

    moveCell(yPos, xPos) {
        let cell = this.gameField[yPos][xPos];

        cell.value = this.selectedCell.value;
        this.selectedCell.value = GameCellValue.empty;

        this.selectedCell = null;

        if (this.getNStrike(yPos, xPos, true) === 3 && this.getNStrike(yPos, xPos, false) <= 3 ||
            this.getNStrike(yPos, xPos, false) === 3 && this.getNStrike(yPos, xPos, true) <= 3
        ) {
            this.isRemovingCell = true;
        } else {
            this.isNutsMove = !this.isNutsMove;
        }

        this.checkMovePhase();
    }

    selectCell(yPos, xPos) {
        // let acceptedValue = this.isNutsMove ? GameCellValue.nut : GameCellValue.stick;
        let cell = this.gameField[yPos][xPos];

        if (cell.value !== this.acceptedValue()) {
            return;
        }

        cell.state = GameCellState.selected;

        this.selectedCell = cell;
        this.checkMovePhase();
    }

    unselectCell() {
        // let predicate = this.selectedCell.value === GameCellValue.nut;
        //
        // if (predicate && this.isNutsMove || !predicate && !this.isNutsMove){
        //     this.selectedCell.state = GameCellState.available;
        // }
        // else {
        //     this.selectedCell.state = GameCellState.none;
        // }

        this.selectedCell = null;
        this.checkMovePhase();
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

        this.checkDropPhase();

        this.isNutsMove = !this.isNutsMove;

        if (this.nutsLeft <= 0 && this.sticksLeft <= 0) {

            this.gamePhase = GamePhase.move;
            this.sticksLeft = FLAGS_COUNT;
            this.nutsLeft = FLAGS_COUNT;

            this.checkMovePhase()
        }

        if (this.isAIMode && this.isNutsFirst !== this.isNutsMove) {
            this.ai_placeFlag();
        }

        // if (this.gamePhase === GamePhase.drop) {
        //     this.ai_placeFlag();
        // }

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

    setAllCellState(state) {
        for (let y = 0; y < GAME_HEIGHT; y++) {
            for (let x = 0; x < GAME_WIDTH; x++) {
                this.gameField[y][x].state = state
            }
        }
    }

    updateStatus() {
        if (this.gamePhase === GamePhase.over) {
            this.gameStatus1 = "Game Over";
            this.gameStatus2 = `Player ${this.isNutsMove ? "NUTS" : "STICKS"} wins`;
        } else if (this.gamePhase === GamePhase.drop) {
            this.gameStatus1 = "Now is the DROP PHASE";
            this.gameStatus2 = `Player ${this.isNutsMove ? "NUTS" : "STICKS"}, place your figure`;
        } else {
            this.gameStatus1 = "Now is the MOVE PHASE";
            this.gameStatus2 = `Player ${this.isNutsMove ? "NUTS" : "STICKS"}, make your move`;
        }
    }

    checkMovePhase() {
        for (let y = 0; y < GAME_HEIGHT; y++) {
            for (let x = 0; x < GAME_WIDTH; x++) {

                let cell = this.getCellSafe(y, x);

                if (this.isRemovingCell) {

                    if (cell.value === this.acceptedValue() ||
                        cell.value === GameCellValue.empty
                    ) {
                        cell.state = GameCellState.none;

                    } else {
                        cell.state = GameCellState.available;
                    }


                } else if (this.selectedCell === null && cell.value === this.acceptedValue()) {

                    if (this.checkCanMove(y, x)) {
                        cell.state = GameCellState.available;
                    } else {
                        cell.state = GameCellState.blocked;
                    }

                } else if (this.selectedCell !== null) {

                    if (this.selectedCell === cell) {
                        cell.state = GameCellState.selected;
                    } else if (this.checkCanAcceptMove(y, x)) {
                        cell.state = GameCellState.available;
                    } else {
                        cell.state = GameCellState.blocked;
                    }

                } else {
                    cell.state = GameCellState.none;
                }
            }
        }
    }

    checkDropPhase() {
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

    checkCanAcceptMove(yPos, xPos) {
        let cell = this.getCellSafe(yPos, xPos);
        if (cell === null || cell.value !== GameCellValue.empty) {
            return false
        }

        return this.checkEqualSelected(yPos, xPos + 1) || this.checkEqualSelected(yPos, xPos - 1)
            || this.checkEqualSelected(yPos + 1, xPos) || this.checkEqualSelected(yPos - 1, xPos)
    }

    checkEqualSelected(yPos, xPos) {
        let cell = this.getCellSafe(yPos, xPos);

        return cell === this.selectedCell;
    }

    // checkEqualAccepted(yPos, xPos){
    //     let cell = this.getCellSafe(yPos, xPos);
    //
    //     return cell !== null && cell.value === this.acceptedValue();
    // }

    checkCanMove(yPos, xPos) {
        return this.checkEmptyNotNull(yPos, xPos + 1) || this.checkEmptyNotNull(yPos, xPos - 1)
            || this.checkEmptyNotNull(yPos + 1, xPos) || this.checkEmptyNotNull(yPos - 1, xPos)
    }

    checkEmptyNotNull(yPos, xPos) {
        let cell = this.getCellSafe(yPos, xPos);

        return cell !== null && cell.value === GameCellValue.empty;
    }

    checkInThree(yPos, xPos) {
        let checker = this.check2nEmStrike.bind(this);
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

    check2nEmStrike(cell1, cell2, cell3) {
        if (cell1 === null || cell2 === null || cell3 === null) {
            return false;
        }

        // let acceptedValue = this.isNutsMove ? GameCellValue.stick : GameCellValue.nut;

        if (
            cell2.value === this.acceptedValue() &&
            cell2.value === cell3.value &&
            cell2.value !== cell1.value &&
            cell1.value === GameCellValue.empty) {

            return true;

        } else if (
            cell1.value === this.acceptedValue() &&
            cell1.value === cell3.value &&
            cell1.value !== cell2.value &&
            cell2.value === GameCellValue.empty) {

            return true;

        } else if (
            cell2.value === this.acceptedValue() &&
            cell2.value === cell1.value &&
            cell2.value !== cell3.value &&
            cell3.value === GameCellValue.empty) {

            return true;
        }
        return false;
    }

    getNStrike(yPos, xPos, isVert, isZeroEmpty = true) {
        let strike = 0;
        let cell = this.getCellSafe(yPos, xPos);

        if (cell.value === GameCellValue.empty && !isZeroEmpty) {
            return 0;
        } else {
            strike++;
        }

        let mX = xPos;
        let mY = yPos;

        while (true) {
            if (isVert) {
                mY++
            } else {
                mX++
            }

            let cell = this.getCellSafe(mY, mX);

            if (cell === null || cell.value !== this.acceptedValue()) {
                break;
            } else {
                strike++
            }
        }

        mX = xPos;
        mY = yPos;

        while (true) {
            if (isVert) {
                mY--
            } else {
                mX--
            }

            let cell = this.getCellSafe(mY, mX);

            if (cell === null || cell.value !== this.acceptedValue()) {
                break;
            } else {
                strike++
            }
        }

        return strike;
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