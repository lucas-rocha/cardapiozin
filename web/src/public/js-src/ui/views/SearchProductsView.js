import { View } from "./View";

export class SearchProductsView extends View {
  template(model) {
    return model.map(items =>
      `
        <div class="products__items" id="${items.anchor}">
          <h3 class="products__title">${items.category}</h3>
          <div class="products__wrapper">
            ${items.items.map(item => 
              `
                  <div class="products__item" data-product-id="a75e1b04-c1a3-4a8d-967f-726db24db9d">
                    <div class="products__content">
                      <span class="products__name">${item.name}</span>
                      <p class="products__description">
                        Molho de tomate, queijo mozzarella e manjericão fresco
                      </p>
                      <p class="products__price">39.90</p>
                    </div>
                    <div class="products__box">
                      <div class="products__image" style="background-image: url('/images/app/product_image.png');"></div>
                    </div>
                  </div>
              `
            ).join('')}
          </div>
        </div>
      `  
    ).join('')
  //   return `
  //   <div class="products__items" id="${model.anchor}">
  //   <h3 class="products__title">${model.category}</h3>
  //   <div class="products__wrapper">
  //       <div class="products__item" data-product-id="a75e1b04-c1a3-4a8d-967f-726db24db9d">
  //         <div class="products__content">
  //           <span class="products__name">Pizza Margherita</span>
  //           <p class="products__description">
  //             Molho de tomate, queijo mozzarella e manjericão fresco
  //           </p>
  //           <p class="products__price">39.90</p>
  //         </div>
  //         <div class="products__box">
  //           <div class="products__image" style="background-image: url('/images/app/product_image.png');"></div>
  //         </div>
  //       </div>
  //   </div>
  // </div>
  //   `
  }
}