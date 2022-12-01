/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/gameboard.js":
/*!**************************!*\
  !*** ./src/gameboard.js ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "addVertsAndEdges": () => (/* binding */ addVertsAndEdges),
/* harmony export */   "computerBoard": () => (/* binding */ computerBoard),
/* harmony export */   "gameboard": () => (/* binding */ gameboard),
/* harmony export */   "playerBoard": () => (/* binding */ playerBoard)
/* harmony export */ });
/* harmony import */ var _index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./index.js */ "./src/index.js");


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
        if(Object.keys(player.ships.ships).includes(this.squares[coord])) {
            player.ships.ships[this.squares[coord]].hit();
            this.squares[coord] = "hit";
            return this.squares[coord];
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

const playerBoard = new gameboard();
const computerBoard = new gameboard();
function addVertsAndEdges(board) {

    for(let i = 1; i < 11; i++) {
        for(let j = 1; j < 11; j++) {
            board.addVertex(`${i},${j}`); //must be added as string, adding as array causes problems
        }
    }

    for(let i = 1; i < 11; i++) {
        for(let j = 1; j < 11; j++) { //coordinates must be added as strings, adding as arrays causes problems
            board.addEdge(`${i},${j}`,`${i},${j + 1}`);
            board.addEdge(`${i},${j}`,`${i + 1},${j}`);
            board.addEdge(`${i},${j}`,`${i},${j - 1}`);
            board.addEdge(`${i},${j}`,`${i - 1},${j}`);
            
        }
    }
    
}
addVertsAndEdges(playerBoard);
addVertsAndEdges(computerBoard);



/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "createShips": () => (/* binding */ createShips)
/* harmony export */ });
/* harmony import */ var _src_gameboard_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../src/gameboard.js */ "./src/gameboard.js");



function createShips(player) {
  const ships = {
      carrier: {
        length: 5,
        hits: 0,
        sunk: false,
        hit: function() {
          this.hits++;
        },
        isSunk: function() {
          if(this.hits >= this.length) {
            this.sunk = true;
          }
        }
      },
      battleship: {
        length: 4,
        hits: 0,
        sunk: false,
        hit: function() {
          this.hits++;
        },
        isSunk: function() {
          if(this.hits >= this.length) {
            this.sunk = true;
          }
        }
      },
      cruiser : {
        length: 3,
        hits: 0,
        sunk: false,
        hit: function() {
          this.hits++;
        },
        isSunk: function() {
          if(this.hits >= this.length) {
            this.sunk = true;
          }
        }
      },
      submarine: {
        length: 2,
        hits: 0,
        sunk: false,
        hit: function() {
          this.hits++;
        },
        isSunk: function() {
          if(this.hits >= this.length) {
            this.sunk = true;
          }
        }
      },
      destroyer: {
        length: 1,
        hits: 0,
        sunk: false,
        hit: function() {
          this.hits++;
        },
        isSunk: function() {
          if(this.hits >= this.length) {
            this.sunk = true;
          }
        }
      }
    }

  return {
    player: player,
    ships
  }
}



/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.js");
/******/ 	
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBdUM7O0FBRXZDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVU7QUFDVjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLGdDQUFnQztBQUNoQzs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0EsOEJBQThCO0FBQzlCLDhCQUE4Qjs7QUFFOUI7O0FBRUE7QUFDQSwrQkFBK0I7QUFDL0I7QUFDQTs7QUFFQTtBQUNBLDJCQUEyQixrQkFBa0I7QUFDN0M7QUFDQTtBQUNBO0FBQ0Esb0RBQW9EOztBQUVwRDtBQUNBOztBQUVBO0FBQ0E7O0FBRUEsOEJBQThCO0FBQzlCO0FBQ0E7QUFDQTtBQUNBOztBQUVBLDRCQUE0QixtQkFBbUI7QUFDL0M7QUFDQSxrREFBa0Q7QUFDbEQsMkNBQTJDO0FBQzNDLHFEQUFxRDtBQUNyRDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUEsbUJBQW1CLFFBQVE7QUFDM0IsdUJBQXVCLFFBQVE7QUFDL0IsK0JBQStCLEVBQUUsR0FBRyxFQUFFLElBQUk7QUFDMUM7QUFDQTs7QUFFQSxtQkFBbUIsUUFBUTtBQUMzQix1QkFBdUIsUUFBUSxPQUFPO0FBQ3RDLDZCQUE2QixFQUFFLEdBQUcsRUFBRSxLQUFLLEVBQUUsR0FBRyxNQUFNO0FBQ3BELDZCQUE2QixFQUFFLEdBQUcsRUFBRSxLQUFLLE1BQU0sR0FBRyxFQUFFO0FBQ3BELDZCQUE2QixFQUFFLEdBQUcsRUFBRSxLQUFLLEVBQUUsR0FBRyxNQUFNO0FBQ3BELDZCQUE2QixFQUFFLEdBQUcsRUFBRSxLQUFLLE1BQU0sR0FBRyxFQUFFO0FBQ3BEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7OztBQzFINkM7OztBQUc3QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7O1VDNUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7O1dDdEJBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EseUNBQXlDLHdDQUF3QztXQUNqRjtXQUNBO1dBQ0E7Ozs7O1dDUEE7Ozs7O1dDQUE7V0FDQTtXQUNBO1dBQ0EsdURBQXVELGlCQUFpQjtXQUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdEOzs7OztVRU5BO1VBQ0E7VUFDQTtVQUNBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC1wcm9qZWN0Ly4vc3JjL2dhbWVib2FyZC5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLXByb2plY3QvLi9zcmMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC1wcm9qZWN0L3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL2JhdHRsZXNoaXAtcHJvamVjdC93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC1wcm9qZWN0L3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC1wcm9qZWN0L3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC1wcm9qZWN0L3dlYnBhY2svYmVmb3JlLXN0YXJ0dXAiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC1wcm9qZWN0L3dlYnBhY2svc3RhcnR1cCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLXByb2plY3Qvd2VicGFjay9hZnRlci1zdGFydHVwIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7Y3JlYXRlU2hpcHN9IGZyb20gXCIuL2luZGV4LmpzXCI7XG5cbmNsYXNzIGdhbWVib2FyZCB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHRoaXMudmVydGljZXMgPSBbXTtcbiAgICAgICAgdGhpcy5hZGphY2VudCA9IHt9O1xuICAgICAgICB0aGlzLmVkZ2VzID0gMDtcbiAgICAgICAgdGhpcy5zcXVhcmVzID0ge31cbiAgICB9XG5cbiAgICBhZGRWZXJ0ZXgodikge1xuICAgICAgICB0aGlzLnZlcnRpY2VzLnB1c2godik7XG4gICAgICAgIHRoaXMuYWRqYWNlbnRbdl0gPSBbXTtcbiAgICAgICAgdGhpcy5zcXVhcmVzW3ZdID0gZmFsc2U7XG4gICAgfVxuXG4gICAgYWRkRWRnZSh2LCB3KSB7XG4gICAgICAgIGxldCB0ZXN0ID0gdztcbiAgICAgICAgaWYodGVzdC5pbmNsdWRlcygtMSkgfHwgdGVzdC5pbmNsdWRlcygwKVxuICAgICAgICAgICB8fCB0ZXN0LmluY2x1ZGVzKDkpIHx8IHRlc3QuaW5jbHVkZXMoMTApKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH0gLy9nZXQgcmlkIG9mIGNvb3JkaW5hdGVzIG5vdCBvbiBjaGVzc2JvYXJkXG4gICAgICAgICAgICBcbiAgICAgICAgdGhpcy5hZGphY2VudFt2XS5wdXNoKHcpO1xuICAgICAgICB0aGlzLmVkZ2VzKys7XG4gICAgfVxuXG4gICAgcmVjZWl2ZUF0dGFjayhwbGF5ZXIsIGNvb3JkKSB7XG4gICAgICAgIGlmKE9iamVjdC5rZXlzKHBsYXllci5zaGlwcy5zaGlwcykuaW5jbHVkZXModGhpcy5zcXVhcmVzW2Nvb3JkXSkpIHtcbiAgICAgICAgICAgIHBsYXllci5zaGlwcy5zaGlwc1t0aGlzLnNxdWFyZXNbY29vcmRdXS5oaXQoKTtcbiAgICAgICAgICAgIHRoaXMuc3F1YXJlc1tjb29yZF0gPSBcImhpdFwiO1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuc3F1YXJlc1tjb29yZF07XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZih0aGlzLnNxdWFyZXNbY29vcmRdID09IGZhbHNlKSB7XG4gICAgICAgICAgICB0aGlzLnNxdWFyZXNbY29vcmRdID0gXCJtaXNzXCI7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5zcXVhcmVzW2Nvb3JkXTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGJmcyhyb290LCBnb2FsLCBzaGlwTmFtZSkgeyAvL2JyZWFkdGggZmlyc3Qgc2VhcmNoIGFsZ29yaXRobSB0byBmaW5kIHNob3J0ZXN0IHBhdGggYmV0d2VlbiB0d28gc3F1YXJlc1xuICAgICAgICBsZXQgYWRqID0gdGhpcy5hZGphY2VudDtcblxuICAgICAgICBjb25zdCBxdWV1ZSA9IFtdO1xuICAgICAgICBxdWV1ZS5wdXNoKHJvb3QpO1xuXG4gICAgICAgIGNvbnN0IGRpc2NvdmVyZWQgPSBbXTtcbiAgICAgICAgZGlzY292ZXJlZFtyb290XSA9IHRydWU7XG4gICAgICAgIFxuICAgICAgICBjb25zdCBlZGdlcyA9IFtdO1xuICAgICAgICBlZGdlc1tyb290XSA9IDA7XG5cbiAgICAgICAgLy9hZGQgdmVydGljZXMgYXJyYXkgYW5kIGluaXRpYWxpemUgaXQgd2l0aCByb290XG4gICAgICAgIGNvbnN0IHByZWRlY2Vzc29ycyA9IFtdO1xuICAgICAgICBwcmVkZWNlc3NvcnNbcm9vdF0gPSBudWxsO1xuXG4gICAgICAgIGNvbnN0IGJ1aWxkUGF0aCA9IChnb2FsLCByb290LCBwcmVkZWNlc3NvcnMpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IHN0YWNrID0gW107IC8vZGVjbGFyZSBhbmQgaW5pdGlhbGl6ZSBhIFwic3RhY2tcIlxuICAgICAgICAgICAgc3RhY2sucHVzaChnb2FsKTsgLy9wdXNoIG91ciBnb2FsIHRvIHRoZSBzdGFja1xuXG4gICAgICAgICAgICBsZXQgdSA9IHByZWRlY2Vzc29yc1tnb2FsXTtcblxuICAgICAgICAgICAgd2hpbGUodSAhPSByb290KSB7XG4gICAgICAgICAgICAgICAgc3RhY2sucHVzaCh1KTsgLy9wdXNoIGVhY2ggcHJlZGVjZXNzb3IgdG8gdGhlIHN0YWNrXG4gICAgICAgICAgICAgICAgdSA9IHByZWRlY2Vzc29yc1t1XTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgc3RhY2sucHVzaChyb290KTtcbiAgICAgICAgICAgIGZvcihsZXQgaSA9IDA7IGkgPCBzdGFjay5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgdGhpcy5zcXVhcmVzW3N0YWNrW2ldXSA9IHNoaXBOYW1lO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY29uc29sZS5sb2coc3RhY2spO1xuICAgICAgICAgICAgbGV0IHBhdGggPSBzdGFjay5yZXZlcnNlKCkuam9pbignLS0+Jyk7IC8vam9pbiBjb29yZGluYXRlcyB0b2dldGhlciB0byBmb3JtIHBhdGhcblxuICAgICAgICAgICAgcmV0dXJuIHBhdGg7XG4gICAgICAgIH1cblxuICAgICAgICB3aGlsZShxdWV1ZS5sZW5ndGgpIHtcbiAgICAgICAgICAgIGxldCB2ID0gcXVldWUuc2hpZnQoKTtcblxuICAgICAgICAgICAgaWYgKHYgPT09IGdvYWwpIHsgLy9pZiBvdXIgZ29hbCBjb21lcyB1cCBpbiBxdWV1ZSwgcmV0dXJuIHNob3J0ZXN0IHBhdGggdG8gZ29hbFxuICAgICAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgICAgIFNob3J0ZXN0UGF0aDogYnVpbGRQYXRoKGdvYWwsIHJvb3QsIHByZWRlY2Vzc29ycylcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgYWRqW3ZdLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgaWYgKCFkaXNjb3ZlcmVkW2Fkalt2XVtpXV0pIHtcbiAgICAgICAgICAgICAgICAgICAgZGlzY292ZXJlZFthZGpbdl1baV1dID0gdHJ1ZTsgLy9pZiBuZXh0IHZlcnRleCBub3QgZGlzY292ZXJlZCwgbWFrZSBpdCBkaXNjb3ZlcmVkXG4gICAgICAgICAgICAgICAgICAgIHF1ZXVlLnB1c2goYWRqW3ZdW2ldKTsgLy9wdXNoIG5leHQgdmVydGV4IHRvIHF1ZXVlXG4gICAgICAgICAgICAgICAgICAgIGVkZ2VzW2Fkalt2XVtpXV0gPSBlZGdlc1t2XSArIDE7IC8vZWRnZXMgb2YgcHJldmlvdXMgdmVydGV4IHBsdXMgMVxuICAgICAgICAgICAgICAgICAgICBwcmVkZWNlc3NvcnNbYWRqW3ZdW2ldXSA9IHYgLy9jcmVhdGUgYSBrZXkgaW4gdmVydGljZXMgYXJyYXkgd2l0aCB0aGUgY3VycmVudCB2ZXJ0ZXhcbiAgICAgICAgICAgICAgICAgICAgLy9hc3NpZ24gaXQgYSB2YWx1ZSBvZiBpdHMgcHJlZGVjZXNzb3JcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxufVxuXG5jb25zdCBwbGF5ZXJCb2FyZCA9IG5ldyBnYW1lYm9hcmQoKTtcbmNvbnN0IGNvbXB1dGVyQm9hcmQgPSBuZXcgZ2FtZWJvYXJkKCk7XG5mdW5jdGlvbiBhZGRWZXJ0c0FuZEVkZ2VzKGJvYXJkKSB7XG5cbiAgICBmb3IobGV0IGkgPSAxOyBpIDwgMTE7IGkrKykge1xuICAgICAgICBmb3IobGV0IGogPSAxOyBqIDwgMTE7IGorKykge1xuICAgICAgICAgICAgYm9hcmQuYWRkVmVydGV4KGAke2l9LCR7an1gKTsgLy9tdXN0IGJlIGFkZGVkIGFzIHN0cmluZywgYWRkaW5nIGFzIGFycmF5IGNhdXNlcyBwcm9ibGVtc1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZm9yKGxldCBpID0gMTsgaSA8IDExOyBpKyspIHtcbiAgICAgICAgZm9yKGxldCBqID0gMTsgaiA8IDExOyBqKyspIHsgLy9jb29yZGluYXRlcyBtdXN0IGJlIGFkZGVkIGFzIHN0cmluZ3MsIGFkZGluZyBhcyBhcnJheXMgY2F1c2VzIHByb2JsZW1zXG4gICAgICAgICAgICBib2FyZC5hZGRFZGdlKGAke2l9LCR7an1gLGAke2l9LCR7aiArIDF9YCk7XG4gICAgICAgICAgICBib2FyZC5hZGRFZGdlKGAke2l9LCR7an1gLGAke2kgKyAxfSwke2p9YCk7XG4gICAgICAgICAgICBib2FyZC5hZGRFZGdlKGAke2l9LCR7an1gLGAke2l9LCR7aiAtIDF9YCk7XG4gICAgICAgICAgICBib2FyZC5hZGRFZGdlKGAke2l9LCR7an1gLGAke2kgLSAxfSwke2p9YCk7XG4gICAgICAgICAgICBcbiAgICAgICAgfVxuICAgIH1cbiAgICBcbn1cbmFkZFZlcnRzQW5kRWRnZXMocGxheWVyQm9hcmQpO1xuYWRkVmVydHNBbmRFZGdlcyhjb21wdXRlckJvYXJkKTtcblxuZXhwb3J0IHtwbGF5ZXJCb2FyZCwgY29tcHV0ZXJCb2FyZCwgZ2FtZWJvYXJkLCBhZGRWZXJ0c0FuZEVkZ2VzfSIsImltcG9ydCB7Z2FtZWJvYXJkfSBmcm9tIFwiLi4vc3JjL2dhbWVib2FyZC5qc1wiXG5cblxuZnVuY3Rpb24gY3JlYXRlU2hpcHMocGxheWVyKSB7XG4gIGNvbnN0IHNoaXBzID0ge1xuICAgICAgY2Fycmllcjoge1xuICAgICAgICBsZW5ndGg6IDUsXG4gICAgICAgIGhpdHM6IDAsXG4gICAgICAgIHN1bms6IGZhbHNlLFxuICAgICAgICBoaXQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgIHRoaXMuaGl0cysrO1xuICAgICAgICB9LFxuICAgICAgICBpc1N1bms6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgIGlmKHRoaXMuaGl0cyA+PSB0aGlzLmxlbmd0aCkge1xuICAgICAgICAgICAgdGhpcy5zdW5rID0gdHJ1ZTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICBiYXR0bGVzaGlwOiB7XG4gICAgICAgIGxlbmd0aDogNCxcbiAgICAgICAgaGl0czogMCxcbiAgICAgICAgc3VuazogZmFsc2UsXG4gICAgICAgIGhpdDogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgdGhpcy5oaXRzKys7XG4gICAgICAgIH0sXG4gICAgICAgIGlzU3VuazogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgaWYodGhpcy5oaXRzID49IHRoaXMubGVuZ3RoKSB7XG4gICAgICAgICAgICB0aGlzLnN1bmsgPSB0cnVlO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgIGNydWlzZXIgOiB7XG4gICAgICAgIGxlbmd0aDogMyxcbiAgICAgICAgaGl0czogMCxcbiAgICAgICAgc3VuazogZmFsc2UsXG4gICAgICAgIGhpdDogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgdGhpcy5oaXRzKys7XG4gICAgICAgIH0sXG4gICAgICAgIGlzU3VuazogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgaWYodGhpcy5oaXRzID49IHRoaXMubGVuZ3RoKSB7XG4gICAgICAgICAgICB0aGlzLnN1bmsgPSB0cnVlO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgIHN1Ym1hcmluZToge1xuICAgICAgICBsZW5ndGg6IDIsXG4gICAgICAgIGhpdHM6IDAsXG4gICAgICAgIHN1bms6IGZhbHNlLFxuICAgICAgICBoaXQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgIHRoaXMuaGl0cysrO1xuICAgICAgICB9LFxuICAgICAgICBpc1N1bms6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgIGlmKHRoaXMuaGl0cyA+PSB0aGlzLmxlbmd0aCkge1xuICAgICAgICAgICAgdGhpcy5zdW5rID0gdHJ1ZTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICBkZXN0cm95ZXI6IHtcbiAgICAgICAgbGVuZ3RoOiAxLFxuICAgICAgICBoaXRzOiAwLFxuICAgICAgICBzdW5rOiBmYWxzZSxcbiAgICAgICAgaGl0OiBmdW5jdGlvbigpIHtcbiAgICAgICAgICB0aGlzLmhpdHMrKztcbiAgICAgICAgfSxcbiAgICAgICAgaXNTdW5rOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICBpZih0aGlzLmhpdHMgPj0gdGhpcy5sZW5ndGgpIHtcbiAgICAgICAgICAgIHRoaXMuc3VuayA9IHRydWU7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gIHJldHVybiB7XG4gICAgcGxheWVyOiBwbGF5ZXIsXG4gICAgc2hpcHNcbiAgfVxufVxuXG5leHBvcnQge2NyZWF0ZVNoaXBzfTsiLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsIiIsIi8vIHN0YXJ0dXBcbi8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuLy8gVGhpcyBlbnRyeSBtb2R1bGUgaXMgcmVmZXJlbmNlZCBieSBvdGhlciBtb2R1bGVzIHNvIGl0IGNhbid0IGJlIGlubGluZWRcbnZhciBfX3dlYnBhY2tfZXhwb3J0c19fID0gX193ZWJwYWNrX3JlcXVpcmVfXyhcIi4vc3JjL2luZGV4LmpzXCIpO1xuIiwiIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9