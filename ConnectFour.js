const ROWS = 6;
const COLUMNS = 7;
const game = document.getElementById("game");
const message = document.getElementById("message");

let board = Array.from({ length: ROWS }, () => Array(COLUMNS).fill(null));
let currentPlayer = "red";
let gameOver = false;

// Create the grid
for (let r = 0; r < ROWS; r++) {
  for (let c = 0; c < COLUMNS; c++) {
    const cell = document.createElement("div");
    cell.classList.add("cell");
    cell.dataset.row = r;
    cell.dataset.col = c;
    game.appendChild(cell);
  }
}

game.addEventListener("click", (e) => {
  if (gameOver || !e.target.classList.contains("cell")) return;

  const col = parseInt(e.target.dataset.col);

  for (let row = ROWS - 1; row >= 0; row--) {
    if (!board[row][col]) {
      board[row][col] = currentPlayer;
      const cell = document.querySelector(
        `.cell[data-row='${row}'][data-col='${col}']`
      );
      cell.classList.add(currentPlayer);

      if (checkWinner(row, col)) {
        message.textContent = `Player ${capitalize(currentPlayer)} Wins!`;
        gameOver = true;
      } else {
        currentPlayer = currentPlayer === "red" ? "yellow" : "red";
        message.textContent = `Player ${capitalize(currentPlayer)}'s Turn`;
      }
      break;
    }
  }
});

function checkWinner(row, col) {
  return (
    checkDirection(row, col, 1, 0) + checkDirection(row, col, -1, 0) > 2 ||
    checkDirection(row, col, 0, 1) + checkDirection(row, col, 0, -1) > 2 ||
    checkDirection(row, col, 1, 1) + checkDirection(row, col, -1, -1) > 2 ||
    checkDirection(row, col, 1, -1) + checkDirection(row, col, -1, 1) > 2
  );
}

function checkDirection(row, col, rowDir, colDir) {
  let count = 0;
  let r = row + rowDir;
  let c = col + colDir;
  while (
    r >= 0 &&
    r < ROWS &&
    c >= 0 &&
    c < COLUMNS &&
    board[r][c] === currentPlayer
  ) {
    count++;
    r += rowDir;
    c += colDir;
  }
  return count;
}

function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
