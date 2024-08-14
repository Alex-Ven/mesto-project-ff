export const popups = document.querySelectorAll('.popup');
let escCallback;

export function openPopup(popup) {
  popup.classList.add('popup_is-opened');
  escCallback = function (evt) {
    closePopapEsc(evt, popup);
  };
  document.addEventListener('keydown', escCallback);
}


export function closePopup(popup) {
  popup.classList.remove('popup_is-opened');
  document.removeEventListener('keydown', escCallback);
}

function closePopapEsc(evt, popup) {
  if (evt.key === 'Escape') {
    closePopup(popup);
  }
}

export function openPopupByButton(button, popup) {
  button.addEventListener('click', function () {
    openPopup(popup);
  });
}


