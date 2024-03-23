import migrationRunner from 'node-pg-migrate';
import { join } from 'node:path';
async function handleMigrations(request, response) {

  if (request.method === "GET") {
    const result = await migrationRunner({
      databaseUrl: process.env.DATABASE_URL,
      dryRun: true,
      dir: join("infra", "migrations"),
      direction: 'up',
      verbose: true,
      migrationsTable: 'pgmigrations'
    });
    response.status(200).json(result);

  }
  if (request.method === "POST") {
    const result = await migrationRunner({
      databaseUrl: process.env.DATABASE_URL,
      dryRun: false,
      dir: join("infra", "migrations"),
      direction: 'up',
      verbose: true,
      migrationsTable: 'pgmigrations'
    })
    response.status(200).json(result);
  }

  response.status(405).end();

}

export default handleMigrations;
