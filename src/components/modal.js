export function openPopup (popup, closePopupByEsc) {
  popup.classList.add('popup_is-opened'); 
  document.addEventListener('keydown', closePopupByEsc);    
}
export function closePopup (popup) {
  popup.classList.remove('popup_is-opened'); 
  document.removeEventListener('keydown', closePopupByEsc);   
}

export function closePopupByEsc (event) {
  if (event.key === 'Escape') {
    const popOpen = document.querySelector('.popup_is-opened');
    if (popOpen) {
      closePopup(popOpen)
    }
  }
}

export function closePopupByOverlay(evt) {
  const popIsOpen = evt.target.closest(".popup");

  if (
    popIsOpen &&
    (evt.target === popIsOpen || evt.target.closest(".popup__close"))
  ) {
    closePopup(popIsOpen);       
  }
}