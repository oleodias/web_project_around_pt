import { openImagePopup } from "./utils.js";

// Um cartão de local: guarda os próprios dados e cuida dos próprios botões.
export default class Card {
  constructor(data, templateSelector) {
    this._name = data.name;
    this._link = data.link;
    this._templateSelector = templateSelector;
  }

  // Devolve uma cópia do cartão do <template>, ainda fora da página.
  // .querySelector(".card") depois de .content é o que devolve o <li>,
  // e não o fragmento inteiro do template.
  _getTemplate() {
    return document
      .querySelector(this._templateSelector)
      .content.querySelector(".card")
      .cloneNode(true);
  }

  // Preenche a imagem e o título com os dados do cartão.
  _setCardData() {
    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;
    this._cardTitle.textContent = this._name;
  }

  _handleLikeClick() {
    this._likeButton.classList.toggle("card__like-button_is-active");
  }

  // Remove o cartão da página e solta a referência ao elemento, que já não
  // tem utilidade nenhuma.
  _handleDeleteClick() {
    this._element.remove();
    this._element = null;
  }

  _handleImageClick() {
    openImagePopup(this._name, this._link);
  }

  // Só ouvintes nos elementos do PRÓPRIO cartão. Nenhum ouvinte em elemento
  // compartilhado da página: senão cada cartão novo acrescentaria mais um.
  // Arrow function para que o this continue sendo o cartão, e não o botão
  // clicado.
  _setEventListeners() {
    this._likeButton.addEventListener("click", () => {
      this._handleLikeClick();
    });

    this._deleteButton.addEventListener("click", () => {
      this._handleDeleteClick();
    });

    this._cardImage.addEventListener("click", () => {
      this._handleImageClick();
    });
  }

  // O único método público: monta o cartão completo e o devolve pronto para
  // entrar na página. Todo o preenchimento acontece antes da inserção.
  generateCard() {
    this._element = this._getTemplate();
    this._cardImage = this._element.querySelector(".card__image");
    this._cardTitle = this._element.querySelector(".card__title");
    this._likeButton = this._element.querySelector(".card__like-button");
    this._deleteButton = this._element.querySelector(".card__delete-button");

    this._setCardData();
    this._setEventListeners();

    return this._element;
  }
}
