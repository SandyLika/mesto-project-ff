// Добавляет класс ошибки, показывает ошибку
const showInputError = (formElement, inputElement, errorMessage, validationConfig) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(validationConfig.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(validationConfig.errorClass);
};
// Убирает класс ошибки, скрывает ошибку
const hideInputError = (formElement, inputElement, validationConfig) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(validationConfig.inputErrorClass);
  errorElement.classList.remove(validationConfig.errorClass);
  errorElement.textContent = '';
};
//проверка поля на валидность
const checkInputValidity = (formElement, inputElement, validationConfig) => {
  //если несовпадение по паттрену, то показать такое сообщение
  if (inputElement.validity.patternMismatch) {
    inputElement.setCustomValidity(inputElement.dataset.errorMessage);
  } else {
    inputElement.setCustomValidity("");
  }
  
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage);
  } else {
    hideInputError(formElement, inputElement, validationConfig);
  }
};

//добавлние слушателй всем формам
const setEventListeners = (formElement) => {
  const inputList = Array.from(formElement.querySelectorAll(validationConfig.inputSelector));
  const buttonElement = formElement.querySelector(validationConfig.submitButtonSelector)
  //переключить кнопку
  toggleButtonState(inputList, buttonElement);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', function () {
      checkInputValidity(formElement, inputElement);
      toggleButtonState(inputList, buttonElement);//переключить кнопку
    });
  });
};

//перебор всем форм, вызов слушателя
export const enableValidation = () => {
  const formList = Array.from(document.querySelectorAll('.form'));
  formList.forEach((formElement) => {
    formElement.addEventListener('submit', function () {
      evt.preventDefault();
    });
    setEventListeners(formElement)
  });
};
//enableValidation()

//проверяем чtо все поля прошли проверку на валидность
function hasInvalidInput(inputList) {
  return inputList.some(formElement => !formElement.validity.valid)
}

//переключатель доступности кнопки
function toggelButtonState (inputList, buttonElement, validationConfig) {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add("popup__button_disabled")//validationConfig.inaktiveButtonClass dont work((
    buttonElement.setAttribute('aria-disabled', 'true')
  }
  else {
    buttonElement.classList.remove("popup__button_disabled")
    buttonElement.setAttribute('aria-disabled', 'false')
  }
}
//очистка формы от ошибок
export function clearError (formElement,validationConfig) {
  const inputList = Array.from(formElement.querySelectorAll(validationConfig.inputSelector));
  const buttonElement = formElement.querySelector(validationConfig.submitButtonSelector);

  inputList.forEach((inputElement) => {
    toggelButtonState(inputList, buttonElement, validationConfig)
    hideInputError(formElement, inputElement, validationConfig);
  });
  toggelButtonState(inputList, buttonElement);
}