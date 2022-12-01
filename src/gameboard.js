import {createShips} from "./index.js";

class gameboard {
    constructor() {
        this.vertices = [];
        this.adjacent = {};
        this.edges = 0;
        this.squares = {}
    }

    addVertex(v) {
        this.vertices.push(v);
        this.adjacent[v] = [];
        this.squares[v] = false;
    }

    addEdge(v, w) {
        let test = w;
        if(test.includes(-1) || test.includes(0)
           || test.includes(9) || test.includes(10)) {
            return;
        } //get rid of coordinates not on chessboard
            
        this.adjacent[v].push(w);
        this.edges++;
    }

    receiveAttack(player, coord) {
        if(Object.keys(player.ships).includes(this.squares[coord])) {
            player.ships[this.squares[coord]].hit();
            this.squares[coord] = "hit";
        }
        else if(this.squares[coord] == false) {
            this.squares[coord] = "miss";
            return this.squares[coord];
        }
    }

    bfs(root, goal, shipName) { //breadth first search algorithm to find shortest path between two squares
        let adj = this.adjacent;

        const queue = [];
        queue.push(root);

        const discovered = [];
        discovered[root] = true;
        
        const edges = [];
        edges[root] = 0;

        //add vertices array and initialize it with root
        const predecessors = [];
        predecessors[root] = null;

        const buildPath = (goal, root, predecessors) => {
            const stack = []; //declare and initialize a "stack"
            stack.push(goal); //push our goal to the stack

            let u = predecessors[goal];

            while(u != root) {
                stack.push(u); //push each predecessor to the stack
                u = predecessors[u];
            }

            stack.push(root);
            for(let i = 0; i < stack.length; i++) {
            this.squares[stack[i]] = shipName;
            }
            console.log(stack);
            let path = stack.reverse().join('-->'); //join coordinates together to form path

            return path;
        }

        while(queue.length) {
            let v = queue.shift();

            if (v === goal) { //if our goal comes up in queue, return shortest path to goal
                return {
                    ShortestPath: buildPath(goal, root, predecessors)
                }
            }

            for (let i = 0; i < adj[v].length; i++) {
                if (!discovered[adj[v][i]]) {
                    discovered[adj[v][i]] = true; //if next vertex not discovered, make it discovered
                    queue.push(adj[v][i]); //push next vertex to queue
                    edges[adj[v][i]] = edges[v] + 1; //edges of previous vertex plus 1
                    predecessors[adj[v][i]] = v //create a key in vertices array with the current vertex
                    //assign it a value of its predecessor
                }
            }
        }

        return false;
    }
}

const g = new gameboard();
function addVertsAndEdges() {

    for(let i = 1; i < 11; i++) {
        for(let j = 1; j < 11; j++) {
            g.addVertex(`${i},${j}`); //must be added as string, adding as array causes problems
        }
    }

    for(let i = 1; i < 11; i++) {
        for(let j = 1; j < 11; j++) { //coordinates must be added as strings, adding as arrays causes problems
            g.addEdge(`${i},${j}`,`${i},${j + 1}`);
            g.addEdge(`${i},${j}`,`${i + 1},${j}`);
            g.addEdge(`${i},${j}`,`${i},${j - 1}`);
            g.addEdge(`${i},${j}`,`${i - 1},${j}`);
            
        }
    }
    
}

let startingSquare = "1,1"; //must be a string
let endingSquare = "1,5";

addVertsAndEdges();
console.log(`The shortest path from ${startingSquare} to ${endingSquare}:`);
//console.log(g.bfs("1,1","1,5"));

export {g, gameboard, addVertsAndEdges}