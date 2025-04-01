import { Subscribe } from "../domain/Subscribe"

export class HomeFormContoller {
  constructor() {
    this._inputName = document.querySelector('#nome')
    this._inputEmail= document.querySelector('#email')
    this._inputDDD = document.querySelector('#ddd')
    this._inputTelefone = document.querySelector('#telefone')
  }

  save(event) {
    event.preventDefault()

    let subscribe = new Subscribe(this._inputName.value, this._inputEmail.value, this._inputDDD.value, this._inputTelefone.value)
    
    let subscribeJSON = {
      name: subscribe.nome,
      email: subscribe.email,
      ddd: subscribe.ddd,
      telefone: subscribe.telefone
    }

    if(sessionStorage.getItem('@cardapiozin/initialinfo')) {
      sessionStorage.removeItem('@cardapiozin/initialinfo')
    }

    sessionStorage.setItem('@cardapiozin/initialinfo', JSON.stringify(subscribeJSON))

    window.location.href = "/criar-conta"
  }
}