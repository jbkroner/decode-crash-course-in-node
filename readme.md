# Decode @ UWM: A Crash Course in Node.js!
Welcome!  If you're reading this you are probably a member of Decode @ UWM.  Today we are going to learn about a JavaScript framework that powers applications all over the world: [Node.js!](https://nodejs.org/en/) Then we will use our knew knowledge to build a simple Discord chat bot. 


## The Client / Server relationship
Before we get too deep into Node.js we first need to understand how modern web applications communicate with each other!

Many modern applications are built in two parts: The client and the server.  Let's consider a simple example:  A website!

### Client
When you enter a web address into your browser and press enter you send a HTTP request to that address.  On the other end is a server (we will get to servers in a minute) who receives the request.  That server sends you back everything you need to load the website.  This includes things like text (html) and styling (css). Other functionality can be scripted with a language like JavaScript so that you can perform some actions completely client-side.  For example, a website that checks whether or not webcam and microphone are working will use something like JavaScript to run a client-side application without any help from the web server.  

### Server
The server is responsible for sending clients the information they need!  The server is capable of handling requests from many clients at once.  In addition to sending clients the basic information they need to operate they can also help perform operations.  For example, a website that places a cool filter on a photo might require more processing power than the browser has available.  In this case it will send the photo to the server who can process it and send it back.  Another example is submitting a form.  We might fill out a form with some information and send it to the server who can store it. 

Sometimes servers need some help too!  Servers can even reach out to other servers to gather requested information.  

## What is Node.js?
Node.js is a framework that helps servers receive HTTP requests from clients and give us a way to interact with them.  

We can define the behavior of our server using the JavaScript (js) programming language.  Usually we will have one primary js file that routes requests and several smaller files to define specific behaviors. 

One of the advantages of Node.js is that is has many pre-built packages that allow us to easily retrieve and serve data to the client.  There are packages for everything!  Node even includes has a nifty tool called the Node Package Manager (NPM) that makes it easy to install and manage our dependencies. Today we will be focusing on packages that simplify using APIs, specifically the Discord API!


## Setting up our development enviroment:
Let's create our own Node server and build something cool!

The first thing we need to do is install Node.js.

Navigate to the [node.js downloads page](https://nodejs.org/en/) and install the latest LTS version.  There are installers available for Windows and MacOS.  If you are running linux or prefer to install via your favorite package manager [see this link](https://nodejs.org/en/download/package-manager/#snap).

Ok!  Let's verify our node installation:
```bash
$ node --version
v15.7.0
```
Next we need to verify that the [node package manager](https://www.npmjs.com/get-npm) (npm) was also installed:
```bash
$ npm --version
7.6.0
```
Finally, we are going to install our first package, [nodemon](https://nodemon.io/)!  Nodemon is a utility that will help automatically restart our server after making changes to the code.  You may need to enter your password after running this command:
```bash
$ sudo npm install -g nodemon
```

This is a good time to break down an npm command: 
- `$` indicates that you should run this in your bash (or bash-like) shell.  
- `npm` is the name of the program we want to run
- `install` is the first command argument, and tells npm that we want to install a package.  If we wanted to *uninstall* a package we could use the `uninstall` argument.
- `-g` indicates that we are installing this globally.  That means that we can use this package from anywhere on this machine.  Normally we install packages inside of a specific project so that projects only depend on the packages they need.  
- `nodemon` is the name of the package.  We can include multiple packages here if we want. 

Now that you have finished reading this `nodemon` should have finished installing. 

We can check the status of all the global node packages we have installed with ```$ npm -g list```:
```
/usr/local/lib
├── n@7.0.0
├── nodemon@2.0.7
└── npm@7.4.3
```
Of course if we remove the `-g` flag we can check what installed in our current directory:
```bash
$ npm list
/home/jim/dev/decode-crash-course-in-node
└── (empty)
```
Our directory is empty because we haven't installed any local packages yet. 

### Starting a node server. 
One last thing before we move on to our micro project.  Let's try starting a node server on our local machine and printing a message to the console.

First, create a new directory for this project.  Inside this directory create a file named ```helloWorld.js```.  Using your favorite text editor (I'm using [VSCode](https://code.visualstudio.com/)) open ```helloWorld.js``` and add the following line:

```javascript
console.log('Hello, World!');
```

That's it!  ```helloWorld.js``` is going to serve as the primary code for our server.   

We can start our server with:
```
$ nodemon --inspect helloWorld.js
```
You should see output similiar to:

```
jim@xps:~/dev/decode-crash-course-in-node$ nodemon --inspect helloWorld.js 
[nodemon] 2.0.7
[nodemon] to restart at any time, enter `rs`
[nodemon] watching path(s): *.*
[nodemon] watching extensions: js,mjs,json
[nodemon] starting `node --inspect helloWorld.js`
Debugger listening on ws://127.0.0.1:9229/0268b654-54d9-4528-a3aa-290546fc5b4b
For help, see: https://nodejs.org/en/docs/inspector
Hello, World
[nodemon] clean exit - waiting for changes before restart
```
Down at the bottom you can see that our message was logged to the servers console.  This means that our Node enviroment is working as we can start building!


## Micro-project: Discord Chat Bot!
We are going to use our new knowledge about node and servers to build our first node app:  A chat bot for the social messaing service [discord](https://discord.com/).  Chances are I'm presenting this to you right now on Discord right now!

The neat thing about Discord is that it has an API that we access.  The API lets us access all sorts of information about a Discord server like the users that are online, the messages being sent, etc.  We can also use the API to send messages on a Discord server from our node bot.  Let's create a bot that can respond to messages on our club server. 

This makes our 'client - server' model a little more complicated.  Now it's going to look something like this:

We (the client) will send a message on Discord.  Discord will then automatically send this message to our bot (or rather, our bot will read messages sent on our server using the Discord API).  If the message contains a keyword the bot will use the Discord API to send a reply!.

It's quite laborious to manually handle every single API endpoint we need from Discord.  That's where Node comes in to save the day!  There is a Node package called Discord.js that will make this a lot easier.  Discord.js handles all the detailed API calls.  We can write some simple, high-level JavaScript to define our bot's behavior. 

### Getting Started
*From this point on I am going to borrow heavily from [the official Discord.js guide](https://discordjs.guide/)*

#### Registering our Bot with Discord
Before we right any code we first need to create a Discord bot application on the [Discord Developer Portal](https://discord.com/developers/applications).  This is going to give our bot application permission (via a special key) to make API requests.  you will need to sign in with your Discord account, and you are responsible for your Bot's behavior!  Chat bots are a perfectly valid use of this service so we shouldn't have any issues. 

When you arrive at the developer portal and authenticate yourself click on **New Application**.

You can name your application whatever you like.  I'm going to name mine *DecodeBot*!  This will bring you to a configuration page for your new application.  You can set the name, description, and profile photo. 

You will notice a few special keys as well.  Discord uses these to identify and authenticate your bot.  

Later on we will talk about how to protect our secret key while storing our bot applications code on a public repository like github. 

Next, we can go to the **Bot** tab and hit the **add bot** button.  Your bot is now live and ready to do cool stuff!

This should take you to a page with more configuration settings for your bot. 

We need to take a moment to talk about securing our bot:  On this page you will see a field called 'token'.  It's ***SUPER IMPORTANT*** that you do not share this key with anyone.  If you upload your bot's code to a public repo like GitHub you need to make sure they key does not get posted!  Take a look [here](https://discordjs.guide/preparations/setting-up-a-bot-application.html#token-leak-scenario) to see what could happen if your token gets out.  Later we will talk about how to prevent this from happening.  Just keep that in mind!

## Initializing our code repository
We are going to use [git](https://git-scm.com/) to keep track of our code and help prevent token leaks.

Installing git via package manager:
```bash
// linux (debian)
$ sudo apt-get install git

// macOS
$ brew install git

// checking our installation:
$ git --version
git version 2.25.1
```

Now we can navigate to the location where we want to start our code, make a new directory, and initialize our repository. 

```
$ cd path/to/your/project
$ mkdir projectName
$ cd projectName
$ git init
```





