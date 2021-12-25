module.exports = {
    data: {
        name: "members",
        description: "サーバーにいるメンバーの数を確認できます。",
    },
    async execute(client, interaction) {
        const g = interaction.guild;
        g.members.fetch({withPresences: true}).then(async members => {
            let totalMembers = members.size;
            let online = members.filter(member => member.presence && member.presence.status !== 'offline').size;
            let bot = members.filter(member => member.user.bot).size;
            let onlineBot = members.filter(member => member.user.bot && member.presence && member.presence.status !== 'offline').size;
            await interaction.reply({ embeds: [{
                    author: {
                        name: interaction.member.user.tag,
                        icon_url: interaction.member.user.avatarURL()
                    },
                    title: "サーバー参加者",
                    description: "このサーバーに参加している人数を表示します。",
                    color: 0xFF22AA,
                    fields: [{
                        name: '参加者',
                        value: `オンライン: ${online.toLocaleString()}/${totalMembers.toLocaleString()}`
                    },{
                        name: 'ボット',
                        value: `オンライン: ${onlineBot.toLocaleString()}/${bot.toLocaleString()}`
                    }],
                    timestamp: new Date(),
                    footer: {
                        icon_url: client.user.avatarURL(),
                        text: 'hikakin_mania | サーバーの人数'
                    }
                }] });
        });
    }
}