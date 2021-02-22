/*
** Github Deliverer
** Bot launch and log-in it to Discord servers
** Author: charlieBoyer
*/

import * as Discord from "discord.js"
import * as Config from "./.config.json"

import { UserInput, getUserInput, getCommands, botMentionned } from "./commands"

export const client: Discord.Client = new Discord.Client();

function run(): void
{
    const commands: Discord.Collection<String, any> = getCommands();
    let usr_cmd: UserInput;

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