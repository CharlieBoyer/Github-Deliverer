/*
** Github Deliverer
** Utilities for commands load/uses/parsing
** Author: charlieBoyer
*/

import { Message } from "discord.js";
import { mention_code } from "./.config.json";

export type Command = {
    name: String,
    args: String[];
}

export function getCommand(message: Message): Command
{
    let args: String[] = message.content.slice(mention_code.length).trim().split(" ");
    let cmd: String = args.shift().toLowerCase();

    let command: Command = { name: cmd, args: args };

    return command;
}