const Discord = require('discord.js');
const {MessageActionRow, MessageButton} = require("discord.js");
const types = Discord.Constants.ApplicationCommandOptionTypes;

const commands = [{
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
}];

const abouts = [{
    name: "コマンド",
    value: "コマンドの使い方がわからないぃぃぃぃぃ！ (首グキ) という人は `/help commands` を Let's 実行 やぁりましょう！ <:yarimasyou:916603030856695818>"
}]

module.exports = {
    data: {
        name: "help",
        description: "このボットの使い方を表示します。",
        options: [{
            type: types.SUB_COMMAND,
            name: "about",
            description: "このボットの使い方を表示します。",
            required: false,
            options: [{
                type: types.INTEGER,
                name: "page",
                description: "ページ数を指定します。",
                required: false
            }]
        },{
            type: types.SUB_COMMAND,
            name: "commands",
            description: "コマンドに関するヘルプ",
            required: false,
            options: [{
                type: types.INTEGER,
                name: "page",
                description: "ページ数を指定します。",
                required: false
            }]
        }],
    },
    async execute(client, interaction) {
        const subcommand = interaction.options.getSubcommand()
        if(subcommand === 'commands') {
            let pages = [];
            let idx = 0;
            let arr = [...commands];
            while(idx < arr.length){
                pages.push(arr.splice(idx, idx + 8));
            }
            let page = interaction.options.getInteger('page');
            if(page === undefined || page === null) {
                page = 1;
            }
            if(page <= 0) {
                await interaction.reply({embeds: [{
                        title: 'ページ数が小さすぎます。',
                        description: 'ページ数は 1 以上である必要があります。',
                        color: 0xDD3333
                    }], ephemeral: true});
                return;
            }
            if(page > pages.length) {
                await interaction.reply({embeds: [{
                        title: 'ページ数が大きすぎます。',
                        description: `最大ページ数: ${pages.length}\n` +
                            `指定ページ数: ${page}`,
                        color: 0xDD3333
                    }], ephemeral: true});
                return;
            }
            await sendHelp(interaction, [{
                author: {
                    name: interaction.member.user.tag,
                    icon_url: interaction.member.user.avatarURL()
                },
                title: "コマンド一覧",
                description: "コマンド一覧をお借りしたい時はこれを頼りにしましょう！って言いたいじゃないですか。",
                color: 0xFF22AA,
                fields: pages[page - 1],
                timestamp: new Date(),
                footer: {
                    icon_url: client.user.avatarURL(),
                    text: `hikakin_mania | コマンドヘルプ (${page}/${pages.length} ページ)`
                }
            }])
        } else if(subcommand === 'about') {
            let pages = [];
            let idx = 0;
            let arr = [...abouts];
            while(idx < arr.length){
                pages.push(arr.splice(idx,idx + 8));
            }
            let page = interaction.options.getInteger('page');
            if(page === undefined || page === null) page = 1;
            if(page <= 0) {
                await interaction.reply({embeds: [{
                        title: 'ページ数が小さすぎます。',
                        description: 'ページ数は 1 以上である必要があります。',
                        color: 0xDD3333
                    }], ephemeral: true});
                return;
            }
            if(page > pages.length) {
                await interaction.reply({embeds: [{
                        title: 'ページ数が大きすぎます。',
                        description: `最大ページ数: ${pages.length}\n` +
                                     `指定ページ数: ${page}`,
                        color: 0xDD3333
                    }], ephemeral: true});
                return;
            }
            await sendHelp(interaction, [{
                author: {
                    name: interaction.member.user.tag,
                    icon_url: interaction.member.user.avatarURL()
                },
                title: "hikakin_maniaの使用法",
                description: "使い方がわからﾅｲ！ときはこれを頼りにしましょう！って言いたいじゃないですか。",
                color: 0xFF22AA,
                fields: pages[page - 1],
                timestamp: new Date(),
                footer: {
                    icon_url: client.user.avatarURL(),
                    text: `hikakin_mania | ヘルプ (${page}/${pages.length} ページ)`
                }
            }])
        }
    }
}
async function sendHelp(interaction, embeds) {
    await interaction.reply({ content: "ヘルプが表示されないのなら **歯車アイコン > テキスト・画像 > チャットで投稿されたリンクのサイト情報を表示する** を有効にしましょう！",
        embeds: embeds, ephemeral: true });
}