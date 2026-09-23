// Valida um formulário a partir de um objeto de configuração.
// A classe não sabe se está validando "Editar perfil" ou "Novo local":
// recebe o formulário e os seletores, e o resto vale para qualquer um.
export default class FormValidator {
  constructor(config, formElement) {
    this._config = config;
    this._formElement = formElement;
    this._inputs = Array.from(
      formElement.querySelectorAll(config.inputSelector)
    );
    this._submitButton = formElement.querySelector(config.submitButtonSelector);
  }

  // Localiza o <span> de erro de um campo.
  // O endereço vem do id do campo: #name-input tem #name-input-error ao lado.
  _findErrorElement(inputElement) {
    return this._formElement.querySelector(`#${inputElement.id}-error`);
  }

  // Mostra a mensagem padrão do navegador e marca o campo como inválido.
  _showInputError(inputElement) {
    const errorElement = this._findErrorElement(inputElement);

    inputElement.classList.add(this._config.inputErrorClass);
    errorElement.textContent = inputElement.validationMessage;
    errorElement.classList.add(this._config.errorClass);
  }

  // Apaga a mensagem de erro e devolve o campo ao estado normal.
  _hideInputError(inputElement) {
    const errorElement = this._findErrorElement(inputElement);

    inputElement.classList.remove(this._config.inputErrorClass);
    errorElement.textContent = "";
    errorElement.classList.remove(this._config.errorClass);
  }

  // Decide se o campo exibe erro, consultando o ValidityState.
  // validity.valid só é true quando nenhuma das regras do HTML falhou.
  _checkInputValidity(inputElement) {
    if (inputElement.validity.valid) {
      this._hideInputError(inputElement);
    } else {
      this._showInputError(inputElement);
    }
  }

  // Informa se pelo menos um campo do formulário está inválido.
  _hasInvalidInput() {
    return this._inputs.some((inputElement) => !inputElement.validity.valid);
  }

  // Liga ou desliga o botão de envio conforme a validade dos campos.
  _toggleButtonState() {
    this._submitButton.disabled = this._hasInvalidInput();
    this._submitButton.classList.toggle(
      this._config.disabledButtonClass,
      this._submitButton.disabled
    );
  }

  // Inicia a validação do formulário. Chamado uma vez, logo depois de criar
  // a instância.
  setEventListeners() {
    this._toggleButtonState();

    this._inputs.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        this._checkInputValidity(inputElement);
        this._toggleButtonState();
      });
    });
  }

  // Limpa as mensagens de erro e reavalia o botão.
  // Usado ao abrir um pop-up, para que os erros da vez anterior não
  // reapareçam.
  resetValidation() {
    this._inputs.forEach((inputElement) => {
      this._hideInputError(inputElement);
    });

    this._toggleButtonState();
  }
}
