const _regionList = ['Kanto','Johto','Hoenn','Sinnoh','Unova','Kalos','Alola','Galar'];

const _highestAvailableRegion = 7;

const _dungeonList = [
    ["Viridian Forest","Mt. Moon","Diglett's Cave","Rock Tunnel","Rocket Game Corner","Pokémon Tower","Silph Co.","Power Plant","Seafoam Islands","Pokémon Mansion","Mt. Ember Summit","Berry Forest","Victory Road","Cerulean Cave","Ruby Path","Icefall Cave","Sunburst Island","Lost Cave","Pattern Bush","Altering Cave","Tanoby Ruins","Pinkan Mountain"],
    ["Sprout Tower","Ruins of Alph","Union Cave","Slowpoke Well","Ilex Forest","Burned Tower","Tin Tower","Whirl Islands","Mt. Mortar","Team Rocket's Hideout","Radio Tower","Ice Path","Dark Cave","Tohjo Falls","Victory Road Johto","Mt. Silver"],
    ["Petalburg Woods","Rusturf Tunnel","Granite Cave","Fiery Path","Meteor Falls","Mt. Chimney Crater","Jagged Pass","New Mauville","Weather Institute","Mt. Pyre","Magma Hideout","Aqua Hideout","Shoal Cave","Seafloor Cavern","Sealed Chamber","Cave of Origin","Sky Pillar","Victory Road Hoenn"],
    ["Oreburgh Gate","Valley Windworks","Eterna Forest","Old Chateau","Team Galactic Eterna Building","Wayward Cave","Mt. Coronet South","Solaceon Ruins","Iron Island","Lake Valor","Lake Verity","Mt. Coronet North","Lake Acuity","Team Galactic HQ","Spear Pillar","Distortion World","Victory Road Sinnoh","Sendoff Spring","Fullmoon Island","Newmoon Island","Flower Paradise","Snowpoint Temple","Stark Mountain","Hall of Origin"],
    ["Floccesy Ranch","Liberty Garden","Castelia Sewers","Relic Passage","Relic Castle","Lostlorn Forest","Chargestone Cave","Mistralton Cave","Celestial Tower","Reversal Mountain","Seaside Cave","Plasma Frigate","Giant Chasm","Cave of Being","Abundant Shrine","Victory Road Unova","Twist Mountain","Dragonspiral Tower","Moor of Icirrus","Pledge Grove","Pinwheel Forest","Dreamyard","P2 Laboratory"],
    ["Santalune Forest","Connecting Cave","Glittering Cave","Reflection Cave","Sea Spirit's Den","Kalos Power Plant","Poké Ball Factory","Lost Hotel","Frost Cavern","Team Flare Secret HQ","Terminus Cave","Pokémon Village","Victory Road Kalos"],
    ["Trainers' School","Hau'oli Cemetery","Verdant Cavern","Melemele Meadow","Seaward Cave","Ten Carat Hill","Pikachu Valley","Paniola Ranch","Brooklet Hill","Wela Volcano Park","Lush Jungle","Diglett's Tunnel","Memorial Hill","Malie Garden","Hokulani Observatory","Thrifty Megamart","Ula'ula Meadow","Po Town","Aether Foundation","Exeggutor Island Hill","Vast Poni Canyon","Mina's Houseboat","Mount Lanakila","Lake of the Sunne and Moone","Ruins of Conflict","Ruins of Life","Ruins of Abundance","Ruins of Hope","Poni Meadow","Resolution Cave"],
    ["Slumbering Weald Shrine","Galar Mine","Galar Mine No. 2","Glimwood Tangle","Rose Tower","Energy Plant","Dusty Bowl","Courageous Cavern","Brawlers Cave","Warm-Up Tunnel","Tower of Darkness","Tower of Waters","Roaring-Sea Caves","Rock Peak Ruins","Iron Ruins","Iceberg Ruins","Split-Decision Ruins","Lakeside Cave","Dyna Tree Hill","Tunnel to the Top","Crown Shrine"]
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
    'Pidgeot',
    'Detective Raichu',
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
    'Deoxys',
    'Deoxys (Attack)',
    'Deoxys (Defense)',
    'Deoxys (Speed)',
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
    'Swanna',
    'Sawsbuck (Spring)',
    'Sawsbuck (Summer)',
    'Fraxure',
    'Quilladin',
    'Chesnaught',
    'Braixen',
    'Delphox',
    'Frogadier',
    'Greninja',
    'Ash-Greninja',
    'Spewpa',
    'Vivillon (Meadow)',
    'Vivillon (Poké Ball)',
    'Vivillon (Polar)',
    'Vivillon (Tundra)',
    'Vivillon (Continental)',
    'Vivillon (Garden)',
    'Vivillon (Elegant)',
    'Vivillon (Icy Snow)',
    'Vivillon (Modern)',
    'Vivillon (Marine)',
    'Vivillon (Archipelago)',
    'Vivillon (High Plains)',
    'Vivillon (Sandstorm)',
    'Vivillon (River)',
    'Vivillon (Monsoon)',
    'Vivillon (Savanna)',
    'Vivillon (Sun)',
    'Vivillon (Ocean)',
    'Vivillon (Jungle)',
    'Floette (Yellow)',
    'Floette (Orange)',
    'Floette (White)',
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
    'Cosmoem',
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
];
