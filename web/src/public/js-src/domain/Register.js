export class Register {
  constructor(_nome, _lastName, _email, _ddd, _telefone, _password, _restaurant) {
    Object.assign(this, { _nome, _lastName, _email, _ddd, _telefone, _password, _restaurant})
    Object.freeze(this)
  }

  get nome() {
    return this._nome
  }

  get lastname() {
    return this._lastName
  }

  get email() {
    return this._email
  }

  get ddd() {
    return this._ddd
  }

  get telefone() {
    return this._telefone
  }

  get password() {
    return this._password
  }

  get restaurant() {
    return this._restaurant
  }
}