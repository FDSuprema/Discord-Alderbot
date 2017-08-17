/*
  AlderBot, the new ZV Discord Bot
  Running on Node.js 6.10.3, and discord.js 11.1.0
  AlderBot is written by FDSuprema
  
  This version of AlderBot will have reloadable commands
  for fast bugfixing.
*/

// Import the discord.js module
const Discord = require('discord.js');
// Create an instance of a Discord client
const client = new Discord.Client();
// Get the configuration file.
const config = require("./config.json");
// Import the fs module, cause we'll be using that too.
const fs = require('fs');

client.on('ready', () => {
  console.log('I am ready!');
});

client.on('message', message => {
	//Check of the message should be considered. If not, stop processing.
	if (!message.content.startsWith(config.prefix) || message.author.bot) return;


});

client.login(config.token)