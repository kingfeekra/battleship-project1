import {g} from "./gameboard.js"

function placeCarrier(start, end, shipName) {
    g.bfs(start, end, shipName);
    return g.squares["1,1"];
}

export {placeCarrier}