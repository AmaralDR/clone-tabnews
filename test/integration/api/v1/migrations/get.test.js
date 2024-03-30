import { cleanDatabase } from 'test/utils/database';
beforeAll(cleanDatabase)
describe('V1 -> Api Migrations', () => {
  test('[GET] /api/v1/migrations should return 200', async () => {
    const response = await fetch('http://localhost:3000/api/v1/migrations');
    expect(response.status).toBe(200);
    const responseBody = await response.json();
    expect(Array.isArray(responseBody)).toBe(true);
    expect(responseBody.length).toBeGreaterThan(0);

  })
})
