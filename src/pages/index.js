import "./index.css";
import {
  settings,
  resetValidation,
  enableValidation,
  disableButton,
} from "../scripts/validation.js";
import Api from "../utils/Api.js";
import { changeText } from "../utils/helpers.js";

const api = new Api({
  baseUrl: "https://around-api.en.tripleten-services.com/v1",
  headers: {
    authorization: "d01e2393-0511-4047-b2cd-e5f1d39fcd5a",
    "Content-Type": "application/json",
  },
});

api
  .getAppInfo()
  .then(([cards, user]) => {
    cards.forEach(function (item) {
      const cardElement = getCardElement(item);
      cardList.append(cardElement);
      console.log(cards);
    });
    const avatar = document.querySelector(".profile__avatar");
    avatar.src = user.avatar;
    profileNameElement.textContent = user.name;
    profileDescriptionElement.textContent = user.about;
    console.log(user);
  })

  .catch((err) => {
    console.error(err);
  });

function handleNewPostSubmit(e) {
  console.log(imageLinkInput.value);
  console.log(imageCaptionInput.value);
  e.preventDefault();
  changeText(e, true);
  api
    .postCards({ name: imageCaptionInput.value, link: imageLinkInput.value })
    .then((data) => {
      const cardElement = getCardElement({
        name: data.name,
        link: data.link,
        _id: data._id,
        isLiked: data.isLiked,
        avatar: data.avatar,
      });

      cardList.prepend(cardElement);
      closeModal(newPostModal);
      disableButton(modalSubmitButton, settings);
      newPostForm.reset();
    })
    .catch(console.error)
    .finally(() => {
      changeText(e, false);
    });
}

const modals = document.querySelectorAll(".modal");
const modalEditProfileContainer = document.querySelector(".modal__container");

const editProfileModal = document.querySelector("#edit-profile-modal");
const editProfileBtn = document.querySelector(".profile__edit-button");
const editProfileCloseBtn = editProfileModal.querySelector(".modal__close-btn");
const editProfileForm = editProfileModal.querySelector(".modal__form");

const profileNameInput = editProfileModal.querySelector("#profile-name");
const profileDescriptionInput = editProfileModal.querySelector(
  "#profile-description"
);
const cardsTemplate = document.querySelector("#card-template");
const cardList = document.querySelector(".cards__list");
const pictureModal = document.querySelector("#picture-modal");
const imageElement = pictureModal.querySelector(".modal__image");
const captionElement = pictureModal.querySelector(".modal__caption");
const imageCloseBtn = pictureModal.querySelector(
  ".modal__close-btn_type_preview"
);
const deleteModal = document.querySelector("#delete-post-modal");

const avatarModal = document.querySelector("#edit-avatar-modal");
const avatarButton = document.querySelector(".profile__avatar-btn");
const avatarCloseButton = avatarModal.querySelector(".modal__close-btn");
const avatarForm = avatarModal.querySelector(".modal__form");
const avatarInput = avatarModal.querySelector("#avatar-input");
const avatarImage = document.querySelector(".profile__avatar");
const avatarSubmit = avatarModal.querySelector(".modal__save-btn");

const deleteModalClose = deleteModal.querySelector(".modal__close-btn");
const deleteModalCancel = deleteModal.querySelector(".modal__cancel-btn");
const deleteForm = deleteModal.querySelector(".modal__form");
const newPostModal = document.querySelector("#new-post-modal");
const newPostBtn = document.querySelector(".profile__add-button");
const newPostCloseBtn = newPostModal.querySelector(".modal__close-btn");
const newPostForm = newPostModal.querySelector(".modal__form");
const modalSubmitButton = newPostModal.querySelector(".modal__save-btn");
const imageLinkInput = newPostModal.querySelector("#image-input");
const imageCaptionInput = newPostModal.querySelector("#caption");

const profileNameElement = document.querySelector(".profile__header");
const profileDescriptionElement = document.querySelector(
  ".profile__description"
);
let selectedCard;
let selectedCardId;

avatarButton.addEventListener("click", () => {
  resetValidation(avatarForm, [avatarInput]);
  openModal(avatarModal);
});

avatarCloseButton.addEventListener("click", () => {
  closeModal(avatarModal);
});

function handleDeleteCard(cardElement, data) {
  selectedCard = cardElement;
  selectedCardId = data;
  openModal(deleteModal);
  console.log(selectedCardId);
}

function handleDeleteSubmit(e) {
  e.preventDefault();
  changeText(e, true, "Deleting", "Delete");
  api
    .deleteCards(selectedCardId)
    .then(() => {
      selectedCard.remove();
      closeModal(deleteModal);
    })
    .catch(console.error)
    .finally(() => {
      changeText(e, false, "Deleting", "Delete");
    });
}

deleteModalClose.addEventListener("click", () => {
  closeModal(deleteModal);
});

deleteModalCancel.addEventListener("click", () => {
  closeModal(deleteModal);
});

deleteForm.addEventListener("submit", handleDeleteSubmit);

function getCardElement(data) {
  const cardElement = cardsTemplate.content
    .querySelector(".card")
    .cloneNode(true);
  const cardTitleElement = cardElement.querySelector(".card__title");
  const cardImageElement = cardElement.querySelector(".card__image");
  const deleteButton = cardElement.querySelector(".card__delete-btn");

  cardImageElement.src = data.link;
  cardImageElement.alt = data.name;
  cardTitleElement.textContent = data.name;

  const likeButtonEl = cardElement.querySelector(".card__button");
  if (data.isLiked === true) {
    likeButtonEl.classList.add("card__button_is_clicked");
  }
  deleteButton.addEventListener("click", () =>
    handleDeleteCard(cardElement, data._id)
  );
  likeButtonEl.addEventListener("click", (e) => handleLike(e, data._id));

  function handleLike(evt, id) {
    const liked = evt.target.classList.contains("card__button_is_clicked");

    selectedCardId = id;
    if (!liked) {
      api
        .likeCards(selectedCardId)
        .then((data) => {
          data.isLiked = true;
          console.log(data);
          evt.target.classList.add("card__button_is_clicked");
        })
        .catch(console.error);
    } else
      api
        .unlikeCards(selectedCardId)
        .then((data) => {
          data.isLiked = false;
          evt.target.classList.remove("card__button_is_clicked");
          console.log(data);
        })
        .catch(console.error);
  }

  cardImageElement.addEventListener("click", () => {
    imageElement.src = data.link;
    imageElement.alt = data.name;
    captionElement.textContent = data.name;
    openModal(pictureModal);
  });

  return cardElement;
}

imageCloseBtn.addEventListener("click", () => {
  closeModal(pictureModal);
});

function escape(evt) {
  if (evt.key === "Escape") {
    closeModal(document.querySelector(".modal_is-opened"));
  }
}

function openModal(modal) {
  modal.classList.add("modal_is-opened");
  document.addEventListener("keydown", escape);
}

function closeModal(modal) {
  modal.classList.remove("modal_is-opened");
  document.removeEventListener("keydown", escape);
}

editProfileBtn.addEventListener("click", function () {
  profileNameInput.value = profileNameElement.textContent;
  profileDescriptionInput.value = profileDescriptionElement.textContent;
  resetValidation(editProfileForm, [profileNameInput, profileDescriptionInput]);
  openModal(editProfileModal);
});

editProfileCloseBtn.addEventListener("click", function () {
  closeModal(editProfileModal);
});

newPostBtn.addEventListener("click", function () {
  resetValidation(newPostForm, [imageLinkInput, imageCaptionInput]);
  openModal(newPostModal);
});

newPostCloseBtn.addEventListener("click", function () {
  closeModal(newPostModal);
});

function handleEditProfileSubmit(e) {
  console.log("submitting");
  e.preventDefault();
  changeText(e, true);
  api
    .updateProfileInfo({
      name: profileNameInput.value,
      about: profileDescriptionInput.value,
    })
    .then((data) => {
      (profileNameElement.textContent = data.name),
        (profileDescriptionElement.textContent = data.about);
      closeModal(editProfileModal);
    })
    .catch(console.error)
    .finally(() => {
      changeText(e, false);
    });
}

editProfileForm.addEventListener("submit", handleEditProfileSubmit);

function handleAvatarSubmit(e) {
  console.log("submitting");
  e.preventDefault();
  changeText(e, true);
  api
    .updateAvatar({ avatar: avatarInput.value })
    .then((data) => {
      avatarImage.src = data.avatar;
      closeModal(avatarModal);
      disableButton(avatarSubmit, settings);
      avatarForm.reset();
    })
    .catch(console.error)
    .finally(() => {
      changeText(e, false);
    });
}

avatarForm.addEventListener("submit", handleAvatarSubmit);

newPostForm.addEventListener("submit", handleNewPostSubmit);

modals.forEach((modal) => {
  modal.addEventListener("mousedown", (evt) => {
    if (evt.target.classList.contains("modal")) {
      closeModal(modal);
    }
  });
});

enableValidation(settings);
