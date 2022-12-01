import {playerBoard} from "./gameboard.js"
import {player1} from "./players.js"

function placeShip(start, end, shipName) {
    playerBoard.bfs(start, end, shipName);
    return playerBoard.squares["1,1"];
}

export {placeShip}