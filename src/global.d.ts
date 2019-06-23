import { Client } from './client';
import { CommandParser, CommandsDict } from './command-parser';
import * as config from './config';
import { Dex} from './dex';
import { Games } from './games';
import { Rooms } from './rooms';
import { Storage } from './storage';
import { Tools } from './tools';
import { Tournaments } from './tournaments';
import { Users } from './users';
import { TTT } from './TTT';

declare global {
	const Client: Client;
	const CommandParser: CommandParser;
	const Commands: CommandsDict;
	const Config: typeof config;
	const Dex: Dex;
	const Games: Games;
	const Rooms: Rooms;
	const Storage: Storage;
	const Tools: Tools;
	const Tournaments: Tournaments;
	const Users: Users;
  const TTT: TTT;
}
