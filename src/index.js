import './pages/index.css';
import {initialCards} from "./cards.js";
import { createCard, deleteCard, likeCard } from "./components/card.js";
import { openPopup, closePopup, closePopupByOverlay,closePopupByEsc } from "./components/modal.js";

//const cardTemplate = document.querySelector('#card-template').content;
const cardsContainer= document.querySelector('.places__list');

initialCards.forEach((el) => {    
  cardsContainer.append(createCard(el, deleteCard,likeCard,handleclickImage));
});

const popupConteiners = document.querySelectorAll('.popup');

popupConteiners.forEach(function(el) {
    el.classList.add("popup_is-animated");
});

popupConteiners.forEach(function (el) {
  el.addEventListener("click", closePopupByOverlay);
});

popupConteiners.forEach(function (el) {
  el.addEventListener("click", closePopupByEsc);
});

const profileEditButton = document.querySelector(".profile__edit-button");//Кнопка редактирования профиля
const addNewCardButton = document.querySelector(".profile__add-button");//кнопка создания новой карточки
const profileEditPopup = document.querySelector(".popup_type_edit");// попап для ред. профиля
const addNewCardPopup = document.querySelector(".popup_type_new-card");// попап для созд. новой карточки

//все про форму редактирования профиля
const formEditProfile = document.querySelector(".popup__form");
const nameInput = formEditProfile.querySelector(".popup__input_type_name");
const descrInput = formEditProfile.querySelector(".popup__input_type_description");
const profileTitle = document.querySelector(".profile__title");
const profileDescr = document.querySelector(".profile__description");
const descrInputValue = descrInput.value;
const nameInputValue = nameInput.value;

//обработчик клика кнопки для ред. профиля :)
profileEditButton.addEventListener("click", () => {
  openPopup(profileEditPopup, closePopupByEsc);
  }
);

//отправка формы + обработчик отправики
function sudmitProfileForm(evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
  
  profileTitle.textContent = nameInputValue;
  profileDescr.textContent = descrInputValue;

  formEditProfile.reset();

  closePopup(profileEditPopup);//закпыть поп
}

formEditProfile.addEventListener('submit', sudmitProfileForm);

//все для создания новой карточки
const formAddNewCard = document.querySelector(".form__add-card");
const nameCardInput = formAddNewCard.querySelector(".popup__input_type_card-name");
const linkInput = formAddNewCard.querySelector(".popup__input_type_url");

// обработчик клика для созд. новой карточки :)
addNewCardButton.addEventListener("click", () =>
  openPopup(addNewCardPopup)
);

//отправка формы + обработчик отправики
function submitAddNewCardForm(evt) {
  evt.preventDefault();  

  const newCardObj = {
    name: nameCardInput.value,
    link: linkInput.value,
  };
  cardsContainer.prepend(
    createCard(newCardObj,deleteCard,likeCard,handleclickImage
    )
  );

  formAddNewCard.reset();//сброс значений из формы

  closePopup(addNewCardPopup);
}

formAddNewCard.addEventListener('submit', submitAddNewCardForm);

//переменные для поп с картинкой
const imagePopup = document.querySelector(".popup_type_image");//поп сс картинкой
const popImage = imagePopup.querySelector(".popup__image");//картинка
const caption = imagePopup.querySelector(".popup__caption");
//клик по картинке
function handleclickImage(evt) {
  openPopup(imagePopup);
  const parent = evt.target.closest(".places__item");//находим родителя элемента на который нажали
  const titleImage =parent.querySelector('.card__title').textContent;// у родителя смотрим тайтл
  popImage.src = evt.target.src;
  popImage.alt = titleImage;
  caption.textContent= titleImage;
  }