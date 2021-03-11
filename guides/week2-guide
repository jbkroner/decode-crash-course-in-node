# Guide - Week 2
This week we are going to cover two things:
- Adding more functionality to our bot with other node packages. 
- Deploying our bot in the cloud!

## Adding functionality to our bot
Right now our bot is only able to respond to chat commands.  Let's find a few interesting node packages that can bring in some useful data for our bot. 


### Stock Prices!
The first package we will try to implement is a package the [fetches stock prices from yahoo finance!](https://www.npmjs.com/package/yahoo-stock-prices).  Using this package is pretty easy, we can give it a stock ticker ('GME', 'AAPL', etc) and it will return the price. 

First, let's make sure we are in our project directory.  Recall that the `cd` command can help you change direcories.    The `pwd` command will print the working directory.
```bash
$ cd /path/to/project
$ pwd
/home/jim/dev/decode-crash-course-in-node
```

We can also verify that all of our node packages are still there:
```bash
$ npm --list
decode-crash-course-in-node@ /home/jim/dev/decode-crash-course-in-node
└── discord.js@12.5.1
```

If you don't see any lists you could either be in the wrong directory or you need to run `npm install`.  If you see the weather package from past week you can ignore it!

Alright, let's install our new package. 

```bash
$ npm install yahoo-stock-prices
```

Then verify our installation: 
```
npm list
decode-crash-course-in-node@ /home/jim/dev/decode-crash-course-in-node
├── discord.js@12.5.1
└── yahoo-stock-prices@1.1.00
```

Nice!  Time to write some code. 

#### Updating the bot. 

The first thing we can do is add a new command to our bot.  Let's all it 'price'!

In `index.js` let's add a new case to our message event handler:
```js
else if (message.content.startsWith(`${config.commandPrefix}price`)) {
	message.channel.send(`soon this will display a stock price!`);
}
```

We can verify that this command triggers correctly by starting our bot and sending a test message in the discord channel.  It doesn't return a price yet, just a placeholder response!

Now we can start integrating the `yahoo-stock-prices` package.  Let's import it in the header of the file: 
```js
const yahooStockPrices = require('yahoo-stock-prices')
```

When we call `getCurrentData()` it should return us with the requested stock price.  `getCurrentData()` is an asynchronous call (don't worry about that for now... that is another can of worms!) so we need to update our main message handler first.  Let's add the `async` keyworkd to the message function we define.  This tells node that we might be making async calls inside this function . 

```javascript
client.on('message', async message => {
    // all of our cases!
});
```

Next, we can grab a new fact when we trigger the '!fact' case:
```javascript
const data = await yahooStockPrices.getCurrentData('GME')
```

We can use that data in our response like this:
```javascript
message.channel.send(`The price of GME is ${data.price}!`);
```

The complete method should look like this: 

```javascript
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
})
```