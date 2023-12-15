const characters = [
  'geralt-2',
  'ciri-2',
  'triss-2',
  'yennefer-2',
  'regis',
  'olgierd',
  'dandelion',
  'roache',
  'eredin',
  'priscilla',
];

const cards = [...characters, ...characters];
let openCards = [];

let randomCards = cards.sort(() => (Math.random() > 0.5 ? 2 : -1));

const containerCards = document.querySelector('.container-cards');

for (let i = 0; i < randomCards.length; i++) {
  let markup = `
  <div class="card">
    <img src="img/${randomCards[i]}.jpeg" alt="carta de ${randomCards[i]}" class="card-front" />
    <div class="card-back"></div>
  </div>
  `;
  containerCards.insertAdjacentHTML('beforeend', markup);
}

const checkCards = function () {
  if (openCards[0]?.innerHTML === openCards[1]?.innerHTML)
    openCards.forEach(card => {
      card.classList.add('boxOpen', 'cards-done');
      card.firstElementChild.classList.add('animationCorrectCard');
    });
  else {
    openCards.forEach(card => {
      card.classList.remove('boxOpen');
    });
  }

  openCards[0]?.classList.remove('selected');
  openCards = [];

  if (document.querySelectorAll('.boxOpen').length === cards.length) {
    alert('Você venceu!');
  }
};

const checkSameCard = () => {
  if (openCards.every(card => card.classList.contains('selected')))
    openCards.pop();
};

const revealCard = function (e) {
  const cardClicked = e.target.closest('.card');

  if (!cardClicked || cardClicked.classList.contains('cards-done')) return;

  if (openCards.length === 0) {
    cardClicked.classList.add('boxOpen', 'selected');
    openCards.push(cardClicked);
    return;
  }

  if (openCards.length < 2) {
    cardClicked.classList.add('boxOpen');
    openCards.push(cardClicked);

    checkSameCard();
  }

  if (openCards.length === 2) setTimeout(checkCards, 500);
};

containerCards.addEventListener('click', revealCard);
