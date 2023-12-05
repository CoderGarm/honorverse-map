export class SystemAssignmentHelperEra12 {

    static readonly MANTICOREAN_SYSTEMS: string[] = [];
    static readonly HAVENITE_SYSTEMS: string[] = [];
    static readonly MALIGN_SYSTEMS: string[] = [];
    static readonly ANDERMANI_SYSTEMS: string[] = [];
    static readonly SILESIA_SYSTEMS: string[] = [];
    static readonly MIDGARD_SYSTEMS: string[] = [];
    static readonly MATAPAN_SYSTEMS: string[] = [];
    static readonly ASGARD_SYSTEMS: string[] = [];
    static readonly MONICA_SYSTEMS: string[] = [];
    static readonly TORCH_SYSTEMS: string[] = [];
    static readonly PHOENIX_SYSTEMS: string[] = [];
    static readonly SOLARIAN_SYSTEMS: string[] = [];

    static {

        SystemAssignmentHelperEra12.MIDGARD_SYSTEMS.push(
            "Midgard", "Fafnir", "Mothalla", "Dalim", "Alba", "Moravod", "Malmok", "Fuchur", "Mahasim",
            "Fang", "Erainn", "Muzikant", "Shangri La", "Valian"
        );

        SystemAssignmentHelperEra12.MATAPAN_SYSTEMS.push(
            "Rana", "Nekkar", "Giausar", "Enif", "Halo", "Monch", "Phex", "Castula", "Unukalhai", "Meissa",
            "Sadalbari"
        );

        SystemAssignmentHelperEra12.ASGARD_SYSTEMS.push(
            "Asgard", "Alrakis", "Asellus Australia", "Heze", "Aurara", "Gloas", "Theemin", "Klaus Media",
            "Inquill", "Deneb Algedi", "Dschubba", "Gomeisa", "Baekdu", "Poerava",
        );

        SystemAssignmentHelperEra12.MONICA_SYSTEMS.push("Monica", "Taylor");
        SystemAssignmentHelperEra12.TORCH_SYSTEMS.push();
        SystemAssignmentHelperEra12.PHOENIX_SYSTEMS.push("Terra Haute", "Hennesy");

        SystemAssignmentHelperEra12.MANTICOREAN_SYSTEMS.push(
            "Zuckerman", "Yorik", "Basilisk", "Endicott", "Yeltsin's Star",
            "Marian", "Nuada", "Matapan",
            "Quentin", "Clearaway", "Redoubt", "Quest",
            "Hancock", "Reevesport", "Doreas", "Manticore",

            "Zanzibar", "Alizon", "Klein Station", "Poicters", "Casca",
            "Grendelsbane", "Minorca", "Minette", "Candor", "Talisman",
            "Erewhon", "Idaho", "Marsh", "Suchien", "Yalta",

            "Chelsea", "Mendoza", "Clairmont", "Talbot", "Treadway", "Micah", "Danfeng", "Liberty", "Sallah", "Adler", "Vishnu", "Rasalas",
            "Madras", "Corrigan", "Vortexia", "Sun-Yat", "Paragon", "Samson", "Runciman", "Franconia", "Lowell", "Thetis", "Nightingale",
            "Welladay", "Hamal", "Seabring", "Asad", "Trevor's Star", "Barnett", "Owens", "MacGregor", "Foximan", "Mylar", "Nikawiy", "Owens", "Maastricht",
            "Tahlman", "Tequila", "Mylar", "Slocum (Haven-Sector)",
        );

        SystemAssignmentHelperEra12.HAVENITE_SYSTEMS.push(
            "Suarez", "Danak", "Santander", "Joust", "Alto Verde", "Michael",
            "Shilo", "Fordyce", "Lorn", "Pegasus", "Prague", "Montague",
            "Chantilly", "Solan", "Augusta", "Jameston", "Rutgers", "Hallman",
            "Paroa", "Secour", "Sullah", "Karavani",
            "La-Martine", "Des-Moines", "Solon", "SXR-136-23", "Clarke", "Lovat",
            "Lowell", "Mathias", "Sheldon", "Tarragon", "Gualt",
            "Gaston", "Tambourin", "Squalus", "Helmsport", "Seljuk", "Laramie", "Haven",
            "Jouett", "Refuge", "Morell", "New Calcutta", "Malagasy", "Hera (Haven-Sector)",
            "Lannes", "Maslow", "Elric", "Solway", "Hyacinth",

            "Barnes", "Cerberus",
            "Nanda", "Fischer", "Tarazed", "Buna", "Mimosa", "Alkes", "Achernar", "Adhara", "Aerion",
            "Ivanhoe", "Chamonix", "Mendel", "Azelfafage", "Alkaid", "Aiolos", "Aldhanab", "Ali Shar",
            "Alkaid", "Alkarab", "Alkes", "Allman", "Alpherg", "Astral Fields", "Augusta", "Azelfafage",
            "Bannerman", "Barnes", "Barnett", "Belel", "Botein", "Brikiub", "Buna", "Cascabel", "Cerberus",
            "Chantilly", "Corrigan", "Daniel", "Des Moines", "Dombay", "Echnaton", "Elf", "Fischer", "Fordyce",
            "Formosa", "Gar", "Gaston", "Guahayona", "Gualt", "Guniibuu", "Hallman",
            "Haven", "Helmsport", "Homam", "Iklil", "Ivanhoe", "Joubert", "Joust",
            "Leopard", "Lionrock", "Lovat", "Lucilinburhuc", "Luminara", "Lyrastra", "Maastricht",
            "Markab", "Mathias", "Mendel", "Merope", "Mesarthim", "Michael", "Nebulae",
            "Paragon", "Pollux", "Ran", "Revati", "Spectre", "Secour",
            "Seljuk", "Sham", "Slocum (Haven-Sector)", "Smoky", "Solan", "Tacoma",
            "Tambourin", "Tarazed", "Taygeta", "The Lip", "Thetis", "Tianyi", "Timir",
            "Zhang", "Chamonix", "Nova Astra", "Clarke", "Jameston", "Karavani", "Lannes", "Lern", "Laramie",
            "La Martine", "Lorn", "New Calcutta", "Paroa", "Pegasus", "Yellow", "Shilo", "Squalus", "Tarragon", "Danak",
            "Alto Verde", "Rutgers", "Sheldon", "Sullah", "Jouett", "Morell", "Maslow",
            "Garnet Star", "Poe", "Malagasy", "Stocum", "Flegetonte", "Montague", "Daggan", "MacGregor",
            "Nanda", "Sarawak", "SXR-136-23", "Tequila", "Ueshiba", "J-156-18(L)"
        );

        SystemAssignmentHelperEra12.MALIGN_SYSTEMS.push(
            "New Orkney", "Oceana", "Visigoth", "Galton", "Felix", "SGC-902-36-G", "Maxwell", "Darius",
            "Line", "Matagorda", "Mannerheim", "Congo", "Mesa", "Thrace", "New Orkney",
        );

        SystemAssignmentHelperEra12.SILESIA_SYSTEMS.push(
            "Willis", "Hendrikson", "Jarmon", "Terrance", "Tumult", "Sarah", "Carlton", "Silesia", "Brinkman", "Hume", "Breslau", "Telmach", "Libau", "Gosset",
            "Lau Hiler", "Walther", "Hillman", "Tyler's Star", "Zoraster", "Lutrell", "Posnan", "Arendscheldt", "Sigma", "Creswell", "Hera (Silesia-Sector)",
            "Saginaw", "Psyche", "Sachsen", "Trellis", "Slocum (Silesia-Sector)", "Sharon's Star", "Magyar",

            "Prism", "Casimir", "Schiller", "Trautman's Star", "Cresswell", "Hyatt", "Krieger's Star", "Melchor", "Hyperion", "Horus", "Crawford",
            "Caldwell", "Harston", "Melbourne", "Allen", "Brennan", "Sandhill", "Adelaide"
        );

        SystemAssignmentHelperEra12.ANDERMANI_SYSTEMS.push(
            "Nimbalkar", "Gregor", "Cantiz", "Durandel", "Angelique", "Tomlinson", "Sligo", "New Berlin",
            "Tomlinson", "Mischa's-Star", "Irrlicht", "Babel",

            "Getout", "Kaewkosin", "Solithra", "Acrux", "Electron", "Mpingo", "Tupi", "Alzirr", "Umbraea"
        );

        SystemAssignmentHelperEra12.SOLARIAN_SYSTEMS.push(
            "Sigma Draconis", "Meyerdahl", "Farley's Crossing", "Kenichi", "Tau Ceti", "Tau-Delta", "Templar",
            "Galen", "Joshua", "Sankar", "Stotterman", "Yildun", "Matagorda", "Mendelschon", "Heimdall",
            "Tasmania", "Maxwell", "Dzung", "70 Virginis", "Lima", "Lucas", "Strathmore", "Hirochi",
            "Epsilon Eridani", "Hypatia", "Trombone", "Sebastopol", "Mithra", "Cyclops", "Seacrest",
            "Chattanooga", "Lucastra", "Eris", "Sol", "Stine", "Zale", "Howard", "Meyers",
            "Isaac", "Sprague", "Maya", "Murray", "Poul", "Edwin", "Robert", "Randal", "Prime", "Saltash",

            "Aflaandacs", "Alcyone", "Alkaphrah", "Altair", "Angetenar", "Aniara", "Anomaly", "Antares", "Asellus Secundus", 
            "Barnard's Star", "Belenos", "Black", "Canis Minoris", "Casulli", "Chamukuy", "Chen", "Cleopatra", "Cohagen", "Delilah's Navel",
            "Delta Pavonis", "Dilmun", "Dogma", "Epsilon Eridani", "Epsilon Indi", "Groombridge", "Homebrew", "Hound's Eye", "Innes' Star", "Joshua",
            "Kapteyn's Star", "Kaus Borealis", "Kruger", "Lacille", "Luyten's Star", "Matza", "Mazaalai", "Merak", "Mira", "Muliphein", "Nova Heights",
            "Pipoltr", "Procyon", "Proxima Centauri", "Regulus", "Retrict", "Rho Apod", "Rosaliadecastro", "Sarin", "Sasebo", "Schedar", "Shenandoah",
            "Sheratan", "Shiva", "Sirius", "Stardrifter", "Sterrennacht", "Sugano", "Tau Ceti", "Toebean", "Van Maanen's Star",
            "Viorginis B", "Virginis A", "White", "Zavijava", "Zubenelgenubi", "Hilt 452", "Aquaria", "Westermann B", "Westermann A", "Cape Susette",
            "HD 526389", "70 Virginis", "Chattanooga", "Cyclops", "Dzung", "Galen", "Heimdall", "Hirochi", "Kenichi", "Trombone", "Tasmania",
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
