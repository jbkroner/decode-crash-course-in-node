const config = require('./config.json')
const Discord = require('discord.js');
const client = new Discord.Client();
const yahooStockPrices = require('yahoo-stock-prices')

client.login(config.key);

client.once('ready', () => {
	console.log('Ready!');
});

client.on('message', async message => {
    // handle the message
	if (message.content.startsWith(`${config.commandPrefix}hello`)) {
	    message.channel.send(`Howdy, ${message.author}!`);
    } 
	
	else if (message.content.startsWith(`${config.commandPrefix}goodbye`)) {
		message.channel.send(`Cya later, ${message.author}`);
    }
	
	else if (message.content.startsWith(`${config.commandPrefix}price`)) {
		const data = await yahooStockPrices.getCurrentData('GME');
		message.channel.send(`The price of GME is ${data.price}!`);
	}
});

