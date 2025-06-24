const initialCards = [{
  name: "Golden Gate Bridge",
  link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/7-photo-by-griffin-wooldridge-from-pexels.jpg",
},
{
  name: "Val Thorens",
  link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/1-photo-by-moritz-feldmann-from-pexels.jpg",
},
{
  name: "Restaurant terrace",
  link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/2-photo-by-ceiline-from-pexels.jpg",
},
{
  name: "An outdoor cafe",
  link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/3-photo-by-tubanur-dogan-from-pexels.jpg",
},
{
  name: "A very long bridge, over the forest and through the trees",
  link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/4-photo-by-maurice-laschet-from-pexels.jpg",
},
{
  name: "Tunnel with morning light",
  link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/5-photo-by-van-anh-nguyen-from-pexels.jpg",
},
{
  name: "Mountain house",
  link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/6-photo-by-moritz-feldmann-from-pexels.jpg",
},
];
const editProfileModal = document.querySelector("#edit-profile-modal");
const editProfileBtn = document.querySelector(".profile__edit-button");
const editProfileCloseBtn = editProfileModal.querySelector(".modal__close-btn");
const editProfileForm = editProfileModal.querySelector(".modal__form");
const profileNameInput = editProfileModal.querySelector("#profile-name");
const profileDescriptionInput = editProfileModal.querySelector("#profile-description");
const cardsTemplate = document.querySelector("#card-template");
const cardList = document.querySelector(".cards__list");
const pictureModal = document.querySelector("#picture-modal");
const imageElement = pictureModal.querySelector(".modal__image");
const captionElement = pictureModal.querySelector(".modal__caption");
const imageCloseBtn = pictureModal.querySelector(".modal__close-btn_type_preview")

const newPostModal = document.querySelector("#new-post-modal");
const newPostBtn = document.querySelector(".profile__add-button");
const newPostCloseBtn = newPostModal.querySelector(".modal__close-btn");
const newPostForm = newPostModal.querySelector(".modal__form");
const imageLinkInput = newPostModal.querySelector("#image-input");
const imageCaptionInput = newPostModal.querySelector("#caption");



const profileNameElement = document.querySelector(".profile__header");
const profileDescriptionElement = document.querySelector(".profile__description");

function getCardElement(data) {
  const cardElement = cardsTemplate.content.querySelector(".card").cloneNode(true);
  const cardTitleElement = cardElement.querySelector(".card__title");
  const cardImageElement = cardElement.querySelector(".card__image");

  cardImageElement.src = data.link
  cardImageElement.alt = data.name
  cardTitleElement.textContent = data.name

  const likeButtonEl = cardElement.querySelector(".card__button")
  likeButtonEl.addEventListener("click", () => {
    likeButtonEl.classList.toggle("card__button_is-clicked");
});

const deleteButton = cardElement.querySelector(".card__delete-btn");
deleteButton.addEventListener("click", () => {
  cardElement.remove();
});

cardImageElement.addEventListener("click", () => {
  imageElement.src = data.link;
  imageElement.alt = data.name;
  captionElement.textContent = data.name;
  openModal(pictureModal);
});

imageCloseBtn.addEventListener("click", () => {
  closeModal(pictureModal);
});

  return cardElement;


};

initialCards.forEach(function (item) {
  const cardElement = getCardElement(item);
  cardList.append(cardElement);
});

function openModal(modal) {
  modal.classList.add("modal_is-opened");
};

function closeModal(modal) {
  modal.classList.remove("modal_is-opened");
};


editProfileBtn.addEventListener("click", function () {
  profileNameInput.value = profileNameElement.textContent;
  profileDescriptionInput.value = profileDescriptionElement.textContent;
  openModal(editProfileModal);
});

editProfileCloseBtn.addEventListener("click", function () {
  closeModal(editProfileModal)
});

newPostBtn.addEventListener("click", function () {
  openModal(newPostModal);
});

newPostCloseBtn.addEventListener("click", function () {
  closeModal(newPostModal);
});

function handleEditProfileSubmit(e) {
  console.log("submitting");
  profileNameElement.textContent = profileNameInput.value;
  profileDescriptionElement.textContent = profileDescriptionInput.value;
  closeModal(editProfileModal);
  e.preventDefault();
};

editProfileForm.addEventListener("submit", handleEditProfileSubmit);


function handleNewPostSubmit(e) {
  console.log(imageLinkInput.value);
  console.log(imageCaptionInput.value);
  const cardElement = getCardElement({
    name: imageCaptionInput.value,
    link: imageLinkInput.value,
  });
  cardList.prepend(cardElement);
  e.preventDefault();
  closeModal(newPostModal);
  newPostForm.reset();
};

newPostForm.addEventListener("submit", handleNewPostSubmit);

