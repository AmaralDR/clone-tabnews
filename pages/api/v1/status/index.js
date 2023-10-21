import database from "../../../../infra/database";

async function handleStatus(req, res) {
  const result = await database.query('SELECT 1+1 as result;');
  console.log(result.rows)
  res.status(200).json({
    status: 'Api Status V1'
  })
}

export default handleStatus;
