import database from "infra/database";
async function cleanDatabase() {
  await database.query('DROP schema public CASCADE;CREATE schema public;')
}
beforeAll(cleanDatabase)
describe('V1 -> Api Migrations', () => {
  test('[POST] /api/v1/migrations should return 200', async () => {
    const response = await fetch('http://localhost:3000/api/v1/migrations', {
      method: 'POST'
    });
    expect(response.status).toBe(200)
    const responseBody = await response.json();
    expect(Array.isArray(responseBody)).toBe(true)

  })
})
