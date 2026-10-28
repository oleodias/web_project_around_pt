import { API_TOKEN } from "./config.js";

// Endereço do servidor e cabeçalhos enviados em todas as solicitações. O
// token identifica o usuário no servidor do projeto; ele vem do config.js,
// que fica fora do Git (modelo em config.example.js).
export const apiConfig = {
  baseUrl: "https://around-api.pt-br.tripleten-services.com/v1",
  headers: {
    authorization: API_TOKEN,
    "Content-Type": "application/json",
  },
};

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
export const avatarPopupSelector = "#avatar-popup";
export const confirmPopupSelector = "#confirm-popup";
export const userInfoSelectors = {
  nameSelector: ".profile__title",
  aboutSelector: ".profile__description",
  avatarSelector: ".profile__image",
};

// Texto do botão de envio enquanto a solicitação está em andamento
export const loadingButtonText = "Salvando...";

// Elementos que recebem ouvintes no index.js
export const profileEditButton = document.querySelector(
  ".profile__edit-button"
);
export const profileAddButton = document.querySelector(".profile__add-button");
export const editProfileForm = document.querySelector("#edit-profile-form");
export const newCardForm = document.querySelector("#new-card-form");
export const avatarForm = document.querySelector("#avatar-form");
export const profileAvatarButton = document.querySelector(
  ".profile__avatar-button"
);
