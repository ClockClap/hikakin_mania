module.exports = {
    data: {
        name: "say",
        description: "指定されたメッセージを言います。",
        options: [{
            type: "STRING",
            name: "input",
            description: "言ってほしいメッセージ。",
            required: true
        }],
    },
    async execute(client, interaction) {
        await interaction.channel.send({ content: interaction.options.getString('input')});
        await interaction.reply({ content: '指定されたメッセージを投稿しました。' , ephemeral: true });
    }
}