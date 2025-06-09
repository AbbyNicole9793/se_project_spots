
const editProfileModal = document.querySelector("#edit-profile-modal");
const editProfileBtn = document.querySelector(".profile__edit-button");
const editProfileCloseBtn = editProfileModal.querySelector(".modal__close-btn");
const editProfileForm = editProfileModal.querySelector(".modal__form");
const profileNameInput = editProfileModal.querySelector("#profile-name");
const profileDescriptionInput = editProfileModal.querySelector("#profile-description");


const newPostModal = document.querySelector("#new-post-modal");
const newPostBtn = document.querySelector(".profile__add-button");
const newPostCloseBtn = newPostModal.querySelector(".modal__close-btn");
const newPostForm = newPostModal.querySelector(".modal__form");
const imageLinkInput = newPostModal.querySelector("#image-input");
const imageCaptionInput = newPostModal.querySelector("#caption");



const profileNameElement = document.querySelector(".profile__header");
const profileDescriptionElement = document.querySelector(".profile__description");


editProfileBtn.addEventListener("click", function () {
  profileNameInput.value = profileNameElement.textContent;
  profileDescriptionInput.value = profileDescriptionElement.textContent;
  editProfileModal.classList.add("modal_is-opened");
});

editProfileCloseBtn.addEventListener("click", function () {
  editProfileModal.classList.remove("modal_is-opened");
});

newPostBtn.addEventListener("click", function () {
  newPostModal.classList.add("modal_is-opened");
});

newPostCloseBtn.addEventListener("click", function () {
  newPostModal.classList.remove("modal_is-opened");
});

function handleEditProfileSubmit(e) {
  console.log("submitting");
  profileNameElement.textContent = profileNameInput.value;
  profileDescriptionElement.textContent = profileDescriptionInput.value;
  editProfileModal.classList.remove("modal_is-opened");
  e.preventDefault();
};

editProfileForm.addEventListener("submit", handleEditProfileSubmit);


function handleNewPostSubmit(e) {
  console.log(imageLinkInput.value);
  console.log(imageCaptionInput.value);
  e.preventDefault();
  newPostModal.classList.remove("modal_is-opened");
};

newPostForm.addEventListener("submit", handleNewPostSubmit);