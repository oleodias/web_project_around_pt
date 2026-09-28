// Uma camada sem marcação própria: recebe uma função que sabe transformar
// cada item num elemento. A Section só percorre e insere — não sabe se está
// lidando com cartões ou com qualquer outra coisa.
//
// Os itens agora chegam do servidor, depois de a instância já existir; por
// isso vêm como argumento de renderItems(), e não pelo construtor.
export default class Section {
  constructor({ renderer }, containerSelector) {
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  renderItems(items) {
    items.forEach((item) => {
      this._renderer(item);
    });
  }

  // prepend: o cartão novo entra em primeiro, como desde a Sprint 8.
  addItem(element) {
    this._container.prepend(element);
  }
}
