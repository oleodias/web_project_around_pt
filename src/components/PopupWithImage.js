import Popup from "./Popup.js";

// Pop-up da imagem ampliada.
export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._image = this._popup.querySelector(".popup__image");
    this._caption = this._popup.querySelector(".popup__caption");
  }

  // Sobrescreve o open() do pai: preenche imagem e legenda e depois delega a
  // abertura ao pai, que cuida da classe e do ouvinte do Esc.
  open({ name, link }) {
    this._image.src = link;
    this._image.alt = name;
    this._caption.textContent = name;
    super.open();
  }

  // Desfaz o que o open() preencheu, para a imagem anterior não ficar retida.
  // removeAttribute em vez de src = "": um src vazio dispara um evento error
  // na imagem.
  close() {
    super.close();
    this._image.removeAttribute("src");
    this._image.alt = "";
    this._caption.textContent = "";
  }
}
