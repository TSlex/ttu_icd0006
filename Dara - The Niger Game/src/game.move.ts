import {GameCell} from "./game.cell";
import {GAME_HEIGHT, GAME_WIDTH, GamePhase} from "./game.constants";

export class GameMove {
    public gamePhase: GamePhase = GamePhase.not_started;

    public gameStatus1: string = "Not started";
    public gameStatus2: string = "You not supposed to see this...";

    public gameField: GameCell[][] = [];

    public isNutsMove: boolean = false;

    public selectedCell: GameCell | null = null;
    public isRemovingCell = false;

    public nutsLeft: number = 0;
    public sticksLeft: number = 0;

    constructor(gamePhase: GamePhase, gameStatus1: string, gameStatus2: string, gameField: GameCell[][], isNutsMove: boolean, selectedCell: GameCell | null, isRemovingCell: boolean, nutsLeft: number, sticksLeft: number) {
        this.gamePhase = gamePhase;
        this.gameStatus1 = gameStatus1;
        this.gameStatus2 = gameStatus2;
        this.gameField = gameField;
        this.isNutsMove = isNutsMove;
        this.selectedCell = selectedCell;
        this.isRemovingCell = isRemovingCell;
        this.nutsLeft = nutsLeft;
        this.sticksLeft = sticksLeft;
    }
}