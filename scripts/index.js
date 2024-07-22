const cardTemplate = document.querySelector("#card-template").content;

function createCard(cardData, deleteCardFn) {
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);

  const cardImage = cardElement.querySelector(".card__image");
  const cardTitle = cardElement.querySelector(".card__title");

  cardImage.src = cardData.link;
  cardImage.alt = 'Фотография с места - ' + cardData.name;
  cardTitle.textContent = cardData.name;

  const cardDeleteButton = cardElement.querySelector(".card__delete-button");

  cardDeleteButton.addEventListener("click", deleteCardFn);

  return cardElement;
};

initialCards.forEach(function (cardData) {
  const cardElement = createCard(cardData, removeCard);
  const cardsPlacesList = document.querySelector(".places__list");
  cardsPlacesList.append(cardElement);
});

function removeCard(event) {
  const deletedCard = event.target.closest(".card");
  deletedCard.remove();
};
