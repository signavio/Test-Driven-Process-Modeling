/**
 * This file will use the helper parsers to drive the test-driven approach
 */

import fetchTestScriptAndValues from './parser/fetchTestScriptAndValues'
import getInputAndOutputTestValues from './parser/getInputAndOutputTestValues'
import getTestFunctions from './parser/getTestFunctions'
import { xmlString, xmlFromEditor } from './utils/sampleXml'

/**
 * This method takes the test functions and the input and output values and runs the values against the test function. If the test fails the count is incremented and returned. Based on this value the model can be either deployed to blockchain network or not.
 * @param {Array} testFunctions
 * @param {Array} inputAndOutputValues
 * @return {Number}
 */
const getTestFailCount = (testFunctions, inputAndOutputValues) => {
  let testFailCount = 0
  for (let i = 0; i < testFunctions.length; i += 1) {
    for (let j = 0; j < inputAndOutputValues.length; j += 1) {
      try {
        const receivedOutput = testFunctions[i](
          inputAndOutputValues[i][j].inputs
        )
        const expectedOutput = inputAndOutputValues[i][j].outputs
        if (receivedOutput.toString() !== expectedOutput) {
          testFailCount += 1
        }
      } catch (error) {
        throw error
      }
    }
  }
  return testFailCount
}

export const hasTestPassed = (xmlString) => {
  let hasTestPassed = false

  const scriptAndTestValues = fetchTestScriptAndValues(xmlString.bpmn)
  const inputAndOutputValues = getInputAndOutputTestValues(scriptAndTestValues)
  const testFunctions = getTestFunctions(scriptAndTestValues)
  const testFailCount = getTestFailCount(testFunctions, inputAndOutputValues)

  if (testFailCount === 0) {
    hasTestPassed = true
  } else {
    hasTestPassed = false
  }

  return hasTestPassed
}
