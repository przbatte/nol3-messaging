const valueSymbol = Symbol('value')

class ObjectType {
  constructor (value) {
    this[valueSymbol] = value
  }

  get value () {
    return this[valueSymbol]
  }

  static name (value) {
    const propertyNames = Object.getOwnPropertyNames(this)
    for (let propertyName of propertyNames) {
      const instance = this[propertyName]
      if (instance instanceof this && instance.value === value) {
        return propertyName
      }
    }
    return value
  }
}

module.exports = ObjectType
