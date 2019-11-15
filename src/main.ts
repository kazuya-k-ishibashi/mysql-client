import 'reflect-metadata';
import { REPL } from '@/client/repl';


async function main() {
  const repl = new REPL();

  process.on('SIGINT', async () => {
    await repl.exit();
    process.exit();
  });

  await repl.run();
}

main();
