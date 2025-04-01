import { View } from "./View";

export class ConfirmCEPView extends View {
  template(model) {
    return `
      <div class="confirm-cep">
        <div class="confirm-cep__header">
          <div>
            <p class="confirm-cep__title">Seu endereço</p>
          </div>
          <svg id="close-cep" xmlns="http://www.w3.org/2000/svg" width="34" height="34" viewBox="0 0 34 34" fill="none">
            <path d="M22.6276 21.2132L18.3849 16.9705L22.6276 12.7279L21.2133 11.3137L16.9707 15.5563L12.7281 11.3137L11.3138 12.7279L15.5565 16.9705L11.3138 21.2132L12.7281 22.6274L16.9707 18.3848L21.2133 22.6274L22.6276 21.2132Z" fill="#555555"/>
          </svg>
        </div>
        <div class="confirm-cep__container">
          <form class="confirm-cep__form" id="confirm-cep-form">
            <div class="confirm-cep__row">
              <div class="confirm-cep__inputs" style="width: 48px">
                <label class="confirm-cep__label">
                  <span class="confirm-cep__name">Estado</span>
                </label>
                <input type="text" class="confirm-cep__input" disabled value="${model.uf}">
              </div>
              <div class="confirm-cep__inputs" style="flex: 1">
                <label class="confirm-cep__label">
                  <span class="confirm-cep__name">Cidade</span>
                </label>
                <input type="text" class="confirm-cep__input" disabled value="${model.localidade}">
              </div>
            </div>
            <div class="confirm-cep__inputs">
              <label class="confirm-cep__label">
                <span class="confirm-cep__name">Endereço</span>
              </label>
              <input type="text" class="confirm-cep__input" disabled value="${model.logradouro}">
            </div>
            <div class="confirm-cep__row">
              <div class="confirm-cep__inputs">
                <label class="confirm-cep__label">
                  <span class="confirm-cep__name">Bairro</span>
                </label>
                <input type="text" class="confirm-cep__input" disabled value="${model.bairro}">
              </div>
              <div class="confirm-cep__inputs">
                <label class="confirm-cep__label">
                  <span class="confirm-cep__name">Número</span>
                </label>
                <input type="text" class="confirm-cep__input" id="confirm-cep-numero">
              </div>
            </div>
            <div class="confirm-cep__inputs">
              <label class="confirm-cep__label">
                <span class="confirm-cep__name">Complemento</span>
                <span class="confirm-cep__optional">Opcional</span>
              </label>
              <input type="text" class="confirm-cep__input">
            </div>
            <div class="confirm-cep__inputs">
              <label class="confirm-cep__label">
                <span class="confirm-cep__name">Ponto de Referência</span>
                <span class="confirm-cep__optional">Opcional</span>
              </label>
              <input type="text" class="confirm-cep__input">
            </div>
            <button class="confirm-cep__button" type="submit">Confirmar endereço</button>
          </form>
        </div>

      </div>
    `
  }
}