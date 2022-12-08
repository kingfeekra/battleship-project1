import { player1, computer1 } from "./players";

function gameLoop(square) {
    player1.attack(square.textContent);
    setTimeout(computerAttack,2000);
    return computer1.gameboard.squares.square;
}

function computerAttack() {
    let keys = Object.keys(player1.gameboard.squares)
    computer1.attack(keys[Math.floor(Math.random() * keys.length)])
}



export {gameLoop}