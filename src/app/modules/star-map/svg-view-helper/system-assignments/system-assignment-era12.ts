import {MapContainer} from "./map-container";

/**
 * 1915 / 1916 PD
 */
export class SystemAssignmentEra12 extends MapContainer {
    constructor() {
        super();

        this.MIDGARD_SYSTEMS.push(
            "Alba",
            "Dalim",
            "Erainn",
            "Fafnir",
            "Fang",
            "Fuchur",
            "Mahasim",
            "Malmok",
            "Midgard",
            "Moravod",
            "Mothalla",
            "Muzikant",
            "Shangri La",
            "Valian",
        );

        this.MATAPAN_SYSTEMS.push(
            "Castula",
            "Enif",
            "Giausar",
            "Halo",
            "Meissa",
            "Monch",
            "Nekkar",
            "Phex",
            "Rana",
            "Sadalbari",
            "Unukalhai",
        );

        this.ASGARD_SYSTEMS.push(
            "Asgard",
        );

        this.MONICA_SYSTEMS.push(
            "Monica",
            "Taylor",
        );

        this.TORCH_SYSTEMS.push(
        );

        this.PHOENIX_SYSTEMS.push(
            "Hennesy",
            "Terra Haute",
        );

        this.MANTICOREAN_SYSTEMS.push(
            "Adler",
            "Alizon",
            "Asad",
            "Barnett",
            "Basilisk",
            "Candor",
            "Casca",
            "Chelsea",
            "Clairmont",
            "Clearaway",
            "Corrigan",
            "Danfeng",
            "Doreas",
            "Endicott",
            "Erewhon",
            "Foximan",
            "Franconia",
            "Garnet's Star",
            "Grendelsbane",
            "Hamal",
            "Hancock",
            "Idaho",
            "Klein Station",
            "Liberty",
            "Lowell",
            "Maastricht",
            "MacGregor",
            "Madras",
            "Manticore",
            "Marsh",
            "Matapan",
            "Mendoza",
            "Micah",
            "Minette",
            "Minorca",
            "Mylar",
            "Mylar",
            "Nightingale",
            "Nikawiy",
            "Nuada",
            "Owens",
            "Owens",
            "Paragon",
            "Poicters",
            "Quentin",
            "Quest",
            "Rasalas",
            "Reevesport",
            "Runciman",
            "SXR-136-23",
            "Sallah",
            "Samson",
            "Seabring",
            "Slocum (Haven-Sector)",
            "Suchien",
            "Sun-Yat",
            "Tahlman",
            "Talbot",
            "Talisman",
            "Tequila",
            "Thetis",
            "Treadway",
            "Trevor's Star",
            "Vishnu",
            "Vortexia",
            "Welladay",
            "Yalta",
            "Yeltsin's Star",
            "Yorik",
            "Zanzibar",
            "Zuckerman",
        );

        this.HAVENITE_SYSTEMS.push(
            "Achernar",
            "Adhara",
            "Aerion",
            "Aldhanab",
            "Ali Shar",
            "Alkaid",
            "Alkes",
            "Allman",
            "Alto Verde",
            "Atakoraka",
            "Augusta",
            "Sorbonne",
            "Barnes",
            "Belel",
            "Botein",
            "Brikiub",
            "Buna",
            "Cascabel",
            "Cerberus",
            "Chamonix",
            "Chantilly",
            "Clarke",
            "Daggan",
            "Danak",
            "Daniel",
            "Des-Moines",
            "Rousseau",
            "Dorcas",
            "Ebla",
            "Echnaton",
            "Elf",
            "Elric",
            "Fischer",
            "Flegetonte",
            "Fordyce",
            "Formosa",
            "Gar",
            "Gaston",
            "Guahayona",
            "Gualt",
            "Guniibuu",
            "Hadar",
            "Hallman",
            "Haven",
            "Helmsport",
            "Hera (Haven-Sector)",
            "Homam",
            "Hyacinth",
            "Iklil",
            "Ivanhoe",
            "J-156-18(L)",
            "Jameston",
            "Joubert",
            "Jouett",
            "Joust",
            "Karavani",
            "Lafayette",
            "La Martine",
            "Lannes",
            "Laramie",
            "De Gaulle",
            "Lern",
            "Lionrock",
            "Lorn",
            "Lovat",
            "Lowell",
            "Luminara",
            "Lyrastra",
            "Malagasy",
            "Markab",
            "Maslow",
            "Mathias",
            "Mendel",
            "Michael",
            "Mimosa",
            "Montague",
            "Morell",
            "Nanda",
            "Nanda",
            "New Calcutta",
            "Descartes",
            "Paroa",
            "Pegasus",
            "Poe",
            "Pollux",
            "Prague",
            "Ralko",
            "Refuge",
            "Revati",
            "Rutgers",
            "Santander",
            "Sarawak",
            "Secour",
            "Seljuk",
            "Sham",
            "Sheldon",
            "Shilo",
            "Solon",
            "Solway",
            "Spectre",
            "Squalus",
            "Stocum",
            "Suarez",
            "Sullah",
            "Tacoma",
            "Tambourin",
            "Tarazed",
            "Voltaire",
            "Tiber",
            "Tianyi",
            "Timir",
            "Ueshiba",
            "Yellow",
        );

        this.MALIGN_SYSTEMS.push(
            "Congo",
            "Darius",
            "Felix",
            "Galton",
            "Mesa",
            "SGC-902-36-G",
        );

        this.SILESIA_SYSTEMS.push(
            "Adelaide",
            "Allen",
            "Arendscheldt",
            "Brennan",
            "Breslau",
            "Brinkman",
            "Caldwell",
            "Carlton",
            "Caroline",
            "Carson",
            "Casimir",
            "Crawford",
            "Cresswell",
            "Creswell",
            "Cromwell",
            "Gosset",
            "Harston",
            "Heinrich's Stern",
            "Hendrikson",
            "Hera (Silesia-Sector)",
            "Hillman",
            "Horus",
            "Hume",
            "Hyatt",
            "Hyperion",
            "Jarmon",
            "Jug",
            "Krieger's Star",
            "Lau Hiler",
            "Libau",
            "Lutrell",
            "Magyar",
            "Melbourne",
            "Melchor",
            "Pandora",
            "Posnan",
            "Prism",
            "Psyche",
            "Quatre Bras",
            "Sachsen",
            "Saginaw",
            "Sandhill",
            "Sarah",
            "Schiller",
            "Sharon's Star",
            "Sigma",
            "Silesia",
            "Slocum (Silesia-Sector)",
            "Telmach",
            "Terrance",
            "Trautman's Star",
            "Trellis",
            "Tumult",
            "Tyler's Star",
            "Walther",
            "Willis",
            "Zoraster",
        );

        this.ANDERMANI_SYSTEMS.push(
            "Acrux",
            "Alzirr",
            "Angelique",
            "Babel",
            "Cantiz",
            "Durandel",
            "Electron",
            "Getout",
            "Gregor",
            "Irrlicht",
            "Kaewkosin",
            "Mischa's-Star",
            "Mpingo",
            "New Berlin",
            "Nimbalkar",
            "Sligo",
            "Solithra",
            "Tomlinson",
            "Tupi",
            "Umbraea",
        );

        this.SOLARIAN_SYSTEMS.push(
            "70 Virginis",
            "Aflaandacs",
            "Air",
            "Alcyone",
            "Alkaphrah",
            "Alsephina",
            "Altair",
            "Angetenar",
            "Aniara",
            "Antares",
            "Aquaria",
            "Asellus Secundus",
            "Asterope",
            "BS-712-19-6",
            "Babiiha",
            "Balthazar",
            "Barnard's Star",
            "Diné",
            "Belenos",
            "Bessie",
            "Black",
            "Bootstrap",
            "Boyle",
            "Broadhurst",
            "Cachalot",
            "Canis Minoris",
            "Cape Susette",
            "Casulli",
            "Chalawan",
            "Chamukuy",
            "Chattanooga",
            "Chen",
            "Clarence",
            "Cohagen",
            "Comstock",
            "Cooper",
            "Crux",
            "Cyclops",
            "Danube",
            "Delilah's Navel",
            "Delta Draconis",
            "Delta Pavonis",
            "Delvecchio",
            "Denver",
            "Dickerson",
            "Dilmun",
            "Volan",
            "Dzung",
            "Epsilon Eridani",
            "Epsilon Indi",
            "Epsilon Virgo",
            "Eris",
            "Eta Cassiopeiae",
            "Exapia",
            "Franzeki",
            "Galen",
            "Ganesh",
            "Gorbacev",
            "Grafton",
            "Groombridge",
            "Carthage",
            "Heimdall",
            "Hesier",
            "Hirochi",
            "Betazed",
            "Hope",
            "Hound's Eye",
            "Hypatia",
            "Innes' Star",
            "Istvan",
            "Josephine",
            "Joshua",
            "Joshua",
            "Kapteyn's Star",
            "Katharina",
            "Kaus Borealis",
            "Kenichi",
            "Kenniac",
            "Kismet",
            "Klondike",
            "Kruger",
            "Lacille",
            "Landfall",
            "Lucas",
            "Lucastra",
            "Luyten's Star",
            "Lynda",
            "Lytton",
            "Madeleine",
            "Mahsati",
            "Maize",
            "Mannerheim",
            "Matagorda",
            "Matza",
            "Maxwell",
            "Mazaalai",
            "Mendelschon",
            "Merak",
            "Meyerdahl",
            "Mira",
            "Mirfak",
            "Mithra",
            "Algeria",
            "New Bombay",
            "New Orkney",
            "Nova Heights",
            "Oceana",
            "Ophiuchi",
            "Pipoltr",
            "Preston",
            "Procyon",
            "Proxima Centauri",
            "Regulus",
            "Retrict",
            "Tsalagi",
            "Roulette",
            "Sandalwood",
            "Sarduchi",
            "Sarin",
            "Sasebo",
            "Schedar",
            "Seacrest",
            "Sebastopol",
            "Shenandoah",
            "Sheratan",
            "Shingaine",
            "Shiva",
            "Siegfried",
            "Sigma Draconis",
            "Sirius",
            "Snyder",
            "Sol",
	    "Solschenizyn",
            "Stardrifter",
            "Startman",
            "Hammerfest",
            "Stine",
            "Stotterman",
            "Strathmore",
            "Sugano",
            "Tasmania",
            "Tau Ceti",
            "Tau Delta",
            "Templar",
            "Theseus",
            "Thrace",
            "Titania",
            "Toebean",
            "Traccora",
            "Trombone",
            "Van Maanen's Star",
            "Van Mook",
            "Viorginis B",
            "Virginis A",
            "Visigoth",
            "Volan",
            "Warner",
            "Westermann A",
            "Westermann B",
            "Winepress",
            "Yasotaro",
            "Yildun",
            "Zavijava",
            "Zubenelgenubi",
        );

        this.SOLARIAN_PROTECTORATES_SYSTEMS.push(
            "Ain",
            "Ajax",
            "Ajif",
            "Akron",
            "Alcor",
            "Aleria",
            "Altara",
            "Alterf",
            "Ankaa",
            "Anomaly",
            "Any Port",
            "Aral",
            "Arcturus",
            "Artesia", 
            "Asellus Primus",
            "Astophel",
            "Atria",
            "Azha",
	    "Balcescu",
            "Basra",
            "Beid",
            "Borman",
            "Bryant",
            "Calpurnia",
            "Carol's Star",
            "Cebalrai",
            "Celaeno",
            "Chason",
            "Cleopatra",
            "Conestoga",
            "Conrad's Star",
            "Custis",
            "Dickinson",
            "Dillard",
            "Dingolay",
            "Dockhorn",
            "Edwin",
            "Elgafar",
            "Even Star",
            "Farley's Crossing",
            "Filetdor",
            "Foshee",
            "Golem",
            "Heritage",
            "Hilt 452",
            "Howard",
            "Imai",
            "Anzio",
            "Isaac",
            "Johansen",
            "Jubilee",
            "Keid",
            "Koeia",
            "Koit",
            "Kumang",
            "Kurasawa",
            "Larawag",
            "Lima",
            "Limbo",
            "Line",
            "Loomis",
            "Macondo",
            "Mary",
            "Maya",
            "McIntosh",
            "Meridiana",
            "Meroa",
            "Metropol",
            "Meyers",
            "Mfecane",
            "Mobius",
            "Mullins",
            "Mura",
            "Murray",
            "Muscida",
            "Naledi",
            "Nasti",
            "Nihal",
            "Nolan",
            "Nosaxa",
            "Nushagak",
            "Okada",
            "Phecda",
            "Poul",
            "Prime",
	    "Randal",
            "Rasalgethi",
            "Rasmussen",
            "Reach",
            "Relic",
            "Robert",
            "Rosaliadecastro",
            "Sadr",
            "Saltash",
            "Sankar",
            "San Sebastian",
            "Sarretti",
            "Scheat",
            "Seginus",
            "Seraphim",
            "Shanghai",
            "Slaivrac",
            "Sondermann's Star",
            "Sprague",
            "Sualocin",
            "Suhail",
            "Swallow",
            "Syou-tang",
            "Tania Australis",
            "Uhura",
            "Venice",
            "Visegrad",
            "Vrud",
            "Waterfall",
            "White",
            "Wincote",
            "Włocławek",
            "Zaniah",
        );
    }
}



