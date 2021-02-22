/*
** Github Deliverer
** Utilities for commands load/uses/parsing
** Author: charlieBoyer
*/

import { Message } from "discord.js";
import { mention_code } from "./.config.json";

export type UserInput = {
    name: String,
    args: String[];
}

export function botMentionned(message: Message): boolean
{
    if (message.mentions.users.find(user => user.tag === message.client.user.tag)) {
        return true;
    }
    else {
        return false;
    }
}

export function getUserInput(message: Message): UserInput
{
    let args: String[] = message.content.slice(mention_code.length).trim().split(/ +/);
    let cmd: String = args.shift().toLowerCase();

    let userInput: UserInput = { name: cmd, args: args };

    return userInput;
}