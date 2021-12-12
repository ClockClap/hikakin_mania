module.exports = {
    data: {
        name: "members",
        description: "サーバーにいるメンバーの数を確認できます。",
    },
    async execute(client, interaction) {
        const g = interaction.guild;
        let totalMembers = g.memberCount;s
        await interaction.reply({ embeds: [{
                author: {
                    name: interaction.member.tag,
                    icon_url: interaction.member.avatar_url
                },
                title: "このサーバーの参加者",
                description: `${totalMembers}`,
                color: 0xFF22AA,
                timestamp: new Date(),
                footer: {
                    icon_url: client.user.avatar_url,
                    text: 'hikakin_mania | サーバーの人数'
                }
            }] });
    }
}