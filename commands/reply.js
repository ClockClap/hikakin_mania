const Discord = require('discord.js');
const types = Discord.Constants.ApplicationCommandOptionTypes;

module.exports = {
    data: {
        name: "reply",
        description: "特定のメッセージに返信します。",
        options: [{
            type: types.STRING,
            name: "message_id",
            description: "返信先のメッセージ",
            required: true
        },{
            type: types.STRING,
            name: "input",
            description: "言ってほしいメッセージ。",
            required: true
        },{
            type: types.BOOLEAN,
            name: "mention",
            description: "メンションするかどうか",
            required: false
        }],
    },
    async execute(client, interaction) {
        const content = interaction.options.getString('input');
        const mention = interaction.options.getBoolean('mention');
        await interaction.channel.messages.fetch(interaction.options.getString('message_id'))
            .then(msg => msg.reply({ content: content, allowedMentions: {
                    repliedUser: mention
                }}));
        await interaction.reply({ embeds: [{
                title: '指定されたメッセージを投稿しました。',
                color: 0x33DD33
            }] , ephemeral: true });
    }
}