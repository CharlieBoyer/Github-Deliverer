/*
** Github Deliverer
** Utilities for commands load/uses/parsing
** Author: charlieBoyer
*/

import * as fs from "fs";

import { Collection, Message } from "discord.js";
import { UserInputException } from "./error/UserInputException";
import { tag } from "./.config.json";

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
    let args: String[] = message.content.slice(tag.length).trim().split(/ +/);
    let cmd: String = args.shift().toLowerCase();

    let userInput: UserInput = { name: cmd, args: args };

    if (userInput.name == undefined) {
        throw new UserInputException("Undefined command name");
    }

    return userInput;
}

export function getCommands(): Collection<String, any>
{
    const commandList: Collection<String, any> = new Collection();
    let commandFiles: String[];
    let command: any;

    const commandFolders = fs.readdirSync(__dirname + "/commands").filter(folder => !folder.includes(".js"));

    for (const folder of commandFolders)
    {
        commandFiles = fs.readdirSync(__dirname + `/commands/${folder}`).filter(file => file.endsWith('.js'));

        for (const file of commandFiles)
        {
            command = require(`./commands/${folder}/${file}`);
            commandList.set(command.name, command);
        }
    }

    return commandList;
}

export function follow(usr_msg: Message)
{
    const commands: Collection<String, any> = getCommands();
    let usr_cmd: UserInput = getUserInput(usr_msg);
    let module: any;

    try {
        module = commands.get(usr_cmd.name) || commands.find(cmd => cmd.aliases && cmd.aliases.includes(usr_cmd.name));
        module.exec(usr_msg, usr_cmd);
    }
    catch (exception: any)
    {
        if (usr_cmd.name === "")
            usr_msg.reply(`check out what I can do for you by typing:\n> ${tag} help`);
        else
            throw new UserInputException(`\"${usr_cmd.name}\" doesn't exist in command collection`);
    }

}