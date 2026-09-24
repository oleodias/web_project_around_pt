import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";
import {
  initialCards,
  validationConfig,
  cardTemplateSelector,
  cardsListSelector,
  editPopupSelector,
  newCardPopupSelector,
  imagePopupSelector,
  userInfoSelectors,
  profileEditButton,
  profileAddButton,
  editProfileForm,
  newCardForm,
} from "../utils/constants.js";

// Instâncias. Nenhuma classe cria instância de outra: é aqui que elas são
// criadas e ligadas entre si, por meio dos callbacks.

const userInfo = new UserInfo(userInfoSelectors);

const imagePopup = new PopupWithImage(imagePopupSelector);

// Cria um cartão pronto, com o clique na imagem abrindo o pop-up ampliado.
function createCard(data) {
  const card = new Card(data, cardTemplateSelector, (cardData) => {
    imagePopup.open(cardData);
  });
  return card.generateCard();
}

// O renderer usa cardSection, a própria constante que está sendo declarada.
// Funciona porque ele só é chamado depois, em renderItems().
const cardSection = new Section(
  {
    items: initialCards,
    renderer: (item) => {
      cardSection.addItem(createCard(item));
    },
  },
  cardsListSelector
);

const editProfilePopup = new PopupWithForm(editPopupSelector, (formData) => {
  userInfo.setUserInfo(formData);
  editProfilePopup.close();
});

const newCardPopup = new PopupWithForm(newCardPopupSelector, (formData) => {
  cardSection.addItem(createCard(formData));
  newCardPopup.close();
});

const editProfileValidator = new FormValidator(
  validationConfig,
  editProfileForm
);
const newCardValidator = new FormValidator(validationConfig, newCardForm);

// Ouvintes

// Abre o "Editar perfil" com os dados atuais. A validação é redefinida
// depois de preencher: os valores só podem ser avaliados depois de existirem.
profileEditButton.addEventListener("click", () => {
  editProfilePopup.setInputValues(userInfo.getUserInfo());
  editProfileValidator.resetValidation();
  editProfilePopup.open();
});

profileAddButton.addEventListener("click", () => {
  newCardValidator.resetValidation();
  newCardPopup.open();
});

imagePopup.setEventListeners();
editProfilePopup.setEventListeners();
newCardPopup.setEventListeners();

editProfileValidator.setEventListeners();
newCardValidator.setEventListeners();

cardSection.renderItems();
