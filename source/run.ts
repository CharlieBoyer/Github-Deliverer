/*
** Github Deliverer
** Bot launch and log-in it to Discord servers
** Author: charlieBoyer
*/

import * as Discord from "discord.js"
import * as Config from "./.config.json"

import { Command, getCommand } from "./commands"

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
    let command: Command;

    console.log(`\n> ${client.user.tag} now up!\n`);

    client.on('message', message => {
        if (!botMentionned(message) || message.author.bot) {
            return;
        }

        command = getCommand(message);

        if (command.name === "args-info") {
            if (!command.args.length) {
                message.reply(`you didn't provide arguments to watch !`);
            }
            else {
                message.reply(`there yours ${command.name}!\n> > ${command.args}`);
            }
        }
    });
}

client.once('ready', run);

client.login(Config.auth_token).catch(str => console.log(`Error: Login failed\n> Invalid token: ${str}`));