// Темплейт?? карточки

const cardTemplate = document.querySelector('#card-template').content;
const cardItem = cardTemplate.querySelector('.card').cloneNode(true);
const addButton= document.querySelector('.profile__add-butto');
//  DOM узлы

initialCards.forEach((el) => {    
  cardsContainer.append(createCard(el, delCard));
});

//  Функция создания карточки

function createCard (card, openCB) { //CB-CallBack
  const cardImage = cardElement.querySelector('.card__image');
  const cardTitle = cardElement.querySelector('.card__title');
  cardImage.src = card.link;
  cardImage.alt = card.name;
  cardTitle.textContent = card.name;
  const delButton = cardItem.querySelector('.card__delete-button');
  delButton.addEventListener('click',() => openCB(cardItem));
  return cardItem;
}

// Функция удаления карточки

function delCard (card) {
  card.remove();
}

// @todo: Вывести карточки на страницу
addButton.addEventListener('click', function () {
  createCard(card,openCB)
});