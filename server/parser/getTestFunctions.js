/**
 * This method will take in the scripts array of objects with test scripts and test values
 * and will return the test function to be used for the test driven approach
 * This file employs the use of function constructors to create test functions from the test script tasks which are in string format
 * @param {Array} scripts
 * @return {Array} testfunctions
 */
const getTestFunctions = (scripts) => {
  return scripts.reduce((testFunctions, script) => {
    const { variable, returnValue } = getVariableAndReturnValueFromScript(
      script.script
    )

    const functionString = createFunctionString(
      script.script,
      variable,
      returnValue
    )
    const testFunction = createTestFunction(functionString)

    testFunctions.push(testFunction)

    return testFunctions
  }, [])
}

/**
 * Method uses regex to retrieve the variable and return value to be used for the function constructor
 * @param {String} testString
 */
const getVariableAndReturnValueFromScript = (testString) => {
  const getVariable = /\((.*)\)/
  const getReturnValue = /(\n.*)\;/g

  const variable = testString
    .match(getVariable)[0]
    .replace('(', ' ')
    .split(' ')[1]
  const returnValue = testString.match(getReturnValue)[0].split(' ')[0]

  return { variable, returnValue }
}

/**
 * Method returns the function string to be passed as input to the function constructor
 * @param {string} script
 * @param {string} variable
 * @param {string} returnValue
 * @return {string}
 */
const createFunctionString = (script, variable, out) => {
  const fnString = `const ${variable} = inputParam; 
    let ${out} = false; 
    ${script} `

  return fnString
}

/**
 *
 * @param {string} fnString
 * @return {function}
 */
const createTestFunction = (fnString) => new Function('inputParam', fnString)

export default getTestFunctions
