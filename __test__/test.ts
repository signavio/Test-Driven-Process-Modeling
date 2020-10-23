import { hasTestPassed } from '../server/testModule'
import { xmlFromEditor } from '../server/utils/sampleXml'

describe('TestCases', () => {
  describe('testModule', () => {
    it('Should return the correct successFlag after testing the BPMN 2.0 XML', () => {
      expect(hasTestPassed(xmlFromEditor)).toBe(true)
    })
  })
})

// To-do fix support for single script tasks