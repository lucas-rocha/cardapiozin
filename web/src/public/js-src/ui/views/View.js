export class View {
  constructor(selector) {
    this._element = document.querySelector(selector)
  }

  update(model) {
    this._element.innerHTML = this.template(model)
  }

  template(model) {
    throw new Error('You should implement the template method')
  }
}