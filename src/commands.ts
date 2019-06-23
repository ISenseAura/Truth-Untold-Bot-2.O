import path = require('path');
import { ICommandDefinition } from "./command-parser";
import { Player } from "./room-activity";
import { Room } from "./rooms";
import { rootFolder } from './tools';
import { IGameFormat } from "./types/games";
import { IFormat } from "./types/in-game-data-types";
import { User } from "./users";

/*********************************************
**                                          ** 
** Tic Tac Toe Game - Code By Pokem9n$(❤)  **
**                                          **
**********************************************/
 class P1 {
  player: any = {id:''};
  boxes: any[] = [];
  marker: string = 'X';
  constructor(player:any = {id:''},boxes?:number[],marker: string = 'X'){
    if(player !== undefined) this.player = player;
    if(boxes !== undefined) this.boxes = boxes;
    this.marker = marker;
  }
  markBox(num:any){
    ttt.markers[num-1] = this.marker;
    ttt.boxed.push(num);
    this.boxes.push(num);
    ttt.currPlayer = p2.player.id;
    ttt.markedCount++;
  }
}
let p1 = new P1();

 class P2 {
  player: any = {id:''};
  boxes: any[] = [];
  marker: string = 'O';
  constructor(player:any = {id:''},boxes?:number[],marker: string = 'O'){
    if(player !== undefined) this.player = player;
    if(boxes !== undefined) this.boxes = boxes;
    this.marker = marker;
  }
  markBox(num:any){
    ttt.markers[num-1] = this.marker;
    ttt.boxed.push(num);
    this.boxes.push(num);
    ttt.currPlayer = p1.player.id;
    ttt.markedCount++;
  }
}
let p2 = new P2();


  class TTT {
  players: string[] = [];
  markers: any[] = [1,2,3,4,5,6,7,8,9,0];
  boxed: any[] = [];
  winner: string = '';
  markedCount: number = 0;
  isEnded: boolean = true;
  currPlayer: string = '';
   
   constructor(players?:string[],currPlayer?:string,markers:any[] =[1,2,3,4,5,6,7,8,9,0],boxed?:any[],winner?:string,markedCount:number = 0,isEnded: boolean = true){
     if(players !== undefined)  this.players = players;
     if(markers !== undefined) this.markers = markers;
     if(boxed !== undefined)  this.boxed = boxed;
     if(winner !== undefined)  this.winner = winner;
     if(markedCount !== undefined)  this.markedCount = markedCount;
     if(isEnded !== undefined)  this.isEnded = isEnded;
     if(currPlayer !== undefined)  this.currPlayer = currPlayer;
   }
  
   say(msg?:any) {
     Client.send("|" + msg);
   }
   
   addPlayer1(obj:{name:'name',id:'id'}){
     p1.player = obj;
     this.players.push(obj.id);
     this.isEnded = false;
     this.currPlayer = obj.id;
     }
   
   addPlayer2(obj:{name:'name',id:'id'}){
     p2.player = obj;
     this.players.push(obj.id);
     this.isEnded = false;
     this.currPlayer = obj.id;
     }
   
   end(){
      this.isEnded = true;
    this.players = [];
    p1.player = {};
    p2.player = {};
     p1.boxes = [];
     p2.boxes = [];
    this.markedCount = 0;
    this.boxed = [];
    this.currPlayer = '';
    this.markers =[1,2,3,4,5,6,7,8,9];
   }
   
   checkwinner() {
    if(p2.player.id === this.currPlayer) {
				if ((p1.boxes.includes('1') && p1.boxes.includes('2') && p1.boxes.includes('3')) || (p1.boxes.includes('4') && p1.boxes.includes('5') && p1.boxes.includes('6')) || (p1.boxes.includes('7') && p1.boxes.includes('8') && p1.boxes.includes('9')) || (p1.boxes.includes('1') && p1.boxes.includes('4') && p1.boxes.includes('7')) || (p1.boxes.includes('2') && p1.boxes.includes('5') && p1.boxes.includes('8')) || (p1.boxes.includes('3') && p1.boxes.includes('6') &&  p1.boxes.includes('9')) || (p1.boxes.includes('1') && p1.boxes.includes('5') && p1.boxes.includes('9')) || (p1.boxes.includes('3') && p1.boxes.includes('5') && p1.boxes.includes('7'))) {
      this.winner = p1.player.id;
      this.isEnded = true;
          this.end();
     
			return true;
		}}
   else if(p1.player.id === this.currPlayer) {
				if ((p2.boxes.includes('1') && p2.boxes.includes('2') && p2.boxes.includes('3')) || (p2.boxes.includes('4') && p2.boxes.includes('5') && p2.boxes.includes('6')) || (p2.boxes.includes('7') && p2.boxes.includes('8') && p2.boxes.includes('9')) || (p2.boxes.includes('1') && p2.boxes.includes('4') && p2.boxes.includes('7')) || (p2.boxes.includes('2') && p2.boxes.includes('5') && p2.boxes.includes('8')) || (p2.boxes.includes('3') && p2.boxes.includes('6') &&  p2.boxes.includes('9')) || (p2.boxes.includes('1') && p2.boxes.includes('5') && p2.boxes.includes('9')) || (p2.boxes.includes('3') && p2.boxes.includes('5') && p2.boxes.includes('7'))) {
   this.winner = p2.player.id;
      this.isEnded = true;
          this.end();
			return true;
		}
    }
    
		if (this.markedCount === 9) {
			this.winner = 'draw';
      this.end();
			return true;
		}
  }
 } 
let ttt = new TTT();
/** ENDS HERE **
**/



const commands: Dict<ICommandDefinition> = {
  /**
  *COMMANDS FROM TRUTH UNTOLD (JS version)
  *
  */
	
	  git: {
    command(target, room, user){
      this.say("**Truth Untold 2.O** code by sirDonovan and Pokem9n$(❤) :- ``https://github.com/Zerapium/Truth-Untold-2.O``");
    },
    
  },
	
	
 ttt: {
   command(target, room, user){
     target.trim();
    if(target === 'end') {ttt.end(); return this.say('TTT Game ended');}
  var myArray: any[] = target.split(',');
    var p1 =  myArray[0].toLowerCase();
    var p2 = myArray[1].toLowerCase();
    p1 = Tools.toAlphaNumeric(p1);
    p2 = Tools.toAlphaNumeric(p2);
   p1 = Users.get(p1);
    p2 = Users.get(p2);
    if(!p1 || !p2) return this.say('User not found');
    this.say('**Tic Tac Toe -**' + p1.name + ' VS ' + p2.name);
    ttt.addPlayer1(p1);
     ttt.addPlayer2(p2);
    this.say(ttt.currPlayer + "'s Turn!");

   },
   helpText: 'Creates a Tic Tac Toe Game between two players, ``$ttt [player1],[player2]``'
 },
  
  draw: {
    command(target, room, user){
      
     let msg,p11,p22;
      p11 = p1.player.id;
      p22 = p2.player.id;
     p11 = p1.player;
    p22 = p2.player;
    if(!target) return this.say('please choose a number');
   if(ttt.boxed.includes(target)) return this.say('please choose other number');
    if(p1.player.id.toString() === user.id && ttt.currPlayer.toString() === user.id){
      if(ttt.isEnded === true && ttt.winner === 'draw' ) return this.say('Match drawn');
    if(ttt.isEnded === true && ttt.winner === user.id ) return this.say(user.id + ' wins');
      p1.markBox(target);
            msg = "<center><b>" + p11.name + " V/S "+ p22.name + "</b><table  bgcolor = 'white'border = '1' width = '180'><tr><td><p style='width:100%;background:white;'><p style='width:100%;background:white;'><p align='center'>" + ttt.markers[0] + "</p></p></td><td height='10'><p style='width:100%;background:white;'><p align='center'>" + ttt.markers[1] + "</p></p></td><td height='10'><p style='width:100%;background:white;'><p align='center'>"+ ttt.markers[2] +"</p></p></td></tr><tr><td height='10'><p style='width:100%;background:white;'><p align='center'>" + ttt.markers[3] +"</p></p></td><td height='10'><p style='width:100%;background:white;'><p align='center'>" + ttt.markers[4] + "</p></p></td><td height='10'><p style='width:100%;background:white;'><p align='center'>" + ttt.markers[5] +"</p></p></td></tr><tr><td height='10'><p style='width:100%;background:white;'><p align='center'>" + ttt.markers[6] +"</p></p></td><td height='10'><p style='width:100%;background:white;'><p align='center'>"+ ttt.markers[7] +"</p></p></td><td height='10'><p style='width:100%;background:white;'><p align='center'>" + ttt.markers[8] +"</p></p></td></tr></table></center>";


      this.sayHtml2(msg);
    
     
      
      
    } else  if(p2.player.id.toString() === user.id && ttt.currPlayer.toString() === user.id){
       if(ttt.isEnded === true && ttt.winner === 'draw' ) return this.say('Match drawn');
    if(ttt.isEnded === true && ttt.winner === user.id ) return this.say(ttt.winner + ' wins');
      p2.markBox(target);
            msg = "<center><b>" + p11.name + " V/S "+ p22.name + "</b><table  bgcolor = 'white'border = '1' width = '180'><tr><td><p style='width:100%;background:white;'><p style='width:100%;background:white;'><p align='center'>" + ttt.markers[0] + "</p></p></td><td height='10'><p style='width:100%;background:white;'><p align='center'>" + ttt.markers[1] + "</p></p></td><td height='10'><p style='width:100%;background:white;'><p align='center'>"+ ttt.markers[2] +"</p></p></td></tr><tr><td height='10'><p style='width:100%;background:white;'><p align='center'>" + ttt.markers[3] +"</p></p></td><td height='10'><p style='width:100%;background:white;'><p align='center'>" + ttt.markers[4] + "</p></p></td><td height='10'><p style='width:100%;background:white;'><p align='center'>" + ttt.markers[5] +"</p></p></td></tr><tr><td height='10'><p style='width:100%;background:white;'><p align='center'>" + ttt.markers[6] +"</p></p></td><td height='10'><p style='width:100%;background:white;'><p align='center'>"+ ttt.markers[7] +"</p></p></td><td height='10'><p style='width:100%;background:white;'><p align='center'>" + ttt.markers[8] +"</p></p></td></tr></table></center>";

 this.sayHtml2(msg);
      
    }
       ttt.checkwinner();
    if(ttt.winner !== '' && ttt.winner !== 'draw') {
      this.say(ttt.winner + ' Wins!');
      ttt.winner = '';
    }
    if(ttt.winner ==='draw') {
      this.say('oohoo its a draw!');
      ttt.winner = '';
      return;
    }
     if(!ttt.isEnded === true) this.say(ttt.currPlayer + "'s Turn!");
    },
      aliases:['mark'],
    
  },
  
  
  uptime: {
    command(target, room, user, pm) {
		let uptime: number = process.uptime();
		let uptimeText: string;
		if (uptime > 24 * 60 * 60) {
			let uptimeDays: number = Math.floor(uptime / (24 * 60 * 60));
			uptimeText = uptimeDays + " " + (uptimeDays === 1 ? "day" : "days");
			let uptimeHours: number= Math.floor(uptime / (60 * 60)) - uptimeDays * 24;
			if (uptimeHours) uptimeText += ", " + uptimeHours + " " + (uptimeHours === 1 ? "hour" : "hours");
		} else {
			uptimeText = Tools.toDurationString(uptime * 1000);
		}
		this.say("Uptime: **" + uptimeText + "**");
	},
    helpText: 'shows uptime of the bot',
  },
  
  kill:{
    command(target, room, user){
      process.exit(-1);
    },
    helpText: 'Kills the bot',
    developerOnly: true,
  },
  
  
 
  	say: {
		command(target, room, user) {
			this.say(target);
		},
    developerOnly: true,
		helpText: "Echos back the argument, ``$say [text]``"
	},

	help: {
		command(target, room, user){
    if(target){
        let help : string = JSON.stringify(Commands[target].helpText);
       this.say(help);
        
      }
      let text = [];
			
			for(let command in Commands) if(Commands[command].helpText) text.push(Config.commandCharacter + command + ': ' + Commands[command].helpText);
			room.say('!htmlbox ' + text.join('<br />'));
    // this.say(Commands[target].helpText);
      
		},
		helpText: 'Shows syntax of the given command, ``$help [command]``'
	},

	custom: {
		command(target, room, user){
			let r: string = target.slice(0, target.indexOf(',')).trim();
			let c: string = target.slice(target.indexOf(',') + 1).replace(/^\s+/, '');
			Client.send(r + '|' + c);
		},
		developerOnly: true,
		pmOnly: true,
    aliases: ['c'],
    helpText: 'Sends a message to the given room, ``$custom roomid, message``'
	},

  reversio : {
    command(target, room, user){

    let str:string = target;
    
    var n: any = str.includes("!");
    if(n)
    {return this.say("you cant use ! in your sentence");
    }
        var m: any = str.includes("/");
    if(m)
    {return this.say("you cant use / in your sentence");
    }

    
    var splitString: any[] = str.split(""); // var splitString = "pokem9n".split("");
    // ["p", "o", "k", "e", "m","9","n"]
 
    // Step 2. Use the reverse() method to reverse the new created array
    var reverseArray: any[] = splitString.reverse(); // var reverseArray = ["p", "o", "k", "e", "m","9","n"].reverse();
    // ["n", "9", "m", "e", "k", "o", "p"]
 
    // Step 3. Use the join() method to join all elements of the array into a string
    var joinArray: any = reverseArray.join(""); // var joinArray = ["n", "9", "m", "e", "k", "o", "p"].join("");
    // "n9mekop"
    if(joinArray == target) {
       return this.say("you spotted a palindrome! " + joinArray);}
    //Step 4. Return the reversed string
    return this.say(joinArray);
  },// "n9mekop"
    helpText: 'Reverses the given word, ``$reversio [word]``',
             
   },
  

  
	/**
	 * Developer commands
	 */
	eval: {
		command(target, room, user) {
			try {
				// tslint:disable-next-line no-eval
				this.say(eval(target));
			} catch (e) {
				this.say(e.message);
				console.log(e.stack);
			}
		},
		aliases: ['js'],
		developerOnly: true,
    helpText: 'Evals the target',
	},
	reload: {
		command(target, room, user) {
			type ReloadableModules = 'client' | 'commandparser' | 'commands' | 'config' | 'dex' | 'games' | 'storage' | 'tools' | 'tournaments';
			const modules: ReloadableModules[] = [];
			const targets = target.split(",");
			for (let i = 0; i < targets.length; i++) {
				const id = Tools.toId(targets[i]);
				if (id === 'tools') {
					modules.unshift(id);
				} else if (id === 'client' || id === 'commandparser' || id === 'commands' || id === 'config' || id === 'dex' || id === 'games' || id === 'storage' || id === 'tournaments') {
					modules.push(id);
				} else {
					return this.say("Unknown module '" + targets[i].trim() + "'.");
				}
			}

			if (!modules.length) return;

			this.say("Running tsc...");
			require(path.join(rootFolder, 'build.js'))(() => {
				for (let i = 0; i < modules.length; i++) {
					if (modules[i] === 'client') {
						const oldClient = global.Client;
						Tools.uncacheTree('./client');
						global.Client = new (require('./client').Client)();
						Client.onReload(oldClient);
					} else if (modules[i] === 'commandparser') {
						Tools.uncacheTree('./command-parser');
						global.CommandParser = new (require('./command-parser').CommandParser)();
					} else if (modules[i] === 'commands') {
						Tools.uncacheTree('./commands');
						global.Commands = Object.assign(Object.create(null), CommandParser.loadCommands(require('./commands')));
						if (Games.loadedFormats) Games.loadFormatCommands();
					} else if (modules[i] === 'config') {
						Tools.uncacheTree('./config');
						global.Config = require('./config');
					} else if (modules[i] === 'dex') {
						Tools.uncacheTree('./dex');
						global.Dex = new (require('./dex').Dex)('base');
					} else if (modules[i] === 'games') {
						Tools.uncacheTree('./games');
						global.Games = new (require('./games').Games)();
					} else if (modules[i] === 'storage') {
						const oldStorage = global.Storage;
						Tools.uncacheTree('./storage');
						global.Storage = new (require('./storage').Storage)();
						Storage.onReload(oldStorage);
					} else if (modules[i] === 'tools') {
						Tools.uncacheTree('./tools');
						global.Tools = new (require('./tools').Tools)();
					} else if (modules[i] === 'tournaments') {
						const oldTournaments = global.Tournaments;
						Tools.uncacheTree('./tournaments');
						global.Tournaments = new (require('./tournaments').Tournaments)();
						Tournaments.onReload(oldTournaments);
					}
				}
				this.say("Successfully reloaded: " + modules.join(", "));
			}, () => {
				this.say("Failed to build files.");
			});
		},
		aliases: ['hotpatch'],
		developerOnly: true,
    helpText: "Reloads the given module, ``$reload 'client' | 'commandparser' | 'commands' | 'config' | 'dex' | 'games' | 'storage' | 'tools' | 'tournaments'"
	},

	/**
	 * Game commands
	 */
	creategame: {
		command(target, room, user) {
			if (this.isPm(room) || !Games.canCreateGame(room, user)) return;
			const format = Games.getFormat(target, user);
			if (!format) return;
			const game = Games.createGame(room, format);
			game.signups();
		},
		aliases: ['cg'],
    helpText: 'Creates a game, ``$cg [gamename]``'
	},
	startgame: {
		command(target, room, user) {
			if (this.isPm(room) || !user.hasRank(room, 'voice')) return;
			if (room.game) {
				if (room.game.started) return;
				room.game.start();
			} else if (room.userHostedGame) {
				if (user.id !== room.userHostedGame.hostId) return;
				room.userHostedGame.start();
			}
		},
		aliases: ['sg'],
    helpText: 'Starts a game,``$sg ``'
	},
	endgame: {
		command(target, room, user) {
			if (this.isPm(room)) {
				if (room.game) {
					room.game.forceEnd(user);
				}
			} else {
				if (!user.hasRank(room, 'voice')) return;
				if (room.game) {
					room.game.forceEnd(user);
				} else if (room.userHostedGame) {
					room.userHostedGame.forceEnd(user);
				}
			}
		},
    helpText: 'Ends the game, ``$endgame ``'
	},
	joingame: {
		command(target, room, user) {
			if (this.isPm(room)) {
				if (!target) return;
				const chatRoom = Rooms.get(target);
				if (!chatRoom) return;
				if (chatRoom.game) {
					chatRoom.game.addPlayer(user);
				} else if (chatRoom.userHostedGame) {
					chatRoom.userHostedGame.addPlayer(user);
				}
			} else {
				if (room.game) {
					room.game.addPlayer(user);
				} else if (room.userHostedGame) {
					room.userHostedGame.addPlayer(user);
				}
			}
		},
		aliases: ['jg'],
    
	},
	leavegame: {
		command(target, room, user) {
			if (this.isPm(room)) return;
			if (room.game) {
				room.game.removePlayer(user);
			} else if (room.userHostedGame) {
				room.userHostedGame.removePlayer(user);
			}
		},
		aliases: ['lg'],
	},
	game: {
		command(target, room, user) {
			let gameRoom: Room;
			if (this.isPm(room)) {
				const targetRoom = Rooms.get(Tools.toId(target));
				if (!targetRoom) return this.say("You must specify one of " + Users.self.name + "'s rooms.");
				if (!this.canPmHtml(targetRoom)) return;
				gameRoom = targetRoom;
			} else {
				if (!user.hasRank(room, 'voice')) return;
				gameRoom = room;
			}
			if (gameRoom.game) {
				const game = gameRoom.game;
				let html = (game.mascot ? Dex.getPokemonIcon(game.mascot) : "") + "<b>" + game.nameWithOptions + "</b><br />";
				if (game.started) {
					html += "<b>Duration</b>: " + Tools.toDurationString(Date.now() - game.startTime) + "<br />";
					const remainingPlayers = game.getRemainingPlayerCount();
					if (remainingPlayers !== game.playerCount) {
						html += "<b>Remaining players</b>: " + remainingPlayers + "/" + game.playerCount;
					} else {
						html += "<b>Players</b>: " + remainingPlayers;
					}
				} else {
					html += "<b>Signups duration</b>: " + Tools.toDurationString(Date.now() - game.signupsTime) + "<br />";
					html += "<b>" + game.playerCount + "</b> player" + (game.playerCount === 1 ? " has" : "s have") + " joined";
				}
				this.sayHtml(html, gameRoom);
			} else if (gameRoom.userHostedGame) {
				const game = gameRoom.userHostedGame;
				let html = (game.mascot ? Dex.getPokemonIcon(game.mascot, true) : "") + "<b>" + game.nameWithOptions + "</b><br />";
				html += "<b>Remaining time</b>: " + Tools.toDurationString(game.endTime - Date.now()) + "<br />";
				if (game.started) {
					html += "<b>Duration</b>: " + Tools.toDurationString(Date.now() - game.startTime) + "<br />";
					html += "<b>Players</b>: " + game.getRemainingPlayerCount();
				} else {
					html += "<b>Signups duration</b>: " + Tools.toDurationString(Date.now() - game.signupsTime) + "<br />";
					html += "<b>" + game.playerCount + "</b> player" + (game.playerCount === 1 ? " has" : "s have") + " joined";
				}
				this.sayHtml(html, gameRoom);
			} else {
				this.say("There is no scripted game running.");
			}
		},
    helpText: 'See the current game of the given room, ````$game [roomid]``'
	},
	host: {
		command(target, room, user) {
			if (this.isPm(room) || !user.hasRank(room, 'voice') || room.game) return;
			if (!Config.allowScriptedGames.includes(room.id)) return this.say("Scripted games are not enabled for this room.");
			if (Users.self.rooms.get(room) !== '*') return this.say(Users.self.name + " requires Bot rank (*) to start user-hosted games.");
			const targets = target.split(",");
			const host = Users.get(targets[0]);
			if (!host || !host.rooms.has(room)) return this.say("Please specify a user currently in this room.");
			targets.shift();
			const format = Games.getUserHostedFormat(targets.join(","), user);
			if (!format) return;
			const game = Games.createUserHostedGame(room, format, host);
			game.signups();
		},
	},
	addpoints: {
		command(target, room, user, cmd) {
			if (this.isPm(room) || !room.userHostedGame || room.userHostedGame.hostId !== user.id) return;
			const users: User[] = [];
			let points = 1;
			const targets = target.split(",");
			for (let i = 0, len = targets.length; i < len; i++) {
				const target = Tools.toId(targets[i]);
				if (!target) continue;
				let user = Users.get(target);
				if (Tools.isNumber(target)) {
					points = Math.round(parseInt(target));
					if (points < 1) points = 1;
				} else {
					user = Users.get(targets[i]);
					if (user) users.push(user);
				}
			}
			if (!users.length) return this.say("Please specify at least one user.");
			if (cmd === 'removepoints' || cmd === 'removepoint' || cmd === 'rpt') points *= -1;
			let reachedCap = 0;
			for (let i = 0; i < users.length; i++) {
				const player = room.userHostedGame.players[users[i].id] || room.userHostedGame.createPlayer(users[i]);
				if (player.eliminated) player.eliminated = false;
				let total = room.userHostedGame.points.get(player) || 0;
				total += points;
				room.userHostedGame.points.set(player, total);
				if (room.userHostedGame.scoreCap && total >= room.userHostedGame.scoreCap) reachedCap++;
			}
			if (reachedCap) user.say((reachedCap === 1 ? "A user has" : reachedCap + " users have") + " reached the score cap in your game!");
		},
		aliases: ['addpoints', 'removepoint', 'removepoints', 'apt', 'rpt'],
	},
	scorecap: {
		command(target, room, user) {
			if (this.isPm(room) || !room.userHostedGame || room.userHostedGame.hostId !== user.id) return;
			const id = Tools.toId(target);
			if (!id) {
				if (room.userHostedGame.scoreCap) return this.say("The score cap is set to " + room.userHostedGame.scoreCap + ".");
				return this.say("There is no score cap set.");
			}
			const cap = parseInt(id);
			if (isNaN(cap)) return this.say("Please specify a valid number.");
			room.userHostedGame.scoreCap = cap;
			this.say("The score cap has been set to " + cap + ".");
		},
	},
	winner: {
		command(target, room, user, cmd) {
			if (this.isPm(room) || !room.userHostedGame || room.userHostedGame.hostId !== user.id) return;
			const targets = target.split(",");
			let players: Player[] = [];
			let bits = 100;
			let multiplier: number | null = null;
			let placesToWin = 1;
			if (cmd === 'autowin') {
				const possiblePlaces = parseInt(target);
				if (!isNaN(possiblePlaces)) {
					if (possiblePlaces < 1 || possiblePlaces > 3) return this.say("You can only auto-win the top 1-3 places.");
					placesToWin = possiblePlaces;
				}

				const usersByPoints: Dict<Player[]> = {};
				for (const i in room.userHostedGame.players) {
					const player = room.userHostedGame.players[i];
					if (player.eliminated || !room.userHostedGame.points.has(player)) continue;
					const points = '' + room.userHostedGame.points.get(player);
					if (!(points in usersByPoints)) usersByPoints[points] = [];
					usersByPoints[points].push(player);
				}

				const sortedPoints = Object.keys(usersByPoints).sort((a, b) => parseInt(b) - parseInt(a));
				for (let i = 0; i < placesToWin; i++) {
					if (!sortedPoints[i]) break;
					players = players.concat(usersByPoints[sortedPoints[i]]);
				}

				if (!players.length) return this.say("No one has any points in this game.");
			} else {
				for (let i = 0, len = targets.length; i < len; i++) {
					const id = Tools.toId(targets[i]);
					if (!id) continue;
					if (Tools.isNumber(id)) {
						multiplier = parseFloat(targets[i].trim());
					} else {
						if (id in room.userHostedGame.players) {
							if (!players.includes(room.userHostedGame.players[id])) players.push(room.userHostedGame.players[id]);
						}
					}
				}

				if (!players.length) return this.say("Please specify at least 1 user who is in the room.");
			}

			if (multiplier) {
				if (multiplier > 3) {
					multiplier = 3;
				} else if (multiplier < 1) {
					multiplier = 1;
				}
			} else {
				multiplier = 2.5;
			}

			bits = Math.ceil(bits * multiplier);

			for (let i = 0; i < players.length; i++) {
				Storage.addPoints(room, players[i].name, bits, 'userhosted');
				players[i].say("You were awarded " + bits + "bits! To see your total amount, use the command ``" + Config.commandCharacter + "bits``");
			}
			this.say("The winner" + (players.length === 1 ? " is" : "s are") + " " + players.map(x => x.name).join(", ") + "! Thanks for hosting.");
			room.userHostedGame.end();
		},
		aliases: ['autowin', 'win'],
	},

	/**
	 * Tournament commands
	 */

	tournament: {
		command(target, room, user) {
			const targets: string[] = target ? target.split(",") : [];
			let tournamentRoom: Room;
			if (this.isPm(room)) {
				const targetRoom = Rooms.get(Tools.toId(targets[0]));
				if (!targetRoom) return this.say("You must specify one of " + Users.self.name + "'s rooms.");
				if (!Config.allowTournaments.includes(targetRoom.id)) return this.say("Tournament features are not enabled for " + targetRoom.title + ".");
				if (!this.canPmHtml(targetRoom)) return;
				tournamentRoom = targetRoom;
			} else {
				if (target) return this.run('createtournament');
				if (!user.hasRank(room, 'voice')) return;
				if (!Config.allowTournaments.includes(room.id)) return this.say("Tournament features are not enabled for this room.");
				tournamentRoom = room;
			}

			if (!tournamentRoom.tournament) return this.say("A tournament is not in progress in this room.");
			const tournament = tournamentRoom.tournament;
			let html = "<b>" + tournament.name + " " + (tournament.isRoundRobin ? "Round Robin " : "") + "tournament</b><br />";
			if (tournament.started) {
				html += "<b>Duration</b>: " + Tools.toDurationString(Date.now() - tournament.startTime) + "<br />";
				const remainingPlayers = tournament.getRemainingPlayerCount();
				if (remainingPlayers !== tournament.totalPlayers) {
					html += "<b>Remaining players</b>: " + remainingPlayers + "/" + tournament.totalPlayers;
				} else {
					html += "<b>Players</b>: " + remainingPlayers;
				}
			} else {
				html += "<b>Signups duration</b>: " + Tools.toDurationString(Date.now() - tournament.createTime) + "<br />";
				html += "<b>" + tournament.playerCount + "</b> player" + (tournament.playerCount === 1 ? " has" : "s have") + " joined";
			}
			this.sayHtml(html, tournamentRoom);
		},
		aliases: ['tour'],
	},
	createtournament: {
		command(target, room, user) {
			if (this.isPm(room) || !Tournaments.canCreateTournaments(room, user)) return;
			if (room.tournament) return this.say("There is already a tournament in progress in this room.");
			const format = Dex.getFormat(target);
			if (!format || !format.tournamentPlayable) return this.say("'" + target + "' is not a valid tournament format.");
			this.sayCommand("/tour new " + format.name + ", elimination, " + Tournaments.defaultPlayerCap);
		},
		aliases: ['createtour', 'ct'],
	},
	scheduledtournament: {
		command(target, room, user) {
			const targets: string[] = target ? target.split(",") : [];
			let tournamentRoom: Room;
			if (this.isPm(room)) {
				const targetRoom = Rooms.get(Tools.toId(targets[0]));
				if (!targetRoom) return this.say("You must specify one of " + Users.self.name + "'s rooms.");
				if (!Config.allowTournaments.includes(targetRoom.id)) return this.say("Tournament features are not enabled for " + targetRoom.title + ".");
				if (!this.canPmHtml(targetRoom)) return;
				if (!(targetRoom.id in Tournaments.schedules)) return this.say("There is no tournament schedule for " + targetRoom.title + ".");
				tournamentRoom = targetRoom;
			} else {
				if (!user.hasRank(room, 'voice')) return;
				if (!Config.allowTournaments.includes(room.id)) return this.say("Tournament features are not enabled for this room.");
				if (!(room.id in Tournaments.schedules)) return this.say("There is no tournament schedule for this room.");
				tournamentRoom = room;
			}

			const scheduledTournament = Tournaments.scheduledTournaments[tournamentRoom.id];
			const now = Date.now();
			let html = "<b>Next" + (this.pm ? " " + tournamentRoom.title : "") + " scheduled tournament</b>: " + scheduledTournament.format.name + "<br />";
			if (now > scheduledTournament.time) {
				html += "<b>Delayed</b><br />";
			} else {
				html += "<b>Starting in</b>: " + Tools.toDurationString(scheduledTournament.time - now) + "<br />";
			}

			if (scheduledTournament.format.customRules) html += "<br /><b>Custom rules:</b><br />" + Dex.getCustomRulesHtml(scheduledTournament.format);
			this.sayHtml(html, tournamentRoom);
		},
		aliases: ['scheduledtour', 'officialtournament', 'officialtour', 'official'],
	},
	gettournamentschedule: {
		command(target, room, user) {
			const targets: string[] = target ? target.split(",") : [];
			let tournamentRoom: Room;
			if (this.isPm(room)) {
				const targetRoom = Rooms.get(Tools.toId(targets[0]));
				if (!targetRoom) return this.say("You must specify one of " + Users.self.name + "'s rooms.");
				if (!user.hasRank(targetRoom, 'moderator')) return;
				if (!Config.allowTournaments.includes(targetRoom.id)) return this.say("Tournament features are not enabled for " + targetRoom.title + ".");
				tournamentRoom = targetRoom;
			} else {
				if (!user.hasRank(room, 'moderator')) return;
				if (!Config.allowTournaments.includes(room.id)) return this.say("Tournament features are not enabled for this room.");
				tournamentRoom = room;
			}
			const schedule = Tournaments.getTournamentScheduleHtml(tournamentRoom);
			if (!schedule) return this.say("No tournament schedule found for " + tournamentRoom.title + ".");
			this.sayCommand("!code " + schedule);
		},
		aliases: ['gettourschedule'],
	},
	queuetournament: {
		command(target, room, user, cmd) {
			if (this.isPm(room) || !Tournaments.canCreateTournaments(room, user)) return;
			const database = Storage.getDatabase(room);
			if (database.queuedTournament && !cmd.startsWith('force')) return this.say(Dex.getExistingFormat(database.queuedTournament.formatid, true).name + " is already queued for " + room.title + ".");
			const targets: string[] = target ? target.split(target.indexOf('@@@') !== -1 ? "|" : ",") : [];
			const id = Tools.toId(targets[0]);
			let scheduled = false;
			let format: IFormat | null = null;
			if (id === 'scheduled' || id === 'official') {
				if (!(room.id in Tournaments.schedules)) return this.say("There is no tournament schedule for this room.");
				scheduled = true;
				format = Tournaments.scheduledTournaments[room.id].format;
			} else {
				if (room.id in Tournaments.scheduledTournaments && Date.now() > Tournaments.scheduledTournaments[room.id].time) return this.say("The scheduled tournament is delayed so you must wait until after it starts.");
				format = Dex.getFormat(targets[0]);
			}
			if (!format) return this.say("'" + targets[0].trim() + "' is not a valid format.");
			if (!format.tournamentPlayable) return this.say(format.name + " cannot be played in tournaments.");
			let playerCap: number;
			if (scheduled) {
				playerCap = Tournaments.maxPlayerCap;
			} else if (targets.length > 1) {
				playerCap = parseInt(targets[1]);
				if (isNaN(playerCap) || playerCap < 2) return this.say("You must specify a valid number for the player cap.");
				if (playerCap > Tournaments.maxPlayerCap) return this.say("You must specify a player cap less than " + Tournaments.maxPlayerCap + ".");
			} else {
				playerCap = Tournaments.defaultPlayerCap;
			}

			let time: number = 0;
			if (scheduled) {
				time = Tournaments.scheduledTournaments[room.id].time;
			} else if (!room.tournament) {
				const now = Date.now();
				if (database.lastTournamentTime) {
					if (database.lastTournamentTime + Tournaments.queuedTournamentTime < now) {
						time = now + Tournaments.delayedScheduledTournamentTime;
					} else {
						time = database.lastTournamentTime + Tournaments.queuedTournamentTime;
					}
				} else {
					database.lastTournamentTime = now;
					time = now + Tournaments.queuedTournamentTime;
				}
			}

			database.queuedTournament = {formatid: format.name + (format.customRules ? '@@@' + format.customRules.join(',') : ''), playerCap, scheduled, time};
			if (scheduled) {
				Tournaments.setScheduledTournamentTimer(room);
			} else if (time) {
				Tournaments.setTournamentTimer(room, time, format, playerCap);
			}
			this.run('queuedtournament', '');
		},
		aliases: ['forcequeuetournament', 'forcenexttournament', 'forcenexttour'],
	},
	queuedtournament: {
		command(target, room, user) {
			let tournamentRoom: Room;
			if (this.isPm(room)) {
				const targetRoom = Rooms.get(Tools.toId(target));
				if (!targetRoom) return this.say("You must specify one of " + Users.self.name + "'s rooms.");
				if (!Config.allowTournaments.includes(targetRoom.id)) return this.say("Tournament features are not enabled for " + targetRoom.title + ".");
				if (!this.canPmHtml(targetRoom)) return;
				tournamentRoom = targetRoom;
			} else {
				if (!user.hasRank(room, 'voice')) return;
				if (!Config.allowTournaments.includes(room.id)) return this.say("Tournament features are not enabled for this room.");
				if (target) return this.run('queuetournament');
				tournamentRoom = room;
			}

			const database = Storage.getDatabase(tournamentRoom);
			if (!database.queuedTournament) return this.say("There is no tournament queued for " + (this.pm ? tournamentRoom.title : "this room") + ".");
			const format = Dex.getExistingFormat(database.queuedTournament.formatid, true);
			let html = "<b>Queued" + (this.pm ? " " + tournamentRoom.title : "") + " tournament</b>: " + format.name + (database.queuedTournament.scheduled ? " <i>(scheduled)</i>" : "") + "<br />";
			if (database.queuedTournament.time) {
				const now = Date.now();
				if (now > database.queuedTournament.time) {
					html += "<b>Delayed</b><br />";
				} else {
					html += "<b>Starting in</b>: " + Tools.toDurationString(database.queuedTournament.time - now) + "<br />";
				}
			} else if (tournamentRoom.tournament) {
				html += "<b>Starting in</b>: " + Tools.toDurationString(Tournaments.queuedTournamentTime) + " after the " + tournamentRoom.tournament.name + " tournament ends<br />";
			}

			if (format.customRules) html += "<br /><b>Custom rules:</b><br />" + Dex.getCustomRulesHtml(format);
			this.sayHtml(html, tournamentRoom);
		},
		aliases: ['queuedtour', 'nexttournament', 'nexttour'],
	},

	/**
	 * Storage commands
	 */
	leaderboard: {
		command(target, room, user) {
			const targets: string[] = target ? target.split(",") : [];
			let leaderboardRoom: Room;
			if (this.isPm(room)) {
				const targetRoom = Rooms.get(Tools.toId(targets[0]));
				if (!targetRoom) return this.say("You must specify one of " + Users.self.name + "'s rooms.");
				leaderboardRoom = targetRoom;
			} else {
				if (!user.hasRank(room, 'voice')) return;
				leaderboardRoom = room;
			}
			const database = Storage.getDatabase(leaderboardRoom);
			if (!database.leaderboard) return this.say("There is no leaderboard for the " + leaderboardRoom.title + " room.");
			let users = Object.keys(database.leaderboard);
			let startPosition = 0;
			let source: IFormat | IGameFormat | undefined;
			let annual = false;
			for (let i = 1; i < targets.length; i++) {
				const id = Tools.toId(targets[i]);
				if (Tools.isNumber(id)) {
					if (startPosition) return this.say("You can only specify 1 position on the leaderboard.");
					startPosition = parseInt(id);
				} else if (id === 'annual' || id === 'alltime') {
					annual = true;
				} else {
					const format = Dex.getFormat(targets[i]);
					if (format && format.effectType === 'Format') {
						if (source) return this.say("You can only specify 1 point source.");
						source = format;
					} else {
						const gameFormat = Games.getFormat(targets[i]);
						if (gameFormat) {
							if (source) return this.say("You can only specify 1 point source.");
							source = gameFormat;
						}
					}
				}
			}

			if (startPosition) {
				if (startPosition > users.length) startPosition = users.length;
				startPosition -= 10;
				if (startPosition < 0) startPosition = 0;
			}

			const pointsCache: Dict<number> = {};

			if (annual && source) {
				for (let i = 0; i < users.length; i++) {
					let points = 0;
					if (database.leaderboard[users[i]].sources[source.id]) points += database.leaderboard[users[i]].sources[source.id];
					if (database.leaderboard[users[i]].annualSources[source.id]) points += database.leaderboard[users[i]].annualSources[source.id];
					pointsCache[users[i]] = points;
				}
			} else if (annual) {
				for (let i = 0; i < users.length; i++) {
					pointsCache[users[i]] = database.leaderboard[users[i]].annual + database.leaderboard[users[i]].current;
				}
			} else if (source) {
				for (let i = 0; i < users.length; i++) {
					pointsCache[users[i]] = database.leaderboard[users[i]].sources[source.id] || 0;
				}
			} else {
				for (let i = 0; i < users.length; i++) {
					pointsCache[users[i]] = database.leaderboard[users[i]].current;
				}
			}

			users = users.filter(x => pointsCache[x] !== 0).sort((a, b) => pointsCache[b] - pointsCache[a]);
			if (!users.length) return this.say("The " + leaderboardRoom.title + " leaderboard is empty.");

			const output: string[] = [];
			let positions = 0;
			for (let i = startPosition; i < users.length; i++) {
				if (!users[i]) break;
				const points = pointsCache[users[i]] || database.leaderboard[users[i]].current;
				const position = '' + (i + 1);
				if (position.endsWith('1') && !position.endsWith('11')) {
					output.push(position + "st: __" + database.leaderboard[users[i]].name + "__ (" + points + ")");
				} else if (position.endsWith('2') && !position.endsWith('12')) {
					output.push(position + "nd: __" + database.leaderboard[users[i]].name + "__ (" + points + ")");
				} else if (position.endsWith('3') && !position.endsWith('13')) {
					output.push(position + "rd: __" + database.leaderboard[users[i]].name + "__ (" + points + ")");
				} else {
					output.push(position + "th: __" + database.leaderboard[users[i]].name + "__ (" + points + ")");
				}
				positions++;
				if (positions >= 10) break;
			}
			let endPosition = startPosition + 10;
			if (endPosition > users.length) endPosition = users.length;
			this.say("``" + (annual ? "Annual " : "") + (source ? source.name + " " : "") + "Top " + endPosition + " of " + users.length + "``: " + output.join(", "));
		},
		aliases: ['lb', 'top'],
	},
	rank: {
		command(target, room, user) {
			if (!this.isPm(room)) return;
			const targets: string[] = target ? target.split(',') : [];
			const targetRoom = Rooms.get(Tools.toId(targets[0]));
			if (!targetRoom) return this.say("You must specify one of " + Users.self.name + "'s rooms.");
			const database = Storage.getDatabase(targetRoom);
			if (!database.leaderboard) return this.say("There is no leaderboard for the " + targetRoom.title + " room.");
			const users = Object.keys(database.leaderboard);
			if (!users.length) return this.say("The " + targetRoom.title + " leaderboard is empty.");
			let targetUser = '';
			let position = 0;
			let source: IFormat | IGameFormat | undefined;
			for (let i = 1; i < targets.length; i++) {
				const id = Tools.toId(targets[i]);
				if (Tools.isNumber(id)) {
					if (position) return this.say("You can only specify 1 position on the leaderboard.");
					position = parseInt(id);
				} else {
					const format = Dex.getFormat(targets[i]);
					if (format && format.effectType === 'Format') {
						if (source) return this.say("You can only specify 1 point source.");
						source = format;
					} else {
						const gameFormat = Games.getFormat(targets[i]);
						if (gameFormat) {
							if (source) return this.say("You can only specify 1 point source.");
							source = gameFormat;
						} else {
							targetUser = id;
						}
					}
				}
			}

			if (targetUser && position) return this.say("You can't specify both a username and a position.");

			const bits = Config.allowScriptedGames.includes(targetRoom.id);
			const currentPointsCache: Dict<number> = {};
			const annualPointsCache: Dict<number> = {};
			if (source) {
				for (let i = 0; i < users.length; i++) {
					let annualPoints = 0;
					if (database.leaderboard[users[i]].sources[source.id]) annualPoints += database.leaderboard[users[i]].sources[source.id];
					if (database.leaderboard[users[i]].annualSources[source.id]) annualPoints += database.leaderboard[users[i]].annualSources[source.id];
					annualPointsCache[users[i]] = annualPoints;
					currentPointsCache[users[i]] = database.leaderboard[users[i]].sources[source.id] || 0;
				}
			} else {
				for (let i = 0; i < users.length; i++) {
					annualPointsCache[users[i]] = database.leaderboard[users[i]].annual + database.leaderboard[users[i]].current;
					currentPointsCache[users[i]] = database.leaderboard[users[i]].current;
				}
			}
			const current = users.filter(x => currentPointsCache[x] !== 0).sort((a, b) => currentPointsCache[b] - currentPointsCache[a]);
			const annual = users.filter(x => annualPointsCache[x] !== 0).sort((a, b) => annualPointsCache[b] - annualPointsCache[a]);

			const results: string[] = [];
			if (position) {
				const index = position - 1;
				if (current[index]) {
					results.push("#" + position + " on the " + targetRoom.title + " " + (source ? source.name + " " : "") + "leaderboard is " + database.leaderboard[current[index]].name + " with " + (currentPointsCache[current[index]] || database.leaderboard[current[index]].current) + " " + (bits ? "bits" : "points") + ".");
				}
				if (annual[index]) {
					results.push("#" + position + " on the annual " + targetRoom.title + " " + (source ? source.name + " " : "") + "leaderboard is " + database.leaderboard[annual[index]].name + " with " + annualPointsCache[annual[index]] + " " + (bits ? "bits" : "points") + ".");
				}
				if (!results.length) return this.say("No one is #" + position + " on the " + targetRoom.title + " " + (source ? source.name + " " : "") + "leaderboard.");
			} else {
				if (!targetUser) targetUser = user.id;
				const self = targetUser === user.id;
				const currentIndex = current.indexOf(targetUser);
				const annualIndex = annual.indexOf(targetUser);
				if (currentIndex !== -1) {
					results.push((self ? "You are" : database.leaderboard[targetUser].name + " is") + " #" + (currentIndex + 1) + " on the " + targetRoom.title + " " + (source ? source.name + " " : "") + "leaderboard with " + (currentPointsCache[targetUser] || database.leaderboard[targetUser].current) + " " + (bits ? "bits" : "points") + ".");
				}
				if (annualIndex !== -1) {
					results.push((self ? "You are" : database.leaderboard[targetUser].name + " is") + " #" + (annualIndex + 1) + " on the annual " + targetRoom.title + " " + (source ? source.name + " " : "") + "leaderboard with " + annualPointsCache[targetUser] + " " + (bits ? "bits" : "points") + ".");
				}
				if (!results.length) return this.say((self ? "You are" : database.leaderboard[targetUser] ? database.leaderboard[targetUser].name : targetUser + " is") + " not on the " + targetRoom.title + " " + (source ? source.name + " " : "") + "leaderboard.");
			}
			this.say(results.join(" "));
		},
		aliases: ['points', 'bits'],
	},
	clearleaderboard: {
		command(target, room, user) {
			if (this.isPm(room) || !user.hasRank(room, 'roomowner')) return;
			if (!Storage.clearLeaderboard(room.id)) return;
			this.say("The leaderboard was cleared.");
		},
		aliases: ['resetleaderboard'],
	},
	transferdata: {
		command(target, room, user) {
			if (!this.isPm(room)) return;
			const targets: string[] = target ? target.split(",") : [];
			const targetRoom = Rooms.get(Tools.toId(targets[0]));
			if (!targetRoom) return this.say("You must specify one of " + Users.self.name + "'s rooms.");
			if (!user.isDeveloper() && !user.hasRank(targetRoom, 'roomowner')) return;
			const source = targets[1].trim();
			const destination = targets[2].trim();
			if (!Storage.transferData(targetRoom.id, source, destination)) return;
			this.say("Data from " + source + " in " + targetRoom.title + " has been successfully transferred to " + destination + ".");
			targetRoom.sayCommand("/modnote " + user.name + " transferred data from " + source + " to " + destination + ".");
		},
	},
};

export = commands;
