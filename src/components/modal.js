export function openPopup (popup, handleckickEsc) {
  popup.classList.add('popup_is-opened'); 
  document.addEventListener('keydown', handleckickEsc);    
}
export function closePopup (popup, handleckickEsc) {
  popup.classList.remove('popup_is-opened'); 
  document.removeEventListener('keydown', handleckickEsc);    
}

export function closePopupByEsc (event) {
  if (event.key === 'Escape') {
    const popOpen = document.querySelector('.popup_is-opened');
    if (popOpen) {
      closePopup()
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