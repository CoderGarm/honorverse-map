export class SystemAssignmentHelper {

    public static readonly SOLARIAN_LEAGUE_COLOR: string = '#B31616';
    public static readonly MANTICORE_COLOR: string = '#ff00ff';
    public static readonly HAVEN_COLOR: string = '#57ffc7';
    public static readonly MALIGN_COLOR: string = '#996633';
    public static readonly ANDERMAN_COLOR: string = '#ffcc00';
    public static readonly SILESIA_COLOR: string = '#99ff33';
    public static readonly MIDGARD_COLOR: string = '#ff9900';
    public static readonly MATAPAN_COLOR: string = '#0000ff';
    public static readonly ASGARD_COLOR: string = '#009999';
    public static readonly MONICA_COLOR: string = '#669999';
    public static readonly TORCH_COLOR: string = '#ff0066';
    public static readonly PHOENIX_COLOR: string = '#3366cc';

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

    static readonly NATIONS_BY_COLOR: Map<string, string[]> = new Map<string, string[]>();

    static {

        SystemAssignmentHelper.NATIONS_BY_COLOR.set(SystemAssignmentHelper.MANTICORE_COLOR, SystemAssignmentHelper.MANTICOREAN_SYSTEMS);
        SystemAssignmentHelper.NATIONS_BY_COLOR.set(SystemAssignmentHelper.HAVEN_COLOR, SystemAssignmentHelper.HAVENITE_SYSTEMS);
        SystemAssignmentHelper.NATIONS_BY_COLOR.set(SystemAssignmentHelper.MALIGN_COLOR, SystemAssignmentHelper.MALIGN_SYSTEMS);
        SystemAssignmentHelper.NATIONS_BY_COLOR.set(SystemAssignmentHelper.ANDERMAN_COLOR, SystemAssignmentHelper.ANDERMANI_SYSTEMS);
        SystemAssignmentHelper.NATIONS_BY_COLOR.set(SystemAssignmentHelper.SILESIA_COLOR, SystemAssignmentHelper.SILESIA_SYSTEMS);
        SystemAssignmentHelper.NATIONS_BY_COLOR.set(SystemAssignmentHelper.SOLARIAN_LEAGUE_COLOR, SystemAssignmentHelper.SOLARIAN_SYSTEMS);
        SystemAssignmentHelper.NATIONS_BY_COLOR.set(SystemAssignmentHelper.MIDGARD_COLOR, SystemAssignmentHelper.MIDGARD_SYSTEMS);
        SystemAssignmentHelper.NATIONS_BY_COLOR.set(SystemAssignmentHelper.MATAPAN_COLOR, SystemAssignmentHelper.MATAPAN_SYSTEMS);
        SystemAssignmentHelper.NATIONS_BY_COLOR.set(SystemAssignmentHelper.ASGARD_COLOR, SystemAssignmentHelper.ASGARD_SYSTEMS);
        SystemAssignmentHelper.NATIONS_BY_COLOR.set(SystemAssignmentHelper.MONICA_COLOR, SystemAssignmentHelper.MONICA_SYSTEMS);
        SystemAssignmentHelper.NATIONS_BY_COLOR.set(SystemAssignmentHelper.TORCH_COLOR, SystemAssignmentHelper.TORCH_SYSTEMS);
        SystemAssignmentHelper.NATIONS_BY_COLOR.set(SystemAssignmentHelper.PHOENIX_COLOR, SystemAssignmentHelper.PHOENIX_SYSTEMS);

        SystemAssignmentHelper.MIDGARD_SYSTEMS.push("Midgard");
        SystemAssignmentHelper.MATAPAN_SYSTEMS.push("Matapan");
        SystemAssignmentHelper.ASGARD_SYSTEMS.push("Asgard");
        SystemAssignmentHelper.MONICA_SYSTEMS.push("Monica", "Taylor");
        SystemAssignmentHelper.TORCH_SYSTEMS.push("Congo");
        SystemAssignmentHelper.PHOENIX_SYSTEMS.push("Terra Haute", "Hennesy");

        SystemAssignmentHelper.MANTICOREAN_SYSTEMS.push(
             "Yeltsin's Star", "Zuckerman", "Rembrandt", "Dresden", "Pequod", "Yorik", "Basilisk", "Scarlet",
             "Spindle", "Tillerman", "Marian", "San Miguel", "Nuada", "Elric", "Endicott", "Celebrant",
             "Nuncio", "Mainwaring", "Quentin", "Clearaway", "Redoubt", "Talbott", "Montana", "Quest",
             "Hancock", "Trevor's Star", "Reevesport", "Split", "Doreas", "Manticore", "Lynx", "MQ-L-1792-46A",
             "Lynx B (Terminus)",

            "Marsh", "Zanzibar", "Alizon", "Klein Station", "Chelsea", "Yalta", "Poicters", "Casca",
            "Grendelsbane", "Minorca", "Minette", "Candor", "Talisman", "Rasalas", "Mendoza",
            "Prairie", "Talbot", "Erewhon"
        );

        SystemAssignmentHelper.HAVENITE_SYSTEMS.push(
             "Suarez", "Corrigan", "Danak", "Santander", "Joust", "Alto Verde", "Sun-Yat", "Michael",
             "Shilo", "Fordyce", "Lorn", "Madras", "Pegasus", "Prague", "Mylar", "Montague",
             "Chantilly", "Solan", "Augusta", "Jameston", "Rutgers", "Hallman", "Micah", "Clairmont",
             "Paroa", "Seabring", "Tequila", "Secour", "Barnett", "Sullah", "Tahlman", "Karavani",
             "La-Martine", "Des-Moines", "Solon", "Solway", "SXR-136-23", "Clarke", "Lovat", "Welladay",
             "Seaford 9", "Lowell", "Mathias", "Sheldon", "Owens", "Tarragon", "Adler", "Gualt",
             "Gaston", "Tambourin", "Squalus", "Thetis", "Helmsport", "Seljuk", "Laramie", "Haven",
             "Jouett", "Refuge", "Morell", "New Calcutta", "Malagasy", "Hera (Haven-Sector)", "Maastricht",
             "Lannes", "MacGregor", "Maslow", "Treadway", "Samson",

            "Franconia", "Runchiman", "Nightingale", "Barnes", "Cerberus", "Slocum (Haven-Sector)",
            "Nanda", "Fischer", "Tarazed", "Buna", "Mimosa", "Alkes", "Achernar", "Adhara", "Aerion",
            "Ivanhoe", "Chamonix", "Mendel", "Azelfafage", "Alkaid", "Aiolos", "Aldhanab", "Ali Shar",
            "Alkaid", "Alkarab", "Alkes", "Allman", "Alpherg", "Astral Fields", "Augusta", "Azelfafage",
            "Bannerman", "Barnes", "Barnett", "Belel", "Botein", "Brikiub", "Buna", "Cascabel", "Cerberus",
            "Chantilly", "Corrigan", "Daniel", "Des Moines", "Dombay", "Echnaton", "Elf", "Fischer", "Fordyce",
            "Formosa", "Foximan", "Franconia", "Gar", "Gaston", "Guahayona", "Gualt", "Guniibuu", "Hallman",
            "Hamal", "Haven", "Helmsport", "Homam", "Hyacinth", "Iklil", "Ivanhoe", "Joubert", "Joust",
            "Leopard", "Lionrock", "Lovat", "Lowell", "Lucilinburhuc", "Luminara", "Lyrastra", "Maastricht",
            "Madras", "Markab", "Mathias", "Mendel", "Merope", "Mesarthim", "Michael", "Mylar", "Nebulae",
            "Nikawiy", "Owens", "Paragon", "Pollux", "Ran", "Revati", "Runciman", "Spectre", "Secour",
            "Seljuk", "Sham", "Slocum (Haven-Sector)", "Smoky", "Solan", "Suarez", "Sun-Yat", "Tacoma",
            "Tambourin", "Tarazed", "Taygeta", "The Lip", "Thetis", "Tianyi", "Timir", "Vortexia",
            "Welladay", "Zhang", "Chamonix", "Nova Astra", "Clarke", "Jameston", "Karavani", "Lannes", "Lern", "Laramie",
            "La Martine", "Lorn", "New Calcutta", "Paroa", "Pegasus", "Yellow", "Shilo", "Squalus", "Tarragon", "Danak",
            "Alto Verde", "Prague", "Rutgers", "Sheldon", "Sullah", "Jouett", "Morell", "Maslow", "Treadway", "Tahlman",
            "Seabring", "Garnet Star", "Poe", "Malagasy", "Stocum", "Asad", "Flegetonte", "Montague", "Daggan", "MacGregor",
            "Nanda", "Sarawak", "SXR-136-23", "Tequila", "Ueshiba", "J-156-18(L)"
        );

        SystemAssignmentHelper.MALIGN_SYSTEMS.push(
             "New Orkney", "Oceana", "Visigoth", "Galton", "Felix", "SGC-902-36-G", "Maxwell", "Darius",
             "Line", "Matagorda", "Mannerheim"
        )

        SystemAssignmentHelper.SILESIA_SYSTEMS.push(
              "Willis", "Hendrikson", "Jarmon", "Terrance", "Tumult", "Sarah", "Carlton", "Silesia", "Brinkman", "Hume", "Breslau", "Telmach", "Libau", "Gosset",
              "Lau Hiler", "Walther", "Hillman", "Tyler's Star", "Zoraster", "Lutrell", "Posnan", "Arendscheldt", "Sigma", "Creswell", "Hera (Silesia-Sector)",
              "Saginaw", "Psyche", "Sachsen", "Trellis", "Slocum (Silesia-Sector)", "Sharon's Star", "Magyar",

            "Prism", "Casimir", "Schiller", "Trautma's Star", "Cresswell", "Hyatt", "Krieger's Star", "Melchor", "Hyperion", "Horus", "Crawford",
            "Caldwell", "Harston", "Melbourne", "Allen", "Brennan", "Sandhill", "Adelaide"
        );

        SystemAssignmentHelper.ANDERMANI_SYSTEMS.push(
             "Nimbalkar", "Gregor", "Cantiz", "Durandel", "Angelique", "Tomlinson", "Sligo", "New Berlin",
             "Tomlinson", "Mischa's-Star", "Irrlicht", "Babel",

            "Getout", "Phaedra", "Cimarron's Rose", "Kaewkosin", "Narumi", "Noquisi", "Farnham", "Sadachbia", "Umbraea"
        );

        SystemAssignmentHelper.SOLARIAN_SYSTEMS.push(
             "Sigma Draconis", "Meyerdahl", "Farley's Crossing", "Kenichi", "Tau Ceti", "Tau-Delta", "Templar",
             "Galen", "Joshua", "Sankar", "Stotterman", "Yildun", "Matagorda", "Mendelschon", "Heimdall",
             "Tasmania", "Maxwell", "Dzung", "70 Virginis", "Lima", "Lucas", "Strathmore", "Hirochi",
             "Epsilon Eridani", "Hypatia", "Trombone", "Sebastopol", "Mithra", "Cyclops", "Seacrest",
             "Chattanooga", "Lucastra", "Eris", "Sol", "Stine", "Zale", "Howard", "Meyers",
            "Isaac", "Sprague", "Maya", "Murray", "Poul", "Edwin", "Robert", "Randal", "Ajay", "Saltash",

            "Aflaandacs", "Alcyone", "Alkaphrah", "Altair", "Angetenar", "Aniara", "Anomaly", "Antares", "Asellus Secundus", "Ax�lotl",
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
            "Air", "Hope", "Mary", "Crux", "Mannerheim", "Felix", "Mirfak", "Mahsati", "Matagorda", "Maxwell", "Sarduchi", "Warner", "Visigoth", "Lynda", "Galton",
            "Mobius", "McIntosh", "Kumang", "Włocławek", "Golem"
        );
    }
}
