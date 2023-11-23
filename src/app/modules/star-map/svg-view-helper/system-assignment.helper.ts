export class SystemAssignmentHelper {

    static readonly MANTICOREAN_SYSTEMS: string[] = [];
    static readonly HAVENITE_SYSTEMS: string[] = [];
    static readonly MALIGN_SYSTEMS: string[] = [];
    static readonly ANDERMANI_SYSTEMS: string[] = [];


    static readonly SOLARIAN_SYSTEMS: string[] = [];

    static {
        SystemAssignmentHelper.MANTICOREAN_SYSTEMS.push(
            /* original */ "Yeltsin's Star", "Zuckerman", "Rembrandt", "Dresden", "Pequod", "Yorik", "Basilisk", "Scarlet",
            /* original */ "Spindle", "Tillerman", "Marian", "San Miguel", "Nuada", "Elric", "Endicott", "Celebrant",
            /* original */ "Nuncio", "Mainwaring", "Quentin", "Clearaway", "Redoubt", "Talbott", "Montana", "Quest",
            /* original */ "Hancock", "Trevor's Star", "Reevesport", "Split", "Doreas", "Manticore", "Lynx", "MQ-L-1792-46A"

            /* fluff    */, "Marsh", "Zanzibar", "Alizon", "Klein Station", "Chelsea", "Yalta", "Poicters", "Casca"
            /* fluff    */, "Grendelsbane", "Minorca", "Minette", "Candor", "Talisman", "Rasalas", "Mendoza"
            /* fluff    */, "Matapan", "Prairie", "Talbot"
        );

        SystemAssignmentHelper.HAVENITE_SYSTEMS.push(
            /* original */ "Suarez", "Corrigan", "Danak", "Santander", "Joust", "Alto Verde", "Sun-Yat", "Michael",
            /* original */ "Shilo", "Fordyce", "Lorn", "Madras", "Pegasus", "Prague", "Mylar", "Montague",
            /* original */ "Chantilly", "Solan", "Augusta", "Jameston", "Rutgers", "Hallman", "Micah", "Clairmont",
            /* original */ "Paroa", "Seabring", "Tequila", "Secour", "Barnett", "Sullah", "Tahlman", "Karavani",
            /* original */ "La-Martine", "Des-Moines", "Solon", "Solway", "SXR-136-23", "Clarke", "Lovat", "Welladay",
            /* original */ "Seaford 9", "Lowell", "Mathias", "Sheldon", "Owens", "Tarragon", "Adler", "Gualt",
            /* original */ "Gaston", "Tambourin", "Squalus", "Thetis", "Helmsport", "Seljuk", "Laramie", "Haven",
            /* original */ "Jouett", "Refuge", "Morell", "New Calcutta", "Malagasy", "Hera", "Maastricht",
            /* original */ "Lannes", "MacGregor", "Maslow", "Treadway", "Samson"

            /* fluff    */, "Franconia", "Runchiman", "Nightingale", "Barnes", "Cerberus", "Slocum (Haven-Sector)"
            /* fluff    */, "Nanda", "Fischer", "Tarazed", "Buna", "Mimosa", "Alkes", "Achernar", "Adhara", "Aerion"
            /* fluff    */, "Ivanhoe", "Chamonix", "Mendel", "Azelfafage", "Alkaid", "Aiolos", "Aldhanab", "Ali Shar"
            /* fluff    */, "Alkaid", "Alkarab", "Alkes", "Allman", "Alpherg", "Astral Fields", "Augusta", "Azelfafage"
            /* fluff    */, "Bannerman", "Barnes", "Barnett", "Belel", "Botein", "Brikiub", "Buna", "Cascabel", "Cerberus"
            /* fluff    */, "Chantilly", "Corrigan", "Daniel", "Des Moines", "Dombay", "Echnaton", "Elf", "Fischer", "Fordyce"
            /* fluff    */, "Formosa", "Foximan", "Franconia", "Gar", "Gaston", "Guahayona", "Gualt", "Guniibuu", "Hallman"
            /* fluff    */, "Hamal", "Haven", "Helmsport", "Hera", "Homam", "Hyacinth", "Iklil", "Ivanhoe", "Joubert", "Joust"
            /* fluff    */, "Leopard", "Lionrock", "Lovat", "Lowell", "Lucilinburhuc", "Luminara", "Lyrastra", "Maastricht"
            /* fluff    */, "Madras", "Markab", "Mathias", "Mendel", "Merope", "Mesarthim", "Michael", "Mylar", "Nebulae"
            /* fluff    */, "Nikawiy", "Owens", "Paragon", "Pollux", "Ran", "Revati", "Runciman", "Spectre", "Secour"
            /* fluff    */, "Seljuk", "Sham", "Slocum (Haven-Sector)", "Smoky", "Solan", "Suarez", "Sun-Yat", "Tacoma"
            /* fluff    */, "Tambourin", "Tarazed", "Taygeta", "The Lip", "Thetis", "Tianyi", "Timir", "Vortexia"
            /* fluff    */, "Welladay", "Zhang", "Chamonix", "Nova Astra", "Clarke", "Jameston", "Karavani", "Lannes", "Lern", "Laramie"
            /* fluff    */, "La Martine", "Lorn", "New Calcutta", "Paroa", "Pegasus", "Yellow", "Shilo", "Squalus", "Tarragon", "Danak"
            /* fluff    */, "Alto Verde", "Prague", "Rutgers", "Sheldon", "Sullah", "Jouett", "Morell", "Maslow", "Treadway", "Tahlman"
            /* fluff    */, "Seabring", "Garnet Star", "Poe", "Malagasy", "Stocum", "Asad", "Flegetonte", "Montague", "Daggan", "MacGregor"
            /* fluff    */, "Nanda", "Sarawak", "SXR-136-23", "Tequila", "Ueshiba", "J-156-18(L)"
        );

        SystemAssignmentHelper.MALIGN_SYSTEMS.push(
            /* original */ "New Orkney", "Oceana", "Visigoth", "Galton", "Felix", "SGC-902-36-G", "Maxwell", "Darius",
            /* original */ "Line", "Matagorda", "Mannerheim"
        )

        SystemAssignmentHelper.ANDERMANI_SYSTEMS.push(
            /* original */ "Nimbalkar", "Gregor", "Cantiz", "Durandel", "Angelique", "Tomlinson", "Sligo", "New Berlin",
            /* original */ "Tomlinson", "Mischa's-Star", "Irrlicht", "Babel"

            /* fluff    */, "Getout", "Phaedra", "Cimmaron's Rose", "Kaewkosin", "Narumi", "Noquisi", "Farnham", "Sadachbia"
            /* fluff    */, "Umbraea", "Tejat", "Jabbah", "New Hamburg", "St. Quentin", "Arcalos"
        );

        SystemAssignmentHelper.SOLARIAN_SYSTEMS.push(
            /* original */ "Sigma Draconis", "Meyerdahl", "Farley's Crossing", "Kenichi", "Tau Ceti", "Tau-Delta", "Templar",
            /* original */ "Galen", "Joshua", "Sankar", "Stotterman", "Yildun", "Matagorda", "Mendelschon", "Heimdall",
            /* original */ "Tasmania", "Maxwell", "Dzung", "70 Virginis", "Lima", "Lucas", "Strathmore", "Hirochi",
            /* original */ "Epsilon Eridani", "Hypatia", "Trombone", "Sebastopol", "Mithra", "Cyclops", "Seacrest",
            /* original */ "Chattanooga", "Lucastra", "Eris", "Sol", "Stine"
        );
    }
}
