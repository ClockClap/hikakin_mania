const Discord = require('discord.js');
const {MessageActionRow, MessageButton} = require("discord.js");
const types = Discord.Constants.ApplicationCommandOptionTypes;

module.exports = {
    data: {
        name: "help",
        description: "このボットの使い方を表示します。",
        options: [{
            type: types.SUB_COMMAND,
            name: "about",
            description: "このボットの使い方を表示します。",
            required: false
        },{
            type: types.SUB_COMMAND,
            name: "commands",
            description: "コマンドに関するヘルプ",
            required: false
        }],
    },
    async execute(client, interaction) {
        if(interaction.options.getSubcommand() === 'commands') {
            sendHelp(interaction, [{
                author: {
                    name: interaction.member.tag,
                    icon_url: interaction.member.avatar_url
                },
                title: "コマンド一覧",
                description: "コマンド一覧をお借りしたい時はこれを頼りにしましょう！って言いたいじゃないですか。",
                color: 0xFF22AA,
                fields: [{
                    name: "/help",
                    value: "このボットのヘルプを表示しますカキ\n" +
                        "- /help about: そもそもこのボットの使い方がわからﾅｲ！:anger: という人のためのコマンド\n" +
                        "- /help commands: コマンド忘れちゃった... <:resa:908355042124394496> 人のためのコマンド\n" +
                        "コマンドの後ろにページ数を指定できるなあ"
                },{
                    name: "/hikakin_mania",
                    value: "ヒッカマニマニィ！？"
                },{
                    name: "/members",
                    value: "このサーバーの人数がわか、ゥ"
                },{
                    name: "/say",
                    value: "指定した文字列を無理やり！？頼むんじゃないの！？無理やり！？言わせます"
                },{
                    name: "/about",
                    value: "このボットに関する情報がわか、ゥ\n" +
                        "ぉ何かあればこのコマンドを実行したあとに出てくるサポートサーバーまで"
                },{
                    name: "/reply",
                    value: "特定のメッセージに対して返信をさせます"
                }],
                timestamp: new Date(),
                footer: {
                    icon_url: client.user.avatar_url,
                    text: 'hikakin_mania | コマンドヘルプ'
                }
            }])
        } else if(interaction.options.getSubcommand() === 'about') {
            sendHelp(interaction, [{
                author: {
                    name: interaction.member.tag,
                    icon_url: interaction.member.avatar_url
                },
                title: "hikakin_maniaの使用法",
                description: "使い方がわからﾅｲ！ときはこれを頼りにしましょう！って言いたいじゃないですか。",
                color: 0xFF22AA,
                fields: [{
                    name: "コマンド",
                    value: "コマンドの使い方がわからないぃぃぃぃぃ！ (首グキ) という人は `/help commands` を Let's 実行 やぁりましょう！ <:yarimasyou:916603030856695818>"
                }],
                timestamp: new Date(),
                footer: {
                    icon_url: client.user.avatar_url,
                    text: 'hikakin_mania | ヘルプ'
                }
            }])
        }
    }
}
function sendHelp(interaction, embeds) {
    interaction.reply({ content: "ヘルプが表示されないのなら **歯車アイコン > テキスト・画像 > チャットで投稿されたリンクのサイト情報を表示する** を有効にしましょう！",
        embeds: embeds, ephemeral: true });
}