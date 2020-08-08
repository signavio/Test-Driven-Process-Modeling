import fs from 'fs'
import path from 'path'
import parseString from 'xml2js'
import convert from 'xml-js'
import builder from 'xmlbuilder'

let testValuesArray: never[] = []

// This function fetches the test values from the bpmn 2.0 xml
export const fetchTestValue = (xmlString: any) => {
  let jsonDiagram: any = convert.xml2js(xmlString, { compact: true })
  for (const key in jsonDiagram.definitions.process.extensionElements[
    'signavio:signavioDiagramMetaData'
  ]) {
    if (
      jsonDiagram.definitions.process.extensionElements[
        'signavio:signavioDiagramMetaData'
      ][key]._attributes?.metaKey == 'meta-testvalues'
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
      ][key]._attributes?.metaKey == 'meta-testvalues'
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
export const addGlobalDocumentation = (xmlString: any, inputVariables: any, contractName: any) => {
  let jsonDiagram: any = convert.xml2js(xmlString, { compact: true })
  let json2: any = {}

  for (const key in jsonDiagram.definitions.process.extensionElements[
    'signavio:signavioDiagramMetaData'
  ]) {
    if (
      jsonDiagram.definitions.process.extensionElements[
        'signavio:signavioDiagramMetaData'
      ][key]._attributes?.metaKey == 'meta-testvalues'
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
