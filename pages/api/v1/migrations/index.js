import migrationRunner from 'node-pg-migrate';
import { join } from 'node:path';
async function handlerMigrations(request, response) {
  const defaultOptionsMigrations = {
    databaseUrl: process.env.DATABASE_URL,
    dryRun: true,
    dir: join("infra", "migrations"),
    direction: 'up',
    verbose: true,
    migrationsTable: 'pgmigrations'
  };
  if (request.method === "GET") {
    const migrationsPending = await migrationRunner(defaultOptionsMigrations);
    return response.status(200).json(migrationsPending);

  }
  if (request.method === "POST") {
    const migrationsExecuted = await migrationRunner({
      ...defaultOptionsMigrations,
      dryRun: false
    });
    if (migrationsExecuted.length > 0) {
      return response.status(201).json(migrationsExecuted);
    }
    return response.status(200).json(migrationsExecuted);
  }


  return response.status(405).end();

}

export default handlerMigrations;
