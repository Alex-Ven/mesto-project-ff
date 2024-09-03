import { removeCard, addLikeCard, deleteLikeCard } from "./api.js";

const cardTemplate = document.querySelector("#card-template").content;
export const cardsPlacesList = document.querySelector(".places__list");

export function createCard(
  userId,
  cardData,
  deleteCardFn,
  likeCardFn,
  openPicturePopup
) {
  const cardElement = cardTemplate
    .querySelector(".places__item")
    .cloneNode(true);
  const cardImage = cardElement.querySelector(".card__image");
  const cardTitle = cardElement.querySelector(".card__title");
  const cardDeleteButton = cardElement.querySelector(".card__delete-button");
  const cardlikeButton = cardElement.querySelector(".card__like-button");
  const cardLikeCounter = cardElement.querySelector(".card__like-counter");

  cardImage.src = cardData.link;
  cardImage.alt = "Фотография с места - " + cardData.name;
  cardTitle.textContent = cardData.name;
  cardLikeCounter.textContent = cardData.likes.length;

  if (userId !== cardData.owner._id) {
    cardDeleteButton.style.display = "none";
  } else {
    cardDeleteButton.addEventListener("click", () => {
      const cardId = cardData._id;
      deleteCardFn(cardElement, cardId);
    });
  }

  const isLiked = cardData.likes.some((like) => like._id === userId);
  if (isLiked) {
    cardlikeButton.classList.add("card__like-button_is-active");
  }

  cardlikeButton.addEventListener("click", () => {
    likeCardFn(cardLikeCounter, cardlikeButton, cardData);
  });
  cardImage.addEventListener("click", function () {
    openPicturePopup(cardData.link, cardData.name);
  });

  return cardElement;
}

export function deleteCardFn(cardElement, cardId) {
  const cardToRemove = cardElement.closest(".card");
  removeCard(cardId)
    .then(() => {
      cardToRemove.remove();
    })
    .catch((err) => {
      console.error(`"Произошла ошибка при удалении карточки:", ${err}`);
    });
}

export function likeCardFn(cardLikeCounter, cardlikeButton, cardData) {
  if (cardlikeButton.classList.contains("card__like-button_is-active")) {
    deleteLikeCard(cardData._id)
      .then((res) => {
        cardlikeButton.classList.toggle("card__like-button_is-active");
        cardLikeCounter.textContent = res.likes.length;
      })
      .catch((err) => {
        console.error("Произошла ошибка при удалении лайка:", err);
      });
  } else {
    addLikeCard(cardData._id)
      .then((res) => {
        cardlikeButton.classList.toggle("card__like-button_is-active");
        cardLikeCounter.textContent = res.likes.length;
      })
      .catch((err) => {
        console.error("Произошла ошибка при добавлении лайка:", err);
      });
  }
}
