// to validate that the cell has not been attacked yet
const validCell = e => {
  const row = parseInt(e.target.id.substr(0, 1));
  const col = parseInt(e.target.id.substr(1, 1));

  // if it is white then cell has already been taken
  if (player === 1) {
    if (
      document.getElementById(`${row}${col}-2`).style.background === white ||
      document.getElementById(`${row}${col}-2`).style.background === red
    ) {
      resultMsg.style.color = red;
      resultMsg.innerHTML = 'Already Taken';
      return false;
    }
  } else if (
    document.getElementById(`${row}${col}-1`).style.background === white ||
    document.getElementById(`${row}${col}-1`).style.background === red
  ) {
    resultMsg.style.color = red;
    resultMsg.innerHTML = 'Already Taken';
    return false;
  }
  return true;
};

// to valididate that a ship is placeable within the board
const validPlacement = (player, movedShip, shipType, box) => {
  const shipLength = shipType.substr(shipType.length - 1, 1);
  const row = parseInt(box.id.substr(0, 1));
  const col = parseInt(box.id.substr(1, 1));

  if (movedShip.classList.contains('vertical')) {
    if (boardSize - shipLength < row) return false;
    for (let i = 0; i < shipLength; i += 1) {
      if (player === 1) {
        if (player1board[row + i][col] !== false) {
          return false;
        }
      } else if (player2board[row + i][col] !== false) {
        return false;
      }
    }
  } else {
    if (boardSize - shipLength < col) return false;
    for (let i = 0; i < shipLength; i += 1) {
      if (player === 1) {
        if (player1board[row][col + i] !== false) {
          return false;
        }
      } else if (player2board[row][col + i] !== false) {
        return false;
      }
    }
  }
  return true;
};

// disable the ability to click on board
const disablePlayer = () => {
  if (player === 1) {
    player = 2;
    board1.style['pointer-events'] = 'auto';
    board2.style['pointer-events'] = 'none';
    board1.style.opacity = 1;
    board2.style.opacity = 0.3;
  } else if (player === 2) {
    player = 1;
    board1.style['pointer-events'] = 'none';
    board2.style['pointer-events'] = 'auto';
    board1.style.opacity = 0.3;
    board2.style.opacity = 1;
  } else {
    board1.style['pointer-events'] = 'none';
    board2.style['pointer-events'] = 'none';
  }
};

// dim board and disable click ability when ready
const disableBoard = player => {
  if (player === '1') {
    player1.ready = true;
    board1.style.opacity = 0.3;
    board1.style['pointer-events'] = 'none';
  } else {
    player2.ready = true;
    board2.style.opacity = 0.3;
    board2.style['pointer-events'] = 'none';
  }
  // when both players are ready, player 1 will start
  if (player1.ready === true && player2.ready === true) {
    board1.style.opacity = 0.3;
    board2.style.opacity = 1;
    board1.style['pointer-events'] = 'none';
    board2.style['pointer-events'] = 'auto';
  }
};

const disablePlacement = () => {
  document.querySelectorAll('.board > div:not(.ship)').forEach(ship => {
    ship.removeEventListener('click', placeShip);

    if (ship.classList.contains('vertical')) {
      ship.classList.remove(
        'place-ship',
        ship.className.split(' ')[1],
        'vertical'
      );
    } else {
      ship.classList.remove('place-ship', ship.className.split(' ')[1]);
    }
  });
};
