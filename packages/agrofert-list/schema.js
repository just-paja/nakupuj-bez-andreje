const { getValidLawForms } = require('./scripts/listSubjects');

module.exports = {
  "id": "/CompanyList",
  "type": "array",
  "items": {
    "type": "object",
    "properties": {
      "brandName": {
        "type": "string",
        "description": "Název značky - pár slov podle kterých se dá vyhledat v obchodním rejstříku"
      },
      "name": {
        "type": "string",
        "description": "Celý název společnosti"
      },
      "id": {
        "type": "string",
        "description": "IČO"
      },
      "lawForm": {
        "type": "string",
        "description": "Právní forma",
        "enum": getValidLawForms()
      }
    }
  }
}
