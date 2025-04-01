export class Bags {
  constructor() {
    this._bags = []
    Object.freeze(this)
  }

  add(bag) {
    this._bags.push(bag)
  }

  find(id) {
    return this.toArray().find(elem => elem.id == id)
  }

  update(id, quantity) {
    const index = this._bags.findIndex(bag => bag.id === id)
    if(index !== -1) {
      this._bags[index].quantity = quantity
    }

    this.saveToLocalStorage()
  }

  removeItem(id) {
    const index = this._bags.findIndex(bag => bag.id === id);
    if (index !== -1) {
      this._bags.splice(index, 1);
    }

    this.saveToLocalStorage()
  }

  totalPrice() {
    return this._bags.reduce((total, bag) => total + bag.volume, 0)
  }

  itemsQuantity() {
    return this._bags.reduce((total, bag) => total + bag.quantity, 0)
  }

  toArray() {
    return [].concat(this._bags)
  }

  emptyBag() {
    this._bags.length = 0
    this.saveToLocalStorage()
  }

  saveToLocalStorage() {
    const publicBags = this._bags.map(bag => ({
      id: bag.id,
      name: bag.name,
      description: bag.description,
      image: bag.image,
      price: bag.price,
      quantity: bag.quantity
    }));
    localStorage.setItem('bagItems', JSON.stringify(publicBags));
  }
}