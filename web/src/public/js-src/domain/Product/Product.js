// Adiciona um produto com todas informações, e depois criar Products que criar o array de product
export class Product {
  constructor(_id, _name, _price, _description, _quantity, _category, _ingredientsToAdd, _ingredientsToRemove) {
    Object.assign(this, { _id, _name, _price, _description, _quantity, _category, _ingredientsToAdd, _ingredientsToRemove })
  }

  get id() {
    return this._id
  }

  get name() {
    return this._name
  }

  get price() {
    return this._price
  }

  get description() {
    return this._description
  }

  get quantity() {
    return this._quantity
  }

  get ingredientsToAdd() {
    return this._ingredientsToAdd
  }
}