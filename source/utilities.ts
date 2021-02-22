/*
** Github Deliverer
** Tool-box functions
** Author: charlieBoyer
*/

export function random(max: number): number // return an integer between 0 and max
{
    return Math.floor(Math.random() * Math.floor(max + 1));
}