/*
** Github Deliverer
** Bot launch and loggin to Discord server
** Author: discord.js
*/

const Discord = require('discord.js');

const config = require("../config.json");
const client = new Discord.Client();

const Status = {
    LAUNCH: 0,
    INIT: 1,
    READY: 2,
}

function main()
{
    var currentState = Status.LAUNCH;

    console.log(`Logged in as ${client.user.tag}!`);

    client.on('message', msg => {
        if (msg.content === 'ping') {
            msg.reply('Pong!');
        }
    });
}

client.on('ready', main);

client.login(config.auth_token);