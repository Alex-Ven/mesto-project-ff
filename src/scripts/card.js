import { initialCards } from "./cards.js";
import { closePopup } from "./modal.js";
const cardTemplate = document.querySelector("#card-template").content;
export const cardsPlacesList = document.querySelector(".places__list");
export const popupAddNewCard = document.querySelector(".popup_type_new-card");
const newPlace = document.forms.newPlace;
const placeName = newPlace.querySelector(".popup__input_type_card-name");
const placeLink = newPlace.querySelector(".popup__input_type_url");

export function createCard(cardData, deleteCardFn, likeCard) {
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);

  const cardImage = cardElement.querySelector(".card__image");
  const cardTitle = cardElement.querySelector(".card__title");

  cardImage.src = cardData.link;
  cardImage.alt = "Фотография с места - " + cardData.name;
  cardTitle.textContent = cardData.name;

  const cardDeleteButton = cardElement.querySelector(".card__delete-button");

  cardDeleteButton.addEventListener("click", deleteCardFn);

  return cardElement;
  
}

initialCards.forEach(function (cardData) {
  const cardElement = createCard(cardData, removeCard, likeCard);
  cardsPlacesList.append(cardElement);
});

export function removeCard(event) {
  const deletedCard = event.target.closest(".card");
  deletedCard.remove();
}

export function likeCard() {
  
  const cardToLike = document.querySelector(".places__list");
  cardToLike.addEventListener("click", function (evt) {
    if (evt.target.classList.contains("card__like-button")) {
      evt.target.classList.toggle("card__like-button_is-active");
    }
  });
}

export function addCardToCardsArray(evt) {
  evt.preventDefault();
  const addedCard = {
    name: placeName.value,
    link: placeLink.value,
  };
  const newPlaceCard = createCard(addedCard, removeCard, likeCard);
  cardsPlacesList.prepend(newPlaceCard, cardsPlacesList.firstChild);

  closePopup(popupAddNewCard);
  newPlace.reset();
}
