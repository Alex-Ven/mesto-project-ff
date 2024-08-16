import "../pages/index.css";
import {
  createCard,
  removeCard,
  popupAddNewCard,
  addCardToCardsArray,
  likeCard,
} from "./card.js";

import {
  openPopup,
  closePopup,
  openPopupByButton,
  modalPopup,
  openImagePopup,
} from "./modal.js";

const popupProfile = document.querySelector(".popup_type_edit");
const editButton = document.querySelector(".profile__edit-button");
const likeButton = document.querySelector(".card__like-button");

const addButton = document.querySelector(".profile__add-button");

const profileName = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const profileForm = document.forms.editProfile;
const profileFormName = profileForm.querySelector(".popup__input_type_name");
const profileFormDescription = profileForm.querySelector(
  ".popup__input_type_description"
);

function setProfileFormValues() {
  profileFormName.value = profileName.textContent;
  profileFormDescription.value = profileDescription.textContent;
}

function openProfilePopupByButton() {
  setProfileFormValues();
  openPopup(popupProfile);
}

editButton.addEventListener("click", openProfilePopupByButton);

function changeProfile(evt) {
  evt.preventDefault();
  profileName.textContent = profileFormName.value;
  profileDescription.textContent = profileFormDescription.value;
  closePopup(popupProfile);
  profileForm.reset();
}

profileForm.addEventListener("submit", changeProfile);
newPlace.addEventListener("submit", addCardToCardsArray);

modalPopup.forEach(function (popup) {
  popup.addEventListener("click", function (evt) {
    if (
      evt.target === evt.currentTarget ||
      evt.target.classList.contains("popup__close")
    ) {
      closePopup(popup);
    }
  });
});

openPopupByButton(addButton, popupAddNewCard);


const cardToLike = document.querySelector(".places__list");
cardToLike.addEventListener("click", function (evt) {
  if (evt.target.classList.contains("card__like-button")) {
    likeCard(evt.target);
  }
});
