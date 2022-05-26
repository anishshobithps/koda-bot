import '#lib/setup';
import { KodaClient } from '#lib/structures/KodaClient';

const client = new KodaClient({
	intents: ['GUILDS', 'GUILD_MESSAGES'],
	shards: 'auto'
});

const main = async () => {
	try {
		client.logger.info('Logging in...');
		await client.login();
	} catch (error) {
		client.logger.fatal(error);
		client.destroy();
		process.exit(1);
	}
};

main();
