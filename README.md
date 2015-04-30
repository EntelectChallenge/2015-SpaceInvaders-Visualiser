# 2015-SpaceInvaders-Visualiser
A basic visualiser that will be used to replay matches on the player dashboard (Coming soon).

![alt tag](http://i.imgur.com/0gUe7ni.png?1)

## Get The Code
Download the [zip file](https://github.com/EntelectChallenge/2015-SpaceInvaders-Visualiser/archive/master.zip) from Github or use Git to clone the repository:
* Start Git Bash
* Change to the directory where you want to checkout the sample bot
* Run: `git clone https://github.com/EntelectChallenge/2015-SpaceInvaders-Visualiser.git`

## Build and run
In your Git Bash command line, from the project directory, execute the following commands:
* `npm install -g gulp bower`
* `npm install`
* `bower install`
* `gulp serve`

## Run a different replay
* Replace the example-replay folder OR change the path in main.js
* Change the number of iterations in main.js

This will form part of the player dashboard. The path and iterations parameters will be provided by a backend. To run this standalone, you will need to change the parameters in main.js