/*
** Github Deliverer
** Command: help
** Author: charlieBoyer
*/

import { Collection, Message } from "discord.js";
import { UserInput, getCommands } from "../../commands";
import { tag } from "../../.config.json";

function concatHelp(list: Collection<String, any>): String
{
    let helpString: String = "";

    list.forEach( function(value: any) {
        helpString += `> -\`${value.name}\`: ${value.description}\n`;
    });

    return helpString;
}

module.exports = {
    name: "help",
    description: "display my features or the usage of a specific one ;)",

    exec(message: Message, usr_cmd: UserInput)
    {
        const commandList: Collection<String, any> = getCommands();
        const command: any = commandList.get(usr_cmd.args[0]);
        const helpString: String = concatHelp(commandList);

        if (command != undefined && command.name != "help")
        {
            if (command.aliases)
                command.usage += `\nYou can also use: \`${command.aliases.join("\` ; \`")}\` instead of \`${command.name}\``;

            message.reply(
                `use \`${command.name}\` like that: ${command.usage}.`
            );
        }
        else
        {
            message.channel.send(
                `Hey <@!${message.author.id}> ! I'm Github Deliverer and there is what I can do !\n`
                + `${helpString}`
                + `\n`
                + `Just ask me anything like that: ${tag} \`<command>\` [options]\n`
                + `Get more details about something by typing: ${tag} help \`<command>\``
            );
        }
    }
}