import convert from 'xml-js'

/**
 * Method takes in the xml as sting and parses to fetch the test script and test values
 * @param {string} xmlString
 * @return {object}
 */
const fetchTestScriptAndValues = (xmlString) => {
  let jsonDiagram = convert.xml2js(xmlString, { compact: true })

  const scriptTasks = getScriptTasks(jsonDiagram)

  const scriptAndValues = scriptTasks.map((task) => {
    const testScript = getTestScript(task)
    const testValues = getTestValues(task)
    return { script: testScript, values: testValues }
  })

  return scriptAndValues
}

const getScriptTasks = (jsonDiagram) =>
  jsonDiagram?.definitions?.process?.scriptTask

const getTestScript = (task) => {
  const metaData = task.extensionElements['signavio:signavioMetaData']

  const testFunction = metaData.reduce((testFunction, attribute) => {
    if (isAttributeMetaTestFunction(attribute)) {
      testFunction = attribute._attributes.metaValue
    }
    return testFunction
  })

  return testFunction
}
const getTestValues = (task) => {
  const metaData = task.extensionElements['signavio:signavioMetaData']

  const testValue = metaData.reduce((testValue, attribute) => {
    if (isAttributeMetaTestValues(attribute)) {
      testValue = JSON.parse(attribute._attributes.metaValue).items
    }
    return testValue
  })

  return testValue
}

const isAttributeMetaTestValues = (attribute) =>
  attribute._attributes.metaKey === 'meta-testvalues'

const isAttributeMetaTestFunction = (attribute) =>
  attribute._attributes.metaKey === 'meta-testfunction'

export default fetchTestScriptAndValues
