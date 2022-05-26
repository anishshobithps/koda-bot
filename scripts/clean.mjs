import { URL } from 'node:url';
import { access, rm } from 'node:fs/promises';
import { constants } from 'node:fs';

const root = new URL('../', import.meta.url);
const dist = new URL('dist/', root);

try {
    await access(dist, constants.F_OK)
    await rm(dist, { recursive: true });
} catch {
    // noop
}

