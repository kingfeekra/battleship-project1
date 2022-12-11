import {player1, computer1} from "./players.js"
import {gameLoop} from "./gameLoop.js"

function board(player, className) {
    let playerboard = player;
    let center = document.createElement('center');

    // Create a table element
    let ChessTable = document.createElement('table');
    ChessTable.classList.add(className)
    for (let i = 1; i < 11; i++) {

        // Create a row
        let tr = document.createElement('tr');
        for (let j = 1; j < 11; j++) {

            // Create a cell
            let td = document.createElement('td');
            td.textContent = `${j},${i}`
            
            if(playerboard == computer1){
                td.addEventListener("click", 
                    function() {
                        player1.attack(td.textContent);
                        squareChange(computer1.gameboard.squares[td.textContent], td)
                        setTimeout(
                            function(){
                            let keys = Object.keys(player1.gameboard.squares)
                            let randomSquare = keys[Math.floor(Math.random() * keys.length)]
                            computer1.attack(randomSquare);
                            
                            let squaresList = document.querySelectorAll(".playerBoard > tr > td")
                            console.log(squaresList);
                            for(let i = 0; i < squaresList.length; i++) {
                                if(squaresList[i].textContent == randomSquare)
                                squareChange(player1.gameboard.squares[randomSquare], squaresList[i])
                            }
                            console.log(computer1.gameboard.squares)},500);
                    }
                );
            }
            // If the sum of cell coordinates is even
            // then color the cell white
            if ((i + j) % 2 == 0) {

                // Create a class attribute for all white cells
                td.setAttribute('class', 'cell whitecell');
                tr.appendChild(td);
            }

            // If the sum of cell coordinates is odd then
            // color the cell black
            else {

                // Create a class attribute for all black cells
                td.setAttribute('class', 'cell whitecell');

                // Append the cell to its row
                tr.appendChild(td);
            }
        }

        // Append the row
        ChessTable.appendChild(tr);
    }
    center.appendChild(ChessTable);

    // Modifying table attribute properties
    ChessTable.setAttribute('cellspacing', '0');
    ChessTable.setAttribute('width', '330px');
    let docBody = document.querySelector("body");
    docBody.appendChild(center);
}

function headings() {
    let getCenter = document.querySelectorAll("center");
    let h1 = document.createElement("h1");
    h1.textContent = "Battleship"
    getCenter[0].insertBefore(h1, getCenter[0].children[0]);

    let computerHeading = document.createElement("h2");
    computerHeading.textContent = "Computer's Board";
    getCenter[0].insertBefore(computerHeading, getCenter[0].children[1]);


    let playerHeading = document.createElement("h2");
    playerHeading.textContent = "Your Board";
    getCenter[1].insertBefore(playerHeading, getCenter[1].children[0]);
}

function squareColors(player) {
    let keys = Object.keys(player.gameboard.squares);
    for(let i = 0; i < keys.length; i++) {
        if(player.gameboard.squares[keys[i]] != false &&
           player.gameboard.squares[keys[i]] != "miss" &&
           player.gameboard.squares[keys[i]] != "hit") {
               let squares = document.querySelectorAll("td");
               for(let j = 0; j < squares.length; j++) {
                    if(squares[j].textContent == keys[i]) {
                        squares[j].classList.add("takenSquare");
                    }
               }
             
           }
    }
}

function squareChange(status, square) {
    if(status == "hit") {
        const hitSVG = document.createElementNS("http://www.w3.org/2000/svg","svg");
        hitSVG.setAttributeNS(null, "viewbox", "0 0 24 24");
        hitSVG.classList.add("hitSVG");
        square.appendChild(hitSVG);

        const pathNode = document.createElementNS("http://www.w3.org/2000/svg", "path");
        pathNode.setAttributeNS(null, "fill", "white");
        pathNode.setAttributeNS(null, "d", "M9,20.42L2.79,14.21L5.62,11.38L9,14.77L18.88,4.88L21.71,7.71L9,20.42Z");
        
        square.children[0].appendChild(pathNode);
    }
}

export {board, headings, squareColors, squareChange};
