//defining variable constants
const xIcon = document.getElementById('x-icon');
const oIcon = document.getElementById('o-icon');
const showSelectionModal = document.getElementById('btn-start');
const startGame = document.getElementById('select-btn');
const closeBtn = document.getElementById('close-btn');
const cells = document.querySelectorAll('.game-cell');
const gameIcon = [xIcon, oIcon];

// initializing variables
let gameBoard;
let humanPlayer;
let cpuPlayer;

const winningCombo = [
  [0, 1, 2],
	[3, 4, 5],
	[6, 7, 8],
	[0, 3, 6],
	[1, 4, 7],
	[2, 5, 8],
	[0, 4, 8],
	[6, 4, 2]
];

// open selection modal to select icon
showSelectionModal.onclick = () => {
  document.getElementById('icon-modal').style.display = 'block';
}

// close modal after game end
closeBtn.onclick = () => {
  document.getElementById('information-modal').style.display = 'none';
  clearGame();
};

gameIcon.forEach(icon => {
  icon.addEventListener('click', () => {
    const humanIcon = icon.dataset.icon;
    const cpuIcon = humanIcon === 'O' ? 'X' : 'O';
    xIcon.dataset.icon = humanIcon;
    oIcon.dataset.icon = cpuIcon;
  })
})

// validating selection,close the modal and start the game
startGame.addEventListener('click', () => {
	humanPlayer = xIcon.dataset.icon;
  cpuPlayer = oIcon.dataset.icon;
  
  gameBoard = Array.from(Array(9).keys());
  for (let i = 0; i < cells.length; i++) {
    cells[i].innerText = '';
    cells[i].style.removeProperty('background-color');
    cells[i].addEventListener('click', nextMove, false);
  }
  document.getElementById('icon-modal').style.display = 'none';
  showSelectionModal.disabled = true;
});

// take turn to play the game
const nextMove = (gameCell) => {
  if (typeof gameBoard[gameCell.target.id] == 'number') {
    move(gameCell.target.id, humanPlayer);
    if (!drawGame()) move(availableSpot(), cpuPlayer);
  }
};

// fill the cell on player turn
const move = (gameCellId, player) => {
  gameBoard[gameCellId] = player;
  document.getElementById(gameCellId).innerText = player;
  let gameStatus = checkWinStatus(gameBoard, player);
  if (gameStatus) endGame(gameStatus);
};

// check the status of the game to determine winner
const checkWinStatus = (board, player) => {
  let gamePlay = board.reduce((acc, el, i) =>
    (el === player) ? acc.concat(i) : acc, []);
  let gameStatus = null;
  for (let [index, win] of winningCombo.entries()) {
    if (win.every(elem => gamePlay.indexOf(elem) > -1)) {
      gameStatus = {index, player};
      break;
    }
  }
  return gameStatus;
};

//check if all available spot has been filled
const endGame = (gameStatus) => {
  for (let index of winningCombo[gameStatus.index]) {
    document.getElementById(index).style.backgroundColor = "green";
  }
  for (let i = 0; i < cells.length; i++) {
    cells[i].removeEventListener('click', nextMove, false);
  }
  gameWinner(gameStatus.player === humanPlayer ? 'Congratulation! You won' : 'Try Again!');
};

// check for cell available to be filled
const emptyCells = () => {
  return gameBoard.filter(n => typeof n == 'number');
};

const availableSpot = () => {
  return emptyCells()[0];
};

// determine a game tie
const drawGame = () => {
  if (emptyCells().length == 0) {
    for (let i = 0; i < cells.length; i++) {
      cells[i].style.backgroundColor = 'grey';
      cells[i].removeEventListener('click', nextMove, false);
    }
    gameWinner('No winner')
    return true;
  }
  return false;
};

// display modal to indicate winning information
const gameWinner = (player) => {
  document.getElementById('information-modal').style.display = 'block';
  document.getElementById('text').innerText = player;
}

// reset game board
const clearGame = () => {
  for (let i = 0; i < cells.length; i++) {
    cells[i].innerText = '';
    cells[i].style.removeProperty('background-color');
    cells[i].removeEventListener('click', nextMove, false);
  }
  showSelectionModal.disabled = false;
}