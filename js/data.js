const _regionList = ['Kanto','Johto','Hoenn','Sinnoh','Unova','Kalos','Alola','Galar'];

const _highestAvailableRegion = 7;

const _dungeonList = [
    {
        name: 'Kanto',
        region: 0,
        dungeons: [
            'Viridian Forest', 'Mt. Moon', 'Diglett\'s Cave', 'Rock Tunnel', 'Rocket Game Corner', 'Pokémon Tower',
            'Silph Co.', 'Power Plant', 'Seafoam Islands', 'Pokémon Mansion', 'Mt. Ember Summit', 'Berry Forest',
            'Victory Road', 'Cerulean Cave', 'Ruby Path', 'Icefall Cave', 'Sunburst Island', 'Lost Cave', 'Pattern Bush',
            'Altering Cave', 'Tanoby Ruins', 'Pinkan Mountain'
        ],
    },
    {
        name: 'Johto',
        region: 1,
        dungeons: [
            'Sprout Tower', 'Ruins of Alph', 'Union Cave', 'Slowpoke Well', 'Ilex Forest', 'Burned Tower', 'Tin Tower',
            'Whirl Islands', 'Mt. Mortar', 'Team Rocket\'s Hideout', 'Radio Tower', 'Ice Path', 'Dark Cave', 'Tohjo Falls',
            'Victory Road Johto', 'Mt. Silver'
        ],
    },
    {
        name: 'Hoenn',
        region: 2,
        dungeons: [
            'Petalburg Woods', 'Rusturf Tunnel', 'Granite Cave', 'Fiery Path', 'Meteor Falls', 'Mt. Chimney Crater', 'Jagged Pass',
            'New Mauville', 'Weather Institute', 'Mt. Pyre', 'Magma Hideout', 'Aqua Hideout', 'Shoal Cave', 'Seafloor Cavern',
            'Sealed Chamber', 'Cave of Origin', 'Sky Pillar', 'Victory Road Hoenn', 'Near Space'
        ],
    },
    {
        name: 'Orre',
        region: 2,
        dungeons: [
            'Phenac City Battles', 'Pyrite Town Battles', 'Pyrite Colosseum Battles', 'Pyrite Building', 'Pyrite Cave', 'Relic Cave',
            'Mt. Battle Battles', 'The Under Subway', 'Cipher Lab Battles', 'Realgam Tower Battles', 'Realgam Colosseum Battles',
            'Snagem Hideout', 'Deep Colosseum Battles', 'Phenac Stadium Battles', 'Under Colosseum Battles', 'Orre Colosseum Battles'
        ],
        hidden: true,
    },
    {
        name: 'Sinnoh',
        region: 3,
        dungeons: [
            'Oreburgh Gate', 'Valley Windworks', 'Eterna Forest', 'Old Chateau', 'Team Galactic Eterna Building', 'Wayward Cave',
            'Mt. Coronet South', 'Solaceon Ruins', 'Iron Island', 'Lake Valor', 'Lake Verity', 'Mt. Coronet North', 'Lake Acuity',
            'Team Galactic HQ', 'Spear Pillar', 'Distortion World', 'Victory Road Sinnoh', 'Sendoff Spring', 'Fullmoon Island',
            'Newmoon Island', 'Flower Paradise', 'Snowpoint Temple', 'Stark Mountain', 'Hall of Origin'
        ],
    },
    {
        name: 'Unova',
        region: 4,
        dungeons: [
            'Floccesy Ranch', 'Liberty Garden', 'Castelia Sewers', 'Relic Passage', 'Relic Castle', 'Lostlorn Forest', 'Chargestone Cave',
            'Mistralton Cave', 'Celestial Tower', 'Reversal Mountain', 'Seaside Cave', 'Plasma Frigate', 'Giant Chasm', 'Cave of Being',
            'Abundant Shrine', 'Victory Road Unova', 'Twist Mountain', 'Dragonspiral Tower', 'Moor of Icirrus', 'Pledge Grove',
            'Pinwheel Forest', 'Dreamyard', 'P2 Laboratory'
        ],
    },
    {
        name: 'Kalos',
        region: 5,
        dungeons: [
            'Santalune Forest', 'Connecting Cave', 'Glittering Cave', 'Reflection Cave', 'Sea Spirit\'s Den', 'Kalos Power Plant',
            'Poké Ball Factory', 'Lost Hotel', 'Frost Cavern', 'Team Flare Secret HQ', 'Terminus Cave', 'Pokémon Village', 'Victory Road Kalos'
        ],
    },
    {
        name: 'Alola',
        region: 6,
        dungeons: [
            'Trainers\' School', 'Hau\'oli Cemetery', 'Verdant Cavern', 'Melemele Meadow', 'Seaward Cave', 'Ten Carat Hill', 'Pikachu Valley',
            'Paniola Ranch', 'Brooklet Hill', 'Wela Volcano Park', 'Lush Jungle', 'Diglett\'s Tunnel', 'Memorial Hill', 'Malie Garden',
            'Hokulani Observatory', 'Thrifty Megamart', 'Ula\'ula Meadow', 'Po Town', 'Aether Foundation', 'Exeggutor Island Hill',
            'Vast Poni Canyon', 'Mina\'s Houseboat', 'Mount Lanakila', 'Lake of the Sunne and Moone', 'Ruins of Conflict', 'Ruins of Life',
            'Ruins of Abundance', 'Ruins of Hope', 'Poni Meadow', 'Resolution Cave'
        ],
    },
    {
        name: 'Galar',
        region: 7,
        dungeons: [
            'Slumbering Weald Shrine', 'Galar Mine', 'Galar Mine No. 2', 'Glimwood Tangle', 'Rose Tower', 'Energy Plant', 'Dusty Bowl',
            'Courageous Cavern', 'Brawlers\' Cave', 'Warm-Up Tunnel', 'Tower of Darkness', 'Tower of Waters', 'Roaring-Sea Caves',
            'Rock Peak Ruins', 'Iron Ruins', 'Iceberg Ruins', 'Split-Decision Ruins', 'Lakeside Cave', 'Dyna Tree Hill', 'Tunnel to the Top',
            'Crown Shrine'
        ],
    },
    {
        name: 'Hisui',
        region: 8,
        dungeons: [
            'Oreburrow Tunnel', 'Heartwood', 'Shrouded Ruins', 'Veilstone Cape', 'Firespit Island', 'Ancient Wayward Cave', 'Ancient Quarry',
            'Primeval Grotto', 'Clamberclaw Cliffs', 'Celestica Ruins', 'Sacred Plaza', 'Crevasse Passage', 'Avalugg\'s Legacy','Ice Column Chamber',
            'Icepeak Cavern', 'Ancient Snowpoint Temple', 'Seaside Hollow', 'Ancient Lake Verity', 'Ancient Lake Valor', 'Ancient Lake Acuity'
        ],
        hidden: true,
    },
];

const _maxIdPerRegion = [
    151, // 151 - Kanto
    251, // 100 - Johto
    386, // 135 - Hoenn
    493, // 107 - Sinnoh
    649, // 156 - Unova
    721, // 72 - Kalos
    809, // 88 - Alola
    898, // 89 - Galar
];

const _pokemonThatCannotGetEVs = [
    'Ivysaur',
    'Venusaur',
    'Charmeleon',
    'Charizard',
    'Wartortle',
    'Blastoise',
    'Bayleef',
    'Meganium',
    'Quilava',
    'Typhlosion',
    'Croconaw',
    'Feraligatr',
    'Spiky-eared Pichu',
    'Jumpluff',
    'Grovyle',
    'Sceptile',
    'Combusken',
    'Blaziken',
    'Marshtomp',
    'Swampert',
    'Cradily',
    'Pinkan Pidgeotto',
    'Pinkan Pikachu',
    'Grotle',
    'Torterra',
    'Monferno',
    'Infernape',
    'Prinplup',
    'Empoleon',
    'Staraptor',
    'Cranidos',
    'Rampardos',
    'Shieldon',
    'Bastiodon',
    'Burmy (Sand)',
    'Burmy (Trash)',
    'Wormadam (Plant)',
    'Wormadam (Sand)',
    'Wormadam (Trash)',
    'Mothim',
    'Cherrim (Overcast)',
    'Cherrim (Sunshine)',
    'Probopass',
    'Phione',
    'Servine',
    'Serperior',
    'Pignite',
    'Emboar',
    'Dewott',
    'Samurott',
    'Blitzle',
    'Darmanitan',
    'Cofagrigus',
    'Archeops',
    'Fraxure',
    'Quilladin',
    'Chesnaught',
    'Braixen',
    'Delphox',
    'Frogadier',
    'Greninja',
    'Ash-Greninja',
    'Floette (Eternal)',
    'Gogoat',
    'Aegislash (Blade)',
    'Goodra',
    'Pikachu (Partner Cap)',
    'Alolan Muk',
    'Dartrix',
    'Decidueye',
    'Torracat',
    'Incineroar',
    'Brionne',
    'Primarina',
    'Crabominable',
    'Lycanroc (Dusk)',
    'Naganadel',
    'Thwackey',
    'Rillaboom',
    'Raboot',
    'Cinderace',
    'Drizzile',
    'Inteleon',
    'Toxtricity (Amped)',
    'Toxtricity (Low Key)',
    'Cursola',
    'Runerigus',
    'Eternatus',
    'Kubfu',
    'Urshifu (Single Strike)',
    'Urshifu (Rapid Strike)',
    'Ivysaur (Clone)',
    'Spooky Ivysaur',
    'Ivysaur (Rose)',
    'Venusaur (Clone)',
    'Spooky Venusaur',
    'Venusaur (Rose)',
    'Charmeleon (Clone)',
    'Charizard (Clone)',
    'Wartortle (Clone)',
    'Blastoise (Clone)',
    'Surfing Pikachu',
    'Surprise Togepi',
    'Elf Munchlax',
    'Rotom (Discord)',
    'Sirfetch\'d',
    'Flowering Celebi',
    'Handout Happiny',
    'Giratina (Origin)',
    'Magearna (Original Color)',
    'Melmetal',
    'Zacian (Crowned Sword)',
    'Zamazenta (Crowned Shield)',
    'Magikarp Skelly',
    'Magikarp Pink Dapples',
    'Magikarp Purple Bubbles',
    'Magikarp Brown Tiger',
    'Magikarp Orange Forehead',
    'Magikarp Saucy Blue',
    'Magikarp Calico (White, Orange)',
    'Magikarp Grey Diamonds',
    'Magikarp Purple Patches',
    'Magikarp Black Mask',
    'Meta Groudon',
    'Spooky Togepi',
    'Forretress',
];
