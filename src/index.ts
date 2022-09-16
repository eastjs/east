import { LedgerApplication } from "./examples/app";

async function main() {
  const app = new LedgerApplication({ port: 3001 });
  await app.start();

  app.logger.info(`Server up and running on ${app.configs.url}`);
}

main();
