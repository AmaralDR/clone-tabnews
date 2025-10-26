import { beforeAll, describe, expect, test } from "@jest/globals";
import orchestrator from "test/orchestrator";

beforeAll(async () => {
  await orchestrator.waitForAllServices();
});
describe("[GET] /api/v1/status", () => {
  describe("Anonymous user", () => {
    test("Retrieving current system status", async () => {
      const response = await fetch(`${orchestrator.getBaseUrl()}/api/v1/status`);
      expect(response.status).toBe(200);
      const responseBody = await response.json();
      expect(responseBody).toBeDefined();
      expect(responseBody.updated_at).toBeDefined();
      const updatedAtParsed = new Date(responseBody.updated_at).toISOString();
      expect(responseBody.updated_at).toBe(updatedAtParsed);

      expect(responseBody.dependencies.database.version).toEqual("16.0");
      expect(responseBody.dependencies.database.max_connections).toEqual(100);
      expect(responseBody.dependencies.database.opened_connections).toEqual(1);
    });
  });
});
