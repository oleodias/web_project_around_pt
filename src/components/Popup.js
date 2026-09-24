// Classe pai de todos os pop-ups: abre, fecha e cuida dos três jeitos de
// fechar — botão X, clique na sobreposição e tecla Esc.
export default class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
    this._closeButton = this._popup.querySelector(".popup__close");

    // bind cria uma função nova com o this preso a esta instância.
    // É preciso duas vezes aqui:
    //  1. o método é passado como callback ao addEventListener — sem o bind,
    //     o this dentro dele seria o document, não o pop-up;
    //  2. o removeEventListener só remove o ouvinte se receber a MESMA
    //     referência. Guardar a versão com bind no próprio campo garante que
    //     open() e close() usem exatamente a mesma função.
    this._handleEscClose = this._handleEscClose.bind(this);
  }

  open() {
    this._popup.classList.add("popup_is-opened");
    document.addEventListener("keydown", this._handleEscClose);
  }

  close() {
    this._popup.classList.remove("popup_is-opened");
    document.removeEventListener("keydown", this._handleEscClose);
  }

  _handleEscClose(evt) {
    if (evt.key === "Escape") {
      this.close();
    }
  }

  setEventListeners() {
    this._closeButton.addEventListener("click", () => {
      this.close();
    });

    // "mousedown" e não "click" na sobreposição: com "click", arrastar a
    // seleção de dentro de um campo até fora da janela fecharia o pop-up no
    // meio da digitação. O evento só veio da sobreposição se começou nela —
    // um clique dentro do formulário tem outro target.
    this._popup.addEventListener("mousedown", (evt) => {
      if (evt.target === evt.currentTarget) {
        this.close();
      }
    });
  }
}
