export function createCard (card, delCB, likeCB, imgCB ) { //CB-CallBack
  const cardItem = cardTemplate.querySelector('.card').cloneNode(true);
  const cardImage = cardItem.querySelector('.card__image');
  const cardTitle = cardItem.querySelector('.card__title');
  cardImage.src = card.link;
  cardImage.alt = card.name;
  cardTitle.textContent = card.name;

  const delButton = cardItem.querySelector('.card__delete-button');
  delButton.addEventListener('click',() => delCB(cardItem));

  const likeButton = cardItem.querySelector(".card__like-button");
  likeButton.addEventListener("click", likeCB);

  cardImage.addEventListener("click", imgCB);

  return cardItem;
}

export function delCard (card) {
  card.remove();
}

export function likeCard(evt) {
  evt.target.classList.toggle("card__like-button_is-active");//вкл. выкл. класса
}

