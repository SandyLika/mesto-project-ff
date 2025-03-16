export function createCard (card,userId,openDeleteCardPopup, likeCB, imgCB) { //CB-CallBack
  const cardTemplate = document.querySelector('#card-template').content;
  const cardItem = cardTemplate.querySelector('.card').cloneNode(true);
  const cardImage = cardItem.querySelector('.card__image');
  const cardTitle = cardItem.querySelector('.card__title');
  const likesCount =  cardItem.querySelector('.card__like-num');
  cardImage.src = card.link;
  cardImage.alt = card.name;
  cardTitle.textContent = card.name;
  cardItem.querySelector(".card__like-count").textContent = card.likes.length;

  const deleteButton = cardItem.querySelector('.card__delete-button');
  //deleteButton.addEventListener('click',() => deleteCB(cardItem));

  //пользователь удалет только свои карточки
  if (card.owner._id !== userId) {
    cardItem.querySelector(".card__delete-button").remove();
  } 
  else {
      deleteButton.addEventListener("click", () => {
      openDeleteCardPopup(cardItem, card._id);
    });
  }

  const likeButton = cardItem.querySelector(".card__like-button");
  likeButton.addEventListener("click", likeCB);

  cardImage.addEventListener("click", imgCB);

  return cardItem;
}
export function deleteCard(cardElement) { 
  cardElement.remove();
}

export function statusIsLiked(likeButton) {
  let status = false;
  if(likeButton.classList.contains('card__like-button_is-active')){
    status = true;
  }
  return status;
}

export function likeCount(res,likeButton, likesCount) {
  likesCount.textContent = res.likes.length;
  likeButton.classList.toggle('card__like-button_is-active');
}

