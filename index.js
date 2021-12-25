const http = require('http');
http.createServer(function (req, res) {
    res.write("online");
    res.end();
}).listen(8080);

const fs = require('fs');
const {Client, Intents} = require("discord.js");

const client = new Client({ intents: [
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MESSAGES,
        Intents.FLAGS.DIRECT_MESSAGES,
        Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
        Intents.FLAGS.GUILD_MEMBERS,
        Intents.FLAGS.GUILD_PRESENCES], partials: ["CHANNEL"] });

const commands = {}
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'))
for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    commands[command.data.name] = command
}

client.on('ready', async () => {
    const data = []
    for (const commandName in commands) {
        data.push(commands[commandName].data);
    }
    await client.guilds.cache.forEach(g => {
        client.application.commands.set(data, g.id);
        console.log(g.name);
    })
    console.log(`Logged in as ${client.user.tag}`);
    const servers = client.guilds.cache.size;
    client.user.setActivity(`/help | ${servers} サーバー`, { type: "COMPETING" });
});

client.on("guildCreate", async guild => {
    const data = []
    for (const commandName in commands)
        data.push(commands[commandName].data);
    await client.application.commands.set(data, guild.id);
    console.log("Joined a new guild: " + guild.name);
    const servers = client.guilds.cache.size;
    client.user.setActivity(`/help | ${servers} サーバー`, { type: "COMPETING" });
})

client.on("guildDelete", async guild => {
    console.log("Left a guild: " + guild.name);
    const servers = client.guilds.cache.size;
    client.user.setActivity(`/help | ${servers} サーバー`, { type: "COMPETING" });
})

client.on('messageCreate', async message => {
    if (message.author.bot) return;
    if (message.channel.type === 'DM') {
        await message.author.send({ content: '何かありましたか？\n' +
                'もし何かあった場合はサポートサーバーに入り、お問い合わせください。\n\n' +
                '雑談サーバーでもあります。興味があればぜひ入ってくださいね！\n\n' +
                '**☆ヒカマニ雑談サーバー☆**\n' +
                'https://discord.gg/qeEhjYVfqb\n\n' +
                'また、このボットを導入したい場合は下のURLをクリックしてください。\n' +
                'https://discord.com/oauth2/authorize?client_id=908571927180890133&permissions=515466710592&scope=bot%20applications.commands'});
    } else {
        const c = message.content.toLowerCase();
        if (c.includes('出たー出た') || c.includes('出た―出た')) {
            await message.react('908720612824993862');
        }
        if(c.includes('出ない出ない')) {
            await message.react('914519946426449970');
            await message.react('908355751955800074');
            await message.react('908733061141778483');
        }
        if(c.includes('<:tatanai:908733061141778483>')) {
            await message.react('908733061141778483');
        }
        if(c.startsWith("お、勃った") || c.startsWith("お、◯った") || c.startsWith("お、立った")) {
            await message.react('908723732380532796');
        }
        if(c === '<:nukeru:908733014748590090>') {
            await message.react('908733014748590090');
        }
        if(c.startsWith('嘘だろ')) {
            await message.react('914416280373710858');
            await message.react('914415553194655774');
        }
        if(c.startsWith('<:dengeki:908347581174804521>')) {
            await message.react('908719276221947994');
            await message.react('908355042124394496');
        }
        if(c.includes('<:kani:908349208891912212>') || c.includes('レさの連鎖') || c.includes('カニキンが蚊に刺され') ||
            c.includes('馬が埋まってる') || c.includes('ソーッスね') ||
            c.includes('タモリがいた森') || c.includes('🦀') || c.includes(':crab:') ||
            c.includes('肉が憎い') || c.includes('カレーは辛え') || c.includes('ストーブがストップ') ||
            c.includes('運賃がうんち') || c.includes('棚から田中')) {
            await message.react('908349208891912212');
            await message.react('908347581174804521');
        }
        if(c.includes('うんこ') || c.includes('うんち') || c.includes('糞') ||
            c.includes('クソ') || c.includes('crap') || c.includes('poop') ||
            c.includes('ブリブリ排泄') || c.includes('fuck') || c.includes('unko') ||
            c.includes('unti') || c.includes('unchi') ||
            c.includes('ウンコ') || c.includes('ウンチ') || c.includes(':poop:') || c.includes('💩') ||
            c.includes('汚ﾅｲ！') || c.includes('汚い') || c.includes('きたない')) {
            await message.react('💩');
        }
        if(c.includes('<:biocola:908358390223364097>') || c.includes('アナ、ゥ')) {
            await message.react('908358390223364097')
        }
    }
})


client.on("interactionCreate", async interaction => {
    if (interaction.isCommand()) {
        const command = commands[interaction.toJSON().commandName];
        try {
            await command.execute(client, interaction);
        } catch (error) {
            console.error(error);
            await interaction.reply({content: 'エラーが発生しました。', ephemeral: true})
        }
    }
});

client.login('OTA4NTcxOTI3MTgwODkwMTMz.YY3riw.jxCpWBLtgy0eqFN2n0gjgqWDrg8');