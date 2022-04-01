/** Connect Four
 *
 * Player 1 and 2 alternate turns. On each turn, a piece is dropped down a
 * column until a player gets four-in-a-row (horiz, vert, or diag) or until
 * board fills (tie)
 */

const WIDTH = 7;
const HEIGHT = 6;

let currPlayer = 1; // active player: 1 or 2
const playerColor = [];
playerColor[0] = "#FFDD00";
playerColor[1] = '#0057B7';
const board = []; // array of rows, each row is array of cells  (board[y][x])
let gameOver = false;

/** makeBoard: create in-JS board structure:
 *    board = array of rows, each row is array of cells  (board[y][x])
 */

const makeBoard = function() {
  // TODO: set "board" to empty HEIGHT x WIDTH matrix array
  // board = [...Array(HEIGHT)].map(() => [...Array(WIDTH)].map(() => null));   // this will work if board is let not const
  for (h = 0; h < HEIGHT; h++) {
    board.push([]);
    for (w = 0; w < WIDTH; w++) {
      board[h][w] = null // w * h;
    }
  }
}

/** makeHtmlBoard: make HTML table and row of column tops. */

const makeHtmlBoard = function() {
  // TODO: get "htmlBoard" variable from the item in HTML w/ID of "board"
const htmlBoard = document.getElementById("board");

  // TODO: add comment for this code
  let top = document.createElement("tr"); // add the top row to the table
  top.setAttribute("id", "column-top");
  top.addEventListener("click", handleClick); // listen for a click on a cell in this top row

  for (let x = 0; x < WIDTH; x++) { // loop to create the cells on the top row
    let headCell = document.createElement("td"); // create a cell for each column
    headCell.setAttribute("id", x); // give each top cell an id with the number of the column
    top.append(headCell); // add the cell to the top row
  }
  htmlBoard.append(top); // add the top row to the table

  // TODO: add comment for this code
  for (let y = 0; y < HEIGHT; y++) { // add rows to the table
    const row = document.createElement("tr");
    for (let x = 0; x < WIDTH; x++) {
      const cell = document.createElement("td"); // add a cell to the row for each column
      cell.setAttribute("id", `${y}-${x}`); // give each cell an id with the number of the row and column
      row.append(cell); // add the cell to the row
    }
    htmlBoard.append(row); // add the row to the table
  }
}

/** findSpotForCol: given column x, return top empty y (null if filled) */

function findSpotForCol(x) {
  // TODO: write the real version of this, rather than always returning 0
  for (let y = HEIGHT-1; y >=0; y--) {
// console.log(y, board[y][x]);
if(board[y][x] === null) {
  return y;
}
  }
  return null;
}

/** placeInTable: update DOM to place piece into HTML table of board */

function placeInTable(y, x) {
  // TODO: make a div and insert into correct table cell
  // create a new div
  const newDiv = document.createElement("div");
  newDiv.setAttribute("id", `p${y}-${x}`);
  newDiv.setAttribute("class", 'piece');
  let theBox = document.getElementById(`${y}-${x}`);
  theBox.append(newDiv);
  newDiv.style.backgroundColor = playerColor[currPlayer - 1]; // player colored
  board[y][x] = currPlayer; // player number
}

/** handleClick: handle click of column top to play piece */

function handleClick(evt) {
  if (!gameOver) {
  // get x from ID of clicked cell
  let x = +evt.target.id;

  // get next spot in column (if none, ignore click)
  let y = findSpotForCol(x);

  if (y === null) {
    return;
  }

  // place piece in board and add to HTML table
  // TODO: add line to update in-memory board
  placeInTable(y, x);

  // check for win
  if (checkForWin()) {
    return endGame(`Player ${currPlayer} won!`);
  }

  // check for tie
  // TODO: check if all cells in board are filled; if so call, call endGame
  // add a check for “is the entire board filled” [hint: the JS every method on arrays would be especially nice here!]

  let itsATie = true;
  for (let y = 0; y < HEIGHT; y++) {
    for (let x = 0; x < WIDTH; x++) {
      if(board[y][x] === null) {
        itsATie = false;
      }
    }
  }

// let aTie = (v) => (v !== null);
// let isATie = board.every(aTie);
// console.log(isATie);

  if(itsATie) {
  // if(board.every(board[y][x] !== null)) {
    endGame("It's a tie!!!");
  }

  // switch players
  // TODO: switch currPlayer 1 <-> 2
  // add code to switch currPlayer between 1 and 2. This would be a great place for a ternary function.
  if(currPlayer === 1) {
    currPlayer = 2
  } else {
    currPlayer = 1
  }
}
}

/** checkForWin: check board cell-by-cell for "does a win start here?" */

function checkForWin() {
  function _win(cells) {
    // Check four cells to see if they're all color of current player
    //  - cells: list of four (y, x) cells
    //  - returns true if all are legal coordinates & all match currPlayer

    return cells.every(
      ([y, x]) =>
        y >= 0 &&
        y < HEIGHT &&
        x >= 0 &&
        x < WIDTH &&
        board[y][x] === currPlayer
    );
  }

  // TODO: read and understand this code. Add comments to help you.

  for (let y = 0; y < HEIGHT; y++) {
    for (let x = 0; x < WIDTH; x++) {
      let horiz = [[y, x], [y, x + 1], [y, x + 2], [y, x + 3]];
      let vert = [[y, x], [y + 1, x], [y + 2, x], [y + 3, x]];
      let diagDR = [[y, x], [y + 1, x + 1], [y + 2, x + 2], [y + 3, x + 3]];
      let diagDL = [[y, x], [y + 1, x - 1], [y + 2, x - 2], [y + 3, x - 3]];

      if (_win(horiz) || _win(vert) || _win(diagDR) || _win(diagDL)) {
        return true;
      }
    }
  }
}

/** endGame: announce game end */

function endGame(msg) {
  const theMessage = document.getElementById("messages");
  document.getElementById("messages").textContent = `Game Over! ${msg}`;
  // TODO: pop up alert message
  // alert("Game Over! ", msg);
  gameOver = true;
}

makeBoard();
makeHtmlBoard();
