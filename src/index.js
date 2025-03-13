import './pages/index.css';
import {initialCards} from "./cards.js";
import { createCard, likeCard } from "./components/card.js";
import { openPopup, closePopup, closePopupByOverlay,closePopupByEsc } from "./components/modal.js";
import {enableValidation, clearError} from "./validation.js";
import {getProfile,editProfile,addNewCard,removeCard,likeCardA,unlikeCardA,editProfileAvatar} from "./api.js";
//const cardTemplate = document.querySelector('#card-template').content;
const cardsContainer= document.querySelector('.places__list');

const validationConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: ".popup__button_disabled",
  inputErrorClass: ".popup__input_type_error",
  errorClass: ".popup__error_visible"
}

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
const profileEditSubmitButton =formEditProfile.querySelector(".popup__button")
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

  profileEditSubmitButton.textContent= 'Сохранение...'
  
  editProfile(nameInputValue, descrInputValue)
  .then((res) => {
    updateProfile(res);
    closePopup(profileEditPopup);
  })
  .catch((err) => {
    console.log(err);
  })
  .finally(() => {
    profileEditSubmitButton.textContent = 'Сохранить';
  })
  formEditProfile.reset();
}

formEditProfile.addEventListener('submit', sudmitProfileForm);

//все для создания новой карточки
const formAddNewCard = document.querySelector(".form__add-card");
const nameCardInput = formAddNewCard.querySelector(".popup__input_type_card-name");
const linkInput = formAddNewCard.querySelector(".popup__input_type_url");

//все для удаления карточки
const deleteCardPopup = document.querySelector('.popup_type_delete-card');
const formDeleteCard= document.querySelector('.form__delete-card');
const yesDeleteButton = deleteCardPopup.querySelector('.popup__button');

//удаляем карточку
function deleteCard (card, cardElement) {
  openPopup(deleteCardPopup, closePopupByEsc)
  yesDeleteButton.addEventListener("click",()=>
  removeCard(card._id)
  .then((res) => {
    cardElement.remove();
    closePopup(deleteCardPopup)
  })
  .catch((err) => {
    console.log(err);
  })
)
}
formDeleteCard.addEventListener("submit", deleteCard)


//лайк карточки))
// обработчик клика для созд. новой карточки :)
addNewCardButton.addEventListener("click", () =>
  openPopup(addNewCardPopup, closePopupByEsc)
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

  closePopup(addNewCardPopup, closePopupByEsc);
}

formAddNewCard.addEventListener('submit', submitAddNewCardForm);

//переменные для поп с картинкой
const imagePopup = document.querySelector(".popup_type_image");//поп сс картинкой
const popImage = imagePopup.querySelector(".popup__image");//картинка
const caption = imagePopup.querySelector(".popup__caption");
//клик по картинке
function handleclickImage(evt) {
  openPopup(imagePopup, closePopupByEsc);
  const parent = evt.target.closest(".places__item");//находим родителя элемента на который нажали
  const titleImage =parent.querySelector('.card__title').textContent;// у родителя смотрим тайтл
  popImage.src = evt.target.src;
  popImage.alt = titleImage;
  caption.textContent= titleImage;
  }

enableValidation(validationConfig);

//все для попапа изменения аватара
const newAvatarPopup = document.querySelector(".popup_type_new-avatar");
const formEditAvatar = document.querySelector(".form__new-avatar");
const linkAvatarImput = formEditAvatar.querySelector(".popup__input_type_new-avatar");
const addNewAvatarButton = document.querySelector(".profile__avatar__edit-button");
const submitNewAvatarButton = formEditAvatar.querySelector(".popup__button");

addNewAvatarButton.addEventListener("click", () => {
  openPopup(newAvatarPopup, closePopupByEsc);
});

function submitAddNewAvatar (evt) {
  evt.preventDefault();
  const link = linkAvatarImput.value;
  submitNewAvatarButton.textContent = "Сохранение...";
  
  editProfileAvatar(link)
  .then((res) => {
    res.avatar.style.backgroundImage = `url(${res.avatar})`
    closePopup(newAvatarPopup);
    formEditAvatar.reset();
    clearError(formEditAvatar, validationConfig);
    updateProfile(res);
  })
  .catch((err) => {
    console.log(err);//куда блин выводить ошибки
  })
  .finally(() => {
    submitNewAvatarButton.textContent = 'Обновить';
  })
}

formEditAvatar.addEventListener("submit", submitAddNewAvatar);

function updateProfile(profile) {
  data.profileName.textContent = profile.name;
  data.profileDescription.textContent = profile.about;
  //data.avatar.style.backgroundImage = `url(${profile.avatar})`;
}