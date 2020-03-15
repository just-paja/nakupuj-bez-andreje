const { getValidLawForms } = require('../scripts/listSubjects');

const lawForms = getValidLawForms()

describe('smoke tests', () => {
  it('is valid json', () => {
    expect(() => require('../index.json')).not.toThrow();
  });

  const list = require('../index.json');
  list.forEach((company, index) => {
    describe(company.name || `record ${index}`, () => {
      it('has name', () => {
        expect(company.name).not.toBeFalsy();
      });

      it('has identification number', () => {
        expect(company.id).not.toBeFalsy();
      });

      it('has valid law form', () => {
        expect(company.lawForm).toBeOneOf(lawForms);
      });
    })
  })
});
