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
    showInputError(formElement, inputElement, inputElement.validationMessage, validationConfig);
  } else {
    hideInputError(formElement, inputElement, validationConfig);
  }
};

//добавлние слушателй всем формам
const setEventListeners = (formElement, validationConfig) => {
  const inputList = Array.from(formElement.querySelectorAll(validationConfig.inputSelector));
  const buttonElement = formElement.querySelector(validationConfig.submitButtonSelector);
  //переключить кнопку
  toggelButtonState(inputList, buttonElement, validationConfig);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', function () {
      checkInputValidity(formElement, inputElement, validationConfig);
      toggelButtonState(inputList, buttonElement,validationConfig);//переключить кнопку
    });
  });
};

//перебор всем форм, вызов слушателя
export const enableValidation = (validationConfig) => {
  const formList = Array.from(document.querySelectorAll(validationConfig.formSelector));
  formList.forEach((formElement) => {
    formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });
    setEventListeners(formElement, validationConfig);
  });
};
//enableValidation()

//проверяем чtо все поля прошли проверку на валидность
function hasInvalidInput(inputList) {
  return inputList.some(formElement => !formElement.validity.valid)
}

//переключатель доступности кнопки
function toggelButtonState (inputList, buttonElement,validationConfig) {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add(validationConfig.inactiveButtonClass)//validationConfig.inaktiveButtonClass dont work((
    buttonElement.setAttribute('aria-disabled', 'true')
  }
  else {
    buttonElement.classList.remove(validationConfig.inactiveButtonClass)
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
  toggelButtonState(inputList, buttonElement, validationConfig);
}