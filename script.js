
const gameBoard = document.getElementById('game-board');
const restartBtn = document.getElementById('restartBtn');

const cardsArray = [
  'A', 'A', 'B', 'B', 'C', 'C', 'D', 'D',
  'E', 'E', 'F', 'F', 'G', 'G', 'H', 'H'
];

let flippedCards = [];
let matchedCards = [];
let lockBoard = false;


function initGame() {
  gameBoard.innerHTML = '';
  shuffledCards = shuffle(cardsArray);
  shuffledCards.forEach(card => {
    const cardElement = document.createElement('div');
    cardElement.classList.add('card');
    cardElement.innerHTML = `
      <div class="card-front">${card}</div>
      <div class="card-back"></div>
    `;
    cardElement.addEventListener('click', flipCard);
    gameBoard.appendChild(cardElement);
  });
}


function shuffle(array) {
  return array.sort(() => Math.random() - 0.5);
}


function flipCard() {
  if (lockBoard) return;
  this.classList.add('flipped');
  flippedCards.push(this);
  
  if (flippedCards.length === 2) {
    lockBoard = true;
    checkForMatch();
  }
}


function checkForMatch() {
  const [card1, card2] = flippedCards;
  if (card1.innerHTML === card2.innerHTML) {
    matchedCards.push(card1, card2);
    resetBoard();
    if (matchedCards.length === cardsArray.length) {
      alert('You won!');
    }
  } else {
    setTimeout(() => {
      card1.classList.remove('flipped');
      card2.classList.remove('flipped');
      resetBoard();
    }, 1000);
  }
}


function resetBoard() {
  [flippedCards, lockBoard] = [[], false];
}


function restartGame() {
  matchedCards = [];
  initGame();
}


restartBtn.addEventListener('click', restartGame);


window.onload = initGame;
