export function openPopup (popup, handleckickEsc) {
  popup.classList.add('popup_is-opened'); 
  document.addEventListener('keydown', handleckickEsc);    
}
export function closePopup (popup, handleckickEsc) {
  popup.classList.remove('popup_is-opened'); 
  document.removeEventListener('keydown', handleckickEsc);    
}

export function handleckickEsc (event) {
  if (event.key === 'Escape') {
    let popOpen = document.querySelector('.popup_is-opened');
    if (popOpen) {
      closePop()
    }
  }
}

export function handleClickOverlay(evt) {
  const popIsOpen = evt.target.closest(".popup");

  if (
    popIsOpen &&
    (evt.target === popIsOpen || evt.target.closest(".popup__close"))
  ) {
    closePopup(popIsOpen);       
  }
}