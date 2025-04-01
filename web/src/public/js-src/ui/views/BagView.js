import { View } from "./View";

export class BagView extends View {
  template(model) {
    return `
      ${model.toArray().map(bag =>
        `
          <div class="bag-item">
            <div class="bag-item__image" style="background-image: url('/images/app/product_image.png');">
              <a href="/?produto=${bag.id}" title="Editar produto" class="bag-item__circle">
                <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 11 11" fill="none">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M8.09368 1.375C7.9791 1.375 7.85993 1.42083 7.77285 1.50792L6.9341 2.34667L8.65285 4.06542L9.4916 3.22667C9.67035 3.04792 9.67035 2.75917 9.4916 2.58042L8.4191 1.50792C8.32743 1.41625 8.21285 1.375 8.09368 1.375ZM6.44368 4.13417L6.86534 4.55583L2.71285 8.70833H2.29118V8.28667L6.44368 4.13417ZM1.37451 7.90625L6.44368 2.83708L8.16243 4.55583L3.09326 9.625H1.37451V7.90625Z" fill="white"/>
                </svg>
              </a>
            </div>
            <div class="bag-item__body">
              <h2 class="bag-item__title">${bag.name}</h2>
              <p class="bag-item__description">${bag.description}</p>
            </div>
            <div class="product-addition bag-item__addition">
              <div class="product-addition__minus" data-id="${bag.id}">-</div>
              <div class="product-addition__number">${bag.quantity}</div>
              <div class="product-addition__plus" data-id="${bag.id}">+</div>
            </div>
            <div class="bag-item__config">
              <p class="bag-item__price"><span>R$</span> ${bag.volume.toFixed(2)}</p>
              <div class="bag-item__remove">
                  <a href="/?produto=${bag.id}" class="bag-item__edit__item" data-id="${bag.id}">
                    <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 11 11" fill="none">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M8.09368 1.375C7.9791 1.375 7.85993 1.42083 7.77285 1.50792L6.9341 2.34667L8.65285 4.06542L9.4916 3.22667C9.67035 3.04792 9.67035 2.75917 9.4916 2.58042L8.4191 1.50792C8.32743 1.41625 8.21285 1.375 8.09368 1.375ZM6.44368 4.13417L6.86534 4.55583L2.71285 8.70833H2.29118V8.28667L6.44368 4.13417ZM1.37451 7.90625L6.44368 2.83708L8.16243 4.55583L3.09326 9.625H1.37451V7.90625Z" fill="#FF4545"/>
                    </svg>
                    Editar
                  </a>
                <div class="bag-item__remove__item" data-id="${bag.id}">
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 12 12" fill="none">
                  <path d="M9.5 4.5L9.14205 9.15339C9.06189 10.1954 8.19301 11 7.14794 11H4.85206C3.80699 11 2.93811 10.1954 2.85795 9.15339L2.5 4.5M10.5 3.5C9.20104 2.86699 7.65683 2.5 6 2.5C4.34317 2.5 2.79896 2.86699 1.5 3.5M5 2.5V2C5 1.44772 5.44772 1 6 1C6.55228 1 7 1.44772 7 2V2.5M5 5.5V8.5M7 5.5V8.5" stroke="#FF4545" stroke-linecap="round"/>
                  </svg>
                  Remover
                </div>
              </div>
            </div>
          </div>
      `).join('')}
    `
  }
}