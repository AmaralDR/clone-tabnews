import database from 'infra/database';
import migrationRunner from 'node-pg-migrate';
import { join } from 'node:path';
async function handlerMigrations(request, response) {
  const dbClient = await database.getNewClient();
  const defaultOptionsMigrations = {
    dbClient,
    dryRun: true,
    dir: join("infra", "migrations"),
    direction: 'up',
    verbose: true,
    migrationsTable: 'pgmigrations'
  };
  if (request.method === "GET") {
    const migrationsPending = await migrationRunner(defaultOptionsMigrations);
    await dbClient.end();
    return response.status(200).json(migrationsPending);

  }
  if (request.method === "POST") {
    const migrationsExecuted = await migrationRunner({
      ...defaultOptionsMigrations,
      dryRun: false
    });
    await dbClient.end();
    if (migrationsExecuted.length > 0) {
      return response.status(201).json(migrationsExecuted);
    }
    return response.status(200).json(migrationsExecuted);
  }


  return response.status(405).end();

}

export default handlerMigrations;
