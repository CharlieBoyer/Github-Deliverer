/*
** Github Deliverer
** Bot launch and loggin to Discord server
** Author: charlieBoyer
*/

import * as Discord from "discord.js"
import * as Config from "./config.json"

export const client: Discord.Client = new Discord.Client();

function botMentionned(message: Discord.Message): boolean
{
    if (message.mentions.users.find(user => user.tag === client.user.tag)) {
        return true;
    }
    else {
        return false;
    }
}

function run(): void
{
    console.log(`\n> ${client.user.tag} now up!\n`);

    client.on('message', message => {
        if (botMentionned(message)) {
            message.reply("It's me !");
        }
    });
}

client.once('ready', run);

client.login(Config.auth_token);