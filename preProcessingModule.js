const fs = require('fs')
const path = require('path')
const parseString = require('xml2js').parseString
const convert = require('xml-js')
const builder = require('xmlbuilder')

let testValuesArray = []

// This function fetches the test values from the bpmn 2.0 xml
exports.fetchTestValue = xmlString => {
  let jsonDiagram = convert.xml2js(xmlString, { compact: true, spaces: 4 })
  for (const key in jsonDiagram.definitions.process.extensionElements[
    'signavio:signavioDiagramMetaData'
  ]) {
    if (
      jsonDiagram.definitions.process.extensionElements[
        'signavio:signavioDiagramMetaData'
      ][key]._attributes.metaKey == 'meta-testvalues'
    ) {
      let temp = JSON.parse(
        jsonDiagram.definitions.process.extensionElements[
          'signavio:signavioDiagramMetaData'
        ][key]._attributes.metaValue
      )
      testValuesArray = temp.items
    }
  }

  for (const key in jsonDiagram.definitions.process.extensionElements[
    'signavio:signavioDiagramMetaData'
  ]) {
    if (
      jsonDiagram.definitions.process.extensionElements[
        'signavio:signavioDiagramMetaData'
      ][key]._attributes.metaKey == 'meta-testvalues'
    ) {
      delete jsonDiagram.definitions.process.extensionElements[
        'signavio:signavioDiagramMetaData'
      ][key]
    }
  }

  return testValuesArray
}

// This function takes xml data as a string and the global input variables and adds the global variables to the xml
// This function returns the xml object
exports.addGlobalDocumentation = (xmlString, inputVariables, contractName) => {
  let jsonDiagram = convert.xml2js(xmlString, { compact: true, spaces: 4 })
  let json2 = {}

  for (const key in jsonDiagram.definitions.process.extensionElements[
    'signavio:signavioDiagramMetaData'
  ]) {
    if (
      jsonDiagram.definitions.process.extensionElements[
        'signavio:signavioDiagramMetaData'
      ][key]._attributes.metaKey == 'meta-testvalues'
    ) {
      delete jsonDiagram.definitions.process.extensionElements[
        'signavio:signavioDiagramMetaData'
      ][key]
    }
  }
  Object.keys(jsonDiagram.definitions.process).forEach(key => {
    if (key == '_attributes') {
      json2[key] = jsonDiagram.definitions.process[key]
      json2.documentation = {}
      json2.documentation._cdata = inputVariables
    } else {
      json2[key] = jsonDiagram.definitions.process[key]
    }
  })
  jsonDiagram.definitions.process = json2

  const xmlDiagram = convert.js2xml(jsonDiagram, {
    compact: true,
    ignoreComment: true,
    spaces: 4,
  })

  const xml = {
    bpmn: xmlDiagram,
    name: contractName,
  }
  return xml
}
