const moves = document.querySelectorAll('.js-cells');
const resetBoardButton = document.querySelector('.js-reset-board-button');
const resetScoreButton = document.querySelector('.js-reset-score-button');

const game = {
  x: [],
  o: [],
  move: 'x',
  count: 0,
  winner: '',
  moveCount: 0
}

const score = JSON.parse(localStorage.getItem('tictactoescore')) ||  {
  x: {
    wins: 0,
    losses: 0
  },
  o: {
    wins: 0,
    losses: 0
  },
  ties: 0,
  empty: true
}

if (!score.empty)
  displayScore(false);

const winConditions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];

moves.forEach((value) => {
  value.addEventListener('click', () => {
    playGame(value.id);
  })
});

resetBoardButton.addEventListener('click', () => {
  resetBoard();
})

resetScoreButton.addEventListener('click', () => {
  updateScore('reset');
})

function playGame(id) {
  game.moveCount++;
  if (game.move === 'x') {
    document.getElementById(id).innerHTML = 'X';
    document.getElementById(id).disabled = true;
    game.x.push(id - 1);
    if (game.x.length >= 3)
      evaluateMove();
    game.move = 'o';
  }
  else if (game.move === 'o') {
    document.getElementById(id).innerHTML = 'O';
    document.getElementById(id).disabled = true;
    game.o.push(id - 1);
    if (game.o.length >= 3)
      evaluateMove();
    game.move = 'x';
  }
}

function evaluateMove() {
  if (game.move === 'x' && game.x.length >= 3) {
    winConditions.forEach((value) => {
      if (game.count === 3) {
        return;
      }
      value.forEach((value1) => {
        if (game.x.includes(value1)) {
          game.count++;
        }
      })
      if (game.count === 3) {
        disableButtons();
        displayWinner('X');
        updateScore('x');
        return;
      }
      else
        game.count = 0;
    })
  }
  else if (game.move === 'o' && game.x.length >= 3) {
    winConditions.forEach((value) => {
      if (game.count === 3) {
        return;
      }
      value.forEach((value1) => {
        if (game.o.includes(value1)) {
          game.count++;
        }
      })
      if (game.count === 3) {
        disableButtons();
        displayWinner('O');
        updateScore('o');
        return;
      }
      else
        game.count = 0;
    })
  }
  if (game.moveCount === 9) {
    updateScore('tie');
    displayWinner('tie');
  }
}

function disableButtons() {
  moves.forEach((value) => {
    document.getElementById(value.id).disabled = true;
  });
}

function resetBoard() {
  moves.forEach((value) => {
    document.getElementById(value.id).innerHTML = '';
    document.getElementById(value.id).disabled = false;
    game.count = 0;
    game.x.splice(0, game.x.length);
    game.o.splice(0, game.o.length);
    game.move = 'x';
    document.querySelector('.js-results').innerHTML = '';
  })
}

function displayWinner(winner) {
  if (winner !== 'tie')
    document.querySelector('.js-results').innerHTML = `The winner is player ${winner}!`;
  else
  document.querySelector('.js-results').innerHTML = 'This game ends in a tie!';
}

function displayScore(reset) {
  if (!reset) {
    document.querySelector('.js-scoreboard').innerHTML =
      `Scoreboard:`
    document.querySelector('.js-x-score').innerHTML =
      `X - Wins: ${score.x.wins} | Losses: ${score.x.losses}`;
    document.querySelector('.js-o-score').innerHTML =
      `O - Wins: ${score.o.wins} | Losses: ${score.o.losses}`;
    document.querySelector('.js-tie-score').innerHTML =
      `Ties: ${score.ties}`;
  }
  else {
    document.querySelector('.js-scoreboard').innerHTML = '';
    document.querySelector('.js-x-score').innerHTML = '';
    document.querySelector('.js-o-score').innerHTML = '';
    document.querySelector('.js-tie-score').innerHTML = '';
    resetBoard();
  }
}

function updateScore(result) {
  game.moveCount = 0;
  if (result === 'tie') {
    score.ties++;
    score.empty = false;
    displayScore(false);
  }
  else if (result === 'x') {
    score.x.wins++;
    score.o.losses++;
    score.empty = false;
    displayScore(false);
  }
  else if (result === 'o') {
    score.o.wins++;
    score.x.losses++;
    score.empty = false;
    displayScore(false);
  }
  else if (result === 'reset') {
    score.x.wins = 0;
    score.x.losses = 0;
    score.o.wins = 0;
    score.o.losses = 0;
    score.ties = 0;
    score.empty = true;
    displayScore(true);
  }
  localStorage.setItem('tictactoescore', JSON.stringify(score));
}
