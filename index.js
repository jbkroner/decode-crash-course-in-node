const config = require('./config.json')
const Discord = require('discord.js');
const client = new Discord.Client();

client.login(config.key);

client.once('ready', () => {
	console.log('Ready!');
});

client.on('message', message => {
    // handle the message
	if (message.content.startsWith(`${config.commandPrefix}hello`)) {
	    message.channel.send(`Howdy, ${message.author}!`);
    } else if (message.content.startsWith(`${config.commandPrefix}goodbye`)) {
	message.channel.send(`Cya later, ${message.author}`);
    }
});