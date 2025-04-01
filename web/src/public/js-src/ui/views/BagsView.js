import { View } from "./View";

export class BagsView extends View {
  template(model) {
    return `
      <div class="container bag-footer__container">
        <div class="bag-footer__text">
          <p class="bag-footer__quantity"><b>${model.itemsQuantity()}</b> 
            ${(model.itemsQuantity() > 1) ? 'Itens' : 'Item'}
          </p>
          <p class="bag-footer__price">${model.totalPrice().toFixed(2)}</p>
        </div>
        ${(model.toArray().length !== 0) ? '<a href="/pedidos/finalizar"><button class="bag-footer__button">Pedir agora</button></a>' : ''}
      </div>
    `
  }
}