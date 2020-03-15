module.exports = {
  projects: [
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
