import { beforeAll, describe, expect, test } from "@jest/globals";
import { cleanDatabase } from "test/utils/database";
beforeAll(cleanDatabase);
describe("V1 -> Api Migrations", () => {
  test("[DELETE] /api/v1/migrations should return 200", async () => {
    const responseFirstRequest = await fetch(
      "http://localhost:3000/api/v1/migrations",
      {
        method: "DELETE",
      }
    );
    expect(responseFirstRequest.status).toBe(405);
  });
});
