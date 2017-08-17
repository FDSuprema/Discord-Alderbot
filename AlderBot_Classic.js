/*
  AlderBot, the new ZV Discord Bot
  Running on Node.js 6.10.3, and discord.js 11.1.0
  AlderBot is written by FDSuprema
*/

// Import the discord.js module
const Discord = require('discord.js');

// Create an instance of a Discord client
const client = new Discord.Client();

// The token of your bot - https://discordapp.com/developers/applications/me
const token = 'MzExNzkwODc4NTM4NTk2MzUy.C_Rpdw.0jKrAbWBS9iEVQ4xkljmadWGe-A';

//Owner User ID
const ownerID = '79368273426124800'

// Command prefix
const cmdPrefix = '`';

//Regular expressions for commands. Used with the command revamp.
const cmdPattern = /^(?:${cmdPrefix})(\S*)\s?((?:(?:\S*)\s?){1,})/g;
const cmdRegExp = /^(\S*)\s?((?:\S*\s?){1,})/gi;
//RegExp for the command arguments. Used to extract up to 5 arguments.
//Soon to be deprecated and replaced with string.split based methods.
const cmdArgsRegExp = /(\S*)\s?(\S*)\s(\S*)\s(\S*)\s(\S*)/g;


// The ready event is vital, it means that your bot will only start reacting to information
// from Discord _after_ ready is emitted
client.on('ready', () => {
  console.log('I am ready!');
  //console.log('cmdRegExp: ' + cmdRegExp.source);
});
//Utility Functions

function cmdWithPrefix(command) {
	stringCommand = cmdPrefix;
	stringCommand += command;
	return stringCommand;
}

function formatArgs(args) {
	//This method will split the args string into an array.
}

function returnArgsFrom(formattedArgs,startPoint) {
	//This method will return a formattedArgs array from the desired item onward.
	//Eg. return starting from item 5 to the end of the array.
}

// getRandomIntInclusive
// Used for, as its name implies, getting an inclusive random integer.
function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// getWeaponArray
// Used for getting the weapon array for the `weapon command.
// Or not? I think I deprecated this in the other bot actually.
// I'll leave it be though. Who knows, it might be useful later?
function getTextFileAsArray(filename) {
	var fs = require('fs');
	var fileArray = fs.readFileSync(filename).toString().split("\n");
	for(i in fileArray) {
		console.log(fileArray[i]);
	}
	return fileArray;
}

// End Utility Functions

// This section is for event functions. Eg. the functions that are called by message command
// events. This will help make the code somewhat cleaner.

// commandWeapon (`weapon)
function commandTestWeapon(message,args) {
	if (args === "") {
		var name = message.member.displayName;	
	} else {
		var name = args;
	}
	var fileName = "weapons.txt";
	var weapons = getTextFileAsArray(fileName);
	var max = weapons.length;
	var result = 0 + getRandomIntInclusive(0, max);
	message.channel.send('Alder reaches into his hypercube and tosses ' + name + ' ' + weapons[result]);
}
function commandWeapon(message,args) {
	if (args === "") {
		var name = message.member.displayName;	
	} else {
		var name = args;
	}
	var fs = require('fs');
	var filename = "weapons.txt";
	var file = fs.createReadStream(filename);
	var readline = require('readline');
	var weapons = [];
	var i = 0;
	readline.createInterface({
		input: file,
		terminal: false
	}).on('line', function(line) {
		weapons[i] = line;
		console.log('Line #' + i + ': ' + weapons[i]);
		i++;
	}).on('close', function() {
		var max = weapons.length;
		var result = 0 + getRandomIntInclusive(0, max);
		message.channel.send('Alder reaches into his hypercube and tosses ' + name + ' ' + weapons[result]);
	});
}

function commandCustomMessage(message,args) {
	var formattedArgs = cmdArgs.exec(args);
	var channel = client.channels.find(formattedArgs[1]);
	console.log("Custom Message Debug: Channel: " + channel);
	// If the channel exists,
}

function commandSetGame(message,args) {
	var formattedArgs = cmdArgs.exec(args);
	var gameName = formattedArgs[0];
	var botUser = client.user;
	botUser.setGame(args);
}
function commandChangeName(message,args) {
	var guildMe = message.guild.me;
	if (args === "") {
		if (guildMe.displayName === 'Professor Alder') {
			guildMe.setNickname('Alder');
		} else if (guildMe.displayName === 'Alder') {
			guildMe.setNickname('Professor Alder');
		} else {
			guildMe.setNickname('Professor Alder');
		}
	} else {
		guildMe.setNickname(cmdArgs);
	}
}

// End Event Functions

// The event listener for messages. Commands created within this block can be activated by
// users on the Discord Server, or Guild.
client.on('message', message => {
	// Debug Logging
//	console.log('Message Object Values');
//	console.log('Content: ' + message.content);
//	console.log('Channel: ' + message.channel.name);
//	console.log('Guild/Server ID: ' + message.guild.id);

	cmdResult = cmdRegExp.exec(message.content);
//	console.log('commandResult: ' + cmdResult);
	if (cmdResult != null) {
	cmdText = cmdResult[1];
//	console.log('commandText: ' + cmdText);
	cmdArgs = cmdResult[2];
//	console.log('commandArgs: ' + cmdArgs);
	cmdResult = cmdRegExp.exec(message.content);
	}
	// Commands under this If statement only are called when the user's ID matches the Owner ID.
	if (message.author.id === ownerID) {
		// Just a Ping/Pong command to make sure everything's working.
		if (cmdText === cmdWithPrefix('ping')) {
			message.channel.send('pong');
		}
		
		if (cmdText === cmdWithPrefix('change')) {
			guildMe = message.guild.me;
			if (cmdArgs === "") {
				if (guildMe.displayName === 'Professor Alder') {
					guildMe.setNickname('Alder');
				} else if (guildMe.displayName === 'Alder') {
					guildMe.setNickname('Professor Alder');
				} else {
					guildMe.setNickname('Professor Alder');
				}
			} else {
				guildMe.setNickname(cmdArgs);
			}
		}
		if (cmdText === cmdWithPrefix('message')) {
			commandCustomMessage(message,cmdArgs);
		}
		if (cmdText === cmdWithPrefix('setgame')) {
			commandSetGame(message,cmdArgs);
		}
		
	}
	if (cmdText === cmdWithPrefix('weapon')) {
		commandWeapon(message,cmdArgs);
	}
	if (cmdText === cmdWithPrefix('testweapon')) {
		commandTestWeapon(message,cmdArgs);
	}

});
// Old event listener, without RegExp
/* 
client.on('message', message => {
	// Debug Logging
	console.log('Message Object Values');
	console.log('Content: ' + message.content);
	console.log('Channel: ' + message.channel.name);
	console.log('Guild/Server ID: ' + message.guild.id);
	// if (channel is #backroom)
	if (message.channel.id === '311770036136050688') {
	  // If the message is "ping"
		if (message.content === 'ping') {
		// Send "pong" to the same channel
		message.channel.send('pong');
		}
		// `change changes Alder's username
		if (message.content === '`change') {
			guildMe = message.guild.me;
			if (guildMe.displayName === 'Professor Alder') {
				guildMe.setNickname('Alder');
			} else if (guildMe.displayName === 'Alder') {
				guildMe.setNickname('Professor Alder');
			} else {
				guildMe.setNickname('Professor Alder');
			}
		}	
	}
	// End if (channel is #testing)
	if (message.content === '`weapon') {
		commandWeapon(message);
	}
});
*/
// Log our bot in
client.login(token);