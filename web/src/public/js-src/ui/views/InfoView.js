import { View } from "./View";

export class InfoView extends View {
  template(model) {
    return `
      <div class="modal__box">
        <div class="modal-general__header">
          <p>Cannã Burguer</p>
          <svg id="close-info" xmlns="http://www.w3.org/2000/svg" width="34" height="34" viewBox="0 0 34 34" fill="none">
            <path d="M22.6276 21.2132L18.3849 16.9705L22.6276 12.7279L21.2133 11.3137L16.9707 15.5563L12.7281 11.3137L11.3138 12.7279L15.5565 16.9705L11.3138 21.2132L12.7281 22.6274L16.9707 18.3848L21.2133 22.6274L22.6276 21.2132Z" fill="#555555"/>
          </svg>
        </div>

        <div class="modal__divisor">
          <div class="modal__line"></div>
        </div>

        <p class="modal-info__title">
          Horários de funcionamento
        </p>

        <div class="modal-info__hours">
          <div class="modal-info__hours__item">
            <b>Terça-feira</b><span>11:00 às 21:45</span>
          </div>
          <div class="modal-info__hours__item">
            <b>Terça-feira</b><span>11:00 às 21:45</span>
          </div>
          <div class="modal-info__hours__item">
            <b>Terça-feira</b><span>11:00 às 21:45</span>
          </div>
          <div class="modal-info__hours__item">
            <b>Terça-feira</b><span>11:00 às 21:45</span>
          </div>
        </div>

        <p class="modal-info__title">
          Formas de pagamento
        </p>

        <div class="modal-info__payments">
          <b>Cartão de crédito</b>
          <b>Cartão de débito</b>
        </div>

        <p>Av. Ver. Walter Melarato, 375, São Vicente, SP</p>

      </div>  
    `
  }
}