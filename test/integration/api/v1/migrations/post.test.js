import { beforeAll, describe, expect, test } from "@jest/globals";
import orchestrator from "test/orchestrator";
beforeAll(async () => {
  await orchestrator.waitForAllServices();
  await orchestrator.clearDatabase();
});
describe("[POST] /api/v1/migrations", () => {
  describe("Anonymous user", () => {
    describe("Running pending migrations", () => {
      test("For the first time", async () => {
        const responseFirstRequest = await fetch(
          "http://localhost:3000/api/v1/migrations",
          {
            method: "POST",
          }
        );
        expect(responseFirstRequest.status).toBe(201);
        const responseFirstRequestBody = await responseFirstRequest.json();
        expect(Array.isArray(responseFirstRequestBody)).toBe(true);
        expect(responseFirstRequestBody.length).toBeGreaterThan(0);
      });
      test("For the second time", async () => {
        const responseSecondRequest = await fetch(
          "http://localhost:3000/api/v1/migrations",
          {
            method: "POST",
          }
        );
        expect(responseSecondRequest.status).toBe(200);
        const responseSecondRequestBody = await responseSecondRequest.json();
        expect(Array.isArray(responseSecondRequestBody)).toBe(true);
        expect(responseSecondRequestBody.length).toBe(0);
      });
    });
  });
});
