import { beforeAll, describe, expect, test } from "@jest/globals";
import orchestrator from "test/orchestrator";
beforeAll(async () => {
  await orchestrator.clearDatabase();
})
describe("[DELETE] /api/v1/migrations", () => {
  describe("Anonymous user", () => {
    test("Trying delete migrations", async () => {
      const responseFirstRequest = await fetch(
        "http://localhost:3000/api/v1/migrations",
        {
          method: "DELETE",
        }
      );
      expect(responseFirstRequest.status).toBe(405);

    });
  });
});
