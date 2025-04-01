export class ProxyFactory {
  static create(obj, props, trap) {
    return new Proxy(obj, {
      get(target, prop, receiver) {
        if(typeof(target[prop]) == typeof(Function) && props.includes(prop)) {
          return function() {
            const result = target[prop].apply(target, arguments)

            trap(target)

            return result
          }
        } else {
          return target[prop]
        }
      }
    })
  }
}