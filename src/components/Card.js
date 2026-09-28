// Um cartão de local: guarda os próprios dados e cuida dos próprios botões.
// O que acontece ao clicar na imagem, na lixeira ou no coração não é decisão
// do cartão — vem de fora, pelos callbacks. O cartão só avisa que foi
// clicado; quem fala com o servidor é o index.js.
export default class Card {
  constructor(
    data,
    templateSelector,
    userId,
    { handleCardClick, handleDeleteClick, handleLikeClick }
  ) {
    this._name = data.name;
    this._link = data.link;
    this._id = data._id;
    this._isLiked = data.isLiked;
    this._isOwner = data.owner === userId;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
    this._handleDeleteClick = handleDeleteClick;
    this._handleLikeClick = handleLikeClick;

    // Referências fixas para os manipuladores. O removeEventListener só
    // desliga um ouvinte se receber a MESMA função que foi registrada — uma
    // arrow criada na hora não teria como ser removida depois.
    this._handleLikeButtonClick = this._handleLikeButtonClick.bind(this);
    this._handleDeleteButtonClick = this._handleDeleteButtonClick.bind(this);
    this._handleImageClick = this._handleImageClick.bind(this);
  }

  // Devolve uma cópia do cartão do <template>, ainda fora da página.
  _getTemplate() {
    return document
      .querySelector(this._templateSelector)
      .content.querySelector(".card")
      .cloneNode(true);
  }

  // Preenche a imagem, o título e o coração com os dados do cartão.
  _setCardData() {
    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;
    this._cardTitle.textContent = this._name;
    this._renderLike();
  }

  // O segundo argumento do toggle força o estado: liga se true, desliga se
  // false — em vez de só inverter o que está lá.
  _renderLike() {
    this._likeButton.classList.toggle(
      "card__like-button_is-active",
      this._isLiked
    );
  }

  _handleLikeButtonClick() {
    this._handleLikeClick(this);
  }

  _handleDeleteButtonClick() {
    this._handleDeleteClick(this);
  }

  _handleImageClick() {
    this._handleCardClick({ name: this._name, link: this._link });
  }

  // Só ouvintes nos elementos do PRÓPRIO cartão. A lixeira só existe nos
  // cartões do usuário.
  _setEventListeners() {
    this._likeButton.addEventListener("click", this._handleLikeButtonClick);
    this._cardImage.addEventListener("click", this._handleImageClick);
    if (this._isOwner) {
      this._deleteButton.addEventListener(
        "click",
        this._handleDeleteButtonClick
      );
    }
  }

  _removeEventListeners() {
    this._likeButton.removeEventListener("click", this._handleLikeButtonClick);
    this._cardImage.removeEventListener("click", this._handleImageClick);
    if (this._isOwner) {
      this._deleteButton.removeEventListener(
        "click",
        this._handleDeleteButtonClick
      );
    }
  }

  getId() {
    return this._id;
  }

  isLiked() {
    return this._isLiked;
  }

  // Chamado pelo index.js com o isLiked que o servidor devolveu: o coração só
  // muda depois de a curtida estar salva.
  setLikeState(isLiked) {
    this._isLiked = isLiked;
    this._renderLike();
  }

  // Chamado pelo index.js depois de o servidor confirmar a exclusão. Desliga
  // os ouvintes, tira o cartão da página e solta a referência ao elemento: a
  // limpeza completa de um cartão descartado.
  removeCard() {
    this._removeEventListeners();
    this._element.remove();
    this._element = null;
  }

  // Monta o cartão completo e o devolve pronto para entrar na página. Todo o
  // preenchimento acontece antes da inserção.
  generateCard() {
    this._element = this._getTemplate();
    this._cardImage = this._element.querySelector(".card__image");
    this._cardTitle = this._element.querySelector(".card__title");
    this._likeButton = this._element.querySelector(".card__like-button");
    this._deleteButton = this._element.querySelector(".card__delete-button");

    // Cartão de outra pessoa: a lixeira sai do elemento antes de ele entrar
    // na página.
    if (!this._isOwner) {
      this._deleteButton.remove();
    }

    this._setCardData();
    this._setEventListeners();

    return this._element;
  }
}
