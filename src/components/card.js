import {openPopup } from "./modal";

export function createCard (card, deleteCB, likeCB, imgCB) { //CB-CallBack
  const cardTemplate = document.querySelector('#card-template').content;
  const cardItem = cardTemplate.querySelector('.card').cloneNode(true);
  const cardImage = cardItem.querySelector('.card__image');
  const cardTitle = cardItem.querySelector('.card__title');
  cardImage.src = card.link;
  cardImage.alt = card.name;
  cardTitle.textContent = card.name;

  const deleteButton = cardItem.querySelector('.card__delete-button');
  deleteButton.addEventListener('click',() => deleteCB(cardItem));

  const likeButton = cardItem.querySelector(".card__like-button");
  likeButton.addEventListener("click", likeCB);

  cardImage.addEventListener("click", imgCB);

  return cardItem;
}

export function likeCard(evt, likes, likeBtn) {
  likes.textContent = evt.likes.length;
  likeBtn.target.classList.toggle("card__like-button_is-active");//вкл. выкл. класса
}

//ппосчитать лайки
