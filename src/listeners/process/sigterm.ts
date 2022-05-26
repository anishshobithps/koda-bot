import { ApplyOptions } from '@sapphire/decorators';
import { Listener, ListenerOptions } from '@sapphire/framework';
import { Events } from '#lib/utils/events';

@ApplyOptions<ListenerOptions>({
	name: Events.SigTerm,
	emitter: process
})
export class SIGTERMEvent extends Listener {
	public override async run() {
		this.container.client.destroy();
	}
}
