# Truth Untold 2.O 
[![Build Status](https://api.travis-ci.com/sirDonovan/Lanette.svg?branch=master)](https://travis-ci.com/sirDonovan/Lanette)

A bot for [Pokemon Showdown](https://github.com/Zarel/Pokemon-Showdown) written in [TypeScript](https://www.typescriptlang.org/).

## Installation
Truth Untold 2.O requires [Node.js](https://nodejs.org/) version 10.13.0 (latest LTS) or later and a command line (e.g. `Powershell` on Windows or `Terminal` on Mac OS/Linux) to run. Once you have compatible software, complete installation by following these steps:

#### Obtain a copy of Truth Untold 2.O
If you plan to make changes outside of the config file, you should create a fork. Make sure you are on the [main repository](https://github.com/Zerapium/Truth-Untold_2.O) and click "Fork" in the top right to create it. Then, either on your fork or the main repository if you don't plan to make changes, click the "Clone or download" button. In the popup, click either "Open in Desktop" if you're using the [GitHub Desktop program](https://desktop.github.com/) or run the following command if you're using [Git](https://git-scm.com/):

`git clone [fork or main repository URL].git`

#### Navigate to the root directory
The remaining steps will take place in the root directory of your Truth Untold 2.O files. Navigate there with the command:

`cd DIRECTORY`

Replace `DIRECTORY` with the filepath to your cloned directory 
#### Install dependencies
Run the following command to install required dependencies:

`npm install --production`

If you plan to contribute to development, run the command without the `--production` flag to also install dependencies used for testing.

#### Set up the config file
Copy and paste the `config-example.ts` file in the `src` folder, rename it to `config.ts`, and open it in your text editor to enter your desired information.

#### Start the bot
From this point on, you can start the bot by running the following command:

`node app.js`

## Development
Issues and pull requests will be welcomed once Truth Untold 2.O enters the beta phase! When submitting a pull request, be sure that you have installed development dependencies and ran `npm test` to check for errors in your code.

If possible, it is best to use [Visual Studio Code](https://code.visualstudio.com/) as your text editor when working on Truth Untold 2.O.

#### Credits
* Quinton Lee ([@sirDonovan](https://github.com/sirDonovan)) - Lead developer
* Zerapium (Pokem9n) ([@Zerapium](https://github.com/Zerapium)) - Owner | Lead developer
* [Contributors](https://github.com/Zerapium/Truth Untold 2.O/graphs/contributors)
* [Pokemon Showdown](https://github.com/Zarel/Pokemon-Showdown)

## License
Truth Untold 2.O is distributed under the terms of the [MIT License](https://github.com/Zerapium/Truth Untold 2.O/blob/master/LICENSE).

