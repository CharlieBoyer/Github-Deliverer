/*
** Github Deliverer
** Command: ping
** Author: charlieBoyer
*/

import { Message } from "discord.js";
import { UserInput } from "../../commands";
import { id } from "../../.config.json";

module.exports = {
    name: "args-info",
    description: "process your sentence and display it, splitted.",
    usage: `<@!${id}> args-info <anything ...>`,

    exec(message: Message, command: UserInput): void
    {
        if (!command.args.length) {
            message.reply(`you didn't provide me arguments to watch !`);
        }
        else {
            message.reply(`there yours ${command.name}!\n> > ${command.args}`);
        }
    }
}