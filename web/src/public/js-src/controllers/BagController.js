import { Bag } from "../domain/bag/Bag";
import { Bags } from "../domain/bag/Bags";
import { BagsView } from "../ui/views/BagsView";
import { BagView } from "../ui/views/BagView";
import { ProxyFactory } from "../utils/ProxyFactory";

// const products = [
//   {
//     id: "a75e1b04-c1a3-4a8d-967f-726db24db9d",
//     name: "Pizza Margherita",
//     description: "Molho de tomate, queijo mozzarella e manjericão fresco",
//     image: "https://example.com/pizza-margherita.jpg",
//     price: 39.90,
//     quantity: 1
//   },
//   {
//     id: "ab5e1b04-c1a3-4a8d-967f-726db248b9d",
//     name: "Pizza Pepperoni",
//     description: "Molho de tomate, queijo mozzarella e pepperoni fatiado",
//     image: "https://example.com/pizza-pepperoni.jpg",
//     price: 42.50,
//     quantity: 1
//   },
// ]

export class BagController {
  constructor() { 
    this._bags = ProxyFactory.create(
      new Bags(),
      ['add', 'update', 'removeItem', 'emptyBag'],
      model => {
        if(model) {
          document.querySelector('.bag-footer').style.display = 'flex'
        }
        this._bagView.update(model)
        this._bagsView.update(model)
      }
    )

    this._bagView = new BagView('.bag-item__container')
    this._bagsView = new BagsView('.bag-footer')
    
    this.add()
    this._checkIfEmpty()
    this._initializeEventListeners()
  }

  add() {
    const products = JSON.parse(localStorage.getItem('bagItems')) || []

    products.forEach(product => {
      this._bags.add(this._createBag(
        product.id,
        product.name,
        product.description,
        product.image,
        product.price,
        product.quantity
      ))
    })
  }

  _checkIfEmpty() {
    if(this._bags._bags.length !== 0) {
      document.querySelector('.bag__info').style.display = "none"
      document.querySelector('.bag__title').style.display = "flex"
      document.querySelector('.bag__clean').style.display = "block"
      document.querySelector('.bag-footer__container').style.display = "flex"
    } else {
      document.querySelector('.bag__info').style.display = "flex"
      document.querySelector('.bag__title').style.display = "none"
      document.querySelector('.bag__clean').style.display = "none"
      document.querySelector('.bag-footer__container').style.display = "none"
    }
  }

  _initializeEventListeners() {
    document.querySelector('.bag-item__container').addEventListener('click', (event) => {
      if (event.target.classList.contains('product-addition__plus')) {
        const id = event.target.getAttribute('data-id')
        this._updatedQuantity(id, 1)
      }

      if (event.target.classList.contains('product-addition__minus')) {
        const id = event.target.getAttribute('data-id')
        this._updatedQuantity(id, -1)
      }

      if(event.target.classList.contains('bag-item__remove__item')) {
        const id = event.target.getAttribute('data-id')
        this._removeItem(id)
      }
    })

    document.querySelector('#empty-bag-button').addEventListener('click', () => this._emptyBag())
  }

  _removeItem(id) {
    this._bags.removeItem(id)
    this._checkIfEmpty()
  }

  _emptyBag() {
    this._bags.emptyBag()
    document.querySelector('.bag-footer').style.display = 'none'
    this._checkIfEmpty()
  }
  
  _updatedQuantity(id, delta) {
    console.log(id)
    const bag = this._bags.find(id)
    
    if(bag) {
      const newQuantity = Math.max(1, bag.quantity + delta)
    
      this._bags.update(id, newQuantity)
    }
  }

  _createBag(id, name, description, image, price, quantity) {
    return new Bag(id, name, description, image, price, quantity)
  }
}