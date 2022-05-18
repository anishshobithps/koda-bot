import fetch from 'node-fetch';
import { Client, Intents, Constants } from 'discord.js';
import cron from 'node-cron';

// */30 * * * *

const { Events } = Constants;

const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES]});

client.once(Events.CLIENT_READY, () => {
    console.log(['Client ready!', 
    `Logged in as ${client.user.tag}!`, 
    `Server count: ${client.guilds.cache.size}`,
    `Server names: ${client.guilds.cache.map(guild => guild.name).join('\n')}`,
    ].join('\n'));

    cron.schedule('*/30 * * * *', async () => {
        const data = await getData();
        console.log(`Sending message... at ${new Date()}`);
        const messageX = [
            `\n***__This is an Automatically Sent Message__***`,
            // @ts-ignore
            `**${data.text}**`,
            // @ts-ignore
            `Source: __https://${data.source}__`,
            // @ts-ignore
            `Permalink: __${data.permalink}__\n`
        ].join('\n');

        client.channels.cache.get('976177214766870598')
        // @ts-ignore
        .send(messageX);
    });
});

client.on(Events.MESSAGE_CREATE, async (message) => {
    if (message.author.bot) return;
    const prefix = '!';
    const channelID = '976177214766870598';
    if (!message.content.startsWith(prefix)) return;
    const args = message.content.slice(prefix.length).split(/ +/);
    const command = args.shift().toLowerCase();

    if (message.channel.id !== channelID) {
        message.channel.send(`Please use #${channelID}> for useless facts`);
        return;
    }

    if ((command === 'useless' || command === 'ul')) {
        const data = await getData();

        const messageX = [
            // @ts-ignore
            `**${data.text}**`,
            // @ts-ignore
            `Source: __https://${data.source}__`,
            // @ts-ignore
            `Permalink: __${data.permalink}__`
        ].join('\n');

    
        message.channel.send(messageX);
    }
});

client.login('OTc2MTcyODMzNTQzNjk2NDM0.GX5jwa.-BFk8u5pKEpk6VxgI3laASY3npdFewSCO01ucI')

async function getData() {
    const data = await fetch('https://uselessfacts.jsph.pl/random.json?language=en');
    const json = await data.json();
    return json;
}
