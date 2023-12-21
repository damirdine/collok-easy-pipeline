export default {
  testEnvironment: "node",
  testPathIgnorePatterns: [
    "/node_modules/",
    "/migrations/", // Ignore migrations directory
    "/seeders/", // Ignore seeders directory
  ],
  // extensionsToTreatAsEsm: [".js", ".mjs"],
  testMatch: ["**/tests/**/*.test.js"], // Only run tests ending with '.test.js'
};
