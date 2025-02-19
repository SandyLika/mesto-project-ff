import './pages/index.css';
import {initialCards} from "./cards.js";
import { createCard, delCard, likeCard } from "./components/card.js";
import { openPop, closePop } from "./components/modal.js";

const cardTemplate = document.querySelector('#card-template').content;
const cardsContainer= document.querySelector('.places__list');

initialCards.forEach((el) => {    
  cardsContainer.append(createCard(el, delCard));
});

const profEditButton = document.querySelector(".profile__edit-button");//Кнопка редактирования профиля
const addNewCardButton = document.querySelector(".profile__add-button");//кнопка создания новой карточки
const profEditPop = document.querySelector(".popup_type_edit");// попап для ред. профиля
const addNewCardPop = document.querySelector(".popup_type_new-card");// попап для созд. новой карточки

function Overlay(evt) {
  const popisOpen = evt.target.closest(".popup");//????????????

  if (
    popisOpen &&
    (evt.target === popisOpen || evt.target.closest(".popup__close"))
  ) {
    closePop(popisOpen);       
  }
}

//все про форму редактирования профиля
const formEditProf = document.forms.edit-profile;
const nameInput = formEditProfile.querySelector(".popup__input_type_name");
const descrInput = formEditProfile.querySelector(".popup__input_type_description");
const profTitle = document.querySelector(".profile__title");
const profDescr = document.querySelector(".profile__description");
const descrInputValue = descrInput.value;
const nameInputValue = nameInput.value;

//обработчик клика кнопки для ред. профиля :)
profEditButton.addEventListener("click", () => {
  openPop(profEditPop);
  }
);

//отправка формы + обработчик отправики
function profFormSubmit(evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
  
  profTitle.textContent = nameInputValue;
  profDescr.textContent = descrInputValue;

  closePop(profEditPopup);//закпыть поп
}

formEditProf.addEventListener('submit', profFormSubmit);

//все для создания новой карточки
const formAddNewCard = document.forms.new-place;
const nameCardInput = document.forms.new-place.elements.place-name;
const linkInput = document.forms.new-place.elements.link;

// обработчик клика для созд. новой карточки :)
addNewCardButton.addEventListener("click", () =>
  openPop(addNewCardPop)
);

//отправка формы + обработчик отправики
function addNewCardFormSubmit(evt) {
  evt.preventDefault();  

  const newCardObj = {
    name: nameCardInput.value,
    link: linkInput.value,
  };
  cardsContainer.prepend(
    createCard(
      newCardObj,
      delCard,
      likeCard,
      clickImage
    )
  );

  formNewCard.reset();//сброс значений из формы

  closePop(addNewCardPop);
}

formAddNewCard.addEventListener('submit', addNewCardFormSubmit);

//переменные для поп с картинкой
const ImagePop = document.querySelector(".popup_type_image");//поп сс картинкой
const popImage = ImagePop.querySelector(".popup__image");//картинка

//клик по картинке
function сlickImage(evt) {
  openPopup(popupImageContainer);
  
  popImage.src = evt.target.src;
  popImage.alt = document.querySelector('.card__title');
  ImagePop.querySelector(".popup__caption").textContent =  document.querySelector('.card__title');
  }