export let windows_height = Math.max(
    document.body.scrollHeight,
    document.documentElement.scrollHeight,
    document.body.offsetHeight,
    document.documentElement.offsetHeight,
    document.documentElement.clientHeight
);

export let windows_width = Math.max(
    document.body.scrollWidth,
    document.documentElement.scrollWidth,
    document.body.offsetWidth,
    document.documentElement.offsetWidth,
    document.documentElement.clientWidth
);

export const GAME_HEIGHT = 5;
export const GAME_WIDTH = 6;
export const FLAGS_COUNT = 12;

/*
 * Kind a enums
 * @see https://stackoverflow.com/questions/287903/what-is-the-preferred-syntax-for-defining-enums-in-javascript
*/

export const GameCellValue = Object.freeze({"empty":0, "nut":1, "stick":2});
export const GameCellState = Object.freeze({"none":0, "blocked":1, "available":2, "selected":3});
export const GamePhase = Object.freeze({"drop":0, "move":1, "over":2});