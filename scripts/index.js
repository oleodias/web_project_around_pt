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
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");

// Elementos do pop-up de edição de perfil
const editPopup = document.querySelector("#edit-popup");
const editPopupCloseButton = editPopup.querySelector(".popup__close");
const editPopupForm = editPopup.querySelector("#edit-profile-form");
const editPopupNameInput = editPopup.querySelector(".popup__input_type_name");
const editPopupDescriptionInput = editPopup.querySelector(
  ".popup__input_type_description"
);

// Torna visível qualquer modal recebido como argumento.
function openModal(modal) {
  modal.classList.add("popup_is-opened");
}

// Oculta qualquer modal recebido como argumento.
function closeModal(modal) {
  modal.classList.remove("popup_is-opened");
}

// Abre o pop-up de edição já com os dados atuais do perfil nos campos.
profileEditButton.addEventListener("click", function () {
  editPopupNameInput.value = profileTitle.textContent;
  editPopupDescriptionInput.value = profileDescription.textContent;
  openModal(editPopup);
});

editPopupCloseButton.addEventListener("click", function () {
  closeModal(editPopup);
});

// Grava os dados do formulário no perfil e fecha o pop-up.
editPopupForm.addEventListener("submit", function (evt) {
  evt.preventDefault();
  profileTitle.textContent = editPopupNameInput.value;
  profileDescription.textContent = editPopupDescriptionInput.value;
  closeModal(editPopup);
});

// Percorre o array e exibe no console o nome de cada cartão.
initialCards.forEach(function (card) {
  console.log(card.name);
});
