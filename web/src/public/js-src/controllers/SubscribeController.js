import { Subscribe } from "../domain/Subscribe"

export class SubscribeContoller {
  constructor() {
    this._inputName = document.querySelector('#nome')
    this._inputEmail= document.querySelector('#email')
    this._inputDDD = document.querySelector('#ddd')
    this._inputTelefone = document.querySelector('#telefone')
  }

  save(event) {
    event.preventDefault()
    let subscribe = new Subscribe(this._inputName.value, this._inputEmail.value, this._inputDDD.value, this._inputTelefone.value)
    console.log(subscribe)
    // window.location.href = "/pre-inscricao-exclusiva"
    window.location.href = `http://localhost:3000/criar-conta?name=${subscribe.name}?email=${subscribe.email}?phone=${subscribe.phone}`
  }
}