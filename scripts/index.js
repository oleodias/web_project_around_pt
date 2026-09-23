import Card from "./Card.js";
import FormValidator from "./FormValidator.js";
import { openModal, closeModal, handlePopupMousedown } from "./utils.js";

// Dados iniciais dos cartões exibidos na página.
// Cada objeto tem duas propriedades: name (título do local) e link (URL da imagem).
const initialCards = [
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
const validationConfig = {
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
  disabledButtonClass: "popup__button_disabled",
};

const cardTemplateSelector = "#card-template";

// Elementos da seção de perfil
const profileEditButton = document.querySelector(".profile__edit-button");
const profileAddButton = document.querySelector(".profile__add-button");
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");

// Lista de cartões e todos os pop-ups da página
const cardsList = document.querySelector(".cards__list");
const popups = document.querySelectorAll(".popup");

// Elementos do pop-up de edição de perfil
const editPopup = document.querySelector("#edit-popup");
const editPopupForm = editPopup.querySelector("#edit-profile-form");
const editPopupNameInput = editPopup.querySelector(".popup__input_type_name");
const editPopupDescriptionInput = editPopup.querySelector(
  ".popup__input_type_description"
);

// Elementos do pop-up de novo local
const newCardPopup = document.querySelector("#new-card-popup");
const newCardPopupForm = newCardPopup.querySelector("#new-card-form");
const newCardPopupNameInput = newCardPopup.querySelector(
  ".popup__input_type_card-name"
);
const newCardPopupLinkInput = newCardPopup.querySelector(
  ".popup__input_type_url"
);

// Uma instância de FormValidator para cada formulário
const editProfileValidator = new FormValidator(validationConfig, editPopupForm);
const newCardValidator = new FormValidator(validationConfig, newCardPopupForm);

// Cria o cartão a partir dos dados e o devolve pronto, sem inseri-lo.
function createCard(data) {
  const card = new Card(data, cardTemplateSelector);
  return card.generateCard();
}

// Insere um cartão no início da lista.
function renderCard(data) {
  cardsList.prepend(createCard(data));
}

// Fechamento por sobreposição e por botão X, registrado uma vez por pop-up.
popups.forEach(function (popup) {
  popup.addEventListener("mousedown", handlePopupMousedown);
});

// Abre o pop-up de edição já com os dados atuais do perfil nos campos.
// A validação é redefinida depois de preencher: os valores só podem ser
// avaliados depois de existirem nos campos.
profileEditButton.addEventListener("click", function () {
  editPopupNameInput.value = profileTitle.textContent;
  editPopupDescriptionInput.value = profileDescription.textContent;
  editProfileValidator.resetValidation();
  openModal(editPopup);
});

// Grava os dados do formulário no perfil e fecha o pop-up.
editPopupForm.addEventListener("submit", function (evt) {
  evt.preventDefault();
  profileTitle.textContent = editPopupNameInput.value;
  profileDescription.textContent = editPopupDescriptionInput.value;
  closeModal(editPopup);
});

// Abre o pop-up de novo local com os campos limpos e o botão inativo.
profileAddButton.addEventListener("click", function () {
  newCardPopupForm.reset();
  newCardValidator.resetValidation();
  openModal(newCardPopup);
});

// Cria o cartão com os dados digitados, limpa o formulário e fecha o pop-up.
newCardPopupForm.addEventListener("submit", function (evt) {
  evt.preventDefault();
  renderCard({
    name: newCardPopupNameInput.value,
    link: newCardPopupLinkInput.value,
  });
  evt.target.reset();
  closeModal(newCardPopup);
});

// Inicia a validação dos dois formulários.
editProfileValidator.setEventListeners();
newCardValidator.setEventListeners();

// Exibe os cartões iniciais na página.
initialCards.forEach(function (cardData) {
  renderCard(cardData);
});
