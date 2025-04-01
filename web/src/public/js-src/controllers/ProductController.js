import { Product } from "../domain/Product/Product"
import { Products } from "../domain/Product/Products"
import { ProductService } from "../domain/Product/ProductService"
import { ProductView } from "../ui/views/ProductView"
import { ProxyFactory } from "../utils/ProxyFactory"

export class ProductController {
  constructor() {
    const $$ = document.querySelectorAll.bind(document)

    this._products = ProxyFactory.create(
      new Products(),
      ['addUnique', 'addProduct'],
      model => {
        this._productView.update(model._product)
      })
    
    this._productService = new ProductService()
    this._productView = new ProductView('.modal-app')
    this._productsItem = $$('.products__item')

    this.init()
  }

  init() {
    document.addEventListener('DOMContentLoaded', () => this._showProduct())
    this._productsItem.forEach(item => {
      item.addEventListener('click', () => this._showProductInClick(item))
    })
  }

  _initializeEventListeners() {
    document.querySelector('#product-details-close').addEventListener('click', () => this._close())
    document.querySelectorAll('.product-addition__plus')[2].addEventListener('click', () => this._updatedQuantity(1))
    document.querySelectorAll('.product-addition__minus')[2].addEventListener('click', () => this._updatedQuantity(-1))
    document.querySelector('.product-details__button').addEventListener('click', () => this._addProduct(this._products._product))
  }

  _close() {
    document.querySelector('.modal-app').style.display = 'none'
    history.replaceState(null, '', window.location.pathname)
    document.querySelector('body').style.overflow = 'auto'
  }

  _showProductInClick(item) {
    document.querySelector('body').style.overflow = 'hidden'
    document.querySelector('.modal-app').style.display = 'block'
    const productId = item.getAttribute('data-product-id')
    
    history.pushState(null, '', `?produto=${productId}`)

    const product = this._productService.getProductById(productId)

    const productToUse = this._checkIfExist(productId) || product

    this._products.addProduct(productToUse)
    this._initializeEventListeners()
  }

  _showProduct() {
    document.querySelector('.modal-app').style.display = 'none'
    const params = new URLSearchParams(window.location.search)
    const productId = params.get('produto')
    
    if(productId) {
      document.querySelector('body').style.overflow = 'hidden'
      const product = this._productService.getProductById(productId)
      document.querySelector('.modal-app').style.display = 'block'
      
      const productToUse = this._checkIfExist(productId) || product

      this._products.addProduct(productToUse)
      this._initializeEventListeners()
    }
  }

  _updatedQuantity(delta) {
    const newQuantity = Math.max(1, this._products._product.quantity + delta)
    
    this._products.setQuantity(newQuantity)

    const quantityElement = document.querySelector('#product-quantity')
    const priceButton = document.querySelector('.product-details__button')
    if (quantityElement) {
      console.log(this._products._product.price)
      quantityElement.textContent = newQuantity
      priceButton.innerHTML = `<p>Adicionar</p> <p>R$ ${newQuantity * this._products._product.price}</p>`
    }
  }

  _addProduct(product) {
    console.log(product)
    this._products.addProduct(product)
    this._close()
  }

  _checkIfExist(id) {
    const product = JSON.parse(localStorage.getItem('bagItems'))

    if(product) {
      return product.find(item => item.id === id)
    }

    return false
  }

  _saveToStorage(products) {
    localStorage.setItem('bagItems', JSON.stringify(products))
  }

  // _createProduct(id, name, price, description, quantity, category, ingredientsToAdd, ingredientsToRemove) {
  //   return new Product(id, name, price, description, quantity, category, ingredientsToAdd, ingredientsToRemove)
  // }
}