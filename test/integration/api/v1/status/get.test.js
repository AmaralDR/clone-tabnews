describe('V1 -> Api Status', () => {
  test('[GET] /api/v1/status should return 200', async () => {
    const response = await fetch('http://localhost:3000/api/v1/status');
    expect(response.status).toBe(200)
    const responseBody = await response.json();
    expect(responseBody).toBeDefined()
    expect(responseBody.updated_at).toBeDefined()
    const updatedAtParsed = new Date(responseBody.updated_at).toISOString();
    expect(responseBody.updated_at).toBe(updatedAtParsed)

    expect(responseBody.dependencies.database.version).toEqual('16.0')
    expect(responseBody.dependencies.database.max_connections).toEqual(100)
    expect(responseBody.dependencies.database.opened_connections).toEqual(1)

  })
})
