// Uma camada sem marcação própria: recebe os dados e uma função que sabe
// transformar cada item num elemento. A Section só percorre e insere — não
// sabe se está lidando com cartões ou com qualquer outra coisa.
export default class Section {
  constructor({ items, renderer }, containerSelector) {
    this._items = items;
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  renderItems() {
    this._items.forEach((item) => {
      this._renderer(item);
    });
  }

  // prepend, e não append: o cartão novo entra em primeiro, como desde a
  // Sprint 8.
  addItem(element) {
    this._container.prepend(element);
  }
}
