/*
** Github Deliverer
** Final Exception object for commands errors
** Author: charlieBoyer
*/

import { Message } from "discord.js";
import { GeneralException } from "./GeneralException";
import { tag, default_verbosity } from "../.config.json";

export class UserInputException extends GeneralException
{
    constructor(details: String = "none", type: String = "Invalid User Input", verbosity = default_verbosity) {
        super(type, details, verbosity);
    }

    hint(message: Message): void {
        message.reply(
            "I didn't understand your request :(\n"
            + `Check the spelling by typing: ${tag} help\n`
            + `If the spelling is correct, see the feature usage like that: ${tag} help <feature>`
        );
    }
}