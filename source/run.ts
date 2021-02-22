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
    let module: any;

    console.log(`\n> ${client.user.tag} now up!\n`);

    client.on('message', message => {
        if (!botMentionned(message) || message.author.bot) {
            return;
        }

        usr_cmd = getUserInput(message);
        
        try {
            module = commands.get(usr_cmd.name) || commands.find(cmd => cmd.aliases && cmd.aliases.includes(usr_cmd.name));
            module.exec(message, usr_cmd);
        }
        catch (error) {
            console.error(error);
            message.reply("I didn't understand your request :(\nCan you check your syntax ?\nYou can ask me some assistance with the \"help\" keyword ;)");
        }
    });
}

client.once('ready', run);

client.login(Config.auth_token).catch(str => console.log(`Error: Login failed\n> Invalid token: ${str}`));

process.on("unhandledRejection", function(reason) {
    console.log(
        "ERROR: Unhandled promise rejection\n",
        `\t${reason}`
    );
})