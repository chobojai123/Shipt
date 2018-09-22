// ships' lives and properties for player 1 and 2
const player1 = {
  '2': 2,
  '3': 3,
  '3v3': 3,
  '4': 4,
  '5': 5,
  ready: null,
  shipsPlaced: null,
  shipsRemaining: 5,
};

const player2 = {
  '2': 2,
  '3': 3,
  '3v3': 3,
  '4': 4,
  '5': 5,
  ready: null,
  shipsPlaced: null,
  shipsRemaining: 5,
};

const [green, white, red] = ['#2ecc71', 'white', 'red']; // colors for displayed result

let [player, pickedShip, shipType] = [null, null, null];

function pickShip(e) {
  pickedShip = e.target;
  shipType = pickedShip.className.split(' ')[1]; // ship2, ship3, etc.

  if (pickedShip.closest('.container').parentNode.id === 'left') {
    player = 1;
  } else {
    player = 2;
  }
  // add class place-ship onto cell to allow ship placement
  document.querySelectorAll('.board > div:not(.ship)').forEach(ship => {
    ship.classList.add('place-ship', shipType);
    // add vertical onto classlist to know a vertical ship is selected
    if (pickedShip.classList.contains('vertical')) {
      ship.classList.add('vertical');
    }
  });
  // add place ship click event to cells with place-ship class
  document
    .querySelectorAll('.place-ship')
    .forEach(ship => ship.addEventListener('click', placeShip));
}

function placeShip(e) {
  const parent = player === 1 ? '#left' : '#right';
  // helper function to validate ship placement
  if (validPlacement(player, pickedShip, shipType, e.target)) {
    // helper function to disable curent player from placing another ship after placing one
    disablePlacement();
    // hide both displayed horizonital and vertical ship after placement
    document
      .querySelectorAll(`${parent} .ship-placeholder > .${shipType}`)
      .forEach(ship => {
        ship.style.display = 'none';
        ship.style.content = '';
      });

    const row = parseInt(e.target.id.substr(0, 1));
    const col = parseInt(e.target.id.substr(1, 1));

    const shipLength = shipType.substr(shipType.length - 1, 1);

    // display ships on the actual board
    if (pickedShip.classList.contains('vertical')) {
      document
        .getElementById(`${row}${col}-${player}`)
        .classList.add('ship', shipType, 'vertical');
      // add ships onto the board arrays
      for (let i = 0; i < shipLength; i += 1) {
        if (player === 1) {
          player1board[row + i][col] = shipType;
        } else {
          player2board[row + i][col] = shipType;
        }
      }
    } else {
      document
        .getElementById(`${row}${col}-${player}`)
        .classList.add('ship', shipType);
      // add ships onto the board arrays
      for (let i = 0; i < shipLength; i += 1) {
        if (player === 1) {
          player1board[row][col + i] = shipType;
        } else {
          player2board[row][col + i] = shipType;
        }
      }
    }
    // show the Ready button if all ships are placed
    if (player === 1) {
      player1.shipsPlaced += 1;
    } else {
      player2.shipsPlaced += 1;
    }
    if (player1.shipsPlaced === 5) {
      document.getElementById('1').classList.remove('hidden');
    }
    if (player2.shipsPlaced === 5) {
      document.getElementById('2').classList.remove('hidden');
    }
  }
}

const resultMsg = document.querySelector('.message');

function shoot(e) {
  console.log(player);
  // helper function to validate cell
  if (validCell(e)) {
    const row = parseInt(e.target.id.substr(0, 1));
    const col = parseInt(e.target.id.substr(1, 1));

    if (player === 1) {
      if (player2board[row][col]) {
        const ship = player2board[row][col].slice(4); // 2, 3, etc.

        player2[ship] -= 1; // minus one life from player's ship
        if (player2[ship] === 0) {
          player2.shipsRemaining -= 1; // minus one ship from total ships
          document.getElementById(`${row}${col}-2`).style.background = red;
          if (player2.shipsRemaining === 0) {
            resultMsg.style.color = green;
            resultMsg.innerHTML = 'Player 1 wins!';
            player = 0;
          } else {
            resultMsg.style.color = green;
            resultMsg.innerHTML = 'Ship sunk!';
          }
        } else {
          document.getElementById(`${row}${col}-2`).style.background = red;
          resultMsg.style.color = green;
          resultMsg.innerHTML = 'Player 2 is hit!';
        }
      } else {
        document.getElementById(`${row}${col}-2`).style.background = white;
        resultMsg.style.color = red;
        resultMsg.innerHTML = 'Player 1 missed!';
      }
    } else if (player1board[row][col]) {
      const ship = player1board[row][col].slice(4);

      player1[ship] -= 1;
      if (player1[ship] === 0) {
        player1.shipsRemaining -= 1;
        document.getElementById(`${row}${col}-1`).style.background = red;
        if (player1.shipsRemaining === 0) {
          resultMsg.style.color = green;
          resultMsg.innerHTML = 'Player 2 wins!';
          player = 0;
        } else {
          resultMsg.style.color = green;
          resultMsg.innerHTML = 'Ship sunk!';
        }
      } else {
        document.getElementById(`${row}${col}-1`).style.background = red;
        resultMsg.style.color = green;
        resultMsg.innerHTML = 'Player 1 is hit!';
      }
    } else {
      document.getElementById(`${row}${col}-1`).style.background = white;
      resultMsg.style.color = red;
      resultMsg.innerHTML = 'Player 2 missed!';
    }
    // helper function to disable other player during turn
    disablePlayer();
  }
}

function ready(e) {
  // remove visible ships from the board when ready
  if (parseInt(e.target.id) === 1) {
    const leftShips = document.querySelectorAll('#left .ship');
    leftShips.forEach(ship => ship.classList.remove('ship'));
  } else {
    const rightShips = document.querySelectorAll('#right .ship');
    rightShips.forEach(ship => ship.classList.remove('ship'));
  }
  // hide ready button
  e.target.style.display = 'none';
  // helper function to dim and disable readied board
  disableBoard(e.target.id);
  // add click event for shoot function to the board once ready
  document
    .querySelectorAll(`#player${parseInt(e.target.id)}-board > div`)
    .forEach(ship => ship.addEventListener('click', shoot));

  player = 1;
}

// add click event for buttons
document.getElementById('1').addEventListener('click', ready);
document.getElementById('2').addEventListener('click', ready);
// add click event to displayed ships
document
  .querySelectorAll('.ship')
  .forEach(ship => ship.addEventListener('click', pickShip));
// add click event for reset button to reload the page
document
  .querySelector('#reset')
  .addEventListener('click', () => window.location.reload());
