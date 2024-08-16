import "../pages/index.css";
import {
  createCard,
  removeCard,
  popupAddCard,
  addCardToPlacesList,
  likeCard,
} from "./card.js";

import {
  openPopup,
  closePopup,
  openPopupByButton,
  modalPopup,
  openPicturePopup,
} from "./modal.js";

const popupProfile = document.querySelector(".popup_type_edit");
const editButton = document.querySelector(".profile__edit-button");


const addButton = document.querySelector(".profile__add-button");

const profileName = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const profileForm = document.forms.editProfile;
const profileFormName = profileForm.querySelector(".popup__input_type_name");
const profileFormDescription = profileForm.querySelector(
  ".popup__input_type_description"
);

function setProfileForm() {
  profileFormName.value = profileName.textContent;
  profileFormDescription.value = profileDescription.textContent;
}

function openProfilePopup() {
  setProfileForm();
  openPopup(popupProfile);
}

editButton.addEventListener("click", openProfilePopup);

function changeProfile(evt) {
  evt.preventDefault();
  profileName.textContent = profileFormName.value;
  profileDescription.textContent = profileFormDescription.value;
  closePopup(popupProfile);
  profileForm.reset();
}

profileForm.addEventListener("submit", changeProfile);
newPlace.addEventListener("submit", addCardToPlacesList);

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

openPopupByButton(addButton, popupAddCard);


const cardToLike = document.querySelector(".places__list");
cardToLike.addEventListener("click", function (evt) {
  if (evt.target.classList.contains("card__like-button")) {
    likeCard(evt.target);
  }
});
