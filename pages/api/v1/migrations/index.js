import database from "infra/database";
import migrationRunner from "node-pg-migrate";
import { join } from "node:path";

function getOptionsMigrations(dbClient, dryRun = true) {
  return {
    dbClient,
    dryRun,
    dir: join("infra", "migrations"),
    direction: "up",
    verbose: true,
    migrationsTable: "pgmigrations",
  };
}
async function GET(request, response) {
  let dbClient;
  try {
    dbClient = await database.getNewClient();
    const optionsMigrations = getOptionsMigrations(dbClient, true);
    const migrationsPending = await migrationRunner(optionsMigrations);

    return response.status(200).json(migrationsPending);
  } catch (error) {
    console.error(error);
    throw error;
  } finally {
    await dbClient?.end();
  }
}
async function POST(request, response) {
  let dbClient;
  try {
    dbClient = await database.getNewClient();
    const optionsMigrations = getOptionsMigrations(dbClient, false);
    const migrationsExecuted = await migrationRunner(optionsMigrations);
    if (migrationsExecuted.length > 0) {
      return response.status(201).json(migrationsExecuted);
    }
    return response.status(200).json(migrationsExecuted);
  } catch (error) {
    console.error(error);
    throw error;
  } finally {
    await dbClient?.end();
  }
}

async function handlerMigrations(request, response) {
  if (request.method === "GET") {
    return GET(request, response);
  }
  if (request.method === "POST") {
    return POST(request, response);
  }
  return response.status(405).end();
}

export default handlerMigrations;
