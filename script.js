const $cards = document.querySelectorAll('.card');
const $modal = document.getElementById('modal');

let hasFlippedCard = false;
let firstCard, secondCard;
let lockBoard = false;
let counter = 0;


const modal = () => {
  counter === 6 ? $modal.style.visibility = 'visible' : null;
};


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

  let isMatch = firstCard.dataset.framework === secondCard.dataset.framework;
  
  isMatch ? disableCards() : unflipCards();
};

function disableCards() {
  firstCard.removeEventListener('click', flipCard);
  secondCard.removeEventListener('click', flipCard);
  console.log(++counter);
  modal();

  resetBoard();
};

function unflipCards(){

  lockBoard = true;
  setTimeout(() => {
    firstCard.classList.remove('flip');
    secondCard.classList.remove('flip');

    resetBoard();
  }, 1500)
};

function resetBoard() {
  [hasFlippedCard, lockBoard] = [false, false];
  [firstCard, secondCard] = [null, null];
};

(function shuffleCards(){
  $cards.forEach(element => {
    let randomPosition = Math.floor(Math.random() * 12);
    element.style.order = randomPosition;
  })
})();



  $cards.forEach(ele => ele.addEventListener("click", flipCard));
