let id = (id) => document.getElementById(id);

const $cards = document.querySelectorAll('.card');
const $modal = id('modal');
const $cta = id('cta');
const $ctaStart = id('cta__start');
const $memoryGame = id('memory-game');
const $startGame = id('start__game');

let hasFlippedCard = false;
let firstCard, secondCard;
let lockBoard = false;
let counter = 0;

const modal = () => {
  counter === 6 ? $modal.style.visibility = 'visible' : null;
};

$cta.addEventListener('click', () => {
  $modal.style.visibility = 'hidden';
  shuffleCards();
  unflipCards();
});


function flipCard(){
  if (lockBoard) return;
  if (this === firstCard) return;

  this.classList.add("flip");

  if (!hasFlippedCard) {
    hasFlippedCard = true;
    firstCard = this;
    return;
  }

  secondCard = this;

  let isMatch = firstCard.dataset.planet === secondCard.dataset.planet;
  
  isMatch ? disableCards() : unflipCardsWithTime();
};

function disableCards() {
  firstCard.removeEventListener('click', flipCard);
  secondCard.removeEventListener('click', flipCard);
  console.log(++counter);
  modal();

  resetCards();
};

function unflipCardsWithTime(){

  lockBoard = true;
  setTimeout(unflipCards, 1500);
};

function  unflipCards(){
  firstCard.classList.remove('flip');
  secondCard.classList.remove('flip');
  resetCards();
};

function resetCards() {
  [hasFlippedCard, lockBoard] = [false, false];
  [firstCard, secondCard] = [null, null];
};


(function newGame(){
  shuffleCards();
})();

function shuffleCards(){
  $cards.forEach(element => {
    let randomPosition = Math.floor(Math.random() * 12);
    element.style.order = randomPosition;
  })
};



  $cards.forEach(ele => ele.addEventListener("click", flipCard));

  $ctaStart.addEventListener('click', () => {
    $memoryGame.style.visibility = 'visible';
    $startGame.style.visibility = 'hidden';
  })
