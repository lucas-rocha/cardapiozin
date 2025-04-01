export class Router {
  constructor() {
    this._currentURL = new URL(window.location)
    this._pathname = this._currentURL.pathname.toLocaleLowerCase()
  }

  get(urls, fn) {
    if(Array.isArray(urls)) {
      for(const url of urls) {
        this._handleRoute(url, fn)
      }
    } else {
      this._handleRoute(url, fn)
    }
  }

  _handleRoute(url, fn) {
    const lowercaseURL = url.toLowerCase()

    if(lowercaseURL === this._pathname) return fn(null)
  }
}