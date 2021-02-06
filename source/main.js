/*
** Github Deliverer
** Bot launch and loggin to Discord server
** Author: discord.js
*/

const Discord = require('discord.js');

const config = require("../config.json");
const client = new Discord.Client();

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', msg => {
  if (msg.content === 'ping') {
    msg.reply('Pong!');
  }
});

client.login(config.auth_token);