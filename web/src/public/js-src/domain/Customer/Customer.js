export class Customer {
  constructor(_name, _email, _phone, _password, _passwordTwo, _restaurantId) {
    Object.assign(this, { _name, _email, _phone, _password, _passwordTwo, _restaurantId })
  }

  get name() {
    return this._name
  }
  
  get email() {
    return this._email
  }

  get phone() {
    return this._phone
  }

  get password() {
    return this._password
  }

  get passwordTwo() {
    return this._passwordTwo
  }

  get restaurantId() {
    return this._restaurantId
  }
}