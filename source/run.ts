/*
** Github Deliverer
** Bot launch and loggin to Discord server
** Author: charlieBoyer
*/

const Discord = require("discord.js");
const Config = require("../config.json");

const client = new Discord.Client();

const Status = {
    LAUNCH: 0,
    INIT: 1,
    READY: 2
}

function run()
{
    let currentState = Status.LAUNCH;

    console.log(`\n> ${client.user.tag} now up!\n`);

    client.on('message', msg => {
        if (msg.content === 'ping' || msg.content === "Ping") {
            msg.reply('Pong!');
        }
    });
}

client.once('ready', run);

client.login(Config.auth_token);