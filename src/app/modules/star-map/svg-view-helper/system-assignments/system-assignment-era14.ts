import {MapContainer} from "./map-container";

/**
 * 1919 /1920 PD
 */
export class SystemAssignmentEra14 extends MapContainer {
    constructor() {
        super();

        this.MIDGARD_SYSTEMS.push(
            "Midgard", "Fafnir", "Mothalla", "Dalim", "Alba", "Moravod", "Malmok", "Fuchur", "Mahasim",
            "Fang", "Erainn", "Muzikant", "Shangri La", "Valian"
        );

        this.MATAPAN_SYSTEMS.push(
            "Rana", "Nekkar", "Giausar", "Enif", "Halo", "Monch", "Phex", "Castula", "Unukalhai", "Meissa",
            "Sadalbari"
        );

        this.ASGARD_SYSTEMS.push(
            "Asgard", "Alrakis", "Asellus Australia", "Heze", "Aurara", "Gloas", "Theemin", "Klaus Media",
            "Inquill", "Deneb Algedi", "Dschubba", "Gomeisa", "Baekdu", "Poerava",
        );

        this.MONICA_SYSTEMS.push(
            "Monica", "Taylor"
        );

        this.TORCH_SYSTEMS.push(
            "Congo"
        );

        this.PHOENIX_SYSTEMS.push(
            "Terra Haute", "Hennesy"
        );

        this.MANTICOREAN_SYSTEMS.push(
            "Zuckerman", "Yorik", "Basilisk", "Endicott", "Yeltsin's Star",
            "Nuada", "Matapan",
            "Quentin", "Clearaway", "Quest",
            "Hancock", "Reevesport", "Doreas", "Manticore",

            "Zanzibar", "Alizon", "Klein Station", "Poicters", "Casca",
            "Minorca", "Minette", "Candor", "Talisman",
            "Idaho", "Marsh", "Suchien", "Yalta", "Trevor's Star",

            "Rembrandt", "Celebrant", "Dresden", "Lynx", "Mainwaring", "Montana", "New Tuscany",
            "Nuncio", "Pequod", "Prairie", "Marian", "Redoubt",
            "San Miguel", "Scarlet", "Spindle", "Split", "Talbott", "Tillerman", "Lynx B (Terminus)",

            "Willis", "Hendrikson", "Jarmon", "Terrance", "Tumult", "Sarah", "Carlton", "Silesia",
            "Hillman", "Lutrell", "Hera (Silesia-Sector)", "Harston", "Melbourne",
            "Saginaw", "Sachsen", "Prism", "Casimir", "Trautman's Star", "Hyatt", "Krieger's Star",
            "Melchor", "Hyperion", "Horus", "Crawford",
            "Caldwell", "Allen", "Brennan", "Adelaide", "Carson", "Caroline"
        );

        this.HAVENITE_SYSTEMS.push(
            "Suarez", "Danak", "Santander", "Joust", "Alto Verde", "Michael",
            "Shilo", "Fordyce", "Lorn", "Pegasus", "Prague", "Montague",
            "Chantilly", "Solan", "Augusta", "Jameston", "Rutgers", "Hallman",
            "Paroa", "Secour", "Sullah", "Karavani",
            "Des-Moines", "Solon", "Clarke", "Lovat",
            "Lowell", "Mathias", "Sheldon", "Gualt",
            "Gaston", "Tambourin", "Squalus", "Helmsport", "Seljuk", "Laramie", "Haven",
            "Jouett", "Refuge", "Morell", "New Calcutta", "Malagasy", "Hera (Haven-Sector)",
            "Lannes", "Maslow", "Elric", "Solway", "Hyacinth",

            "Barnes", "Cerberus",
            "Nanda", "Fischer", "Tarazed", "Buna", "Mimosa", "Alkes", "Achernar", "Adhara", "Aerion",
            "Ivanhoe", "Chamonix", "Mendel", "Azelfafage", "Alkaid", "Aldhanab", "Ali Shar",
            "Alkaid", "Alkes", "Allman", "Augusta", "Azelfafage",
            "Barnes", "Belel", "Botein", "Brikiub", "Buna", "Cascabel", "Cerberus",
            "Daniel", "Des Moines", "Dombay", "Echnaton", "Elf", "Fischer", "Fordyce",
            "Formosa", "Gar", "Gaston", "Guahayona", "Gualt", "Guniibuu", "Hallman",
            "Homam", "Iklil", "Ivanhoe", "Joubert", "Joust",
            "Leopard", "Lionrock", "Lovat", "Luminara", "Lyrastra",
            "Markab", "Mathias", "Mendel", "Michael",
            "Pollux", "Revati", "Spectre", "Secour",
            "Seljuk", "Sham", "Slocum (Haven-Sector)", "Tacoma",
            "Tambourin", "Tarazed", "Taygeta", "The Lip", "Thetis", "Tianyi", "Timir",
            "Chamonix", "Nova Astra", "Clarke", "Jameston", "Karavani", "Lannes", "Lern", "Laramie",
            "La Martine", "Lorn", "New Calcutta", "Paroa", "Pegasus", "Yellow", "Shilo", "Danak",
            "Alto Verde", "Rutgers", "Sheldon", "Sullah", "Jouett", "Maslow",
            "Poe", "Malagasy", "Stocum", "Flegetonte", "Montague", "Daggan", "MacGregor",
            "Nanda", "Sarawak", "Ueshiba", "J-156-18(L)", "Atakoraka", "Ebla", "Hadar", "Dorcas", "Ralko",

            "Chelsea", "Mendoza", "Clairmont", "Talbot", "Treadway", "Micah", "Danfeng", "Liberty", "Sallah", "Adler", "Vishnu", "Rasalas",
            "Madras", "Corrigan", "Vortexia", "Sun-Yat", "Paragon", "Samson", "Runciman", "Franconia", "Lowell", "Thetis", "Nightingale",
            "Welladay", "Hamal", "Seabring", "Asad", "Barnett", "Owens", "MacGregor", "Foximan", "Mylar", "Nikawiy", "Owens", "Maastricht",
            "Tahlman", "Tequila", "Mylar", "Slocum (Haven-Sector)", "Garnet Star", "SXR-136-23",
        );

        this.MALIGN_SYSTEMS.push(
            "Galton", "Felix", "SGC-902-36-G", "Darius", "Mesa"  
        );

        this.SILESIA_SYSTEMS.push(
            
        );

        this.ANDERMANI_SYSTEMS.push(
            "Nimbalkar", "Gregor", "Cantiz", "Durandel", "Angelique", "Tomlinson", "Sligo", "New Berlin",
            "Tomlinson", "Mischa's-Star", "Irrlicht", "Babel",

            "Getout", "Kaewkosin", "Solithra", "Acrux", "Electron", "Mpingo", "Tupi", "Alzirr", "Umbraea",

            "Sachsen", "Trellis", "Slocum (Silesia-Sector)", "Schiller", "Magyar", "Zoraster", "Walther", "Psyche", "Cresswell",
            "Sharon's Star", "Posnan", "Libau", "Gosset", "Breslau", "Hume", "Sandhill", "Lau Hiler", "Telmach", "Arendscheldt",
            "Sigma", "Brinkman", "Schiller", "Posnan", "Sigma", "Creswell", "Tyler's Star", "Cromwell", "Pandora"
        );

        this.SOLARIAN_SYSTEMS.push(
            "Sigma Draconis", "Hypatia", "Meyerdahl", "Farley's Crossing", "Kenichi", "Tau Ceti", "Tau-Delta", "Templar",
            "Galen", "Joshua", "Sankar", "Stotterman", "Mendelschon", "Heimdall",
            "Tasmania", "Dzung", "70 Virginis", "Lima", "Lucas", "Strathmore", "Hirochi",
            "Epsilon Eridani", "Trombone", "Sebastopol", "Mithra", "Cyclops", "Seacrest",
            "Chattanooga", "Lucastra", "Eris", "Sol", "Stine",

            "Aflaandacs", "Alcyone", "Alkaphrah", "Altair", "Angetenar", "Aniara", "Anomaly", "Antares", "Asellus Secundus",
            "Barnard's Star", "Belenos", "Black", "Canis Minoris", "Casulli", "Chamukuy", "Chen", "Cleopatra", "Cohagen", "Delilah's Navel",
            "Delta Pavonis", "Dilmun", "Dogma", "Epsilon Indi", "Groombridge", "Homebrew", "Hound's Eye", "Innes' Star", "Joshua",
            "Kapteyn's Star", "Kaus Borealis", "Kruger", "Lacille", "Luyten's Star", "Matza", "Mazaalai", "Merak", "Mira", "Muliphein", "Nova Heights",
            "Pipoltr", "Procyon", "Proxima Centauri", "Regulus", "Retrict", "Rho Apod", "Rosaliadecastro", "Sarin", "Sasebo", "Schedar", "Shenandoah",
            "Sheratan", "Shiva", "Sirius", "Stardrifter", "Sterrennacht", "Sugano", "Toebean", "Van Maanen's Star",
            "Viorginis B", "Virginis A", "White", "Zavijava", "Zubenelgenubi", "Hilt 452", "Aquaria", "Westermann B", "Westermann A", "Cape Susette",
            "HD 526389",
            "Calpurnia", "Delvecchio", "Katharina", "Roulette", "Startman", "Titania", "Balthazar", "Bootstrap", "Boyle", "Broadhurst", "Cachalot", "BS-712-19-6",
            "Nolan", "Cooper", "Danube", "Delta Draconis", "Eta Cassiopeiae", "Exapia", "Chalawan", "Hesier", "Istvan", "Kenniac", "Kismet", "Klondike", "Landfall",
            "Lytton", "Baten Kaitos", "Madeleine", "Clarence", "Asterope", "Preston", "Sandalwood", "Shingaine", "Siegfried", "Snyder", "Tau Delta",
            "Theseus", "Traccora", "Van Mook", "Winepress", "Grafton", "Yarrow", "Yasotaro", "Ganesh", "Alsephina", "Dickerson", "Ophiuchi", "Maize",
            "Air", "Hope", "Mary", "Crux", "Mirfak", "Mahsati", "Sarduchi", "Warner", "Lynda",
            "Mobius", "McIntosh", "Kumang", "Włocławek", "Golem",
            "Syou-tang", "Shanghai", "Tania Australis", "Borman", "Babiiha", "Larawag", "Scheat", "Ajif", "Heritage", "Suhail", "Rasalgethi", "Josephine", 
	    
	    "New Orkney", "Oceana", "Visigoth", "Denver", "Maxwell", "Line", "Matagorda", "Mannerheim", "Thrace", "Comstock", "New Bombay"
        );
    }
}
