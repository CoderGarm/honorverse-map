import {Era} from "./system-assignments/era";
import {SystemAssignmentEra1} from "./system-assignments/system-assignment-era1";
import {MapContainer} from "./system-assignments/map-container";
import {SystemAssignmentEra2} from "./system-assignments/system-assignment-era2";
import {SystemAssignmentEra3} from "./system-assignments/system-assignment-era3";
import {SystemAssignmentEra4} from "./system-assignments/system-assignment-era4";
import {SystemAssignmentEra5} from "./system-assignments/system-assignment-era5";
import {SystemAssignmentEra6} from "./system-assignments/system-assignment-era6";
import {SystemAssignmentEra7} from "./system-assignments/system-assignment-era7";
import {SystemAssignmentEra8} from "./system-assignments/system-assignment-era8";
import {SystemAssignmentEra9} from "./system-assignments/system-assignment-era9";
import {SystemAssignmentEra10} from "./system-assignments/system-assignment-era10";
import {SystemAssignmentEra11} from "./system-assignments/system-assignment-era11";
import {SystemAssignmentEra12} from "./system-assignments/system-assignment-era12";
import {SystemAssignmentEra13} from "./system-assignments/system-assignment-era13";
import {SystemAssignmentEra14} from "./system-assignments/system-assignment-era14";
import {SystemAssignmentEra15} from "./system-assignments/system-assignment-era15";
import {SystemAssignmentEra16} from "./system-assignments/system-assignment-era16";
import {SystemAssignmentEra17} from "./system-assignments/system-assignment-era17";
import {SystemAssignmentEra18} from "./system-assignments/system-assignment-era18";

export class SystemAssignmentHelper {

    static readonly ERA_CONNECTOR: Map<number, Era> = new Map<number, Era>();

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

    static readonly MANTICOREAN_SYSTEMS: Map<Era, string[]> = new Map<Era, string[]>();
    static readonly HAVENITE_SYSTEMS: Map<Era, string[]> = new Map<Era, string[]>();
    static readonly MALIGN_SYSTEMS: Map<Era, string[]> = new Map<Era, string[]>();
    static readonly ANDERMANI_SYSTEMS: Map<Era, string[]> = new Map<Era, string[]>();
    static readonly SILESIA_SYSTEMS: Map<Era, string[]> = new Map<Era, string[]>();
    static readonly MIDGARD_SYSTEMS: Map<Era, string[]> = new Map<Era, string[]>();
    static readonly MATAPAN_SYSTEMS: Map<Era, string[]> = new Map<Era, string[]>();
    static readonly ASGARD_SYSTEMS: Map<Era, string[]> = new Map<Era, string[]>();
    static readonly MONICA_SYSTEMS: Map<Era, string[]> = new Map<Era, string[]>();
    static readonly TORCH_SYSTEMS: Map<Era, string[]> = new Map<Era, string[]>();
    static readonly PHOENIX_SYSTEMS: Map<Era, string[]> = new Map<Era, string[]>();
    static readonly SOLARIAN_SYSTEMS: Map<Era, string[]> = new Map<Era, string[]>();

    private static readonly MAPS: Map<Era, MapContainer> = new Map<Era, MapContainer>();

    static {

        SystemAssignmentHelper.ERA_CONNECTOR.set(1899, Era.ERA1);
        SystemAssignmentHelper.ERA_CONNECTOR.set(1900, Era.ERA1);
        SystemAssignmentHelper.ERA_CONNECTOR.set(1901, Era.ERA1);
        SystemAssignmentHelper.ERA_CONNECTOR.set(1902, Era.ERA1);
        SystemAssignmentHelper.ERA_CONNECTOR.set(1903, Era.ERA2);
        SystemAssignmentHelper.ERA_CONNECTOR.set(1904, Era.ERA2);
        SystemAssignmentHelper.ERA_CONNECTOR.set(1905, Era.ERA3);
        SystemAssignmentHelper.ERA_CONNECTOR.set(1906, Era.ERA4);
        SystemAssignmentHelper.ERA_CONNECTOR.set(1907, Era.ERA5);
        SystemAssignmentHelper.ERA_CONNECTOR.set(1908, Era.ERA6);
        SystemAssignmentHelper.ERA_CONNECTOR.set(1909, Era.ERA7);
        SystemAssignmentHelper.ERA_CONNECTOR.set(1910, Era.ERA8);
        SystemAssignmentHelper.ERA_CONNECTOR.set(1911, Era.ERA9);
        SystemAssignmentHelper.ERA_CONNECTOR.set(1912, Era.ERA9);
        SystemAssignmentHelper.ERA_CONNECTOR.set(1913, Era.ERA10);
        SystemAssignmentHelper.ERA_CONNECTOR.set(1914, Era.ERA11);
        SystemAssignmentHelper.ERA_CONNECTOR.set(1915, Era.ERA12);
        SystemAssignmentHelper.ERA_CONNECTOR.set(1916, Era.ERA12);
        SystemAssignmentHelper.ERA_CONNECTOR.set(1917, Era.ERA13);
        SystemAssignmentHelper.ERA_CONNECTOR.set(1918, Era.ERA13);
        SystemAssignmentHelper.ERA_CONNECTOR.set(1919, Era.ERA14);
        SystemAssignmentHelper.ERA_CONNECTOR.set(1920, Era.ERA14);
        SystemAssignmentHelper.ERA_CONNECTOR.set(1921, Era.ERA15);
        SystemAssignmentHelper.ERA_CONNECTOR.set(1922, Era.ERA16);
        SystemAssignmentHelper.ERA_CONNECTOR.set(1923, Era.ERA17);
        SystemAssignmentHelper.ERA_CONNECTOR.set(1924, Era.ERA18);

        SystemAssignmentHelper.MAPS.set(Era.ERA1, new SystemAssignmentEra1());
        SystemAssignmentHelper.MAPS.set(Era.ERA2, new SystemAssignmentEra2());
        SystemAssignmentHelper.MAPS.set(Era.ERA3, new SystemAssignmentEra3());
        SystemAssignmentHelper.MAPS.set(Era.ERA4, new SystemAssignmentEra4());
        SystemAssignmentHelper.MAPS.set(Era.ERA5, new SystemAssignmentEra5());
        SystemAssignmentHelper.MAPS.set(Era.ERA6, new SystemAssignmentEra6());
        SystemAssignmentHelper.MAPS.set(Era.ERA7, new SystemAssignmentEra7());
        SystemAssignmentHelper.MAPS.set(Era.ERA8, new SystemAssignmentEra8());
        SystemAssignmentHelper.MAPS.set(Era.ERA9, new SystemAssignmentEra9());
        SystemAssignmentHelper.MAPS.set(Era.ERA10, new SystemAssignmentEra10());
        SystemAssignmentHelper.MAPS.set(Era.ERA11, new SystemAssignmentEra11());
        SystemAssignmentHelper.MAPS.set(Era.ERA12, new SystemAssignmentEra12());
        SystemAssignmentHelper.MAPS.set(Era.ERA13, new SystemAssignmentEra13());
        SystemAssignmentHelper.MAPS.set(Era.ERA14, new SystemAssignmentEra14());
        SystemAssignmentHelper.MAPS.set(Era.ERA15, new SystemAssignmentEra15());
        SystemAssignmentHelper.MAPS.set(Era.ERA16, new SystemAssignmentEra16());
        SystemAssignmentHelper.MAPS.set(Era.ERA17, new SystemAssignmentEra17());
        SystemAssignmentHelper.MAPS.set(Era.ERA18, new SystemAssignmentEra18());

        Object.values(Era).forEach(era => {
            SystemAssignmentHelper.MIDGARD_SYSTEMS.set(era, SystemAssignmentHelper.MAPS.get(era)!.MIDGARD_SYSTEMS);
            SystemAssignmentHelper.MATAPAN_SYSTEMS.set(era, SystemAssignmentHelper.MAPS.get(era)!.MATAPAN_SYSTEMS);
            SystemAssignmentHelper.ASGARD_SYSTEMS.set(era, SystemAssignmentHelper.MAPS.get(era)!.ASGARD_SYSTEMS);
            SystemAssignmentHelper.MONICA_SYSTEMS.set(era, SystemAssignmentHelper.MAPS.get(era)!.MONICA_SYSTEMS);
            SystemAssignmentHelper.TORCH_SYSTEMS.set(era, SystemAssignmentHelper.MAPS.get(era)!.TORCH_SYSTEMS);
            SystemAssignmentHelper.PHOENIX_SYSTEMS.set(era, SystemAssignmentHelper.MAPS.get(era)!.PHOENIX_SYSTEMS);
            SystemAssignmentHelper.MANTICOREAN_SYSTEMS.set(era, SystemAssignmentHelper.MAPS.get(era)!.MANTICOREAN_SYSTEMS);
            SystemAssignmentHelper.HAVENITE_SYSTEMS.set(era, SystemAssignmentHelper.MAPS.get(era)!.HAVENITE_SYSTEMS);
            SystemAssignmentHelper.MALIGN_SYSTEMS.set(era, SystemAssignmentHelper.MAPS.get(era)!.MALIGN_SYSTEMS);
            SystemAssignmentHelper.SILESIA_SYSTEMS.set(era, SystemAssignmentHelper.MAPS.get(era)!.SILESIA_SYSTEMS);
            SystemAssignmentHelper.ANDERMANI_SYSTEMS.set(era, SystemAssignmentHelper.MAPS.get(era)!.ANDERMANI_SYSTEMS);
            SystemAssignmentHelper.SOLARIAN_SYSTEMS.set(era, SystemAssignmentHelper.MAPS.get(era)!.SOLARIAN_SYSTEMS);
        });
    }

    static getByYear(year: number) {
        let era = SystemAssignmentHelper.ERA_CONNECTOR.get(year)!;
        return this.getByEra(era);
    }

    static getByEra(era: Era) {
        let nations_by_color: Map<string, string[]> = new Map<string, string[]>();
        nations_by_color.set(SystemAssignmentHelper.MANTICORE_COLOR, SystemAssignmentHelper.MANTICOREAN_SYSTEMS.has(era) ? SystemAssignmentHelper.MANTICOREAN_SYSTEMS.get(era)! : []);
        nations_by_color.set(SystemAssignmentHelper.HAVEN_COLOR, SystemAssignmentHelper.HAVENITE_SYSTEMS.has(era) ? SystemAssignmentHelper.HAVENITE_SYSTEMS.get(era)! : []);
        nations_by_color.set(SystemAssignmentHelper.MALIGN_COLOR, SystemAssignmentHelper.MALIGN_SYSTEMS.has(era) ? SystemAssignmentHelper.MALIGN_SYSTEMS.get(era)! : []);
        nations_by_color.set(SystemAssignmentHelper.ANDERMAN_COLOR, SystemAssignmentHelper.ANDERMANI_SYSTEMS.has(era) ? SystemAssignmentHelper.ANDERMANI_SYSTEMS.get(era)! : []);
        nations_by_color.set(SystemAssignmentHelper.SILESIA_COLOR, SystemAssignmentHelper.SILESIA_SYSTEMS.has(era) ? SystemAssignmentHelper.SILESIA_SYSTEMS.get(era)! : []);
        nations_by_color.set(SystemAssignmentHelper.SOLARIAN_LEAGUE_COLOR, SystemAssignmentHelper.SOLARIAN_SYSTEMS.has(era) ? SystemAssignmentHelper.SOLARIAN_SYSTEMS.get(era)! : []);
        nations_by_color.set(SystemAssignmentHelper.MIDGARD_COLOR, SystemAssignmentHelper.MIDGARD_SYSTEMS.has(era) ? SystemAssignmentHelper.MIDGARD_SYSTEMS.get(era)! : []);
        nations_by_color.set(SystemAssignmentHelper.MATAPAN_COLOR, SystemAssignmentHelper.MATAPAN_SYSTEMS.has(era) ? SystemAssignmentHelper.MATAPAN_SYSTEMS.get(era)! : []);
        nations_by_color.set(SystemAssignmentHelper.ASGARD_COLOR, SystemAssignmentHelper.ASGARD_SYSTEMS.has(era) ? SystemAssignmentHelper.ASGARD_SYSTEMS.get(era)! : []);
        nations_by_color.set(SystemAssignmentHelper.MONICA_COLOR, SystemAssignmentHelper.MONICA_SYSTEMS.has(era) ? SystemAssignmentHelper.MONICA_SYSTEMS.get(era)! : []);
        nations_by_color.set(SystemAssignmentHelper.TORCH_COLOR, SystemAssignmentHelper.TORCH_SYSTEMS.has(era) ? SystemAssignmentHelper.TORCH_SYSTEMS.get(era)! : []);
        nations_by_color.set(SystemAssignmentHelper.PHOENIX_COLOR, SystemAssignmentHelper.PHOENIX_SYSTEMS.has(era) ? SystemAssignmentHelper.PHOENIX_SYSTEMS.get(era)! : []);
        return nations_by_color;
    }

}
