const cards = [
    'A', 'A', 'B', 'B', 'C', 'C', 'D', 'D',
    'E', 'E', 'F', 'F', 'G', 'G', 'H', 'H'
];

let firstCard = null;
let secondCard = null;
let lockBoard = false;
let matches = 0;

const gameBoard = document.getElementById('gameBoard');
const restartButton = document.getElementById('restartButton');

function shuffle(array) {
    array.sort(() => Math.random() - 0.5);
}

function createCard(cardValue) {
    const card = document.createElement('div');
    card.classList.add('card');
    card.dataset.value = cardValue;
    card.addEventListener('click', flipCard);
    return card;
}

function flipCard() {
    if (lockBoard) return;

    this.classList.add('flipped');
    this.textContent = this.dataset.value;

    if (!firstCard) {
        firstCard = this;
    } else {
        secondCard = this;
        lockBoard = true;

        checkForMatch();
    }
}

function checkForMatch() {
    if (firstCard.dataset.value === secondCard.dataset.value) {
        matches++;
        firstCard.removeEventListener('click', flipCard);
        secondCard.removeEventListener('click', flipCard);
        resetTurn();
    } else {
        setTimeout(() => {
            firstCard.classList.remove('flipped');
            secondCard.classList.remove('flipped');
            firstCard.textContent = '';
            secondCard.textContent = '';
            resetTurn();
        }, 1000);
    }
}

function resetTurn() {
    firstCard = null;
    secondCard = null;
    lockBoard = false;

    if (matches === cards.length / 2) {
        alert('You win!');
    }
}

function startGame() {
    matches = 0;
    firstCard = null;
    secondCard = null;
    lockBoard = false;
    gameBoard.innerHTML = '';
    shuffle(cards);
    cards.forEach(cardValue => {
        const card = createCard(cardValue);
        gameBoard.appendChild(card);
    });
}

restartButton.addEventListener('click', startGame);
startGame();
