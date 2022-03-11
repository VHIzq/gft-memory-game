const $cards = document.querySelectorAll('.card');
const $modal = document.getElementById('modal');
const $cta = document.getElementById('cta');

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

  resetBoard();
};

function unflipCardsWithTime(){

  lockBoard = true;
  setTimeout(unflipCards, 1500);
};

function  unflipCards(){
  firstCard.classList.remove('flip');
  secondCard.classList.remove('flip');
  resetBoard();
};

function resetBoard() {
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
