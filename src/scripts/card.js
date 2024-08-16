import { initialCards } from "./cards.js";
import { closePopup, openPicturePopup } from "./modal.js";
const cardTemplate = document.querySelector("#card-template").content;
export const cardsPlacesList = document.querySelector(".places__list");
export const popupAddCard = document.querySelector(".popup_type_new-card");
const newPlace = document.forms.newPlace;
const placeName = newPlace.querySelector(".popup__input_type_card-name");
const placeLink = newPlace.querySelector(".popup__input_type_url");

export function createCard(cardData, deleteCardFn, likeCard, openPicturePopup) {
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);

  const cardImage = cardElement.querySelector(".card__image");
  const cardTitle = cardElement.querySelector(".card__title");

  cardImage.src = cardData.link;
  cardImage.alt = "Фотография с места - " + cardData.name;
  cardTitle.textContent = cardData.name;

  const cardDeleteButton = cardElement.querySelector(".card__delete-button");

  cardDeleteButton.addEventListener("click", deleteCardFn);

  cardImage.addEventListener('click', function () {
    openPicturePopup(cardData.link, cardData.name);
  });

  return cardElement;
  
}

initialCards.forEach(function (cardData) {
  const cardElement = createCard(cardData, removeCard, likeCard, openPicturePopup);
  cardsPlacesList.append(cardElement);
});

export function removeCard(event) {
  const deletedCard = event.target.closest(".card");
  deletedCard.remove();
}

export function likeCard(likeButton) {
  likeButton.classList.toggle("card__like-button_is-active");
    }
  

export function addCardToPlacesList(evt) {
  evt.preventDefault();
  const addedCard = {
    name: placeName.value,
    link: placeLink.value,
  };
  const newPlaceCard = createCard(addedCard, removeCard, likeCard, openPicturePopup);
  cardsPlacesList.prepend(newPlaceCard, cardsPlacesList.firstChild);

  closePopup(popupAddCard);
  newPlace.reset();
}
