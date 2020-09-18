const stripValueFromString = (inputString) => {
  return inputString.split(' ')[2]
}
/**
 * This method will take the the input as array of objects with the input and output test values and strip only the values from it and reduces the array
 * @param {Array} inputAndOutputValuesAsString
 * @return {Array}
 */
const getInputAndOutputTestValues = (inputAndOutputValuesAsString) => {
  return inputAndOutputValuesAsString.reduce((resultant, valueSet) => {
    const entry = valueSet.values.map((element) => {
      element.outputs = stripValueFromString(element.outputs[0])
      element.inputs = stripValueFromString(element.inputs[0])
      return element
    })
    resultant.push(entry)
    return resultant
  }, [])
}

export default getInputAndOutputTestValues
