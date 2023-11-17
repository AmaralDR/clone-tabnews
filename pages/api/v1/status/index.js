import database from "infra/database";

async function handleStatus(_req, res) {
  const result = await database.query('SHOW max_connections; SHOW superuser_reserved_connections;');
  const [maxConnections, superUserReservedConnections] = result;
  const [maxConnectionsValue] = maxConnections.rows;
  const [superuserReservedConnectionsValue] = superUserReservedConnections.rows;
  const resultStatus = {
    status: 'healthy',
    updated_at: new Date(),
    max_connections: parseInt(maxConnectionsValue["max_connections"], 10) - parseInt(superuserReservedConnectionsValue["superuser_reserved_connections"], 10),

  }
  res.status(200).json(resultStatus)
}

export default handleStatus;
