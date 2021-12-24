module.exports = {
    data: {
        name: "members",
        description: "サーバーにいるメンバーの数を確認できます。",
    },
    async execute(client, interaction) {
        const g = interaction.guild;
        g.members.fetch().then(async members => {
            let totalMembers = members.size;
            // let online = members.filter(member => member.presence.status !== 'offline');
            let bot = members.filter(member => member.user.bot).size;
            // let onlineBot = members.filter(member => member.user.bot && member.presence.status !== 'offline');
            await interaction.reply({ embeds: [{
                    author: {
                        name: interaction.member.tag,
                        icon_url: interaction.member.avatarURL
                    },
                    title: "サーバー参加者",
                    description: "このサーバーに参加している人数を表示します。",
                    color: 0xFF22AA,
                    fields: [{
                        name: '参加者',
                        value: //`オンライン: ${online.toLocaleString()}\n` +
                               `${totalMembers.toLocaleString()}`
                    },{
                        name: 'ボット',
                        value: //`オンライン: ${onlineBot.toLocaleString()}\n` +
                               `${bot.toLocaleString()}`
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