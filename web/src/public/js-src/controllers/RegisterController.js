import { Customer } from "../domain/Customer/Customer"
import { Register } from "../domain/Register"
import { RegisterService } from "../services/RegisterService"

export class RegisterContoller {
  constructor() {
    let $ = document.querySelector.bind(document)
    this._inputName = $('[name="name"]')
    this._inputEmail = $('[name="email"]')
    this._inputPhone = $('[name="phone"]')
    this._inputPassword = $('[name="password"]')
    this._inputPasswordTwo = $('[name="passwordTwo"]')
    this._inputRestaurantId = $('[name="restaurantId"]')
    this._registerService = new RegisterService()
  }


  _createCustomer() {
    const customer = new Customer(
      this._inputName.value,
      this._inputEmail.value,
      this._inputPhone.value,
      this._inputPassword.value,
      this._inputPasswordTwo.value,
      this._inputRestaurantId.value,
    )

    return {
      "first_name": customer.name,
      "email": customer.email,
      "phone": customer.phone,
      "password": customer.password,
      "passwordTwo": customer.passwordTwo,
      "restaurant_id": customer.restaurantId
    }
  }

  async createCustomer(event) {
    event.preventDefault()

    console.log(this._createCustomer())

    const response = await fetch('http://212.85.0.193:5000/customers', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(this._createCustomer())
    })

    if(response.status === 201) {
      console.log("kokokokoko")
      window.location.href = "/"
    }
  }

  async register(event) {
    event.preventDefault()
    
    // try {
    //   const response = await this._registerService.createUser(this._createRegister())
      
    //   if(response) {
    //     window.location.href = "https://app.cardapiozin.com"
    //   }
      
    // } catch (error) {
    //   console.log("Erro: ", error.message)
    // }

    // const response = await fetch('/api/leads', {
    //   method: 'POST',
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify(this._createRegister())
    // })

    // const data = await response.json()

    // if(!response.ok) {
    //   throw new Error(data.message || 'Erro ao criar o usuário')
    // }

    // window.location.href = `/parabens?name=${encodeURIComponent(data[0].name)}&restaurant=${encodeURIComponent(data[0].restaurant_name)}`
  }

  _createRegister() {
    const register = new Register(
      this._inputName.value,
      this._inputLastName.value,
      this._inputEmail.value,
      this._inputDDD.value,
      this._inputTelefone.value,
      this._inputPassword.value,
      this._inputRestaurant.value
    )

    return {
      "name": register.nome,
      "lastname": register.lastname,
      "email": register.email,
      "phone_number": register.telefone,
      "restaurant_name": register.restaurant
    }
  }
}