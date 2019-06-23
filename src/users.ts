import { Game } from "./room-game";
import { Room } from "./rooms";

export class User {
	away: boolean | null = null;
	game: Game | null = null;
	group: string | null = null;
	/** Map<Room, rank> */
	rooms = new Map<Room, string>();
	status: string | null = null;

	id: string;
	name: string;

	messageListeners?: Dict<() => void>;

	constructor(name: string, id: string) {
		this.name = name;
		this.id = id;
	}

	hasRank(room: Room, targetRank: 'voice' | 'driver' | 'moderator' | 'roomowner' | 'locked'): boolean {
		if (!this.rooms.has(room) || !(targetRank in Client.groupSymbols)) return false;
		return Client.serverGroups[this.rooms.get(room)!].ranking >= Client.serverGroups[Client.groupSymbols[targetRank]].ranking;
	}

	isDeveloper(): boolean {
		return Config.developers.includes(this.id);
	}

	say(message: string, dontPrepare?: boolean) {
		if (!dontPrepare) message = Tools.prepareMessage(message);
		if (Client.willBeFiltered(message)) return;
		Client.send("|/pm " + this.name + ", " + message);
	}

	sayCommand(command: string) {
		this.say(command, true);
	}

	on(message: string, listener: () => void) {
		if (!this.messageListeners) this.messageListeners = {};
		this.messageListeners[Tools.toId(Tools.prepareMessage(message))] = listener;
	}
}

export class Users {
	self: User;

	private users: Dict<User> = {};

	constructor() {
		this.self = this.add(Config.username);
	}

	/** Should only be used when interacting with a potentially new user (in Client) */
	add(name: string): User {
		const id = Tools.toId(name);
		if (!(id in this.users)) this.users[id] = new User(name, id);
		return this.users[id];
	}

	get(name: string): User | undefined {
		return this.users[Tools.toId(name)];
	}

	remove(user: User) {
		if (user !== this.self) delete this.users[user.id];
	}

	removeAll() {
		for (const i in this.users) {
			this.remove(this.users[i]);
		}
	}

	rename(name: string, oldId: string): User {
		if (!(oldId in this.users)) return this.add(name);
		const user = this.users[oldId];
		this.remove(user);
		const id = Tools.toId(name);
		if (id in this.users) return this.users[id];
		user.name = name;
		user.id = id;
		this.users[id] = user;
		user.rooms.forEach((value, room) => {
			if (room.game) room.game.renamePlayer(user, oldId);
			if (room.tournament) room.tournament.renamePlayer(user, oldId);
		});
		return user;
	}
}
