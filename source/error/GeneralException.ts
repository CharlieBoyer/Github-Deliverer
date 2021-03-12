/*
** Github Deliverer
** Semi-Abstract GeneralException object
** Author: charlieBoyer
*/

import { Exception } from "./Exception";
import { default_verbosity } from "../.config.json";

export class GeneralException implements Exception
{
    _type: String;
    _details: String;
    _verbose: boolean;

    constructor(type: String, details: any, verbosity: boolean = default_verbosity) {
        this._type = type;
        this._details = details;
        this._verbose = verbosity;
    }

    what(): void {
        console.error(
            `/!\\ Exception caught /!\\\n`,
            `\t> type: ${this._type}\n`,
            (this._verbose ? `\t> details: ${this._details}\n` : ``),
        );
    }
}