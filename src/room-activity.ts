import { Room } from "./rooms";
import { User } from "./users";

export class Player {
	active: boolean | null = null;
	/** The player either left or got eliminated during gameplay; can no longer perform any actions */
	eliminated: boolean | null = null;
	/** The player can temporarily not perform any actions */
	frozen: boolean | null = null;
	losses: number | null = null;

	id: string;
	readonly activity: Activity;
	name: string;

	constructor(user: User | string, activity: Activity) {
		if (typeof user === 'string') {
			this.id = Tools.toId(user);
			this.name = user;
		} else {
			this.id = user.id;
			this.name = user.name;
		}
		this.activity = activity;
	}

	say(message: string) {
		const user = Users.get(this.name);
		if (user) user.say(message);
	}

	sayHtml(html: string) {
		this.activity.pmRoom.pmHtml(this, html);
	}

	sayUhtml(html: string, id?: string) {
		let uhtmlId = this.activity.uhtmlId || this.activity.id;
		if (id) uhtmlId += id;
		this.activity.pmRoom.pmUhtml(this, uhtmlId, html);
	}

	sayUhtmlChange(html: string, id?: string) {
		let uhtmlId = this.activity.uhtmlId || this.activity.id;
		if (id) uhtmlId += id;
		this.activity.pmRoom.pmUhtmlChange(this, uhtmlId, html);
	}
}

export abstract class Activity {
	readonly activityType: string = '';
	readonly createTime: number = Date.now();
	playerCount: number = 0;
	readonly players: Dict<Player> = {};
	showSignupsHtml: boolean = false;
	signupsHtmlTimeout: NodeJS.Timer | null = null;
	started: boolean = false;
	startTime: number = 0;
	timeout: NodeJS.Timeout | null = null;

	// set in initialize()
	id!: string;
	name!: string;

	uhtmlId?: string;

	readonly room: Room | User;
	readonly pm: boolean;
	readonly pmRoom: Room;

	constructor(room: Room | User, pmRoom?: Room) {
		this.room = room;
		this.pm = pmRoom && room !== pmRoom ? true : false;
		this.pmRoom = this.isPm(room) ? pmRoom! : room;
	}

	isPm(room: Room | User): room is User {
		return this.pm;
	}

	createPlayer(user: User | string): Player | void {
		const id = Tools.toId(user);
		if (id in this.players) return;
		const player = new Player(user, this);
		this.players[id] = player;
		this.playerCount++;
		return player;
	}

	renamePlayer(user: User, oldId: string) {
		if (!(oldId in this.players) || (user.id in this.players && this.players[user.id].id !== user.id)) return;
		const player = this.players[oldId];
		player.name = user.name;
		if (player.id === user.id) return;
		player.id = user.id;
		delete this.players[oldId];
		this.players[player.id] = player;
		if (this.onRenamePlayer) this.onRenamePlayer(player, oldId);
	}

	destroyPlayer(user: User | string): Player | void {
		const id = Tools.toId(user);
		if (!(id in this.players)) return;
		const player = this.players[id];
		if (this.started) {
			this.players[id].eliminated = true;
		} else {
			delete this.players[id];
			this.playerCount--;
		}
		return player;
	}

	start() {
		this.started = true;
		this.startTime = Date.now();
		if (this.getSignupsHtml && this.showSignupsHtml) this.sayUhtmlChange(this.getSignupsHtml(), "signups");
		if (this.onStart) this.onStart();
	}

	end() {
		if (this.timeout) clearTimeout(this.timeout);
		if (this.onEnd) this.onEnd();
		this.deallocate();
	}

	say(message: string) {
		this.room.say(message);
	}

	sayHtml(html: string) {
		if (this.isPm(this.room)) return this.pmRoom.pmHtml(this.room, html);
		this.room.sayHtml(html);
	}

	sayUhtml(html: string, id?: string) {
		let uhtmlId = this.uhtmlId || this.id;
		if (id) uhtmlId += '-' + id;
		if (this.isPm(this.room)) return this.pmRoom.pmUhtml(this.room, uhtmlId, html);
		this.room.sayUhtml(uhtmlId, html);
	}

	sayUhtmlChange(html: string, id?: string) {
		let uhtmlId = this.uhtmlId || this.id;
		if (id) uhtmlId += '-' + id;
		if (this.isPm(this.room)) return this.pmRoom.pmUhtmlChange(this.room, uhtmlId, html);
		this.room.sayUhtmlChange(uhtmlId, html);
	}

	on(message: string, listener: () => any) {
		this.room.on(message, listener);
	}

	getRemainingPlayers(): Dict<Player> {
		const remainingPlayers: Dict<Player> = {};
		for (const i in this.players) {
			if (this.players[i].eliminated || this.players[i].frozen) continue;
			remainingPlayers[i] = this.players[i];
		}
		return remainingPlayers;
	}

	getRemainingPlayerCount(remainingPlayers?: Dict<Player>): number {
		if (remainingPlayers) return Object.keys(remainingPlayers).length;
		return Object.keys(this.getRemainingPlayers()).length;
	}

	getPlayerNames(players?: Dict<Player> | Player[] | Map<Player, any>): string {
		if (!players) {
			if (this.started) {
				players = this.getRemainingPlayers();
			} else {
				players = this.players;
			}
		}
		const names: string[] = [];
		if (Array.isArray(players)) {
			for (let i = 0; i < players.length; i++) {
				names.push(players[i].name);
			}
		} else if (players instanceof Map) {
			players.forEach((value, player) => {
				names.push(player.name);
			});
		} else {
			for (const i in players) {
				names.push(players[i].name);
			}
		}
		return names.join(", ");
	}

	abstract deallocate(): void;
	abstract forceEnd(user?: User): void;

	getSignupsHtml?(): string;
	onEnd?(): void;
	onForceEnd?(user?: User): void;
	onRenamePlayer?(player: Player, oldId: string): void;
	onStart?(): void;
}
