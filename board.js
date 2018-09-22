// create boards for player 1 and 2
const boardSize = 10;

const player1board = new Array(boardSize)
  .fill(null)
  .map(cell => new Array(10).fill(false));
const player2board = new Array(boardSize)
  .fill(null)
  .map(cell => new Array(10).fill(false));

const board1 = document.getElementById('player1-board');
const board2 = document.getElementById('player2-board');

// define each cell inside the boards
for (let i = 0; i < boardSize; i += 1) {
  for (let j = 0; j < boardSize; j += 1) {
    const div1 = document.createElement('div');
    div1.id = `${i}${j}-1`;
    div1.style.width = `${100 / boardSize}%`;
    div1.style.height = `${100 / boardSize}%`;
    board1.appendChild(div1);

    const div2 = document.createElement('div');
    div2.id = `${i}${j}-2`;
    div2.style.width = `${100 / boardSize}%`;
    div2.style.height = `${100 / boardSize}%`;
    board2.appendChild(div2);
  }
}
