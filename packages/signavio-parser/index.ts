import convert from 'xml-js'

class SignavioParser {
    private xml
    private globalVariables
    private contractName
    private xmlWithGlobalVariables

    constructor(xml, globalVariables, contractName) {
        this.xml = xml
        this.globalVariables = globalVariables
        this.contractName = contractName
        this.setXMlWithGlobalVariables()
    }

    /**
     * Expose a factory method to instantiate Signavio parser
     */
    public static parse(xml, globalVariables, contractName): SignavioParser {
        return new SignavioParser(xml, globalVariables, contractName)
    }

    private getTestFunctionAndInputOutputValues(): Array<object> {
        const scriptAndTestValues = this.fetchTestScriptAndValues(this.xmlWithGlobalVariables.bpmn)
        const inputAndOutputValues = this.getInputAndOutputTestValues(scriptAndTestValues)
        const testFunctions = this.getTestFunctions(scriptAndTestValues)

        return [testFunctions, inputAndOutputValues]
    }

    public getTestResult(): boolean {
        const [testFunctions, inputAndOutputValues] = this.getTestFunctionAndInputOutputValues()
        const testFailCount = this.getTestFailCount(testFunctions, inputAndOutputValues)

        let hasTestPassed = false
        if (testFailCount === 0) {
            hasTestPassed = true
        } else {
            hasTestPassed = false
        }

        return hasTestPassed
    }

    private addGlobalDocumentation(xmlString, inputVariables, contractName) {
        let jsonDiagram: any = convert.xml2js(xmlString, { compact: true })
        let json2: any = {}

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

    private setXMlWithGlobalVariables() {
        this.xmlWithGlobalVariables = this.addGlobalDocumentation(this.xml, this.globalVariables, this.contractName)
    }

    public getXmlWithGlobalVariables() {
        return this.xmlWithGlobalVariables
    }

    /**
 * Method takes in the xml as sting and parses to fetch the test script and test values
 * @param {string} xmlString
 * @return {object}
 */
    private fetchTestScriptAndValues(xml: string): object {
        let jsonDiagram = convert.xml2js(xml, { compact: true })

        const scriptTasks: Array<object> = this.getScriptTasks(jsonDiagram)

        const scriptAndValues = scriptTasks.map((task) => {
            const testScript = this.getTestScript(task)
            const testValues = this.getTestValues(task)
            return { script: testScript, values: testValues }
        })

        return scriptAndValues
    }

    private getScriptTasks(jsonDiagram): Array<object> {
        return jsonDiagram?.definitions?.process?.scriptTask
    }

    private getTestScript(task): Array<object> {
        const metaData = task.extensionElements['signavio:signavioMetaData']

        const testFunction = metaData.reduce((testFunction, attribute) => {
            if (this.isAttributeMetaTestFunction(attribute)) {
                testFunction = attribute._attributes.metaValue
            }
            return testFunction
        })

        return testFunction
    }

    private getTestValues(task): Array<object> {
        const metaData = task.extensionElements['signavio:signavioMetaData']

        const testValue = metaData.reduce((testValue, attribute) => {
            if (this.isAttributeMetaTestValues(attribute)) {
                testValue = JSON.parse(attribute._attributes.metaValue).items
            }
            return testValue
        })

        return testValue
    }

    private isAttributeMetaTestValues(attribute): boolean {
        return attribute._attributes.metaKey === 'meta-testvalues'
    }

    private isAttributeMetaTestFunction(attribute): boolean {
        return attribute._attributes.metaKey === 'meta-testfunction'
    }

    private stripValueFromString(inputString) {
        return inputString.split(' ')[2]
    }
    /**
     * This method will take the the input as array of objects with the input and output test values and strip only the values from it and reduces the array
     * @param {Array} inputAndOutputValuesAsString
     * @return {Array}
     */
    private getInputAndOutputTestValues(inputAndOutputValuesAsString) {
        return inputAndOutputValuesAsString.reduce((resultant, valueSet) => {
            const entry = valueSet.values.map((element) => {
                element.outputs = this.stripValueFromString(element.outputs[0])
                element.inputs = this.stripValueFromString(element.inputs[0])
                return element
            })
            resultant.push(entry)
            return resultant
        }, [])
    }

    /**
 * This method will take in the scripts array of objects with test scripts and test values
 * and will return the test function to be used for the test driven approach
 * This file employs the use of function constructors to create test functions from the test script tasks which are in string format
 * @param {Array} scripts
 * @return {Array} testfunctions
 */
    private getTestFunctions(scripts) {
        return scripts.reduce((testFunctions, script) => {
            const { variable, returnValue } = this.getVariableAndReturnValueFromScript(
                script.script
            )

            const functionString = this.createFunctionString(
                script.script,
                variable,
                returnValue
            )
            const testFunction = this.createTestFunction(functionString)

            testFunctions.push(testFunction)

            return testFunctions
        }, [])
    }

    /**
     * Method uses regex to retrieve the variable and return value to be used for the function constructor
     * @param {String} testString
     */
    private getVariableAndReturnValueFromScript(testString) {
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
    private createFunctionString(script, variable, out) {
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
    private createTestFunction(fnString) {
        return new Function('inputParam', fnString)
    }

    /**
 * This method takes the test functions and the input and output values and runs the values against the test function. If the test fails the count is incremented and returned. Based on this value the model can be either deployed to blockchain network or not.
 * @param {Array} testFunctions
 * @param {Array} inputAndOutputValues
 * @return {Number}
 */
    private getTestFailCount(testFunctions, inputAndOutputValues) {
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

}

export default SignavioParser