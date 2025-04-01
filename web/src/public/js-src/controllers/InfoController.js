import { InfoView } from "../ui/views/InfoView"

export class InfoController {
  constructor() {
    this._infoView = new InfoView('.modal-general')
    this._modal = document.querySelector('.modal-general')
    this._footerItem = document.querySelector('#info > div')
    this._footerItemSVG = document.querySelector('#info > svg > path')
    this._footerItemSVGLast = document.querySelector('#info > svg > path:last-child')
    this._footerItemParagrah = document.querySelector('#info > p')
  }

  show() {
    const infos = []
    this._modal.style.display = 'flex'
    history.pushState(null, '', '#info')
    this._infoView.update(infos)

    this._activeStyles()

    this._eventListeners()
  }

  close() {
    this._modal.style.display = 'none'
    history.replaceState(null, '', window.location.pathname)
    this._removeStyles()
  }

  _removeStyles() {
    this._footerItem.classList.remove('footer__divisor--active')
    this._footerItemSVG.style.fill = ''
    this._footerItemSVGLast.style.fill = ''
    this._footerItemParagrah.style.color = ''
  }

  _activeStyles() {
    this._footerItem.classList.add('footer__divisor--active')
    this._footerItemSVG.style.fill = '#FF4545'
    this._footerItemSVGLast.style.fill = '#FF4545'
    this._footerItemParagrah.style.color = '#FF4545'
  }

  _eventListeners() {
    document.querySelector('#close-info').addEventListener('click', this.close.bind(this))
    document.querySelector('.modal-general').addEventListener('click', (e) => {
      if(e.target.classList.contains('modal-general')) {
        this.close()
      }
    })
  }
}