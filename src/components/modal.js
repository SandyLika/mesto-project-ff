export function openPop (popContainer) {
  popContainer.classList.add('popup_is-opened'); 
  document.addEventListener('keydown', Esc);    
}
export function closePop (popContainer) {
  popContainer.classList.remove('popup_is-opened'); 
  document.removeEventListener('keydown', Esc);    
}

function Esc (event) {
  if (event.key === 'Escape') {
    let popOpen = document.querySelector('.popup_is-opened');
    if (popOpen) {
      closePop()
    }
  }
}