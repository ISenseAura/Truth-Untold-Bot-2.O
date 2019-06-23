/**
 * Hours are in the same timezone as wherever Lanette is running
 */
const schedules: Dict<{months: Dict<Dict<string>>, times: [number, number][]}> = {
	'tournaments': {
		months: {
			'6': {
				'1': 'gen7ou',
				'2': 'gen7randombattle',
				'3': 'gen7uu',
				'4': 'gen7monotype',
				'5': 'gen7ru',
				'6': 'gen7anythinggoes',
				'7': 'gen7nu',
				'8': 'gen71v1',
				'9': 'gen7pu',
				'10': 'gen7cap',
				'11': 'gen7zu',
				'12': 'gen7battlespotsingles',
				'13': 'gen7ubers',
				'14': 'gen7mixandmega',
				'15': 'gen7lc',
				'16': 'gen7almostanyability',
				'17': 'gen7doublesou',
				'18': 'gen7camomons',
				'19': 'gen7vgc2019ultraseries',
				'20': 'gen7partnersincrime',
				'21': 'gen7ou',
				'22': 'gen7randombattle',
				'23': 'gen7uu',
				'24': 'gen7monotype',
				'25': 'gen7ru',
				'26': 'gen7anythinggoes',
				'27': 'gen7nu',
				'28': 'gen71v1',
				'29': 'gen7pu',
				'30': 'omotm',
			},
		},
		times: [[2, 30], [9, 30], [15, 30], [20, 30]],
	},
	'toursplaza': {
		months: {
			'6': {
				'1': 'gen7almostanyability@@@Same Type Clause,Stabmons Move Legality,-OU,-UUBL,-UU,-RUBL,-RU,-Extreme Speed,-Geomancy,-Belly Drum,-Shell Smash,-Aegislash,-Genesect,-Landorus,-Naganadel,-Metagross-Mega',
				'2': 'gen6battlefactory@@@!Team Preview',
				'3': 'gen5lc@@@Item Clause',
				'4': 'gen6ubers@@@-Groudon-Primal,-Red Orb,-Kyogre-Primal,-Blue Orb,-Yveltal,-Xerneas',
				'5': 'gen7zu',
				'6': 'gen4ou',
				'7': 'gen7monotype@@@-Sharpedo-Mega,-Diancie-Mega,-Venusaur-Mega,-Gallade-Mega',
				'8': 'gen3ou@@@-Snorlax,-Zapdos,-Suicune,-Chansey,-Celebi,-Metagross',
				'9': 'gen71v1@@@-Aloraichium Z,-Buginium Z,-Darkinium Z,-Decidium Z,-Dragonium Z,-Eevium Z,-Electrium Z,-Fairium Z,-Fightinium Z,-Firium Z,-Flyinium Z,-Ghostium Z,-Grassium Z,-Groundium Z,-Icium Z,-Incinium Z,-Kommonium Z,-Lunalium Z,-Lycanium Z,-Marshadium Z,-Mewnium Z,-Mimikium Z,-Normalium Z,-Pikanium Z,-Pikashunium Z,-Poisonium Z,-Primarium Z,-Psychium Z,-Rockium Z,-Snorlium Z,-Solganium Z,-Steelium Z,-Tapunium Z,-Ultranecrozium Z,-Waterium Z',
				'10': 'gen7uu',
				'11': 'gen7ru@@@+RUBL',
				'12': 'gen7almostanyability@@@+Zygarde,+Power Construct,+Xerneas,+Yveltal',
				'13': 'gen7randombattle@@@Inverse Mod',
				'14': 'gen6ou@@@-Metagross-Mega,-Heatran,+Blaziken-Mega,+Aegislash',
				'15': 'gen7doublesuu@@@+Tapu Lele,+Tapu Koko,+Tapu Bulu,+Tapu Fini',
				'16': 'gen7ou@@@-Spikes,-Toxic Spikes,-Stealth Rock,-Sticky Web',
				'17': 'gen7lcuu',
				'18': 'gen7almostanyability@@@-OU,-UUBL,-UU,-RUBL,-Aegislash,-Genesect,-Landorus,-Naganadel,-Metagross-Mega',
				'19': 'omotm',
				'20': 'gen7mixandmega@@@-Blue Orb,-Red Orb',
				'21': 'gen7stabmons',
				'22': 'gen6anythinggoes',
				'23': 'gen7pu@@@+Audino-Mega,+Glalie-Mega,+Gallade',
				'24': 'gen7doublesou@@@-Tapu Koko,-Tapu Fini,-Tapu Bulu,-Tapu Lele',
				'25': 'omotm2',
				'26': 'gen5ubers@@@-Choice Scarf,-Choice Band,-Choice Specs',
				'27': 'gen7nu@@@+Ribombee,+Vanilluxe,+Venusaur',
				'28': 'gen3randombattle',
				'29': 'gen7uu@@@-Blissey,-Pyukumuku,-Quagsire,-Mantine,-Gligar,-Alomomola,-Amoonguss,-Suicune',
				'30': 'gen7battlefactory',
			},
		},
		times: [[5, 30], [12, 30], [18, 30], [23, 30]],
	},
};

export = schedules;
