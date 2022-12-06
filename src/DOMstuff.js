import {player1, computer1} from "./players.js"
function board(player) {
    let center = document.createElement('center');

    // Create a table element
    let ChessTable = document.createElement('table');
    for (let i = 1; i < 11; i++) {

        // Create a row
        let tr = document.createElement('tr');
        for (let j = 1; j < 11; j++) {

            // Create a cell
            let td = document.createElement('td');
            td.textContent = `${j},${i}`

            td.addEventListener("click", () => {
                
            })
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
    console.log(Object.keys(player1.gameboard.squares));
}

function assignCoords() {

}

export {board};
