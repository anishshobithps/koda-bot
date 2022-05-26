import { URL } from 'node:url';
import { rm } from 'node:fs/promises';

const root = new URL('../', import.meta.url);
const dist = new URL('dist/', root);

await rm(dist, { recursive: true });

