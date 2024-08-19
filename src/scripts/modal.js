export function openPopup(popup) {
  popup.classList.add('popup_is-opened');
  popup.addEventListener('click', closePopapOnOverlay)
  document.addEventListener('keydown', closePopapByEsc);
}


export function closePopup(popup) {
  popup.classList.remove('popup_is-opened');
  popup.addEventListener('click', closePopapOnOverlay)
  document.removeEventListener('keydown', closePopapByEsc);
  
}

function closePopapByEsc(evt, popup) {
  if (evt.key === 'Escape') {
    const openedPopup = document.querySelector(".popup_is-opened");
    closePopup(openedPopup);
  }
}

export function closePopapOnOverlay(evt) {
  if (evt.target === evt.currentTarget) {
    closePopup(evt.currentTarget);
  }
};