import { DeliveryOptionService } from "../domain/DeliveryOption/DeliveryOptionService"
import { CEPView } from "../ui/views/CEPView"
import { ConfirmCEPView } from "../ui/views/ConfirmCEPView"
import { maskCEP } from "../utils/maskCEP"

export class DeliveryOptionsController {
  constructor() {
    const $ = document.querySelector.bind(document)
    this._modal = $('#cep-modal')
    this._cepView = new CEPView('#cep-modal')
    this._confirmCEPView = new ConfirmCEPView('#cep-modal')
    this._deliveryOptionService = new DeliveryOptionService()
    this._addCepForClient()
  }
  
  async show() {
    this._modal.style.display = 'flex'
    this._cepView.update()
    maskCEP()

    this._eventListeners()
  }

  close() {
    this._modal.style.display = 'none'
  }

  _eventListeners() {
    document.querySelector('#cep-button').addEventListener('click', () => {
      const cepInput = document.querySelector('#cep').value.replace(/\D/g, '');

      if(cepInput.length !== 8) {
        console.log("CEP invalido")
        return
      }

      this._searchCEP(cepInput)
    })

    document.querySelector('#close-cep').addEventListener('click', this.close.bind(this))
  }

  async _searchCEP(cep) {
    const returnedCep = await this._deliveryOptionService.searchCEP(cep)

    this._confirmCEPView.update(returnedCep)

    document.querySelector('#confirm-cep-form').addEventListener('submit', (event) => {
      event.preventDefault()

      this._saveInfo({...returnedCep, ...{numero: document.querySelector('#confirm-cep-numero').value}})
      this._addCepForClient()
    })

    document.querySelector('#close-cep').addEventListener('click', this.close.bind(this))
  }

  _addCepForClient() {
    const addressInfo = JSON.parse(localStorage.getItem('addressInfo'))

    if(!addressInfo) {
      document.querySelector('.address__name > p').textContent = 'Insira seu endereço de entrega aqui'
    } else {
      document.querySelector('.address__name > p').textContent = `${addressInfo.logradouro}, ${addressInfo.numero}`
    }

  }

  _saveInfo(cep) {
    localStorage.setItem('addressInfo', JSON.stringify(cep))

    this.close()
  }

}