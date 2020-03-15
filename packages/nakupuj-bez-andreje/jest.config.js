module.exports = {
  projects: [
    {
      displayName: "linter",
      runner: "jest-runner-eslint",
      testMatch: ["<rootDir>/**/*.js"],
      testPathIgnorePatterns: ["<rootDir>/coverage/", "<rootDir>/node_modules/"]
    }
    // {
    //   displayName: 'website',
    //   testPathIgnorePatterns: ['<rootDir>/coverage/', '<rootDir>/node_modules/'],
    //   collectCoverageFrom: [
    //     'src/**/*.{js,jsx}'
    //   ],
    //   coveragePathIgnorePatterns: [
    //     '/node_modules/',
    //     '/locales/',
    //     '/constants/'
    //   ],
    //   transform: {
    //     '^.+\\.(js|jsx)$': 'babel-jest'
    //   }
    // }
  ]
};
