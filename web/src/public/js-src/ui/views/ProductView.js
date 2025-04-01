import { View } from "./View";

export class ProductView extends View {
  template(model) {
    console.log(model)
    const ingredientsToAdd = Array.isArray(model.ingredientsToAdd) ? model.ingredientsToAdd : []

    return `
    <div class="product-details">
      <div class="product-details__header" style="background-image: url('/images/app/product-bg.png')">
        <svg id="product-details-close" xmlns="http://www.w3.org/2000/svg" width="35" height="35" viewBox="0 0 35 35" fill="none">
        <rect width="35" height="35" rx="17.5" fill="#FF4545"/>
        <path d="M23.6276 22.2132L19.3849 17.9705L23.6276 13.7279L22.2133 12.3137L17.9707 16.5563L13.7281 12.3137L12.3138 13.7279L16.5565 17.9705L12.3138 22.2132L13.7281 23.6274L17.9707 19.3848L22.2133 23.6274L23.6276 22.2132Z" fill="#F8F8F8"/>
        </svg>
      </div>
      <div class="product-details__body">
        <span class="product-details__category">Pizza</span>
        <div class="product-details__title">
          <h2>${model.name}</h2>
          <p class="product-details__price">${model.price}</p>
        </div>
        <div class="product-details__description">
          ${model.description}
        </div>

        <b class="product-details__size">Serve duas pessoas (900g)</b>

        <div class="product-garnishes">
          <div class="product-garnishes__list">
            <div class="product-garnishes__header">
              <div>
                <p>Remover ingredientes</p>
                <p class="product-garnishes__choicenumber">Escolha 1 opção</p>
              </div>
              <div class="product-garnishes__buttons">
                <button class="product-garnishes__button">0/1</button>
                <button class="product-garnishes__button">Obrigatório</button>
              </div>
            </div>
            <div class="product-garnishes__items">
              <div class="product-garnishes__item">
                <p class="product-garnishes__ingredient">
                  Sem tomate
                </p>
                <label class="product-garnishes__label">
                  <input type="checkbox" class="product-garnishes__checkbox">
                  <span class="product-garnishes__arrow"></span>
                </label>
              </div>
              <div class="product-garnishes__item">
                <p class="product-garnishes__ingredient">
                  Sem manjericão
                </p>
                <label class="product-garnishes__label">
                  <input type="checkbox" class="product-garnishes__checkbox">
                  <span class="product-garnishes__arrow"></span>
                </label>
              </div>
            </div>
          </div>
          <div class="product-garnishes__list">
            <div class="product-garnishes__header">
              <p>Adicionar ingredientes <span>(Turbine seu pedido)</span></p>
            </div>
            <div class="product-garnishes__items">
            ${ingredientsToAdd.map(ingredient => {
              return `
                <div class="product-garnishes__item">
                  <p class="product-garnishes__ingredient">
                    ${ingredient.ingredient}
                    <span class="product-garnishes__price">+ R$ ${ingredient.price}</span>
                  </p>
                  <div class="product-addition">
                    <div class="product-addition__minus">-</div>
                    <div class="product-addition__number">0</div>
                    <div class="product-addition__plus">+</div>
                  </div>
               </div>
              `
            }).join('')}
            </div>
          </div>
        </div>

        <div class="product-details__observation">
          <h3>Alguma observação?</h3>
          <textarea class="product-details__textarea" placeholder="Ex: Retirar picles, mostarda e etc."></textarea>
          <div class="product-details__buttons">
            <div class="product-addition">
              <div class="product-addition__minus">-</div>
              <div class="product-addition__number" id="product-quantity">${model.quantity}</div>
              <div class="product-addition__plus">+</div>
            </div>
            <button class="product-details__button">
              <p>Adicionar</p>
              <p>R$ ${model.price * model.quantity}</p>
            </button>
          </div>
        </div>


      </div>
    </div>
    `
  }
}