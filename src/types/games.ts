import { ICommandDefinition } from "../command-parser";
import { UserHosted } from "../games/templates/user-hosted";
import { Game } from "../room-game";
import { Room } from "../rooms";
import { User } from "../users";

interface IGameClass<T> {
	new(room: Room | User, pmRoom?: Room): T;
	loadData?(room: Room | User): void;
}

export interface IGameFile<T extends Game = Game> {
	readonly class: IGameClass<T>;
	readonly description: string;
	readonly name: string;

	aliases?: string[];
	commands?: Dict<ICommandDefinition<T>>;
	readonly commandDescriptions?: string[];
	readonly freejoin?: boolean;
	/** Legacy names, such as from before game mascots were introduced; used for aliases */
	formerNames?: string[];
	readonly mascot?: string;
	readonly mascots?: string[];
	minigameCommand?: string;
	readonly minigameDescription?: string;
	readonly modes?: string[];
	readonly scriptedOnly?: boolean;
	readonly variants?: IGameVariant[];
}

export interface IGameVariant {
	readonly name: string;
	readonly variant: string;

	readonly description?: string;
	variantAliases?: string[];
}

export interface IUserHostedFile<T extends UserHosted = UserHosted> {
	readonly class: IGameClass<T>;
	readonly formats: IUserHosted[];
}

interface IUserHosted {
	readonly description: string;
	readonly name: string;

	aliases?: string[];
	readonly approvedHostOnly?: boolean;
	readonly formerNames?: string[];
	readonly freejoin?: boolean;
	readonly mascot?: string;
	readonly mascots?: string[];
}

export interface IUserHostedComputed<T extends UserHosted = UserHosted> extends IUserHosted {
	readonly class: IGameClass<T>;
	readonly id: string;
}

export interface IUserHostedFormatComputed {
	readonly effectType: 'UserHostedFormat';
	inputOptions: Dict<number>;
}

export interface IUserHostedFormat extends IUserHostedComputed, IUserHostedFormatComputed {}

export interface IGameFileComputed extends IGameFile {
	readonly id: string;
}

export interface IGameFormatComputed {
	readonly effectType: 'GameFormat';
	inputOptions: Dict<number>;

	readonly mode?: IGameMode;
	readonly variant?: IGameVariant;
}

export interface IGameModeFile<T = Game, U extends Game = Game> {
	readonly description: string;
	initialize: (game: Game) => void;
	readonly name: string;
	readonly naming: 'prefix' | 'suffix';

	aliases?: string[];
	readonly commands?: Dict<ICommandDefinition<T & U>>;
}

export interface IGameMode extends IGameModeFile {
	readonly id: string;
}

export interface IGameFormat extends IGameFileComputed, IGameFormatComputed {}
