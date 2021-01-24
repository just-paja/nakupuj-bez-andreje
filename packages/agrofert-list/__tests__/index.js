const { getValidLawForms } = require('../scripts/listSubjects')
const { Validator } = require('jsonschema')

const schema = require('../schema')
const lawForms = getValidLawForms()

describe('company list', () => {
  it('is valid json', () => {
    expect(() => require('../index.json')).not.toThrow()
  })

  const list = require('../index.json')

  it('validates against schema', () => {
    const validator = new Validator()

    expect(() =>
      validator.validate(list, schema, {
        throwError: true
      })
    ).not.toThrow()
  })

  list.forEach((company, index) => {
    describe(company.name || `record ${index}`, () => {
      it('has name', () => {
        expect(company.name).not.toBeFalsy()
      })

      it('has identification number', () => {
        expect(company.id).not.toBeFalsy()
      })

      it('has valid law form', () => {
        expect(company.lawForm).toBeOneOf(lawForms)
      })
    })
  })
})
