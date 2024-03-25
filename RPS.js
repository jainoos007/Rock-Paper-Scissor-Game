let score = JSON.parse(localStorage.getItem('scores')) || {
  Wins: 0,
  Losses: 0,
  Ties: 0
};

updateScore();


function findComMove() {
  const RandomNumber = Math.random();
  let ComputerMove = '';
  if (RandomNumber >= 0 && RandomNumber < 1 / 3) {
    ComputerMove = 'rock';
  } else if (RandomNumber >= 1 / 3 && RandomNumber < 2 / 3) {
    ComputerMove = 'paper';
  } else {
    ComputerMove = 'scissors';
  }
  return ComputerMove;
}

let isAutoplaying = false;
let intervelId;

function autoPlay() {
  if(!isAutoplaying){
    intervelId = setInterval(function() {
      const playerMove = findComMove();
      playGame(playerMove);
      },1000);
      isAutoplaying = true;
      document.querySelector('.js-autoPlay-button')
      .innerHTML = 'Stop Play';
  }else {
    clearInterval(intervelId);
    isAutoplaying = false;
    document.querySelector('.js-autoPlay-button')
    .innerHTML = 'Auto Play';
  }
}
document.querySelector('.js-autoPlay-button')
  .addEventListener('click', () => {
    autoPlay();
  })

document.querySelector('.js-rockButton')
  .addEventListener('click', () => {
    playGame('rock');
});
document.querySelector('.js-paperButton')
  .addEventListener('click', () => {
    playGame('paper');
});
document.querySelector('.js-scissorsButton')
  .addEventListener('click', () => {
    playGame('scissors');
});

function playGame(myMove) {
  const ComputerMove = findComMove();
  let result = '';
  if (myMove === 'rock') {
    if (ComputerMove === 'rock') {
      result = 'Tie.';
    } else if (ComputerMove === 'paper') {
      result = 'You Lose.';
    } else {
      result = 'You Win.';
    }
  } else if (myMove === 'paper') {

    if (ComputerMove === 'rock') {
      result = 'You win.';
    } else if (ComputerMove === 'paper') {
      result = 'Tie.';
    } else {
      result = 'You Lose.';
    }
  } else {

    if (ComputerMove === 'rock') {
      result = 'You Lose.';
    } else if (ComputerMove === 'paper') {
      result = 'You Win.';
    } else {
      result = 'Tie.';
    }
  }
  if (result == 'You Win.') {
    score.Wins += 1;
  } else if (result == 'You Lose.') {
    score.Losses += 1;
  } else {
    score.Ties += 1;
  }

  localStorage.setItem('scores', JSON.stringify(score));

  updateScore();

  document.querySelector('.js-result').
  innerHTML = result;

  document.querySelector('.js-move').
  innerHTML = `You 
  <img src="images/${myMove}-emoji.png" class="move-icon">
  <img src="images/${ComputerMove}-emoji.png" class="move-icon">
  Computer`;
 
}

document.querySelector('.js-resetButton')
  .addEventListener('click', () => {
    score.Wins = 0;
    score.Losses = 0;
    score.Ties = 0;

    localStorage.removeItem('scores');
    updateScore();
  });

function updateScore() {
  document.querySelector('.js-score').
    innerHTML = `Wins: ${score.Wins}, Losses: ${score.Losses}, Ties: ${score.Ties}`
}

document.body.addEventListener('keydown',(event) => {
  if(event.key === 'r'){
    playGame('rock');
  }else if(event.key === 'p'){
    playGame('paper');
  }else if(event.key === 's'){
    playGame('scissors')
  }
});