// Configuração da validação.
// Reunir os seletores e as classes num objeto só é o que torna as funções
// abaixo universais: elas não sabem nada sobre "perfil" ou "novo local",
// recebem tudo pelo parâmetro config.
const validationConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
  disabledButtonClass: "popup__button_disabled",
};

// Localiza o <span> de erro de um campo.
// O endereço vem do id do campo: #name-input tem #name-input-error ao lado.
function findErrorElement(formElement, inputElement) {
  return formElement.querySelector(`#${inputElement.id}-error`);
}

// Mostra a mensagem de erro de um campo e marca o campo como inválido.
function showInputError(formElement, inputElement, errorMessage, config) {
  const errorElement = findErrorElement(formElement, inputElement);

  inputElement.classList.add(config.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(config.errorClass);
}

// Apaga a mensagem de erro de um campo e devolve o campo ao estado normal.
function hideInputError(formElement, inputElement, config) {
  const errorElement = findErrorElement(formElement, inputElement);

  inputElement.classList.remove(config.inputErrorClass);
  errorElement.textContent = "";
  errorElement.classList.remove(config.errorClass);
}

// Decide se um campo deve exibir erro, consultando o navegador.
// validity.valid é o resumo do ValidityState: só é true quando nenhuma das
// regras declaradas no HTML (required, minlength, maxlength, type) falhou.
// validationMessage é a mensagem padrão do navegador, no idioma da pessoa.
function checkInputValidity(formElement, inputElement, config) {
  if (inputElement.validity.valid) {
    hideInputError(formElement, inputElement, config);
  } else {
    showInputError(formElement, inputElement, inputElement.validationMessage, config);
  }
}

// Informa se pelo menos um campo da lista está inválido.
function hasInvalidInput(inputList) {
  return inputList.some(function (inputElement) {
    return !inputElement.validity.valid;
  });
}

// Liga ou desliga o botão de envio conforme a validade dos campos.
function toggleButtonState(inputList, buttonElement, config) {
  buttonElement.disabled = hasInvalidInput(inputList);
  buttonElement.classList.toggle(
    config.disabledButtonClass,
    buttonElement.disabled
  );
}

// Devolve os campos de um formulário como array de verdade.
// querySelectorAll entrega uma NodeList, que tem forEach mas não tem some —
// e hasInvalidInput precisa de some.
function collectInputList(formElement, config) {
  return Array.from(formElement.querySelectorAll(config.inputSelector));
}

// Registra os ouvintes de um formulário.
// O evento é "input", não "change": a validação precisa reagir a cada tecla,
// e não só quando o campo perde o foco.
function setEventListeners(formElement, config) {
  const inputList = collectInputList(formElement, config);
  const buttonElement = formElement.querySelector(config.submitButtonSelector);

  toggleButtonState(inputList, buttonElement, config);

  inputList.forEach(function (inputElement) {
    inputElement.addEventListener("input", function () {
      checkInputValidity(formElement, inputElement, config);
      toggleButtonState(inputList, buttonElement, config);
    });
  });
}

// Limpa as mensagens de erro e reavalia o botão.
// Usada ao abrir um pop-up, para que os erros da vez anterior não reapareçam.
function resetValidation(formElement, config) {
  const inputList = collectInputList(formElement, config);
  const buttonElement = formElement.querySelector(config.submitButtonSelector);

  inputList.forEach(function (inputElement) {
    hideInputError(formElement, inputElement, config);
  });

  toggleButtonState(inputList, buttonElement, config);
}

// Ativa a validação em todos os formulários da página de uma vez.
function enableValidation(config) {
  const formList = document.querySelectorAll(config.formSelector);

  formList.forEach(function (formElement) {
    setEventListeners(formElement, config);
  });
}

enableValidation(validationConfig);
