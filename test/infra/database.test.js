const { default: database } = require("infra/database");

describe("Database", () => {
  test("[INFRA] validate throw error database.js", async () => {
    process.env.POSTGRES_CA = "fake_ca";

    await expect(database.query("SELECT 1 + 1 result;")).rejects.toThrow(
      "The server does not support SSL connections"
    );
  });
});
