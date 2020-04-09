import {FLAGS_COUNT, GAME_HEIGHT, GAME_WIDTH, GameCellState, GameCellValue, GamePhase} from "./game.constants"
import {GameCell} from "./game.cell";
import {GameMove} from "./game.move";

export class GameBrain {

    private readonly isNutsFirst: boolean;
    private readonly isAIMode: boolean;

    private historyLen = 0;
    private brainHistory: string[] = [];

    private gamePhase: GamePhase = GamePhase.not_started;
    private gameStatus1: string = "Not started";
    private gameStatus2: string = "You not supposed to see this...";

    private gameField: GameCell[][] = [];

    private isNutsMove: boolean = false;

    private selectedCell: GameCell | null = null;
    private isRemovingCell = false;

    private oppositeValue = () => !this.isNutsMove ? GameCellValue.nut : GameCellValue.stick;
    private acceptedValue = () => this.isNutsMove ? GameCellValue.nut : GameCellValue.stick;

    private nutsLeft: number = 0;
    private sticksLeft: number = 0;

    constructor(isAIMode: boolean, isNutsFirst: boolean, fileContent?: GameBrain) {
        if (fileContent) {

            this.historyLen = fileContent.historyLen;

            this.brainHistory = fileContent.brainHistory;
            this.isNutsFirst = fileContent.isNutsFirst;
            this.isAIMode = fileContent.isAIMode;
            this.gamePhase = fileContent.gamePhase;
            this.gameStatus1 = fileContent.gameStatus1;
            this.gameStatus2 = fileContent.gameStatus2;

            this.gameField = fileContent.gameField;
            this.isNutsMove = fileContent.isNutsMove;
            this.selectedCell = fileContent.selectedCell;
            this.isRemovingCell = fileContent.isRemovingCell;
            this.nutsLeft = fileContent.nutsLeft;
            this.sticksLeft = fileContent.sticksLeft;
            return;
        }

        this.isAIMode = isAIMode;
        this.isNutsFirst = isNutsFirst;
    }

    undoMove() {
        let move = this.getLastMove();
        if (move == null) return;

        this.brainHistory.pop();
        this.historyLen--;

        this.gamePhase = move.gamePhase;
        this.gameStatus1 = move.gameStatus1;
        this.gameStatus2 = move.gameStatus2;
        this.setGameField(move.gameField);
        this.isNutsMove = move.isNutsMove;
        this.selectedCell = move.selectedCell;
        this.isRemovingCell = move.isRemovingCell;
        this.nutsLeft = move.nutsLeft;
        this.sticksLeft = move.sticksLeft;

        if (this.selectedCell != null) {
            this.selectedCell = null;

            if (this.gamePhase == GamePhase.drop_phase) {
                this.checkDropPhase()
            } else if (this.gamePhase == GamePhase.move_phase) {
                this.checkMovePhase()
            }
        }
    }

    setGameField(gameField: GameCell[][]) {
        for (let y = 0; y < GAME_HEIGHT; y++) {
            for (let x = 0; x < GAME_WIDTH; x++) {
                this.gameField[y][x] = gameField[y][x]
            }
        }
    }

    saveMove() {
        let move = new GameMove(
            this.gamePhase,
            this.gameStatus1,
            this.gameStatus2,
            this.gameField,
            this.isNutsMove,
            this.selectedCell,
            this.isRemovingCell,
            this.nutsLeft,
            this.sticksLeft
        );

        this.brainHistory.push(JSON.stringify(move, null, " "));
        this.historyLen++
    }

    getLastMove(): null | GameMove {
        if (this.brainHistory.length > 0) {
            return JSON.parse(this.brainHistory[this.brainHistory.length - 1]) as GameMove;
        }

        return null
    }

    startGame() {
        this.gamePhase = GamePhase.drop_phase;

        this.gameField = this.initField();
        this.isNutsMove = this.isNutsFirst;

        this.selectedCell = null;
        this.isRemovingCell = false;

        // this.acceptedValue = () => this.isNutsMove ? GameCellValue.nut : GameCellValue.stick;
        // this.oppositeValue = () => !this.isNutsMove ? GameCellValue.nut : GameCellValue.stick;

        this.nutsLeft = FLAGS_COUNT;
        this.sticksLeft = FLAGS_COUNT;

        this.setAllCellState(GameCellState.available);

        this.gameStatus1 = "Now is the DROP PHASE";
        this.gameStatus2 = `Player <b>${this.isNutsMove ? "NUTS" : "STICKS"}</b>, place your figure`;

        // this.saveMove(); //initial state
        console.log(this.historyLen)
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

    checkFieldEquals(one: GameCell[][], other: GameCell[][]) {
        for (let y = 0; y < GAME_HEIGHT; y++) {
            for (let x = 0; x < GAME_WIDTH; x++) {
                if (one[y][x].value !== other[y][x].value || one[y][x].state !== other[y][x].state) {
                    // console.log(one[y][x].value != other[y][x].value);
                    // console.log(one[y][x].value);
                    // console.log(other[y][x].value);
                    // console.log(one[y][x].state != other[y][x].state);
                    // console.log(one[y][x].state);
                    // console.log(other[y][x].state);
                    return false;
                }
            }
        }

        return true
    }

    handleClick(yPos: number, xPos: number) {
        let selectionChange = false;
        this.saveMove();

        // console.log(this.getLastMove() != null);
        // console.log(!this.checkFieldEquals(this.getLastMove()!.gameField, this.gameField));

        // if (this.getLastMove() != null && !this.checkFieldEquals(this.getLastMove()!.gameField, this.gameField)){
        //     this.saveMove();
        //     // console.log(this.getLastMove()?.gameField);
        //     // console.log(this.gameField);
        // } else if (this.getLastMove() == null){
        //     this.saveMove();
        // }


        let cell = this.getCellSafe(yPos, xPos);
        if (cell === null) return;

        if (this.gamePhase === GamePhase.drop_phase) {
            this.placeFlag(yPos, xPos);

        } else if (this.gamePhase === GamePhase.move_phase) {
            if (this.selectedCell === null &&
                cell.state === GameCellState.available &&
                cell.value === this.acceptedValue()) {
                this.selectCell(yPos, xPos);
                selectionChange = true;

            } else if (this.selectedCell === cell) {
                this.unselectCell();
                selectionChange = true;

            } else if (this.selectedCell !== null && cell.state === GameCellState.available) {
                this.moveCell(yPos, xPos)

            } else if (this.isRemovingCell && cell.state === GameCellState.available) {
                this.removeCell(yPos, xPos)
            }

        } else {
        }

        // console.clear();
        console.log(`current move: ${this.isNutsMove ? "NUTS" : "STICKS"}`);
        console.log(`selected cell: ${this.selectedCell === null ? "null" : yPos + ":" + xPos}`);
        console.log(`isRemovingCell: ${this.isRemovingCell}`);

        this.updateStatus();

        if (selectionChange && this.getLastMove() != null || this.checkFieldEquals(this.getLastMove()!.gameField, this.gameField)) {
            this.brainHistory.pop();
            this.historyLen--;
        }

        console.log(this.historyLen)
    }

    removeCell(yPos: number, xPos: number) {
        this.gameField[yPos][xPos].value = GameCellValue.empty;
        this.isRemovingCell = false;

        if (this.isNutsMove) {
            this.sticksLeft--;
        } else {
            this.nutsLeft--;
        }

        if (this.nutsLeft < 3 || this.sticksLeft < 3) {
            this.gamePhase = GamePhase.over;
            this.setAllCellState(GameCellState.empty)

        } else {
            this.isNutsMove = !this.isNutsMove;
            this.checkMovePhase();
        }
    }

    moveCell(yPos: number, xPos: number) {
        console.log(this.gameField);
        // let cell = this.gameField[yPos][xPos];
        let cell = this.getCellSafe(yPos, xPos);

        if (cell === null || this.selectedCell === null) return;

        let previous = this.selectedCell;

        let direction: "hor+" | "hor-" | "vert+" | "vert-";

        let xDif = previous.xPos - cell.xPos;
        let yDif = previous.yPos - cell.yPos;

        if (xDif > 0) {
            direction = "hor+"
        } else if (xDif < 0) {
            direction = "hor-"
        } else if (yDif > 0) {
            direction = "vert+"
        } else {
            direction = "vert-"
        }

        // console.clear();
        // console.log(direction);
        console.log(this.gameField);

        console.log("cell selected?: " + this.selectedCell !== null);
        cell.value = JSON.parse(JSON.stringify(this.selectedCell.value));
        this.selectedCell.value = GameCellValue.empty;

        console.log(this.selectedCell);

        this.selectedCell = null;

        console.log(this.selectedCell);
        console.log(this.gameField);

        // console.log(this.selectedCell == null);

        let vStrike = this.getNStrike(yPos, xPos, true, false);
        let hStrike = this.getNStrike(yPos, xPos, false, false);

        // if (vStrike === 3 && hStrike <= 3 ||
        //     hStrike === 3 && vStrike <= 3
        // ) {
        //     this.isRemovingCell = true;
        // } else {
        //     this.isNutsMove = !this.isNutsMove;
        // }

        // console.log(previous);
        // console.log(this.getNStrike(previous!.yPos, previous!.xPos, true));
        // console.log(this.getNStrike(previous!.yPos, previous!.xPos, false));

        if (vStrike === 3 || hStrike === 3) {
            this.isRemovingCell = true;
            console.log(vStrike);
            console.log(hStrike);
            // } else if (this.getNStrike(previous!.yPos, previous!.xPos, true, true, false, "+") === 4) {
            //     this.isRemovingCell = true;
            // } else if (this.getNStrike(previous!.yPos, previous!.xPos, true, true, false, "-") === 4) {
            //     this.isRemovingCell = true;
            // } else if (this.getNStrike(previous!.yPos, previous!.xPos, false, true, false, "+") === 4) {
            //     this.isRemovingCell = true;
            // } else if (this.getNStrike(previous!.yPos, previous!.xPos, false, true, false, "-") === 4) {
            //     this.isRemovingCell = true;
        } else {
            this.isNutsMove = !this.isNutsMove;
        }

        this.checkMovePhase();
    }

    // checkNeighbours(yPos: number, xPos: number){
    //     let vStrike = (this.getNStrike(yPos, xPos, true, false));
    //     let hStrike = (this.getNStrike(yPos, xPos, false, false));
    //
    //     if (vStrike === 3 && hStrike <= 3 ||
    //         this.getNStrike(yPos, xPos, false) === 3 && this.getNStrike(yPos, xPos, true) <= 3
    //     ) {
    //         this.isRemovingCell = true;
    //     } else {
    //         this.isNutsMove = !this.isNutsMove;
    //     }
    // }

    selectCell(yPos: number, xPos: number) {
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

    placeFlag(yPos: number, xPos: number) {
        if (this.gamePhase !== GamePhase.drop_phase ||
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

            this.gamePhase = GamePhase.move_phase;
            this.sticksLeft = FLAGS_COUNT;
            this.nutsLeft = FLAGS_COUNT;

            this.checkMovePhase()
        }

        // if (this.isAIMode && this.isNutsFirst !== this.isNutsMove) {
        //     this.ai_placeFlag();
        // }

        if (this.gamePhase === GamePhase.drop_phase) {
            this.ai_placeFlag();
        }

    }

    clone(): GameBrain {
        // return JSON.parse(JSON.stringify(this)) as GameBrain
        return new GameBrain(false, false, JSON.parse(JSON.stringify(this)) as GameBrain)
    }

    ai_makeMove() {
        if (this.gamePhase === GamePhase.drop_phase) {
            return
        }

        console.log(this.ai_makePrediction(1, this.clone(), 0, []))
    }

    ai_checkWillStrike(y: number, x: number): boolean {
        return this.getNStrike(y, x, true, true, false, "both") === 3
            || this.getNStrike(y, x, false, true, false, "both") === 3
    }

    ai_makePrediction(level: number, brain: GameBrain, points: number, moves: { y: number, x: number, action: string }[]):
        { moves: { y: number, x: number, action: string }[], points: number } {

        if (level <= 0) {
            return {moves, points}
        }

        let predictions: { moves: { y: number, x: number, action: string }[], points: number }[] = [];

        for (let y = 0; y < GAME_HEIGHT; y++) {
            for (let x = 0; x < GAME_WIDTH; x++) {
                let cell = brain.gameField[y][x];
                let newBrain = brain.clone();
                let newMoves = JSON.parse(JSON.stringify(moves)) as { y: number, x: number, action: string }[];
                let newPoints = points;
                let newLevel = level;
                let action: string = brain.isNutsFirst != brain.isNutsMove ? "ai" : "player";
                console.log("lol");
                console.log(newBrain.gameField);

                if (newBrain.selectedCell === null &&
                    cell.state === GameCellState.available &&
                    cell.value === newBrain.acceptedValue()) {

                    console.log(newBrain.isNutsMove);

                    console.log(`selecting: {${y}, ${x}}`);

                    action += " selecting";

                    newBrain.selectCell(y, x);
                    newMoves.push({y, x, action});
                    predictions.push(this.ai_makePrediction(level, newBrain, points, newMoves))

                } else if (newBrain.selectedCell === cell) {
                    //skip

                } else if (newBrain.selectedCell !== null && cell.state === GameCellState.available) {
                    console.log(newBrain.gameField);

                    // console.log(newBrain.isNutsMove);

                    if (newBrain.isNutsFirst != newBrain.isNutsMove) {
                        console.log(`ai_moving: {${y}, ${x}}`);
                    } else {
                        console.log(`player_moving: {${y}, ${x}}`);
                    }

                    action += " moving";

                    console.log(newBrain.gameField);
                    newBrain.moveCell(y, x);

                    if (newBrain.isRemovingCell) {
                        console.log(`removing detected!`);
                    }

                    newMoves.push({y, x, action});

                    if (!newBrain.isRemovingCell) {
                        newLevel--
                    }

                    predictions.push(this.ai_makePrediction(newLevel, newBrain, newPoints, newMoves))

                    // if (newBrain.isNutsFirst != newBrain.isNutsMove) {
                    //     console.log(`ai_moving: {${y}, ${x}}`);
                    //     predictions.push(this.ai_makePrediction(newLevel, newBrain, newPoints, newMoves));
                    // }
                    // else {
                    //     console.log(`player_moving: {${y}, ${x}}`);
                    //     predictions.push(this.ai_makePrediction(newLevel, newBrain, newPoints, newMoves))
                    // }

                } else if (newBrain.isRemovingCell && cell.state === GameCellState.available) {

                    // console.log(newBrain.isNutsMove);

                    if (newBrain.isNutsFirst != newBrain.isNutsMove) {
                        console.log(`ai_removing: {${y}, ${x}}`);
                    } else {
                        console.log(`player_removing: {${y}, ${x}}`);
                    }

                    action += " removing";

                    newBrain.removeCell(y, x);
                    newMoves.push({y, x, action});

                    newLevel--;

                    // console.log(newBrain.isNutsMove);

                    if (newBrain.isNutsFirst == newBrain.isNutsMove) {
                        predictions.push(this.ai_makePrediction(newLevel, newBrain, points + 1, newMoves));
                    } else {
                        predictions.push(this.ai_makePrediction(newLevel, newBrain, points - 3, moves))
                    }

                    // if (newBrain.isNutsFirst != newBrain.isNutsMove) {
                    //     console.log(`ai_removing: {${y}, ${x}}`);
                    //     predictions.push(this.ai_makePrediction(newLevel, newBrain, points + 1, newMoves));
                    // } else {
                    //     console.log(`player_removing: {${y}, ${x}}`);
                    //     predictions.push(this.ai_makePrediction(newLevel, newBrain, points - 3, moves))
                    // }
                }
            }
        }

        let max: { moves: { y: number, x: number, action: string }[], points: number } | null = null;

        predictions.forEach(value => {
            if (!max || max.points < value.points) {
                max = value
            }
        });

        return max!;
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

    setAllCellState(state
                        :
                        GameCellState
    ) {
        for (let y = 0; y < GAME_HEIGHT; y++) {
            for (let x = 0; x < GAME_WIDTH; x++) {
                this.gameField[y][x].state = state
            }
        }
    }

    updateStatus() {
        if (this.gamePhase === GamePhase.over) {
            this.gameStatus1 = "Game Over";
            this.gameStatus2 = `Player <b>${this.isNutsMove ? "NUTS" : "STICKS"}</b> wins`;
        } else if (this.gamePhase === GamePhase.drop_phase) {
            this.gameStatus1 = "Now is the DROP PHASE";
            this.gameStatus2 = `Player <b>${this.isNutsMove ? "NUTS" : "STICKS"}</b>, place your figure`;
        } else {
            this.gameStatus1 = "Now is the MOVE PHASE";
            this.gameStatus2 = `Player <b>${this.isNutsMove ? "NUTS" : "STICKS"}</b>, make your move`;
        }
    }

    checkMovePhase() {
        for (let y = 0; y < GAME_HEIGHT; y++) {
            for (let x = 0; x < GAME_WIDTH; x++) {

                let cell = this.getCellSafe(y, x)!;

                if (this.isRemovingCell) {

                    if (cell.value === this.acceptedValue() ||
                        cell.value === GameCellValue.empty
                    ) {
                        cell.state = GameCellState.empty;

                    } else {
                        let vStrike = (this.getNStrike(y, x, true, false, true));
                        let hStrike = (this.getNStrike(y, x, false, false, true));

                        if (vStrike === 3 || hStrike == 3) {
                            cell.state = GameCellState.blocked;
                        } else {
                            cell.state = GameCellState.available;
                        }
                    }


                } else if (this.selectedCell === null && cell.value === this.acceptedValue()) {

                    if (this.checkCanMove(y, x)) {
                        cell.state = GameCellState.available;
                    } else {
                        cell.state = GameCellState.blocked;
                    }

                } else if (this.selectedCell !== null) {

                    if (cell === this.selectedCell) {
                        cell.state = GameCellState.selected;
                    } else if (this.checkCanAcceptMove(y, x)) {
                        cell.state = GameCellState.available;
                    } else {
                        cell.state = GameCellState.blocked;
                    }

                } else {
                    cell.state = GameCellState.empty;
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

    getCellSafe(yPos
                    :
                    number, xPos
                    :
                    number
    ) {
        if (yPos < 0 || yPos >= this.gameField.length ||
            xPos < 0 || xPos >= this.gameField[0].length) {
            return null;
        }

        return this.gameField[yPos][xPos];
    }

    checkCanAcceptMove(yPos
                           :
                           number, xPos
                           :
                           number
    ) {
        let cell = this.getCellSafe(yPos, xPos);
        if (cell === null || cell.value !== GameCellValue.empty) {
            return false
        }

        return this.checkEqualSelected(yPos, xPos + 1) || this.checkEqualSelected(yPos, xPos - 1)
            || this.checkEqualSelected(yPos + 1, xPos) || this.checkEqualSelected(yPos - 1, xPos)
    }

    checkEqualSelected(yPos
                           :
                           number, xPos
                           :
                           number
    ) {
        let cell = this.getCellSafe(yPos, xPos);

        return cell === this.selectedCell;
    }

    // checkEqualAccepted(yPos, xPos){
    //     let cell = this.getCellSafe(yPos, xPos);
    //
    //     return cell !== null && cell.value === this.acceptedValue();
    // }

    checkCanMove(yPos
                     :
                     number, xPos
                     :
                     number
    ) {
        return this.checkEmptyNotNull(yPos, xPos + 1) || this.checkEmptyNotNull(yPos, xPos - 1)
            || this.checkEmptyNotNull(yPos + 1, xPos) || this.checkEmptyNotNull(yPos - 1, xPos)
    }

    checkEmptyNotNull(yPos
                          :
                          number, xPos
                          :
                          number
    ) {
        let cell = this.getCellSafe(yPos, xPos);

        return cell !== null && cell.value === GameCellValue.empty;
    }

    checkInThree(yPos
                     :
                     number, xPos
                     :
                     number
    ) {
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
        } else return checker(getCell(yPos, xPos), getCell(yPos - 1, xPos), getCell(yPos - 2, xPos));
    }

    check2nEmStrike(cell1
                        :
                        GameCell | null, cell2
                        :
                        GameCell | null, cell3
                        :
                        GameCell | null
    ) {
        if (cell1 === null || cell2 === null || cell3 === null) {
            return false;
        }

        // let acceptedValue = this.isNutsMove ? GameCellValue.stick : GameCellValue.nut;

        if (
            cell2.value === this.oppositeValue() &&
            cell2.value === cell3.value &&
            cell2.value !== cell1.value &&
            cell1.value === GameCellValue.empty) {

            return true;

        } else if (
            cell1.value === this.oppositeValue() &&
            cell1.value === cell3.value &&
            cell1.value !== cell2.value &&
            cell2.value === GameCellValue.empty) {

            return true;

        } else if (
            cell2.value === this.oppositeValue() &&
            cell2.value === cell1.value &&
            cell2.value !== cell3.value &&
            cell3.value === GameCellValue.empty) {

            return true;
        }
        return false;
    }

    getNStrike(yPos: number, xPos: number, isVert: boolean, isZeroEmpty = true, isReversed = false, direction: "both" | "+" | "-" = "both") {
        console.log(this.gameField);
        let strike = 0;
        let strikedCells = [];
        let cell = this.getCellSafe(yPos, xPos);

        if (cell === null) return;

        let acceptedValue = !isReversed ? this.acceptedValue() : this.oppositeValue();


        if (cell.value !== acceptedValue && !isZeroEmpty) {
            return 0;
        } else {
            strike++;
            strikedCells.push(cell)
        }

        let mX = xPos;
        let mY = yPos;

        if (direction === "both" || direction === "+") {
            while (true) {
                if (isVert) {
                    mY++
                } else {
                    mX++
                }

                let cell = this.getCellSafe(mY, mX);

                if (cell === null || cell.value !== acceptedValue) {
                    break;
                } else {
                    strike++;
                    strikedCells.push(cell);
                }
            }
        }

        mX = xPos;
        mY = yPos;

        if (direction === "both" || direction === "-") {
            while (true) {
                if (isVert) {
                    mY--
                } else {
                    mX--
                }

                let cell = this.getCellSafe(mY, mX);

                if (cell === null || cell.value !== acceptedValue) {
                    break;
                } else {
                    strike++;
                    strikedCells.push(cell);
                }
            }
        }

        console.log(strikedCells);
        return strike;
    }

}

//help functions

/**
 * @see https://www.w3schools.com/js/js_random.asp
 * @see https://stackoverflow.com/questions/4959975/generate-random-number-between-two-numbers-in-javascript
 */
function

randomBetween(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1) + min) //both included
}

function

randomIndex(maxLength: number) {
    return randomBetween(0, maxLength - 1)
}