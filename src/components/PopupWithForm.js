import Popup from "./Popup.js";

// Pop-up com formulário. Não sabe o que fazer com os dados enviados: quem
// decide é o callback recebido no construtor.
export default class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
    this._form = this._popup.querySelector(".popup__form");
    this._inputs = Array.from(this._form.querySelectorAll(".popup__input"));
    this._submitButton = this._form.querySelector(".popup__button");
    this._submitButtonText = this._submitButton.textContent;
  }

  // Reúne os valores dos campos num objeto, usando o atributo name de cada
  // campo como chave: { name: "...", link: "..." }.
  _getInputValues() {
    const inputValues = {};

    this._inputs.forEach((input) => {
      inputValues[input.name] = input.value;
    });

    return inputValues;
  }

  // Preenche os campos a partir de um objeto com as mesmas chaves dos name.
  // Usado para abrir o "Editar perfil" com os dados atuais.
  setInputValues(data) {
    this._inputs.forEach((input) => {
      input.value = data[input.name];
    });
  }

  // Troca o texto do botão enquanto a solicitação está em andamento e o
  // devolve ao original quando ela termina.
  renderLoading(isLoading, loadingText) {
    this._submitButton.textContent = isLoading
      ? loadingText
      : this._submitButtonText;
  }

  // Acrescenta o envio ao que o pai já registra (X e sobreposição).
  setEventListeners() {
    super.setEventListeners();

    this._form.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._handleFormSubmit(this._getInputValues());
    });
  }

  // Fechar também limpa o formulário.
  close() {
    super.close();
    this._form.reset();
  }
}
