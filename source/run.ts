/*
** Github Deliverer
** Start-up the bot and log-in it to Discord servers
** Author: charlieBoyer
*/

import * as Discord from "discord.js";
import * as Config from "./.config.json";

import { UserInputException } from "./error/UserInputException";
import { GeneralException } from "./error/GeneralException";
import { UserInput, getUserInput, getCommands, botMentionned, follow } from "./commands";

const client: Discord.Client = new Discord.Client();

function run(): void
{
    console.log(`\n> ${client.user.tag} now up!\n`);

    client.on('message', message => {
        if (!botMentionned(message)) {
            return;
        }
        else if (message.author.bot) {
            message.channel.send(`Our kind shouldn't use human communication, number <${message.author.id}>.`);
            return;
        }

        try {
            follow(message);
        }
        catch (except) {
            if (except instanceof UserInputException) {
                except.what();
                except.hint(message);
            }
            else {
                throw except;
            }
        }
    });
}

client.once('ready', run);

client.login(Config.auth_token).catch(str => console.log(`Error: Login failed\n> Invalid token: ${str}`));

process.on("unhandledRejection", function(reason) {
    new GeneralException("Unhandled promise rejection", `${reason}`, false);
    console.error(
        "CRITICAL ERROR: Unhandled promise rejection\n",
        `\t${reason}`
    );
    throw new GeneralException("Unhandled promise rejection", `${reason}`, false);
})