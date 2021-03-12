/*
** Github Deliverer
** Custom Exception object interface
** Author: charlieBoyer
*/

export interface Exception
{
    _type: String;
    _details: String;
    _verbose: boolean;

    what(): void;
}