/**
 * This file will use the helper parsers to drive the test-driven approach
 */

import fetchTestScriptAndValues from './parser/fetchTestScriptAndValues.js'
import getTestFunctions from './parser/getTestFunctions.js'
import { xmlString } from './utils/sampleXml.js'

const scriptAndTestValues = fetchTestScriptAndValues(xmlString.bpmn)

// console.log(getTestFunctions(scriptAndTestValues))
