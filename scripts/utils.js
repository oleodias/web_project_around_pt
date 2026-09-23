// Elementos do pop-up de imagem ampliada
const imagePopup = document.querySelector("#image-popup");
const imagePopupImage = imagePopup.querySelector(".popup__image");
const imagePopupCaption = imagePopup.querySelector(".popup__caption");

// Fecha o pop-up aberto quando a tecla Esc é pressionada.
// Continua sendo uma função nomeada: removeEventListener só remove o ouvinte
// se receber a mesma referência que foi registrada.
// Não é exportada — só openModal e closeModal precisam dela.
function handleEscapeKey(evt) {
  if (evt.key === "Escape") {
    const openedPopup = document.querySelector(".popup_is-opened");
    closeModal(openedPopup);
  }
}

// Torna visível qualquer modal recebido como argumento.
export function openModal(modal) {
  modal.classList.add("popup_is-opened");
  document.addEventListener("keydown", handleEscapeKey);
}

// Oculta qualquer modal recebido como argumento.
export function closeModal(modal) {
  modal.classList.remove("popup_is-opened");
  document.removeEventListener("keydown", handleEscapeKey);
}

// Fecha o pop-up pelo botão X ou por um clique na sobreposição.
// O evento é "mousedown" e não "click": com "click", arrastar a seleção de
// dentro de um campo até fora da janela fecharia o pop-up no meio da digitação.
export function handlePopupMousedown(evt) {
  const clickTarget = evt.target;
  const overlay = evt.currentTarget;

  if (
    clickTarget === overlay ||
    clickTarget.classList.contains("popup__close")
  ) {
    closeModal(overlay);
  }
}

// Preenche e abre o pop-up de imagem ampliada.
// Fica aqui, e não na classe Card, porque o pop-up é um só para a página
// inteira: o cartão pede para abri-lo, mas não é dono dele.
export function openImagePopup(name, link) {
  imagePopupImage.src = link;
  imagePopupImage.alt = name;
  imagePopupCaption.textContent = name;
  openModal(imagePopup);
}
