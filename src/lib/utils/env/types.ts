/**
 * @license Apache License, Version 2.0
 * @copyright Skyra Project
 *
 * Changes made: Renamed types
 */

 export type BooleanString = 'true' | 'false';
 export type IntegerString = `${bigint}`;

 export type EnvAny = keyof Env;
 export type EnvString = { [K in EnvAny]: Env[K] extends BooleanString | IntegerString ? never : K }[EnvAny];
 export type EnvBoolean = { [K in EnvAny]: Env[K] extends BooleanString ? K : never }[EnvAny];
 export type EnvInteger = { [K in EnvAny]: Env[K] extends IntegerString ? K : never }[EnvAny];

 export interface Env {
   DISCORD_TOKEN: string;
   PREFIX: string;
   OWNERS: string;
   BOT_NAME: string;
   DEV: BooleanString;
   USELESS_CHANNEL: string;
 }

