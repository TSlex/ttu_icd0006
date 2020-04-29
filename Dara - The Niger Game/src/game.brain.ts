import {AI_SLEEP, FLAGS_COUNT, GAME_HEIGHT, GAME_WIDTH, GameCellState, GameCellValue, GamePhase} from "./game.constants"
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

            if (this.checkNoMoves()) {
                this.setDeadHeat()
            }

            return;
        }

        this.isAIMode = isAIMode;
        this.isNutsFirst = isNutsFirst;
    }

    checkNoMoves() {
        let isMovesLeft = false;
        for (let y = 0; y < GAME_HEIGHT; y++) {
            for (let x = 0; x < GAME_WIDTH; x++) {
                if (this.gameField[y][x].state === GameCellState.available) {
                    isMovesLeft = true;
                }
            }
        }
        console.log(!isMovesLeft);
        return !isMovesLeft;
    }

    setDeadHeat() {
        this.gamePhase = GamePhase.over;
        this.gameStatus1 = "Game Over";
        this.gameStatus2 = "Dead Heat";
        this.setAllCellState(GameCellState.empty);
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
        if (cell === null || this.gamePhase == GamePhase.over) return;

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
            --this.sticksLeft;
        } else {
            --this.nutsLeft;
        }

        if (this.nutsLeft < 3 || this.sticksLeft < 3) {
            this.gamePhase = GamePhase.over;
            this.setAllCellState(GameCellState.empty)

        } else {
            this.isNutsMove = !this.isNutsMove;
            this.checkMovePhase();
        }

        this.updateStatus();

        if (this.isAIMode && this.isNutsFirst !== this.isNutsMove) {
            this.ai_thinkABit();
        }
    }

    moveCell(yPos: number, xPos: number) {
        let cell = this.getCellSafe(yPos, xPos);

        if (cell === null || this.selectedCell === null) return;

        let previous = this.selectedCell;

        cell.value = JSON.parse(JSON.stringify(this.selectedCell.value));
        this.selectedCell.value = GameCellValue.empty;

        this.selectedCell = null;

        let vStrike = this.getNStrike(yPos, xPos, true, false);
        let hStrike = this.getNStrike(yPos, xPos, false, false);

        if (vStrike === 3 || hStrike === 3) {
            this.isRemovingCell = true;
        } else if (this.getNStrike(previous!.yPos, previous!.xPos, true, true, false, "+") === 4) {
            this.isRemovingCell = true;
        } else if (this.getNStrike(previous!.yPos, previous!.xPos, true, true, false, "-") === 4) {
            this.isRemovingCell = true;
        } else if (this.getNStrike(previous!.yPos, previous!.xPos, false, true, false, "+") === 4) {
            this.isRemovingCell = true;
        } else if (this.getNStrike(previous!.yPos, previous!.xPos, false, true, false, "-") === 4) {
            this.isRemovingCell = true;
        } else {
            this.isNutsMove = !this.isNutsMove;
        }

        this.checkMovePhase();

        if (this.isAIMode &&  this.isNutsFirst !== this.isNutsMove) {
            this.ai_thinkABit();
        }
    }

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

        if (this.isAIMode && this.isNutsFirst !== this.isNutsMove) {
            this.ai_placeFlag();
        }

        // if (this.gamePhase === GamePhase.drop_phase) {
        //     this.ai_placeFlag();
        // }

    }

    clone(): GameBrain {
        // return JSON.parse(JSON.stringify(this)) as GameBrain
        return new GameBrain(false, false, JSON.parse(JSON.stringify(this)) as GameBrain)
    }

    ai_makeMove() {
        if (this.gamePhase !== GamePhase.move_phase) {
            return
        }

        this.ai_thinkABit();
    }

    ai_thinkABit() {
        const distinct = (value: any, index: any, self: any) => {
            return self.indexOf(value) === index;
        };

        if (this.isRemovingCell) {
            let best: GameCell[] = this.ai_checkCanRemove();

            if (best.length > 0) {
                let a = this.ai_chooseRandom(best) as GameCell;
                console.log("AI thinks that the best decision is to remove: " + a);
                this.removeCell(a.yPos, a.xPos);
                return;
            }

            let rest: GameCell[] = this.ai_getAllMoves();

            if (rest.length > 0) {
                let a = this.ai_chooseRandom(rest) as GameCell;
                console.log("AI want to remove: " + a);
                this.removeCell(a.yPos, a.xPos);
                return;
            }

            console.warn("NO MOVES! WHAT TO DO?");
            return;

        } else {
            let strikes: { to: GameCell, from: GameCell }[] = this.ai_checkCanStrike().filter(distinct);
            let blocks: { to: GameCell, from: GameCell }[] = this.ai_checkCanBlock().filter(distinct);
            let moves: { to: GameCell, from: GameCell }[] = this.ai_checkCanMove().filter(distinct);

            let best: { to: GameCell, from: GameCell }[] = [];

            for (let strike of strikes) {
                for (let block of blocks) {
                    if (strike == block) {
                        best.push(strike)
                    }
                }
            }

            if (best.length > 0) {
                let a = (this.ai_chooseRandom(best) as { to: GameCell, from: GameCell });
                console.log(`AI thinks that the best decision is to move from: ${a.from} to: ${a.to}`);

                this.selectCell(a.from.yPos, a.from.xPos);
                this.moveCell(a.to.yPos, a.to.xPos);
                return;
            }

            let notBad: { to: GameCell, from: GameCell }[] = [];

            for (let strike of strikes) {
                for (let move of moves) {
                    if (strike == move) {
                        notBad.push(strike)
                    }
                }
            }

            if (notBad.length > 0) {
                let a = (this.ai_chooseRandom(notBad) as { to: GameCell, from: GameCell });
                console.log(`AI thinks that not bad decision will be to move from: ${a.from} to: ${a.to}`);

                this.selectCell(a.from.yPos, a.from.xPos);
                this.moveCell(a.to.yPos, a.to.xPos);
                return;
            }

            if (strikes.length > 0) {
                let a = (this.ai_chooseRandom(strikes) as { to: GameCell, from: GameCell });
                console.log(`AI thinks that a good decision is to move from: ${a.from} to: ${a.to}`);

                this.selectCell(a.from.yPos, a.from.xPos);
                this.moveCell(a.to.yPos, a.to.xPos);
                return;
            }

            let whoCares: { to: GameCell, from: GameCell }[] = [];

            for (let block of blocks) {
                for (let move of moves) {
                    if (block == move) {
                        whoCares.push(block)
                    }
                }
            }

            if (whoCares.length > 0) {
                let a = (this.ai_chooseRandom(whoCares) as { to: GameCell, from: GameCell });
                console.log(`AI thinks that decision will be to move from: ${a.from} to: ${a.to}`);

                this.selectCell(a.from.yPos, a.from.xPos);
                this.moveCell(a.to.yPos, a.to.xPos);
                return;
            }

            if (blocks.length > 0) {
                let a = (this.ai_chooseRandom(blocks) as { to: GameCell, from: GameCell });
                console.log(`AI thinks that decision is to move from: ${a.from} to: ${a.to}`);

                this.selectCell(a.from.yPos, a.from.xPos);
                this.moveCell(a.to.yPos, a.to.xPos);
                return;
            }

            if (moves.length > 0) {
                let a = (this.ai_chooseRandom(moves) as { to: GameCell, from: GameCell });
                console.log(`AI thinks that at least should move from: ${a.from} to: ${a.to}`);

                this.selectCell(a.from.yPos, a.from.xPos);
                this.moveCell(a.to.yPos, a.to.xPos);
                return;
            }

            let ranMoves: { to: GameCell, from: GameCell }[] = [];

            for (let y = 0; y < GAME_HEIGHT; y++) {
                for (let x = 0; x < GAME_WIDTH; x++) {
                    if (this.gameField[y][x].value === this.acceptedValue()) {
                        let cell = this.getCellSafe(y - 1, x);
                        if (cell != null && cell.value === GameCellValue.empty) {
                            ranMoves.push({to: cell, from: this.gameField[y][x]})
                        }
                        cell = this.getCellSafe(y + 1, x);
                        if (cell != null && cell.value === GameCellValue.empty) {
                            ranMoves.push({to: cell, from: this.gameField[y][x]})
                        }
                        cell = this.getCellSafe(y, x - 1);
                        if (cell != null && cell.value === GameCellValue.empty) {
                            ranMoves.push({to: cell, from: this.gameField[y][x]})
                        }
                        cell = this.getCellSafe(y, x + 1);
                        if (cell != null && cell.value === GameCellValue.empty) {
                            ranMoves.push({to: cell, from: this.gameField[y][x]})
                        }
                    }
                }
            }

            if (ranMoves.length > 0) {
                let a = (this.ai_chooseRandom(ranMoves) as { to: GameCell, from: GameCell });
                console.log(`Ai will move randomly.... from: ${a.from} to: ${a.to}`);

                this.selectCell(a.from.yPos, a.from.xPos);
                this.moveCell(a.to.yPos, a.to.xPos);
                return;
            }

            console.warn("NO MOVES! WHAT TO DO?");
            return;
        }
    }

    ai_checkCanBlock() {
        let moves: { to: GameCell, from: GameCell }[] = [];
        let oppositeMoves = this.ai_checkCanStrike(this.oppositeValue());

        let yPos = 0;
        let xPos = 0;

        for (const move of oppositeMoves) {
            yPos = move.to.yPos;
            xPos = move.to.xPos;

            let cells = [
                this.getCellSafe(yPos - 1, xPos),
                this.getCellSafe(yPos + 1, xPos),
                this.getCellSafe(yPos, xPos - 1),
                this.getCellSafe(yPos, xPos + 1),
            ]
                .filter(cell => cell != null && cell.value == this.acceptedValue())

            for (let cell of cells) {
                moves.push({to: move.to, from: cell!})
            }
        }

        return moves;
    }

    ai_checkCanStrike(acceptedValue: GameCellValue = this.acceptedValue()): { to: GameCell, from: GameCell }[] {
        let moves: { to: GameCell, from: GameCell }[] = [];
        for (let y = 0; y < GAME_HEIGHT; y++) {
            for (let x = 0; x < GAME_WIDTH; x++) {
                //skip unwanted cells
                if (this.getCellSafe(y, x)!.value !== acceptedValue) {
                    continue;
                }

                moves.push(...this.ai_checkPossibleStrikes(y, x, acceptedValue));
                moves.push(...this.ai_checkPossibleBreaks(y, x, acceptedValue));
            }
        }
        return moves;
    }

    ai_checkPossibleBreaks(yPos: number, xPos: number, acceptedValue: GameCellValue): { to: GameCell, from: GameCell }[] {
        let moves: { to: GameCell, from: GameCell }[] = [];
        let cell: GameCell | null;

        //top
        cell = this.getCellSafe(yPos - 1, xPos);
        if (cell != null && this.getNStrikeByValue(yPos, xPos, true, false, acceptedValue, "+") === 4
            && cell.value === GameCellValue.empty) {
            moves.push({to: cell, from: this.getCellSafe(yPos, xPos)!})
        }

        //bottom
        cell = this.getCellSafe(yPos + 1, xPos);
        if (cell != null && this.getNStrikeByValue(yPos, xPos, true, false, acceptedValue, "-") === 4
            && cell.value === GameCellValue.empty) {
            moves.push({to: cell, from: this.getCellSafe(yPos, xPos)!})
        }

        //left
        cell = this.getCellSafe(yPos, xPos - 1);
        if (cell != null && this.getNStrikeByValue(yPos, xPos, false, false, acceptedValue, "+") === 4
            && cell.value === GameCellValue.empty) {
            moves.push({to: cell, from: this.getCellSafe(yPos, xPos)!})
        }

        //right
        cell = this.getCellSafe(yPos, xPos + 1);
        if (cell != null && this.getNStrikeByValue(yPos, xPos, false, false, acceptedValue, "-") === 4
            && cell.value === GameCellValue.empty) {
            moves.push({to: cell, from: this.getCellSafe(yPos, xPos)!})
        }

        return moves;
    }

    ai_checkPossibleStrikes(yPos: number, xPos: number, acceptedValue: GameCellValue): { to: GameCell, from: GameCell }[] {
        let moves: { to: GameCell, from: GameCell }[] = [];
        let getCell = this.getCellSafe.bind(this);

        let cells: { cell: GameCell | null, relativePosition: string }[] = [
            {cell: getCell(yPos - 1, xPos), relativePosition: "top"},
            {cell: getCell(yPos + 1, xPos), relativePosition: "down"},
            {cell: getCell(yPos, xPos - 1), relativePosition: "left"},
            {cell: getCell(yPos, xPos + 1), relativePosition: "right"}
        ].filter(value => value.cell != null && value.cell.value == GameCellValue.empty);

        for (let cell of cells) {
            if (this.ai_checkStrikePattern(cell.cell!.yPos, cell.cell!.xPos, acceptedValue, cell.relativePosition as "top" | "right" | "left" | "down")) {
                moves.push({to: cell.cell!, from: this.getCellSafe(yPos, xPos)!})
            }
        }

        return moves
    }

    ai_checkStrikePattern(yPos: number, xPos: number, acceptedValue: GameCellValue, relativePosition: "top" | "right" | "left" | "down"): boolean {
        let vert = 0;
        let hor = 0;

        switch (relativePosition) {
            case "top":
                vert = this.getNStrikeByValue(yPos, xPos, true, true, acceptedValue, "-");
                hor = this.getNStrikeByValue(yPos, xPos, false, true, acceptedValue, "both");

                break;
            case "down":
                vert = this.getNStrikeByValue(yPos, xPos, true, true, acceptedValue, "+");
                hor = this.getNStrikeByValue(yPos, xPos, false, true, acceptedValue, "both");

                break;
            case "left":
                vert = this.getNStrikeByValue(yPos, xPos, true, true, acceptedValue, "both");
                hor = this.getNStrikeByValue(yPos, xPos, false, true, acceptedValue, "-");

                break;
            case "right":
                vert = this.getNStrikeByValue(yPos, xPos, true, true, acceptedValue, "both");
                hor = this.getNStrikeByValue(yPos, xPos, false, true, acceptedValue, "+");

                break;
            default:
                console.error("WRONG RELATIVE POSITION " + relativePosition);
                break;
        }

        return hor === 3 || vert === 3;
    }

    ai_checkCanRemove() {
        let moves: GameCell[] = [];
        let oppositeMoves = this.ai_checkCanStrike(this.oppositeValue());

        for (const move of oppositeMoves) {
            if (move.from.state === GameCellState.available) {
                moves.push(move.from)
            }
        }

        return moves;
    }

    ai_checkCanMove(): { to: GameCell, from: GameCell }[] {
        let moves: { to: GameCell, from: GameCell }[] = [];

        let vert = 0;
        let hor = 0;
        let cell: GameCell | null;

        for (let y = 0; y < GAME_HEIGHT; y++) {
            for (let x = 0; x < GAME_WIDTH; x++) {
                //skip unwanted cells
                if (this.getCellSafe(y, x)!.value !== this.acceptedValue()) {
                    continue;
                }

                let getMoves = false;

                vert = this.getNStrike(y, x, true, false, false, "both");
                hor = this.getNStrike(y, x, false, false, false, "both");

                if (vert === 3) {
                    cell = this.getCellSafe(y, x - 1);
                    if (cell != null && cell.value === GameCellValue.empty) {
                        moves.push({to: cell, from: this.getCellSafe(y, x)!});
                        getMoves = true;
                    }
                    cell = this.getCellSafe(y, x + 1);
                    if (cell != null && cell.value === GameCellValue.empty) {
                        moves.push({to: cell, from: this.getCellSafe(y, x)!});
                        getMoves = true;
                    }
                }

                if (hor === 3) {
                    cell = this.getCellSafe(y - 1, x);
                    if (cell != null && cell.value === GameCellValue.empty) {
                        moves.push({to: cell, from: this.getCellSafe(y, x)!});
                        getMoves = true;
                    }
                    cell = this.getCellSafe(y + 1, x);
                    if (cell != null && cell.value === GameCellValue.empty) {
                        moves.push({to: cell, from: this.getCellSafe(y, x)!});
                        getMoves = true;
                    }
                }

                if (getMoves) continue;

                //move at least
                cell = this.getCellSafe(y - 1, x);
                if (cell != null && cell.value === GameCellValue.empty && this.ai_checkMovePattern(cell.yPos, cell.xPos, "top")) {
                    moves.push({to: cell, from: this.getCellSafe(y, x)!});
                    getMoves = true;
                }
                cell = this.getCellSafe(y + 1, x);
                if (cell != null && cell.value === GameCellValue.empty && this.ai_checkMovePattern(cell.yPos, cell.xPos, "down")) {
                    moves.push({to: cell, from: this.getCellSafe(y, x)!});
                    getMoves = true;
                }
                cell = this.getCellSafe(y, x - 1);
                if (cell != null && cell.value === GameCellValue.empty && this.ai_checkMovePattern(cell.yPos, cell.xPos, "left")) {
                    moves.push({to: cell, from: this.getCellSafe(y, x)!});
                    getMoves = true;
                }
                cell = this.getCellSafe(y, x + 1);
                if (cell != null && cell.value === GameCellValue.empty && this.ai_checkMovePattern(cell.yPos, cell.xPos, "right")) {
                    moves.push({to: cell, from: this.getCellSafe(y, x)!});
                    getMoves = true;
                }

                if (getMoves) continue;

                //moore least
                let cell1 = this.getCellSafe(y - 1, x);
                let cell2 = this.getCellSafe(y + 1, x);
                let cell3 = this.getCellSafe(y, x - 1);
                let cell4 = this.getCellSafe(y, x + 1);

                if (cell1 != null && cell1.value === this.acceptedValue() &&
                    cell2 != null && cell2.value === this.acceptedValue()) {
                    if (cell3 != null && cell3.value === GameCellValue.empty) {
                        moves.push({to: cell3, from: this.getCellSafe(y, x)!})
                    }
                    if (cell4 != null && cell4.value === GameCellValue.empty) {
                        moves.push({to: cell4, from: this.getCellSafe(y, x)!})
                    }
                }
                if (cell2 != null && cell2.value === this.acceptedValue() &&
                    cell3 != null && cell3.value === this.acceptedValue()) {
                    if (cell4 != null && cell4.value === GameCellValue.empty) {
                        moves.push({to: cell4, from: this.getCellSafe(y, x)!})
                    }
                    if (cell1 != null && cell1.value === GameCellValue.empty) {
                        moves.push({to: cell1, from: this.getCellSafe(y, x)!})
                    }
                }
                if (cell3 != null && cell3.value === this.acceptedValue() &&
                    cell4 != null && cell4.value === this.acceptedValue()) {
                    if (cell1 != null && cell1.value === GameCellValue.empty) {
                        moves.push({to: cell1, from: this.getCellSafe(y, x)!})
                    }
                    if (cell2 != null && cell2.value === GameCellValue.empty) {
                        moves.push({to: cell2, from: this.getCellSafe(y, x)!})
                    }
                }
                if (cell4 != null && cell4.value === this.acceptedValue() &&
                    cell1 != null && cell1.value === this.acceptedValue()) {
                    if (cell2 != null && cell2.value === GameCellValue.empty) {
                        moves.push({to: cell2, from: this.getCellSafe(y, x)!})
                    }
                    if (cell3 != null && cell3.value === GameCellValue.empty) {
                        moves.push({to: cell3, from: this.getCellSafe(y, x)!})
                    }
                }
            }
        }
        return moves;
    }

    ai_checkMovePattern(yPos: number, xPos: number, relativePosition: "top" | "right" | "left" | "down"): boolean {
        let cell_1;
        let cell_2;
        let cell_3;
        let cell_4;


        switch (relativePosition) {
            case "top":
            case "down":
                cell_1 = this.getCellSafe(yPos, xPos - 1);
                cell_2 = this.getCellSafe(yPos, xPos - 2);
                cell_3 = this.getCellSafe(yPos, xPos + 1);
                cell_4 = this.getCellSafe(yPos, xPos + 2);
                break;

            case "left":
            case "right":
                cell_1 = this.getCellSafe(yPos - 1, xPos);
                cell_2 = this.getCellSafe(yPos - 2, xPos);
                cell_3 = this.getCellSafe(yPos + 1, xPos);
                cell_4 = this.getCellSafe(yPos + 2, xPos);
                break;
            default:
                console.error("WRONG RELATIVE POSITION " + relativePosition);
                return false
        }

        return (
            cell_1 != null && cell_1.value === this.acceptedValue() ||
            cell_2 != null && cell_2.value === this.acceptedValue() ||
            cell_3 != null && cell_3.value === this.acceptedValue() ||
            cell_4 != null && cell_4.value === this.acceptedValue()
        );
    }

    ai_getAllMoves() {
        let moves: GameCell[] = [];
        for (let y = 0; y < GAME_HEIGHT; y++) {
            for (let x = 0; x < GAME_WIDTH; x++) {
                let cell = this.gameField[y][x];
                if (cell.state === GameCellState.available) {
                    moves.push(cell)
                }
            }
        }

        return moves;
    }

    ai_chooseRandom(moves: any[]): any {
        return moves[randomIndex(moves.length)]
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

    setAllCellState(state: GameCellState) {
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
        let isMovesLeft = false;
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

                if (cell.state == GameCellState.available) {
                    isMovesLeft = true;
                }
            }
        }

        if (!isMovesLeft) {
            this.setDeadHeat();
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

    getCellSafe(yPos: number, xPos: number) {
        if (yPos < 0 || yPos >= this.gameField.length ||
            xPos < 0 || xPos >= this.gameField[0].length) {
            return null;
        }

        return this.gameField[yPos][xPos];
    }

    checkCanAcceptMove(yPos: number, xPos: number) {
        let cell = this.getCellSafe(yPos, xPos);
        if (cell === null || cell.value !== GameCellValue.empty) {
            return false
        }

        return this.checkEqualSelected(yPos, xPos + 1) || this.checkEqualSelected(yPos, xPos - 1)
            || this.checkEqualSelected(yPos + 1, xPos) || this.checkEqualSelected(yPos - 1, xPos)
    }

    checkEqualSelected(yPos: number, xPos: number) {
        let cell = this.getCellSafe(yPos, xPos);

        return cell === this.selectedCell;
    }

    checkCanMove(yPos: number, xPos: number) {
        return this.checkEmptyNotNull(yPos, xPos + 1) || this.checkEmptyNotNull(yPos, xPos - 1)
            || this.checkEmptyNotNull(yPos + 1, xPos) || this.checkEmptyNotNull(yPos - 1, xPos)
    }

    checkEmptyNotNull(yPos: number, xPos: number) {
        let cell = this.getCellSafe(yPos, xPos);

        return cell !== null && cell.value === GameCellValue.empty;
    }

    // checkEqualAccepted(yPos, xPos){
    //     let cell = this.getCellSafe(yPos, xPos);
    //
    //     return cell !== null && cell.value === this.acceptedValue();
    // }

    checkInThree(yPos: number, xPos: number) {
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

    check2nEmStrike(cell1: GameCell | null, cell2: GameCell | null, cell3: GameCell | null) {
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

    getNStrikeByValue(yPos: number, xPos: number, isVert: boolean, isZeroEmpty = true, acceptedValue: GameCellValue = this.acceptedValue(), direction: "both" | "+" | "-" = "both"): number {
        return this.getNStrike(yPos, xPos, isVert, isZeroEmpty, acceptedValue !== this.acceptedValue(), direction)
    }

    getNStrike(yPos: number, xPos: number, isVert: boolean, isZeroEmpty = true, isReversed = false, direction: "both" | "+" | "-" = "both"): number {
        // console.log(this.gameField);
        let strike = 0;
        let strikedCells = [];
        let cell = this.getCellSafe(yPos, xPos);

        if (cell === null) return 0;

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

        // console.log(strikedCells);
        return strike;
    }

    private oppositeValue = () => !this.isNutsMove ? GameCellValue.nut : GameCellValue.stick;

    private acceptedValue = () => this.isNutsMove ? GameCellValue.nut : GameCellValue.stick;

}

//help functions

/**
 * @see https://www.w3schools.com/js/js_random.asp
 * @see https://stackoverflow.com/questions/4959975/generate-random-number-between-two-numbers-in-javascript
 */
function randomBetween(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1) + min) //both included
}

function randomIndex(maxLength: number) {
    return randomBetween(0, maxLength - 1)
}

function sleep(millis: number) {
    return new Promise(resolve => setTimeout(resolve, millis));
}