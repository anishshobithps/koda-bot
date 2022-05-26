import { Precondition } from '@sapphire/framework';
import { ApplyOptions } from '@sapphire/decorators';
import type { PreconditionOptions, PreconditionResult } from '@sapphire/framework';
import type { Message } from 'discord.js';


@ApplyOptions<PreconditionOptions>( {
	name: 'OwnerOnly',
} )
export class OwnerOnlyPrecondition extends Precondition {
	public run( message: Message ): PreconditionResult {
		return message.author.id === this.container.client.owner?.id ? this.ok() : this.error();
	}
}

declare module '@sapphire/framework' {
	interface Preconditions {
		OwnerOnly: never;
	}
}
