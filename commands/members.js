module.exports = {
    data: {
        name: "members",
        description: "サーバーにいるメンバーの数を確認できます。",
    },
    async execute(client, interaction) {
        const g = interaction.guild;
        let totalMembers = 0;
        let people = 0;
        let bots = 0;
        g.map(m => {
            totalMembers++;
            m.bot ? bots++ : people++;
        });
        await interaction.reply({ embeds: [{
                author: {
                    name: interaction.member.tag,
                    icon_url: interaction.member.avatar_url
                },
                title: "全体の参加者",
                description: `${totalMembers}`,
                color: 0xFF22AA,
                fields: [{
                    name: "ボットを除いた人数",
                    value: `${people}`,
                    inline: true
                },{
                    name: "ボット",
                    value: `${bots}`,
                    inline: true
                }],
                timestamp: new Date(),
                footer: {
                    icon_url: client.user.avatar_url,
                    text: 'hikakin_mania | サーバーの人数'
                }
            }] });
    }
}