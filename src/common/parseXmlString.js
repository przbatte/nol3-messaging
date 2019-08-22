const parseString = require('xml2js').parseString

const DEFAULT_OPTIONS = {
  explicitRoot: false,
  explicitChildren: true,
  preserveChildrenOrder: true,
}

module.exports = function (xmlString, options = DEFAULT_OPTIONS) {
  return new Promise((resolve, reject) => {
    parseString(xmlString, options, function (error, result) {
      if (error) {
        reject(error)
      }
      resolve(result)
    })
  })
}
