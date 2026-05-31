import { run } from './robots.js';

try {
  const result = run(process.argv[2]);
  console.log(result);
} catch (e) {
  console.error(e instanceof Error ? e.message : String(e));
}
