import database from "infra/database";

async function handlerStatus(_req, res) {
  const result = await database.query('SHOW server_version; SHOW max_connections; SHOW superuser_reserved_connections;');
  const [serverVersion, maxConnections, superUserReservedConnections] = result;
  const [serverVersionValue] = serverVersion.rows;
  const [maxConnectionsValue] = maxConnections.rows;
  const [superuserReservedConnectionsValue] = superUserReservedConnections.rows;

  const resultOpened = await database.query({

    text: `SELECT count(*)::int FROM pg_stat_activity WHERE datname = $1;`,
    values: [process.env.POSTGRES_DB]
  });
  const resultStatus = {
    status: 'healthy',
    updated_at: new Date().toISOString(),
    dependencies: {
      database: {
        version: serverVersionValue.server_version,
        reserved_connections: parseInt(superuserReservedConnectionsValue["superuser_reserved_connections"], 10),
        max_connections: parseInt(maxConnectionsValue["max_connections"], 10),
        opened_connections: resultOpened.rows[0].count,
      },
    }
  };
  return res.status(200).json(resultStatus)
}

export default handlerStatus;
