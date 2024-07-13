import database from "infra/database";
async function cleanDatabase() {
  await database.query("DROP schema public CASCADE;CREATE schema public;");
}
export { cleanDatabase };
