// Um cartão de local: guarda os próprios dados e cuida dos próprios botões.
// O que acontece ao clicar na imagem não é decisão do cartão — vem de fora,
// pelo handleCardClick.
export default class Card {
  constructor(data, templateSelector, handleCardClick) {
    this._name = data.name;
    this._link = data.link;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;

    // Referências fixas para os manipuladores. O removeEventListener só
    // desliga um ouvinte se receber a MESMA função que foi registrada — uma
    // arrow criada na hora não teria como ser removida depois.
    this._handleLikeClick = this._handleLikeClick.bind(this);
    this._handleDeleteClick = this._handleDeleteClick.bind(this);
    this._handleImageClick = this._handleImageClick.bind(this);
  }

  // Devolve uma cópia do cartão do <template>, ainda fora da página.
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

  // Desliga os ouvintes, tira o cartão da página e solta a referência ao
  // elemento: a limpeza completa de um cartão descartado.
  _handleDeleteClick() {
    this._removeEventListeners();
    this._element.remove();
    this._element = null;
  }

  _handleImageClick() {
    this._handleCardClick({ name: this._name, link: this._link });
  }

  // Só ouvintes nos elementos do PRÓPRIO cartão.
  _setEventListeners() {
    this._likeButton.addEventListener("click", this._handleLikeClick);
    this._deleteButton.addEventListener("click", this._handleDeleteClick);
    this._cardImage.addEventListener("click", this._handleImageClick);
  }

  _removeEventListeners() {
    this._likeButton.removeEventListener("click", this._handleLikeClick);
    this._deleteButton.removeEventListener("click", this._handleDeleteClick);
    this._cardImage.removeEventListener("click", this._handleImageClick);
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
