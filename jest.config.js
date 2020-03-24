module.exports = {
  projects: [
    {
      displayName: "integration",
      testMatch: ["<rootDir>/**/__tests__/*.js"]
    },
    {
      displayName: "linter",
      runner: "jest-runner-eslint",
      testMatch: ["<rootDir>/**/*.js"],
      testPathIgnorePatterns: [
        "<rootDir>/dist",
        "<rootDir>/coverage/",
        "<rootDir>/node_modules/"
      ]
    }
  ]
};
