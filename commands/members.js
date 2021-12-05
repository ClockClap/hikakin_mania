module.exports = {
    data: {
        name: "members",
        description: "サーバーにいるメンバーの数を確認できます。",
    },
    async execute(client, interaction) {
        let members = 0;
        interaction.guild.members.cache.forEach(() => members++);
        interaction.reply({ content: `このサーバーには ${members} 人いるなあ、そうに決まってる。`});
    }
}