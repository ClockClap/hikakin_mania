module.exports = {
    data: {
        name: "about",
        description: "このボットに関する情報。",
    },
    async execute(client, interaction) {
        interaction.reply({ content: "ヘルプが表示されないのなら **歯車アイコン > テキスト・画像 > チャットで投稿されたリンクのサイト情報を表示する** を有効にしましょう！\n\n" +
                "https://discord.gg/qeEhjYVfqb", embeds: [{
                author: {
                    name: interaction.member.user.tag,
                    icon_url: interaction.member.user.avatarURL()
                },
                title: "このボット何？",
                description: "ヒカマニ鯖向けに作られたボットだなあ、そうに決まってる。ぜひぜひ、みなさんも入れてほしいんです！って言いたいじゃないですか。\n" +
                    "***なんだこの自己満ボット***",
                color: 0xFF22AA,
                fields: [{
                    name: "開発者",
                    value: "このボットの開発者は **clock_clap#0001** (って誰) みたいっすね。"
                },{
                    name: "サポートサーバー",
                    value: "↓ぉ何かあればこちらのお問い合わせフォームまで↓\n" +
                        "https://discord.gg/qeEhjYVfqb"
                },{
                    name: "導入",
                    value: "このボット導入したいぃぃぃぃ！(首グキ) という人は [ここ](https://discord.com/oauth2/authorize?client_id=908571927180890133&permissions=515466710592&scope=bot%20applications.commands) を Let's クリック やぁりましょう！"
                }],
                timestamp: new Date(),
                footer: {
                    icon_url: client.user.avatarURL(),
                    text: `hikakin_mania | このボットに関する情報`
                }
        }], ephemeral: true });
    }
}