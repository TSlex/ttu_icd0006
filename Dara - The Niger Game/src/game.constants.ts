export let windows_height = () => Math.max(
    document.body.scrollHeight,
    document.documentElement.scrollHeight,
    document.body.offsetHeight,
    document.documentElement.offsetHeight,
    document.documentElement.clientHeight
);

export let windows_width = () => Math.max(
    document.body.scrollWidth,
    document.documentElement.scrollWidth,
    document.body.offsetWidth,
    document.documentElement.offsetWidth,
    document.documentElement.clientWidth
);

export const GAME_HEIGHT = 5;
export const GAME_WIDTH = 6;
export const FLAGS_COUNT = 12;
export const AI_SLEEP = 600;
export const AI_SELECT = 400;

export enum GameCellValue {
    empty,
    nut,
    stick
}

export enum GameCellState {
    empty,
    blocked,
    available,
    selected
}

export enum GamePhase {
    not_started = -1,
    drop_phase,
    move_phase,
    over
}