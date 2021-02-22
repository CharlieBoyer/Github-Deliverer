/*
** Github Deliverer
** Command: help
** Author: charlieBoyer
*/

import { Collection, Message } from "discord.js";
import { UserInput, getCommands } from "../../commands";
import { id } from "../../.config.json";

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

    exec(message: Message, command: UserInput)
    {
        const commandList: Collection<String, any> = getCommands();
        const specific: any = commandList.get(command.args[0]);
        const helpString: String = concatHelp(commandList);

        if (specific != undefined && specific.name != "help")
        {
            if (specific.aliases)
                specific.usage += `\nYou can also use: \`${specific.aliases.join("\` ; \`")}\` instead of \`${specific.name}\``;

            message.reply(
                `use \`${specific.name}\` like that: ${specific.usage}.`
            );
        }
        else
        {
            message.channel.send(
                `Hey <@!${message.author.id}> ! I'm Github Deliverer and there is what I can do !\n`
                + `${helpString}`
                + `\n`
                + `Just ask me anything like that: <@!${id}> \`<command>\` [options]\n`
                + `Get more details about something by typing: <@!${id}> help \`<command>\``
            );
        }
    }
}