/*
** Github Deliverer
** Command: ping
** Author: charlieBoyer
*/

import { Message } from "discord.js";
import { UserInput } from "../../commands";

import { random } from "../../utilities";
import { id } from "../../.config.json";

module.exports = {
    name: "hello",
    aliases: ["ping", "hey"],
    usage: `<@!${id}> hello`,
    description: "say hello to you :)",

    exec(message: Message, command: UserInput): void
    {
        const greetings: String[] = ["Hello", "Hi", "Ah ! You're finally awake, "];
        const replies: String[] = ["hello there !", "what's up ?", "Hey !", "Greetings traveller "];

        if (random(1) === 0) {
            message.channel.send(`${greetings[random(greetings.length - 1)]} <@!${message.author.id}> !`);
        }
        else {
            message.reply(`${replies[random(replies.length - 1)]}`);
        }

        return;
    }
}