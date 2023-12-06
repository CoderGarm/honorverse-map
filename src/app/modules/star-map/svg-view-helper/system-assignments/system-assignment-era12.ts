import {MapContainer} from "./map-container";

/**
 * 1915 / 1916 PD
 */
export class SystemAssignmentEra12 extends MapContainer{
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

        );

        this.PHOENIX_SYSTEMS.push(
            "Terra Haute", "Hennesy"
        );

        this.MANTICOREAN_SYSTEMS.push(
            "Zuckerman", "Yorik", "Basilisk", "Endicott", "Yeltsin's Star",
            "Marian", "Nuada", "Matapan",
            "Quentin", "Clearaway", "Redoubt", "Quest",
            "Hancock", "Reevesport", "Doreas", "Manticore",

            "Zanzibar", "Alizon", "Klein Station", "Poicters", "Casca",
            "Grendelsbane", "Minorca", "Minette", "Candor", "Talisman",
            "Erewhon", "Idaho", "Marsh", "Suchien", "Yalta",

            "Chelsea", "Mendoza", "Clairmont", "Talbot", "Treadway", "Micah",
            "Danfeng", "Liberty", "Sallah", "Adler", "Vishnu", "Rasalas",
            "Madras", "Corrigan", "Vortexia", "Sun-Yat", "Paragon", "Samson", "Runciman",
            "Franconia", "Lowell", "Thetis", "Nightingale",
            "Welladay", "Hamal", "Seabring", "Asad", "Trevor's Star", "Barnett",
            "Owens", "MacGregor", "Foximan", "Mylar", "Nikawiy", "Owens", "Maastricht",
            "Tahlman", "Tequila", "Mylar", "Slocum (Haven-Sector)", "Garnet's Star", "SXR-136-23",
        );

        this.HAVENITE_SYSTEMS.push(
            "Suarez", "Danak", "Santander", "Joust", "Alto Verde", "Michael",
            "Shilo", "Fordyce", "Lorn", "Pegasus", "Prague", "Montague",
            "Chantilly", "Solan", "Augusta", "Jameston", "Rutgers", "Hallman",
            "Paroa", "Secour", "Sullah", "Karavani",
            "Des-Moines", "Solon", "Clarke", "Lovat",
            "Lowell", "Mathias", "Sheldon", "Tarragon", "Gualt",
            "Gaston", "Tambourin", "Squalus", "Helmsport", "Seljuk", "Laramie", "Haven",
            "Jouett", "Refuge", "Morell", "New Calcutta", "Malagasy", "Hera (Haven-Sector)",
            "Lannes", "Maslow", "Elric", "Solway", "Hyacinth",

            "Barnes", "Cerberus",
            "Nanda", "Fischer", "Tarazed", "Buna", "Mimosa", "Alkes", "Achernar", "Adhara", "Aerion",
            "Ivanhoe", "Chamonix", "Mendel", "Azelfafage", "Alkaid", "Aiolos", "Aldhanab", "Ali Shar",
            "Alkarab", "Allman", "Alpherg", "Astral Fields", "Augusta",
            "Bannerman", "Barnes", "Belel", "Botein", "Brikiub", "Buna", "Cascabel", "Cerberus",
            "Daniel", "Des Moines", "Dombay", "Echnaton", "Elf", "Fischer",
            "Formosa", "Gar", "Gaston", "Guahayona", "Gualt", "Guniibuu", "Hallman",
            "Homam", "Iklil", "Ivanhoe", "Joubert", "Joust",
            "Leopard", "Lionrock", "Lovat", "Lucilinburhuc", "Luminara", "Lyrastra",
            "Markab", "Mathias", "Mendel", "Merope", "Mesarthim", "Michael", "Nebulae",
            "Pollux", "Ran", "Revati", "Spectre", "Secour",
            "Sham", "Slocum (Haven-Sector)", "Smoky", "Tacoma",
            "Tambourin", "Tarazed", "Taygeta", "The Lip", "Tianyi", "Timir",
            "Zhang", "Chamonix", "Nova Astra", "Clarke", "Jameston", "Karavani", "Lannes", "Lern", "Laramie",
            "La Martine", "Lorn", "New Calcutta", "Paroa", "Pegasus", "Yellow", "Shilo", "Danak",
            "Alto Verde", "Rutgers", "Sheldon", "Sullah", "Jouett", "Morell", "Maslow",
            "Poe", "Malagasy", "Stocum", "Flegetonte", "Montague", "Daggan",
            "Nanda", "Sarawak", "Ueshiba", "J-156-18(L)", "Atakoraka", "Ebla", "Hadar", "Dorcas", "Ralko",
        );

        this.MALIGN_SYSTEMS.push(
            "New Orkney", "Oceana", "Visigoth", "Galton", "Felix", "SGC-902-36-G", "Maxwell", "Darius",
            "Line", "Matagorda", "Mannerheim", "Congo", "Mesa", "Thrace", 
        );

        this.SILESIA_SYSTEMS.push(
            "Willis", "Hendrikson", "Jarmon", "Terrance", "Tumult", "Sarah", "Carlton", "Silesia", "Brinkman", "Hume", "Breslau", "Telmach", "Libau", "Gosset",
            "Lau Hiler", "Walther", "Hillman", "Tyler's Star", "Zoraster", "Lutrell", "Posnan", "Arendscheldt", "Sigma", "Creswell", "Hera (Silesia-Sector)",
            "Saginaw", "Psyche", "Sachsen", "Trellis", "Slocum (Silesia-Sector)", "Sharon's Star", "Magyar",

            "Prism", "Casimir", "Schiller", "Trautman's Star", "Cresswell", "Hyatt", "Krieger's Star", "Melchor", "Hyperion", "Horus", "Crawford",
            "Caldwell", "Harston", "Melbourne", "Allen", "Brennan", "Sandhill", "Adelaide"
        );

        this.ANDERMANI_SYSTEMS.push(
            "Nimbalkar", "Gregor", "Cantiz", "Durandel", "Angelique", "Tomlinson", "Sligo", "New Berlin",
            "Tomlinson", "Mischa's-Star", "Irrlicht", "Babel",

            "Getout", "Kaewkosin", "Solithra", "Acrux", "Electron", "Mpingo", "Tupi", "Alzirr", "Umbraea"
        );

        this.SOLARIAN_SYSTEMS.push(
            "Sigma Draconis", "Meyerdahl", "Farley's Crossing", "Kenichi", "Tau Ceti", "Tau-Delta", "Templar",
            "Galen", "Joshua", "Sankar", "Stotterman", "Yildun", "Matagorda", "Mendelschon", "Heimdall",
            "Tasmania", "Maxwell", "Dzung", "70 Virginis", "Lima", "Lucas", "Strathmore", "Hirochi",
            "Epsilon Eridani", "Hypatia", "Trombone", "Sebastopol", "Mithra", "Cyclops", "Seacrest",
            "Chattanooga", "Lucastra", "Eris", "Sol", "Stine", "Zale", "Howard", "Meyers",
            "Isaac", "Sprague", "Maya", "Murray", "Poul", "Edwin", "Robert", "Randal", "Prime", "Saltash",

            "Aflaandacs", "Alcyone", "Alkaphrah", "Altair", "Angetenar", "Aniara", "Anomaly", "Antares", "Asellus Secundus", "Axï¿½lotl",
            "Barnard's Star", "Belenos", "Black", "Canis Minoris", "Casulli", "Chamukuy", "Chen", "Cleopatra", "Cohagen", "Delilah's Navel",
            "Delta Pavonis", "Dilmun", "Dogma", "Epsilon Eridani", "Epsilon Indi", "Groombridge", "Homebrew", "Hound's Eye", "Innes' Star", "Joshua",
            "Kapteyn's Star", "Kaus Borealis", "Kruger", "Lacille", "Luyten's Star", "Matza", "Mazaalai", "Merak", "Mira", "Muliphein", "Nova Heights",
            "Pipoltr", "Procyon", "Proxima Centauri", "Regulus", "Retrict", "Rho Apod", "Rosaliadecastro", "Sarin", "Sasebo", "Schedar", "Shenandoah",
            "Sheratan", "Shiva", "Sirius", "Stardrifter", "Sterrennacht", "Sugano", "Tau Ceti", "Toebean", "Van Maanen's Star",
            "Viorginis B", "Virginis A", "White", "Zavijava", "Zubenelgenubi", "Hilt 452", "Aquaria", "Westermann B", "Westermann A", "Cape Susette",
            "HD 526389", "Chattanooga", "Cyclops", "Dzung", "Galen", "Heimdall", "Hirochi", "Kenichi", "Trombone", "Tasmania",
            "Strathmore", "Stotterman", "Sebastopol", "Seacrest", "Mithra", "Eris", "Meyerdahl", "Mendelschon", "Lucastra", "Yildun", "Lucas", "Stine",
            "Calpurnia", "Delvecchio", "Katharina", "Roulette", "Startman", "Titania", "Balthazar", "Bootstrap", "Boyle", "Broadhurst", "Cachalot", "BS-712-19-6",
            "Nolan", "Cooper", "Danube", "Delta Draconis", "Eta Cassiopeiae", "Exapia", "Chalawan", "Hesier", "Istvan", "Kenniac", "Kismet", "Klondike", "Landfall",
            "Lytton", "Baten Kaitos", "Madeleine", "Mfecane", "Clarence", "Asterope", "Preston", "Sandalwood", "Shingaine", "Siegfried", "Snyder", "Tau Delta",
            "Theseus", "Traccora", "Van Mook", "Winepress", "Grafton", "Yarrow", "Yasotaro", "Ganesh", "Alsephina", "Dickerson", "Templar", "Ophiuchi", "Maize",
            "Air", "Hope", "Mary", "Crux", "Mannerheim", "Felix", "Mirfak", "Mahsati", "Matagorda", "Maxwell", "Sarduchi", "Warner", "Visigoth", "Lynda",
            "Mobius", "McIntosh", "Kumang", "Włocławek", "Golem",
            "Syou-tang", "Shanghai", "Tania Australis", "Borman", "Babiiha",
        );
    }
}
