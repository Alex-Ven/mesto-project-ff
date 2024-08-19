import "../pages/index.css";
import { initialCards } from "./cards";
import { openPopup, closePopup } from "./modal.js";
import {
  createCard,
  deleteCardFn,
  likeCardFn,
  cardsPlacesList,
} from "./card.js";

const popupAddCard = document.querySelector(".popup_type_new-card");
const popupProfile = document.querySelector(".popup_type_edit");
const addButton = document.querySelector(".profile__add-button");
const editButton = document.querySelector(".profile__edit-button");
const profileName = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const profileForm = document.forms.editProfile;
const profileFormName = profileForm.querySelector(".popup__input_type_name");
const profileFormDescription = profileForm.querySelector(
  ".popup__input_type_description"
);
const newPlaceForm = document.forms.newPlace;
const newPlaceCardName = newPlaceForm.elements["place-name"];
const newPlaceCardlink = newPlaceForm.elements["link"];
const picturePopup = document.querySelector(".popup_type_image");
const picturePopupImage = document.querySelector(".popup__image");
const picturePopupCaption = document.querySelector(".popup__caption");
const popupCloseButtons = document.querySelectorAll(".popup");

function openPicturePopup(link, alt) {
  picturePopupImage.src = link;
  picturePopupImage.alt = alt;
  picturePopupCaption.textContent = alt;
  openPopup(picturePopup);
}

function addCardToPlacesList(evt) {
  evt.preventDefault();
  const addedCard = {
    name: newPlaceCardName.value,
    link: newPlaceCardlink.value,
    alt: newPlaceCardName.value,
  };
  const newPlaceCard = createCard(
    addedCard,
    deleteCardFn,
    likeCardFn,
    openPicturePopup
  );
  cardsPlacesList.prepend(newPlaceCard, cardsPlacesList.firstChild);
  closePopup(popupAddCard);
  newPlaceForm.reset();
}

function setProfileForm() {
  profileFormName.value = profileName.textContent;
  profileFormDescription.value = profileDescription.textContent;
}

function changeProfile(evt) {
  evt.preventDefault();
  profileName.textContent = profileFormName.value;
  profileDescription.textContent = profileFormDescription.value;
  closePopup(popupProfile);
  profileForm.reset();
}

function openProfilePopup() {
  setProfileForm();
  openPopup(popupProfile);
}

newPlaceForm.addEventListener("submit", addCardToPlacesList);
profileForm.addEventListener("submit", changeProfile);

addButton.addEventListener("click", function () {
  openPopup(popupAddCard);
});
editButton.addEventListener("click", openProfilePopup);

popupCloseButtons.forEach(function (popup) {
  popup.addEventListener("click", function (evt) {
    if (
      evt.target === evt.currentTarget ||
      evt.target.classList.contains("popup__close")
    ) {
      closePopup(popup);
    }
  });
});

initialCards.forEach(function (cardData) {
  const cardElement = createCard(
    cardData,
    deleteCardFn,
    likeCardFn,
    openPicturePopup
  );
  cardsPlacesList.append(cardElement);
});
