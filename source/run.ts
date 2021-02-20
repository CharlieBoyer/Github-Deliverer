/*
** Github Deliverer
** Bot launch and loggin to Discord server
** Author: charlieBoyer
*/

import * as Discord from "discord.js"
import * as Config from "./config.json"

const client = new Discord.Client();

function botMentionned(message: Discord.Message): boolean
{
    if (message.mentions.users.find(user => user.tag === client.user.tag)) {
        return true;
    }
    else {
        return false;
    }
}

function run()
{
    console.log(`\n> ${client.user.tag} now up!\n`);

    client.on('message', msg => {
        if (botMentionned(msg)) {
            msg.reply("It's me !");
        }
    });
}

client.once('ready', run);

client.login(Config.auth_token);