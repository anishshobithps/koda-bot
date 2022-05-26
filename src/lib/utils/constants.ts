import { join, dirname } from 'node:path';
import { fileURLToPath  } from 'node:url';

// __dirname is not defined in ES module scope.
const __dirname = dirname(fileURLToPath(import.meta.url));

export const rootDir = join(__dirname, '..', '..', '..');
export const srcDir = join(rootDir, 'src');

export const RandomLoadingMessage = ['Computing...', 'Thinking...', 'Cooking some food', 'Give me a moment', 'Loading...'] as const;
