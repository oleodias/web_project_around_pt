// Dados iniciais dos cartões exibidos na página.
// Cada objeto tem duas propriedades: name (título do local) e link (URL da imagem).
export const initialCards = [
  {
    name: "Vale de Yosemite",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_yosemite.jpg",
  },
  {
    name: "Lago Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_lake-louise.jpg",
  },
  {
    name: "Montanhas Carecas",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_bald-mountains.jpg",
  },
  {
    name: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_latemar.jpg",
  },
  {
    name: "Parque Nacional da Vanoise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_vanoise.jpg",
  },
  {
    name: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_lago.jpg",
  },
];

// Seletores e classes usados pela validação dos formulários
export const validationConfig = {
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
  disabledButtonClass: "popup__button_disabled",
};

// Seletores usados na criação das instâncias
export const cardTemplateSelector = "#card-template";
export const cardsListSelector = ".cards__list";
export const editPopupSelector = "#edit-popup";
export const newCardPopupSelector = "#new-card-popup";
export const imagePopupSelector = "#image-popup";
export const userInfoSelectors = {
  nameSelector: ".profile__title",
  jobSelector: ".profile__description",
};

// Elementos que recebem ouvintes no index.js
export const profileEditButton = document.querySelector(
  ".profile__edit-button"
);
export const profileAddButton = document.querySelector(".profile__add-button");
export const editProfileForm = document.querySelector("#edit-profile-form");
export const newCardForm = document.querySelector("#new-card-form");
