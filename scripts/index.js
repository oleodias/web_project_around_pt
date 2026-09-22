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

// Elementos da seção de perfil
const profileEditButton = document.querySelector(".profile__edit-button");
const profileAddButton = document.querySelector(".profile__add-button");
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");

// Lista de cartões e o molde usado para criar cada um
const cardsList = document.querySelector(".cards__list");
const cardTemplate = document
  .querySelector("#card-template")
  .content.querySelector(".card");

// Todos os pop-ups da página, para registrar o fechamento uma vez só
const popupList = document.querySelectorAll(".popup");

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

// Elementos do pop-up de imagem ampliada
const imagePopup = document.querySelector("#image-popup");
const imagePopupImage = imagePopup.querySelector(".popup__image");
const imagePopupCaption = imagePopup.querySelector(".popup__caption");

// Fecha o pop-up aberto quando a tecla Esc é pressionada.
// Precisa ser uma função nomeada: removeEventListener só remove o ouvinte se
// receber a mesma referência que foi registrada — uma função anônima
// equivalente seria outra função, e a remoção falharia em silêncio.
function handleEscapeKey(evt) {
  if (evt.key === "Escape") {
    const openedPopup = document.querySelector(".popup_is-opened");
    closeModal(openedPopup);
  }
}

// Torna visível qualquer modal recebido como argumento.
function openModal(modal) {
  modal.classList.add("popup_is-opened");
  document.addEventListener("keydown", handleEscapeKey);
}

// Oculta qualquer modal recebido como argumento.
function closeModal(modal) {
  modal.classList.remove("popup_is-opened");
  document.removeEventListener("keydown", handleEscapeKey);
}

// Monta um cartão a partir do molde e devolve o elemento pronto, sem inseri-lo.
function getCardElement(data) {
  const cardElement = cardTemplate.cloneNode(true);
  const cardImage = cardElement.querySelector(".card__image");
  const cardTitle = cardElement.querySelector(".card__title");
  const cardLikeButton = cardElement.querySelector(".card__like-button");
  const cardDeleteButton = cardElement.querySelector(".card__delete-button");

  cardImage.src = data.link;
  cardImage.alt = data.name;
  cardTitle.textContent = data.name;

  cardLikeButton.addEventListener("click", function () {
    cardLikeButton.classList.toggle("card__like-button_is-active");
  });

  cardDeleteButton.addEventListener("click", function () {
    cardElement.remove();
  });

  cardImage.addEventListener("click", function () {
    imagePopupImage.src = data.link;
    imagePopupImage.alt = data.name;
    imagePopupCaption.textContent = data.name;
    openModal(imagePopup);
  });

  return cardElement;
}

// Insere um cartão no início da lista.
function renderCard(data) {
  cardsList.prepend(getCardElement(data));
}

// Fechamento por sobreposição e por botão, registrado de uma vez para todos os
// pop-ups — evita repetir o mesmo ouvinte três vezes.
// O evento é "mousedown" e não "click": com "click", arrastar a seleção de
// dentro de um campo até fora da janela fecharia o pop-up no meio da digitação.
popupList.forEach(function (popup) {
  popup.addEventListener("mousedown", function (evt) {
    const clickTarget = evt.target;
    const overlay = evt.currentTarget;

    if (
      clickTarget === overlay ||
      clickTarget.classList.contains("popup__close")
    ) {
      closeModal(popup);
    }
  });
});

// Abre o pop-up de edição já com os dados atuais do perfil nos campos.
// A validação é redefinida depois de preencher: os valores só podem ser
// avaliados depois de existirem nos campos.
profileEditButton.addEventListener("click", function () {
  editPopupNameInput.value = profileTitle.textContent;
  editPopupDescriptionInput.value = profileDescription.textContent;
  resetValidation(editPopupForm, validationConfig);
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
  resetValidation(newCardPopupForm, validationConfig);
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

// Exibe os cartões iniciais na página.
initialCards.forEach(function (cardData) {
  renderCard(cardData);
});
