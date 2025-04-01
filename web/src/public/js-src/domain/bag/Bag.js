export class Bag {
  constructor(_id, _name, _description, _image, _price, _quantity) {
    Object.assign(this, { _id, _name, _description, _image, _price, _quantity })
    // Object.freeze(this)
  }

  get id() {
    return this._id
  }

  get name() {
    return this._name
  }

  get description() {
    return this._description
  }

  get image() {
    return this._image
  }

  get price() {
    return this._price
  }

  get quantity() {
    return this._quantity
  }

  get volume() {
    return this._price * this._quantity
  }

  set quantity(newQuantity) {
    this._quantity = newQuantity
  }
}