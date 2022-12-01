import {createShips} from "./index.js";
import {gameboard, addVertsAndEdges} from "./gameboard.js"
import {placeShip} from "./placeShips.js"

class player {
    constructor() {
        this.ships = new createShips("player")
        this.gameboard = new gameboard;
    }

    placeShip(start, end, shipName) {
        computer1.gameboard.bfs(start, end, shipName);
        return computer1.gameboard.squares["1,1"];
    }

    attack(coord) {
       return computer1.gameboard.receiveAttack(computer1, coord);
        //return computer1.ships.ships.carrier.hits;
    }
}

let player1 = new player;
let computer1 = new player;

addVertsAndEdges(player1.gameboard);
addVertsAndEdges(computer1.gameboard);

export{player1, computer1};