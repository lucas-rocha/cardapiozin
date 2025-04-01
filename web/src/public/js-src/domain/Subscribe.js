export class Subscribe {
  constructor(_name, _email, _ddd, _phone) {
    Object.assign(this, { _name, _email, _ddd, _phone})
    Object.freeze(this)
  }

  get name() {
    return this._name
  }

  get email() {
    return this._email
  }

  get ddd() {
    return this._ddd
  }

  get phone() {
    return this._phone
  }
}