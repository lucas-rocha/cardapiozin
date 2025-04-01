export class Products {
  constructor() {
    this._products = []
    this._product = {}
    // Object.freeze(this)
  }

  addProduct(product) {
    this._product = product
    this._saveToStorage(this._product)
  }

  setQuantity(newQuantity) {
    this._product.quantity = newQuantity
    this._saveToStorage(this._product)
  }

  toArray() {
    return [].concat(this._products)
  }

  _saveToStorage(product) {
    const productsInStorage = JSON.parse(localStorage.getItem('bagItems')) || []

    const index = productsInStorage.findIndex(item => item.id === product.id)

    if(index > -1) {
      productsInStorage[index] = product
    } else {
      productsInStorage.push(product)
    }

    localStorage.setItem('bagItems', JSON.stringify(productsInStorage))

    this._products = productsInStorage
  }
}