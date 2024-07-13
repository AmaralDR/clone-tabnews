import orchestrator from "test/orchestrator";
import { cleanDatabase } from "test/utils/database";
beforeAll(async () => {
  await orchestrator.waitForAllServices();
  await cleanDatabase();
});
describe("V1 -> Api Migrations", () => {
  test("[POST] /api/v1/migrations should return 200", async () => {
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
