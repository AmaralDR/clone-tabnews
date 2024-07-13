const dotenv = require("dotenv");
const nextJest = require("next/jest");

const MAX_TIMEOUT_TEST = 60_000;
dotenv.config({
  path: ".env.development",
});
const createJestConfig = nextJest({
  dir: ".",
});
const jestConfig = createJestConfig({
  moduleDirectories: ["node_modules", "<rootDir>"],
  testTimeout: MAX_TIMEOUT_TEST,
});
module.exports = jestConfig;
