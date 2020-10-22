import convert from 'xml-js'

export const addGlobalDocumentation = (
  xmlString,
  inputVariables,
  contractName
) => {
  let jsonDiagram = convert.xml2js(xmlString, { compact: true, spaces: 4 })
  let json2 = {}

  Object.keys(jsonDiagram.definitions.process).forEach((key) => {
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
