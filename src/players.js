import {createShips} from "./index.js";
import {gameboard, addVertsAndEdges} from "./gameboard.js"

class player {
    constructor() {
        this.ships = new createShips("player")
        this.gameboard = new gameboard;
    }

    placeShip(start, end, shipName) {
        player1.gameboard.bfs(start, end, shipName);
        return player1.gameboard.squares["1,1"];
    }

    attack(coord) {
       return computer1.gameboard.receiveAttack(computer1, coord);
        //return computer1.ships.ships.carrier.hits;
    }
}

class computer {
    constructor() {
        this.ships = new createShips("computer")
        this.gameboard = new gameboard;
    }

    placeShip(start, end, shipName) {
        computer1.gameboard.bfs(start, end, shipName);
        //return computer1.gameboard.squares["1,1"];
    }

    attack(coord) {
       return player1.gameboard.receiveAttack(player1, coord);
        //return computer1.ships.ships.carrier.hits;
    }
}

function placeShips(player) {
    player.placeShip("1,1", "1,9", "carrier");
    player.placeShip("2,3", "6,3", "battleship");
    player.placeShip("5,4", "5,6", "cruiser");
    player.placeShip("7,7", "7,9", "submarine");
    player.placeShip("9,9", "9,10", "destroyer");
    return player.gameboard;
}

let player1 = new player;
let computer1 = new computer;

addVertsAndEdges(player1.gameboard);
addVertsAndEdges(computer1.gameboard);

placeShips(player1);
placeShips(computer1);
export{player1, computer1};