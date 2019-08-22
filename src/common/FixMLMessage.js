const xml2js = require('xml2js')

const rootAttributesSymbol = Symbol('rootAttributes')
const childNameSymbol = Symbol('childName')

class FixMLMessage {
  constructor (childName) {
    if (!childName) {
      throw `child name parameter not provided`
    }

    this[rootAttributesSymbol] = {
      v: '5.0',
      r: '20080317',
      s: '20080314',
    }
    this[childNameSymbol] = childName
  }

  get childName () {
    return this[childNameSymbol]
  }

  build (childNode) {
    const xmlObject = Object.assign({
      $: this[rootAttributesSymbol],
    }, {
      [this.childName]: childNode,
    })

    const builder = new xml2js.Builder({
      renderOpts: {
        pretty: false,
      },
      headless: true,
      rootName: 'FIXML',
      cdata: true,
    })

    return `${builder.buildObject(xmlObject)}`
  }
}

module.exports = FixMLMessage
