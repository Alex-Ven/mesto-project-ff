const cardTemplate = document.querySelector("#card-template").content;
export const cardsPlacesList = document.querySelector(".places__list");

export function createCard(
  cardData,
  deleteCardFn,
  likeCardFn,
  openPicturePopup
) {
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
  const cardImage = cardElement.querySelector(".card__image");
  const cardTitle = cardElement.querySelector(".card__title");
  const cardDeleteButton = cardElement.querySelector(".card__delete-button");
  const cardlikeButton = cardElement.querySelector(".card__like-button");

  cardImage.src = cardData.link;
  cardImage.alt = "Фотография с места - " + cardData.name;
  cardTitle.textContent = cardData.name;

  cardDeleteButton.addEventListener("click", deleteCardFn);
  cardlikeButton.addEventListener("click", likeCardFn);
  cardImage.addEventListener("click", function () {
    openPicturePopup(cardData.link, cardData.name);
  });

  return cardElement;
}

export function deleteCardFn(cardData) {
  const deletedCard = cardData.target.closest(".card");
  deletedCard.remove();
}

export function likeCardFn(evt) {
  if (evt.target.classList.contains("card__like-button")) {
    evt.target.classList.toggle("card__like-button_is-active");
  }
}
