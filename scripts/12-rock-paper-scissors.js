function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
}(window,document,'script','dataLayer','GTM-K5DLHF6V');

let score = JSON.parse(localStorage.getItem('score')) || {
  wins: 0,
  losses: 0,
  ties: 0
};

updateScoreElement();

document.querySelector('.js-rock-button').addEventListener('click', () => {
  playGame('Rock');
});

document.querySelector('.js-paper-button').addEventListener('click', () => {
  playGame('Paper');
});

document.querySelector('.js-scissors-button').addEventListener('click', () => {
  playGame('Scissors');
})

document.body.addEventListener('keydown', (event) => {
  if ((event.key.toLowerCase()) === 'r') {
    playGame('Rock');
    return;
  }
  if ((event.key.toLowerCase()) === 'p') {
    playGame('Paper');
    return;
  }
  if ((event.key.toLowerCase()) === 's') {
    playGame('Scissors');
    return;
  }
})

let isAutoPlaying = false;
let intervalID;

function autoPlay() {
  if (!isAutoPlaying) {
    intervalID = setInterval( () => {
      const playerMove = pickComputerMove();
      playGame(playerMove);
    }, 1000);
    isAutoPlaying = true;
    document.querySelector('.js-auto-play-score-button').innerHTML = 'Stop Playing'
  }
  else {
    clearInterval(intervalID);
    isAutoPlaying = false;
    document.querySelector('.js-auto-play-score-button').innerHTML = 'Auto Play'
  }
}

function playGame(playerMove) {
  resetMoveDisplay();
  let result = '';
  const computerMove = pickComputerMove();

  if (playerMove === 'Scissors') {
    if (computerMove === 'Rock')
      result = 'You lose.';
    else if (computerMove === 'Paper')
      result = 'You win.';
    else if (computerMove === 'Scissors')
      result = 'Tie.';
  }

  else if (playerMove === 'Paper') {
    if (computerMove === 'Rock')
      result = 'You win.';
    else if (computerMove === 'Paper')
      result = 'Tie.';
    else if (computerMove === 'Scissors')
      result = 'You lose.';
  }


  else if (playerMove === 'Rock') {
    if (computerMove === 'Rock')
      result = 'Tie.';
    else if (computerMove === 'Paper')
      result = 'You lose.';
    else if (computerMove === 'Scissors')
      result = 'You win.';
  }

  if (result === 'You win.') {
    score.wins++;
  }
  else if (result === 'You lose.') {
    score.losses++;
  }
  else if (result === 'Tie.') {
    score.ties++;
  }

  localStorage.setItem('score', JSON.stringify(score));

  updateScoreElement();

  document.querySelector('.js-result').innerHTML = result;

  displayCurrentMove(playerMove,computerMove);
}

function pickComputerMove() {
  let computerMove;
  const randomNumber = Math.random();
  if (randomNumber >= 0 && randomNumber < 1 / 3)
    computerMove = 'Rock';
  else if (randomNumber >= 1 / 3 && randomNumber < 2 / 3)
    computerMove = 'Paper'
  else if (randomNumber >= 2 / 3 && randomNumber < 1)
    computerMove = 'Scissors'

  return computerMove;
}

function updateScoreElement() {
  document.querySelector('.js-score').innerHTML =
    `Wins: ${score.wins}, Losses: ${score.losses}, Ties: ${score.ties}`;
}

function displayCurrentMove (playerMove,computerMove) {
  const currentMove = document.createElement('p');
  currentMove.innerHTML
    = `You <img src="images/${playerMove}-emoji.png" class="move-icon"> 
    <img src="images/${computerMove}-emoji.png" class="move-icon">
    Computer`;

  document.querySelector('.js-result').appendChild(currentMove);
}

function resetMoveDisplay() {
  document.querySelector('.js-result').innerHTML = '';
}
