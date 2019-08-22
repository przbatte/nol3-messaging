const xml2js = require('xml2js')

const rootAttributesSymbol = Symbol('rootAttributes')
const descendantNameSymbol = Symbol('descendantName')

class FixMLMessage {
  constructor (descendantName) {
    if (!descendantName) {
      throw `descendant name parameter not provided`
    }

    this[rootAttributesSymbol] = {
      v: '5.0',
      r: '20080317',
      s: '20080314',
    }
    this[descendantNameSymbol] = descendantName
  }

  get descendantName () {
    return this[descendantNameSymbol]
  }

  build (descendantNode) {
    const xmlObject = Object.assign({
      $: this[rootAttributesSymbol],
    }, {
      [this.descendantName]: descendantNode,
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
