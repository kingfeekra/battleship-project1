import {createShips} from "./index.js";
import {gameboard, addVertsAndEdges} from "./gameboard.js"

class player {
    constructor() {
        this.ships = new createShips("player")
        this.gameboard = new gameboard;
    }

    attack(computer) {
        computer.gameboard.receiveAttack(computer, "1,1");
    }
}

let player1 = new player;
let computer1 = new player;

addVertsAndEdges(player1.gameboard);
addVertsAndEdges(computer1.gameboard);

export{player1, computer1};