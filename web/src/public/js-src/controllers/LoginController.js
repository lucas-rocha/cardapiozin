export class LoginController {
  constructor() {
    let $ = document.querySelector.bind(document)
    this._inputEmail = $('[name="email"]')
    this._inputPassword = $('[name="password"]')
    this._inputRestaurantId = $('[name="restaurantId"]')
  }

  async authenticate(event) {
    event.preventDefault()

    const response = await fetch('http://localhost:5000/auth/customer-login', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: this._inputEmail.value,
        password: this._inputPassword.value,
        restaurant_id: this._inputRestaurantId.value
      })
    })

    
    if(response.status === 200) {
      const { token } = await response.json()

      document.cookie = `@cardapiozin.token=${token}; path=/; max-age=3600; Secure`

      window.location.href = '/'
    }
  }

  async logout() {
    document.cookie = "@cardapiozin.token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC"

    window.location.href = '/'
  }
}