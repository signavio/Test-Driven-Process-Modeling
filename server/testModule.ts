import fs from 'fs'
import path from 'path'
import { parseString } from 'xml2js'
import convert from 'xml-js'
import builder from 'xmlbuilder'
import { fetchTestValue } from './preProcessingModule'

export const fetchTestScript = (xmlString: any) => {
  let jsonDiagram: any = convert.xml2js(xmlString, { compact: true })
  let testString: any = ''
  Object.keys(jsonDiagram.definitions.process.scriptTask.script).forEach(
    (key) => {
      if (key == '_cdata' || key == '_text') {
        testString = jsonDiagram.definitions.process.scriptTask.script[key]
      }
    }
  )
  // regex to fetch the testcases from script task
  const regexCondition1 = /\((.*)\)/ // to get the first condition
  const regexCondition2 = /(\n.*)\;/g // to get the first value

  const condition1 = testString.match(regexCondition1)[0]
  const value1 = testString.match(regexCondition2)[0]
  const value2 = testString.match(regexCondition2)[1]

  const test = (testValue: any) => {
    if (eval(condition1)) {
      return eval(value1)
    } else {
      return eval(value2)
    }
  }
}

export const testModule = (xmlString: any) => {
  fetchTestScript(xmlString)
  let testValuesArray: any = fetchTestValue(xmlString)

  // test module
  let successFlag = false
  for (let index = 0; index < testValuesArray.length; index++) {
    let result = test(eval(testValuesArray[index].inputs[0]))
    if (result == eval(testValuesArray[index].outputs[0])) {
      successFlag = true
    } else {
      successFlag = false
      break
    }
  }
  return successFlag
}
