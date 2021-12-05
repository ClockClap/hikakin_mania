module.exports = {
    data: {
        name: "members",
        description: "サーバーにいるメンバーの数を確認できます。",
    },
    async execute(client, interaction) {
        await interaction.reply({ content: `このサーバーには ${interaction.guild.memberCount} 人いるなあ、そうに決まってる。`});
    }
}