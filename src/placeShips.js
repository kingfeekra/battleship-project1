import {g} from "./gameboard.js"

function placeShip(start, end, shipName) {
    g.bfs(start, end, shipName);
    return g.squares["1,1"];
}

export {placeShip}