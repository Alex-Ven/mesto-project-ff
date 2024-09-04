import "../pages/index.css";
import { openPopup, closePopup } from "./modal.js";
import {
  createCard,
  deleteCardFn,
  likeCardFn,
  cardsPlacesList,
} from "./card.js";

import {
  enableValidation,
  validationSettings,
  clearValidation,
} from "./validation";

import {
  getUserData,
  getInitialCards,
  updateAvatar,
  patchUserData,
  postNewCard,
} from "./api.js";

import {
  renderLoading
} from "./utils.js";

let userAvatar = "";
let userId = "";

enableValidation(validationSettings);

const popupAddCard = document.querySelector(".popup_type_new-card");
const popupProfile = document.querySelector(".popup_type_edit");
const addButton = document.querySelector(".profile__add-button");
const editButton = document.querySelector(".profile__edit-button");
const profileName = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const profileForm = document.forms.editProfile;
const avatarFormElement = document.forms.avatarForm;
const avatarForm = document.querySelector(".popup_type-avatar");
const profileAvatar = document.querySelector(".profile__image");
const formInput = profileForm.querySelector(".popup__input");
const profileFormName = profileForm.querySelector(".popup__input_type_name");
const profileFormDescription = profileForm.querySelector(
  ".popup__input_type_description"
);
const newPlaceForm = document.forms.newPlace;
const newPlaceCardName = newPlaceForm.elements["place-name"];
const newPlaceCardlink = newPlaceForm.elements["place-link"];
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
  evt.preventDefault()
  function makeRequest() {
    return postNewCard(newPlaceCardName.value, newPlaceCardlink.value )
    .then((addedCard) => {
      const newPlaceCard = createCard(
        userId,
        addedCard,
        deleteCardFn,
        likeCardFn,
        openPicturePopup
      );
      cardsPlacesList.prepend(newPlaceCard);
      closePopup(popupAddCard);
      newPlaceForm.reset();
      clearValidation(newPlaceForm, validationSettings);
    });
  }
  handleSubmit(makeRequest, evt);
}

function setProfileForm() {
  profileFormName.value = profileName.textContent;
  profileFormDescription.value = profileDescription.textContent;
}

function changeProfile(evt) {
  evt.preventDefault();
  function makeRequest() {
    const name = profileFormName.value;
    const about = profileFormDescription.value;
    return patchUserData(name, about).then((dataUser) => {
      profileName.textContent = dataUser.name;
      profileDescription.textContent = dataUser.about;
      console.dir(name, about);
      closePopup(popupProfile);
      profileForm.reset();
    });
  }
  handleSubmit(makeRequest, evt);
}

function openProfilePopup() {
  clearValidation(profileForm, validationSettings);
  setProfileForm();
  openPopup(popupProfile);
}

profileAvatar.addEventListener("click", function () {
  clearValidation(avatarForm, validationSettings);
  openPopup(avatarForm);
});

function changeProfileAvatar(evt) {
  evt.preventDefault();
  const saveButton = evt.submitter;
  const avatarUrl = avatarFormElement.elements["avatar-link"].value;
  renderLoading(true, saveButton);

  updateAvatar(avatarUrl)
    .then((res) => {
      profileAvatar.setAttribute(
        "style",
        `background-image: url('${res.avatar}')`
      );
      closePopup(avatarForm);
    })
    .catch((error) => {
      console.error("Ошибка при сохранении аватара:", error);
    })
    .finally(() => {
      renderLoading(false, saveButton);
    });
}

newPlaceForm.addEventListener("submit", addCardToPlacesList);
profileForm.addEventListener("submit", changeProfile);
avatarFormElement.addEventListener("submit", changeProfileAvatar);

addButton.addEventListener("click", function () {
  clearValidation(newPlaceForm, validationSettings);
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

Promise.all([getInitialCards(), getUserData()])
  .then(([initialCards, userData]) => {
    userAvatar = userData.avatar;
    userId = userData._id;
    profileName.textContent = userData.name;
    profileDescription.textContent = userData.about;
    profileAvatar.style.backgroundImage = `url(${userData.avatar})`;

    initialCards.forEach(function (cardData) {
      const cardElement = createCard(
        userId,
        cardData,
        deleteCardFn,
        likeCardFn,
        openPicturePopup
      );
      cardsPlacesList.append(cardElement);
    });
  })
  .catch((err) => {
    console.log(err);
  });

export function handleSubmit(request, evt, loadingText = "Сохранение...") {
  evt.preventDefault();

  const submitButton = evt.submitter;
  const initialText = submitButton.textContent;
  renderLoading(true, submitButton, initialText, loadingText);

  
  request()
    .then(() => {
      evt.target.reset(); 
    })
    .catch((err) => {
      console.error(`Ошибка: ${err}`);
    })
    .finally(() => {
      renderLoading(false, submitButton, initialText, loadingText);
    });
}
