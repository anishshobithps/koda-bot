// Unless explicitly defined, set NODE_ENV as development:
process.env.NODE_ENV ??= 'development';

import 'reflect-metadata';
import '@sapphire/plugin-logger/register';
import '@sapphire/plugin-editable-commands/register';
import '@sapphire/plugin-hmr/register';

import * as colorette from 'colorette';
import { container, RegisterBehavior, ApplicationCommandRegistries } from '@sapphire/framework';
import { config } from 'dotenv-cra';
import { join } from 'node:path';
import { inspect } from 'node:util';
import { readFileSync } from 'node:fs';
import { srcDir } from '#utils/constants';
import type { PackageJson } from 'type-fest';

const pkg = JSON.parse(readFileSync('./package.json', 'utf-8')) as PackageJson;

// Object is faster than Reflect in terms of performance.
Object.defineProperty(container, 'package', {
	value: pkg,
	configurable: false,
	writable: false,
	enumerable: false
});

// Read env var
config({ path: join(srcDir, '.env') });

// Set default inspection depth
inspect.defaultOptions.depth = 1;

// Enable colorette
colorette.createColors({ useColor: true });

ApplicationCommandRegistries.setDefaultBehaviorWhenNotIdentical(RegisterBehavior.Overwrite);

declare module '@sapphire/pieces' {
	interface Container {
	  package: typeof pkg;
	}
}
