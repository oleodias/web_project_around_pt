import Api from "../components/Api.js";
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithConfirmation from "../components/PopupWithConfirmation.js";
import UserInfo from "../components/UserInfo.js";
import {
  apiConfig,
  validationConfig,
  cardTemplateSelector,
  cardsListSelector,
  editPopupSelector,
  newCardPopupSelector,
  imagePopupSelector,
  avatarPopupSelector,
  confirmPopupSelector,
  userInfoSelectors,
  loadingButtonText,
  profileEditButton,
  profileAddButton,
  profileAvatarButton,
  editProfileForm,
  newCardForm,
  avatarForm,
} from "../utils/constants.js";

// Instâncias. Nenhuma classe cria instância de outra: é aqui que elas são
// criadas e ligadas entre si, por meio dos callbacks.

const api = new Api(apiConfig);

const userInfo = new UserInfo(userInfoSelectors);

// O id do usuário só é conhecido quando a resposta do servidor chega.
let userId;

const imagePopup = new PopupWithImage(imagePopupSelector);
const confirmPopup = new PopupWithConfirmation(confirmPopupSelector);

// Envio comum aos três formulários: mostra "Salvando...", faz a solicitação,
// fecha o pop-up só se ela der certo e sempre devolve o texto do botão.
// request é uma função que faz a solicitação e trata a resposta.
function handleSubmit(request, popup) {
  popup.renderLoading(true, loadingButtonText);
  request()
    .then(() => {
      popup.close();
    })
    .catch((err) => {
      console.error(err);
    })
    .finally(() => {
      popup.renderLoading(false);
    });
}

function handleLikeClick(card) {
  api
    .changeLikeStatus(card.getId(), card.isLiked())
    .then((cardData) => {
      card.setLikeState(cardData.isLiked);
    })
    .catch((err) => {
      console.error(err);
    });
}

// A lixeira só abre o "Tem certeza?". A exclusão de verdade é a ação
// entregue ao pop-up, e só roda se o usuário clicar em "Sim".
function handleDeleteClick(card) {
  confirmPopup.setSubmitAction(() => {
    api
      .deleteCard(card.getId())
      .then(() => {
        card.removeCard();
        confirmPopup.close();
      })
      .catch((err) => {
        console.error(err);
      });
  });
  confirmPopup.open();
}

// Cria um cartão pronto, ligado aos pop-ups e ao servidor pelos callbacks.
function createCard(data) {
  const card = new Card(data, cardTemplateSelector, userId, {
    handleCardClick: (cardData) => {
      imagePopup.open(cardData);
    },
    handleDeleteClick,
    handleLikeClick,
  });
  return card.generateCard();
}

// O renderer usa cardSection, a própria constante que está sendo declarada.
// Funciona porque ele só é chamado depois, em renderItems().
const cardSection = new Section(
  {
    renderer: (item) => {
      cardSection.addItem(createCard(item));
    },
  },
  cardsListSelector
);

const editProfilePopup = new PopupWithForm(editPopupSelector, (formData) => {
  handleSubmit(
    () =>
      api.setUserInfo(formData).then((userData) => {
        userInfo.setUserInfo(userData);
      }),
    editProfilePopup
  );
});

const newCardPopup = new PopupWithForm(newCardPopupSelector, (formData) => {
  handleSubmit(
    () =>
      api.addCard(formData).then((cardData) => {
        cardSection.addItem(createCard(cardData));
      }),
    newCardPopup
  );
});

const avatarPopup = new PopupWithForm(avatarPopupSelector, (formData) => {
  handleSubmit(
    () =>
      api.setUserAvatar(formData).then((userData) => {
        userInfo.setUserInfo(userData);
      }),
    avatarPopup
  );
});

const editProfileValidator = new FormValidator(
  validationConfig,
  editProfileForm
);
const newCardValidator = new FormValidator(validationConfig, newCardForm);
const avatarValidator = new FormValidator(validationConfig, avatarForm);

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

profileAvatarButton.addEventListener("click", () => {
  avatarValidator.resetValidation();
  avatarPopup.open();
});

imagePopup.setEventListeners();
confirmPopup.setEventListeners();
editProfilePopup.setEventListeners();
newCardPopup.setEventListeners();
avatarPopup.setEventListeners();

editProfileValidator.setEventListeners();
newCardValidator.setEventListeners();
avatarValidator.setEventListeners();

// Carregamento inicial: usuário e cartões juntos. Os cartões só são
// desenhados depois de o id do usuário ser conhecido.
api
  .getAppInfo()
  .then(([userData, cards]) => {
    userId = userData._id;
    userInfo.setUserInfo(userData);
    cardSection.renderItems(cards);
  })
  .catch((err) => {
    console.error(err);
  });
