import { ApplyOptions } from '@sapphire/decorators';
import fetch from 'node-fetch';
import type { TextChannel } from 'discord.js';
import { Task, type TaskOptions } from '#lib/structures/task/Task';
import { envParseString } from '#lib/utils/env/parser';

@ApplyOptions<TaskOptions>({ cron: '*/30 * * * *' })
export default class UselessTask extends Task {
	public async run() {
		const channel = this.container.client.channels.cache.get(envParseString('USELESS_CHANNEL')) as TextChannel;
		const data = await this.getData();
		const messageX = [
			`\n***__This is an Automatically Sent Message__***`,
			`**${data.text}**`,
			`Source: __https://${data.source}__`,
			`Permalink: __${data.permalink}__\n`
		].join('\n');
		channel.send(messageX);
	  }

	  public async getData(): Promise<Data> {
		const data = await fetch('https://uselessfacts.jsph.pl/random.json?language=en');
		return data.json() as Promise<Data>;
	  }
}

interface Data {
	text: string;
	source: string;
	permalink: string;
}
