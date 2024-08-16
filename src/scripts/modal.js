export const modalPopup = document.querySelectorAll('.popup');
let escCallback;

export function openPopup(popup) {
  popup.classList.add('popup_is-opened');
  escCallback = function (evt) {
    closePopapByEsc(evt, popup);
  };
  document.addEventListener('keydown', escCallback);
}


export function closePopup(popup) {
  popup.classList.remove('popup_is-opened');
  document.removeEventListener('keydown', escCallback);
}

function closePopapByEsc(evt, popup) {
  if (evt.key === 'Escape') {
    closePopup(popup);
  }
}

export function openPopupByButton(button, popup) {
  button.addEventListener('click', function () {
    openPopup(popup);
  });
}

const picturePopup = document.querySelector('.popup_type_image');
const picturePopupImage = picturePopup.querySelector('.popup__image');
const picturePopupCaption = picturePopup.querySelector('.popup__caption');

export function openPicturePopup(link, alt) {
  picturePopupImage.src = link;
  picturePopupImage.alt = alt;
  picturePopupCaption.textContent = alt;
  openPopup(picturePopup);
}
