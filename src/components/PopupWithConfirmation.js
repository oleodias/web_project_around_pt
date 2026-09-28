import Popup from "./Popup.js";

// Pop-up "Tem certeza?". Não sabe o que está sendo confirmado: a ação é
// entregue a cada abertura, por setSubmitAction(), já com o cartão certo.
export default class PopupWithConfirmation extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._form = this._popup.querySelector(".popup__form");
  }

  setSubmitAction(action) {
    this._handleSubmit = action;
  }

  setEventListeners() {
    super.setEventListeners();

    this._form.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._handleSubmit();
    });
  }
}
