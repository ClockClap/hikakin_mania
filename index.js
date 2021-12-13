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
    await client.guilds.cache.forEach(g => client.application.commands.set(data, g.id))
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

client.on('messageCreate', (message) => {
    if (message.author.bot) return;
    if (message.channel.type === 'DM') {
        message.author.send({ content: '何かありましたか？\n' +
                'もし何かあった場合はサポートサーバーに入り、お問い合わせください。\n\n' +
                '雑談サーバーでもあります。興味があればぜひ入ってくださいね！\n\n' +
                '**☆ヒカマニ雑談サーバー☆**\n' +
                'https://discord.gg/qeEhjYVfqb\n\n' +
                'また、このボットを導入したい場合は下のURLをクリックしてください。\n' +
                'https://discord.com/oauth2/authorize?client_id=908571927180890133&permissions=515466710592&scope=bot%20applications.commands'});
    } else {
        if (message.content === '出たー出た！') {
            message.reply({content: '<:deta:908720612824993862>', allowedMentions: {repliedUser: false}});
        }
    }
})


client.on("interactionCreate", async (interaction) => {
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

client.login();