import {Era} from "./system-assignments/era";
import {SystemAssignmentHelperEra1} from "./system-assignments/system-assignment-era1.helper";
import {SystemAssignmentHelperEra2} from "./system-assignments/system-assignment-era2.helper";
import {SystemAssignmentHelperEra3} from "./system-assignments/system-assignment-era3.helper";
import {SystemAssignmentHelperEra4} from "./system-assignments/system-assignment-era4.helper";
import {SystemAssignmentHelperEra5} from "./system-assignments/system-assignment-era5.helper";
import {SystemAssignmentHelperEra6} from "./system-assignments/system-assignment-era6.helper";
import {SystemAssignmentHelperEra7} from "./system-assignments/system-assignment-era7.helper";
import {SystemAssignmentHelperEra8} from "./system-assignments/system-assignment-era8.helper";
import {SystemAssignmentHelperEra9} from "./system-assignments/system-assignment-era9.helper";
import {SystemAssignmentHelperEra10} from "./system-assignments/system-assignment-era10.helper";
import {SystemAssignmentHelperEra17} from "./system-assignments/system-assignment-era17.helper";
import {SystemAssignmentHelperEra18} from "./system-assignments/system-assignment-era18.helper";
import {SystemAssignmentHelperEra11} from "./system-assignments/system-assignment-era11.helper";
import {SystemAssignmentHelperEra12} from "./system-assignments/system-assignment-era12.helper";
import {SystemAssignmentHelperEra13} from "./system-assignments/system-assignment-era13.helper";
import {SystemAssignmentHelperEra14} from "./system-assignments/system-assignment-era14.helper";
import {SystemAssignmentHelperEra15} from "./system-assignments/system-assignment-era15.helper";
import {SystemAssignmentHelperEra16} from "./system-assignments/system-assignment-era16.helper";

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

        SystemAssignmentHelper.MIDGARD_SYSTEMS.set(Era.ERA1, SystemAssignmentHelperEra1.MIDGARD_SYSTEMS);
        SystemAssignmentHelper.MATAPAN_SYSTEMS.set(Era.ERA1, SystemAssignmentHelperEra1.MATAPAN_SYSTEMS);
        SystemAssignmentHelper.ASGARD_SYSTEMS.set(Era.ERA1, SystemAssignmentHelperEra1.ASGARD_SYSTEMS);
        SystemAssignmentHelper.MONICA_SYSTEMS.set(Era.ERA1, SystemAssignmentHelperEra1.MONICA_SYSTEMS);
        SystemAssignmentHelper.TORCH_SYSTEMS.set(Era.ERA1, SystemAssignmentHelperEra1.TORCH_SYSTEMS);
        SystemAssignmentHelper.PHOENIX_SYSTEMS.set(Era.ERA1, SystemAssignmentHelperEra1.PHOENIX_SYSTEMS);
        SystemAssignmentHelper.MANTICOREAN_SYSTEMS.set(Era.ERA1, SystemAssignmentHelperEra1.MANTICOREAN_SYSTEMS);
        SystemAssignmentHelper.HAVENITE_SYSTEMS.set(Era.ERA1, SystemAssignmentHelperEra1.HAVENITE_SYSTEMS);
        SystemAssignmentHelper.MALIGN_SYSTEMS.set(Era.ERA1, SystemAssignmentHelperEra1.MALIGN_SYSTEMS);
        SystemAssignmentHelper.SILESIA_SYSTEMS.set(Era.ERA1, SystemAssignmentHelperEra1.SILESIA_SYSTEMS);
        SystemAssignmentHelper.ANDERMANI_SYSTEMS.set(Era.ERA1, SystemAssignmentHelperEra1.ANDERMANI_SYSTEMS);
        SystemAssignmentHelper.SOLARIAN_SYSTEMS.set(Era.ERA1, SystemAssignmentHelperEra1.SOLARIAN_SYSTEMS);

        SystemAssignmentHelper.MIDGARD_SYSTEMS.set(Era.ERA2, SystemAssignmentHelperEra2.MIDGARD_SYSTEMS);
        SystemAssignmentHelper.MATAPAN_SYSTEMS.set(Era.ERA2, SystemAssignmentHelperEra2.MATAPAN_SYSTEMS);
        SystemAssignmentHelper.ASGARD_SYSTEMS.set(Era.ERA2, SystemAssignmentHelperEra2.ASGARD_SYSTEMS);
        SystemAssignmentHelper.MONICA_SYSTEMS.set(Era.ERA2, SystemAssignmentHelperEra2.MONICA_SYSTEMS);
        SystemAssignmentHelper.TORCH_SYSTEMS.set(Era.ERA2, SystemAssignmentHelperEra2.TORCH_SYSTEMS);
        SystemAssignmentHelper.PHOENIX_SYSTEMS.set(Era.ERA2, SystemAssignmentHelperEra2.PHOENIX_SYSTEMS);
        SystemAssignmentHelper.MANTICOREAN_SYSTEMS.set(Era.ERA2, SystemAssignmentHelperEra2.MANTICOREAN_SYSTEMS);
        SystemAssignmentHelper.HAVENITE_SYSTEMS.set(Era.ERA2, SystemAssignmentHelperEra2.HAVENITE_SYSTEMS);
        SystemAssignmentHelper.MALIGN_SYSTEMS.set(Era.ERA2, SystemAssignmentHelperEra2.MALIGN_SYSTEMS);
        SystemAssignmentHelper.SILESIA_SYSTEMS.set(Era.ERA2, SystemAssignmentHelperEra2.SILESIA_SYSTEMS);
        SystemAssignmentHelper.ANDERMANI_SYSTEMS.set(Era.ERA2, SystemAssignmentHelperEra2.ANDERMANI_SYSTEMS);
        SystemAssignmentHelper.SOLARIAN_SYSTEMS.set(Era.ERA2, SystemAssignmentHelperEra2.SOLARIAN_SYSTEMS);

        SystemAssignmentHelper.MIDGARD_SYSTEMS.set(Era.ERA3, SystemAssignmentHelperEra3.MIDGARD_SYSTEMS);
        SystemAssignmentHelper.MATAPAN_SYSTEMS.set(Era.ERA3, SystemAssignmentHelperEra3.MATAPAN_SYSTEMS);
        SystemAssignmentHelper.ASGARD_SYSTEMS.set(Era.ERA3, SystemAssignmentHelperEra3.ASGARD_SYSTEMS);
        SystemAssignmentHelper.MONICA_SYSTEMS.set(Era.ERA3, SystemAssignmentHelperEra3.MONICA_SYSTEMS);
        SystemAssignmentHelper.TORCH_SYSTEMS.set(Era.ERA3, SystemAssignmentHelperEra3.TORCH_SYSTEMS);
        SystemAssignmentHelper.PHOENIX_SYSTEMS.set(Era.ERA3, SystemAssignmentHelperEra3.PHOENIX_SYSTEMS);
        SystemAssignmentHelper.MANTICOREAN_SYSTEMS.set(Era.ERA3, SystemAssignmentHelperEra3.MANTICOREAN_SYSTEMS);
        SystemAssignmentHelper.HAVENITE_SYSTEMS.set(Era.ERA3, SystemAssignmentHelperEra3.HAVENITE_SYSTEMS);
        SystemAssignmentHelper.MALIGN_SYSTEMS.set(Era.ERA3, SystemAssignmentHelperEra3.MALIGN_SYSTEMS);
        SystemAssignmentHelper.SILESIA_SYSTEMS.set(Era.ERA3, SystemAssignmentHelperEra3.SILESIA_SYSTEMS);
        SystemAssignmentHelper.ANDERMANI_SYSTEMS.set(Era.ERA3, SystemAssignmentHelperEra3.ANDERMANI_SYSTEMS);
        SystemAssignmentHelper.SOLARIAN_SYSTEMS.set(Era.ERA3, SystemAssignmentHelperEra3.SOLARIAN_SYSTEMS);

        SystemAssignmentHelper.MIDGARD_SYSTEMS.set(Era.ERA4, SystemAssignmentHelperEra4.MIDGARD_SYSTEMS);
        SystemAssignmentHelper.MATAPAN_SYSTEMS.set(Era.ERA4, SystemAssignmentHelperEra4.MATAPAN_SYSTEMS);
        SystemAssignmentHelper.ASGARD_SYSTEMS.set(Era.ERA4, SystemAssignmentHelperEra4.ASGARD_SYSTEMS);
        SystemAssignmentHelper.MONICA_SYSTEMS.set(Era.ERA4, SystemAssignmentHelperEra4.MONICA_SYSTEMS);
        SystemAssignmentHelper.TORCH_SYSTEMS.set(Era.ERA4, SystemAssignmentHelperEra4.TORCH_SYSTEMS);
        SystemAssignmentHelper.PHOENIX_SYSTEMS.set(Era.ERA4, SystemAssignmentHelperEra4.PHOENIX_SYSTEMS);
        SystemAssignmentHelper.MANTICOREAN_SYSTEMS.set(Era.ERA4, SystemAssignmentHelperEra4.MANTICOREAN_SYSTEMS);
        SystemAssignmentHelper.HAVENITE_SYSTEMS.set(Era.ERA4, SystemAssignmentHelperEra4.HAVENITE_SYSTEMS);
        SystemAssignmentHelper.MALIGN_SYSTEMS.set(Era.ERA4, SystemAssignmentHelperEra4.MALIGN_SYSTEMS);
        SystemAssignmentHelper.SILESIA_SYSTEMS.set(Era.ERA4, SystemAssignmentHelperEra4.SILESIA_SYSTEMS);
        SystemAssignmentHelper.ANDERMANI_SYSTEMS.set(Era.ERA4, SystemAssignmentHelperEra4.ANDERMANI_SYSTEMS);
        SystemAssignmentHelper.SOLARIAN_SYSTEMS.set(Era.ERA4, SystemAssignmentHelperEra4.SOLARIAN_SYSTEMS);

        SystemAssignmentHelper.MIDGARD_SYSTEMS.set(Era.ERA5, SystemAssignmentHelperEra5.MIDGARD_SYSTEMS);
        SystemAssignmentHelper.MATAPAN_SYSTEMS.set(Era.ERA5, SystemAssignmentHelperEra5.MATAPAN_SYSTEMS);
        SystemAssignmentHelper.ASGARD_SYSTEMS.set(Era.ERA5, SystemAssignmentHelperEra5.ASGARD_SYSTEMS);
        SystemAssignmentHelper.MONICA_SYSTEMS.set(Era.ERA5, SystemAssignmentHelperEra5.MONICA_SYSTEMS);
        SystemAssignmentHelper.TORCH_SYSTEMS.set(Era.ERA5, SystemAssignmentHelperEra5.TORCH_SYSTEMS);
        SystemAssignmentHelper.PHOENIX_SYSTEMS.set(Era.ERA5, SystemAssignmentHelperEra5.PHOENIX_SYSTEMS);
        SystemAssignmentHelper.MANTICOREAN_SYSTEMS.set(Era.ERA5, SystemAssignmentHelperEra5.MANTICOREAN_SYSTEMS);
        SystemAssignmentHelper.HAVENITE_SYSTEMS.set(Era.ERA5, SystemAssignmentHelperEra5.HAVENITE_SYSTEMS);
        SystemAssignmentHelper.MALIGN_SYSTEMS.set(Era.ERA5, SystemAssignmentHelperEra5.MALIGN_SYSTEMS);
        SystemAssignmentHelper.SILESIA_SYSTEMS.set(Era.ERA5, SystemAssignmentHelperEra5.SILESIA_SYSTEMS);
        SystemAssignmentHelper.ANDERMANI_SYSTEMS.set(Era.ERA5, SystemAssignmentHelperEra5.ANDERMANI_SYSTEMS);
        SystemAssignmentHelper.SOLARIAN_SYSTEMS.set(Era.ERA5, SystemAssignmentHelperEra5.SOLARIAN_SYSTEMS);

        SystemAssignmentHelper.MIDGARD_SYSTEMS.set(Era.ERA6, SystemAssignmentHelperEra6.MIDGARD_SYSTEMS);
        SystemAssignmentHelper.MATAPAN_SYSTEMS.set(Era.ERA6, SystemAssignmentHelperEra6.MATAPAN_SYSTEMS);
        SystemAssignmentHelper.ASGARD_SYSTEMS.set(Era.ERA6, SystemAssignmentHelperEra6.ASGARD_SYSTEMS);
        SystemAssignmentHelper.MONICA_SYSTEMS.set(Era.ERA6, SystemAssignmentHelperEra6.MONICA_SYSTEMS);
        SystemAssignmentHelper.TORCH_SYSTEMS.set(Era.ERA6, SystemAssignmentHelperEra6.TORCH_SYSTEMS);
        SystemAssignmentHelper.PHOENIX_SYSTEMS.set(Era.ERA6, SystemAssignmentHelperEra6.PHOENIX_SYSTEMS);
        SystemAssignmentHelper.MANTICOREAN_SYSTEMS.set(Era.ERA6, SystemAssignmentHelperEra6.MANTICOREAN_SYSTEMS);
        SystemAssignmentHelper.HAVENITE_SYSTEMS.set(Era.ERA6, SystemAssignmentHelperEra6.HAVENITE_SYSTEMS);
        SystemAssignmentHelper.MALIGN_SYSTEMS.set(Era.ERA6, SystemAssignmentHelperEra6.MALIGN_SYSTEMS);
        SystemAssignmentHelper.SILESIA_SYSTEMS.set(Era.ERA6, SystemAssignmentHelperEra6.SILESIA_SYSTEMS);
        SystemAssignmentHelper.ANDERMANI_SYSTEMS.set(Era.ERA6, SystemAssignmentHelperEra6.ANDERMANI_SYSTEMS);
        SystemAssignmentHelper.SOLARIAN_SYSTEMS.set(Era.ERA6, SystemAssignmentHelperEra6.SOLARIAN_SYSTEMS);

        SystemAssignmentHelper.MIDGARD_SYSTEMS.set(Era.ERA7, SystemAssignmentHelperEra7.MIDGARD_SYSTEMS);
        SystemAssignmentHelper.MATAPAN_SYSTEMS.set(Era.ERA7, SystemAssignmentHelperEra7.MATAPAN_SYSTEMS);
        SystemAssignmentHelper.ASGARD_SYSTEMS.set(Era.ERA7, SystemAssignmentHelperEra7.ASGARD_SYSTEMS);
        SystemAssignmentHelper.MONICA_SYSTEMS.set(Era.ERA7, SystemAssignmentHelperEra7.MONICA_SYSTEMS);
        SystemAssignmentHelper.TORCH_SYSTEMS.set(Era.ERA7, SystemAssignmentHelperEra7.TORCH_SYSTEMS);
        SystemAssignmentHelper.PHOENIX_SYSTEMS.set(Era.ERA7, SystemAssignmentHelperEra7.PHOENIX_SYSTEMS);
        SystemAssignmentHelper.MANTICOREAN_SYSTEMS.set(Era.ERA7, SystemAssignmentHelperEra7.MANTICOREAN_SYSTEMS);
        SystemAssignmentHelper.HAVENITE_SYSTEMS.set(Era.ERA7, SystemAssignmentHelperEra7.HAVENITE_SYSTEMS);
        SystemAssignmentHelper.MALIGN_SYSTEMS.set(Era.ERA7, SystemAssignmentHelperEra7.MALIGN_SYSTEMS);
        SystemAssignmentHelper.SILESIA_SYSTEMS.set(Era.ERA7, SystemAssignmentHelperEra7.SILESIA_SYSTEMS);
        SystemAssignmentHelper.ANDERMANI_SYSTEMS.set(Era.ERA7, SystemAssignmentHelperEra7.ANDERMANI_SYSTEMS);
        SystemAssignmentHelper.SOLARIAN_SYSTEMS.set(Era.ERA7, SystemAssignmentHelperEra7.SOLARIAN_SYSTEMS);

        SystemAssignmentHelper.MIDGARD_SYSTEMS.set(Era.ERA8, SystemAssignmentHelperEra8.MIDGARD_SYSTEMS);
        SystemAssignmentHelper.MATAPAN_SYSTEMS.set(Era.ERA8, SystemAssignmentHelperEra8.MATAPAN_SYSTEMS);
        SystemAssignmentHelper.ASGARD_SYSTEMS.set(Era.ERA8, SystemAssignmentHelperEra8.ASGARD_SYSTEMS);
        SystemAssignmentHelper.MONICA_SYSTEMS.set(Era.ERA8, SystemAssignmentHelperEra8.MONICA_SYSTEMS);
        SystemAssignmentHelper.TORCH_SYSTEMS.set(Era.ERA8, SystemAssignmentHelperEra8.TORCH_SYSTEMS);
        SystemAssignmentHelper.PHOENIX_SYSTEMS.set(Era.ERA8, SystemAssignmentHelperEra8.PHOENIX_SYSTEMS);
        SystemAssignmentHelper.MANTICOREAN_SYSTEMS.set(Era.ERA8, SystemAssignmentHelperEra8.MANTICOREAN_SYSTEMS);
        SystemAssignmentHelper.HAVENITE_SYSTEMS.set(Era.ERA8, SystemAssignmentHelperEra8.HAVENITE_SYSTEMS);
        SystemAssignmentHelper.MALIGN_SYSTEMS.set(Era.ERA8, SystemAssignmentHelperEra8.MALIGN_SYSTEMS);
        SystemAssignmentHelper.SILESIA_SYSTEMS.set(Era.ERA8, SystemAssignmentHelperEra8.SILESIA_SYSTEMS);
        SystemAssignmentHelper.ANDERMANI_SYSTEMS.set(Era.ERA8, SystemAssignmentHelperEra8.ANDERMANI_SYSTEMS);
        SystemAssignmentHelper.SOLARIAN_SYSTEMS.set(Era.ERA8, SystemAssignmentHelperEra8.SOLARIAN_SYSTEMS);

        SystemAssignmentHelper.MIDGARD_SYSTEMS.set(Era.ERA9, SystemAssignmentHelperEra9.MIDGARD_SYSTEMS);
        SystemAssignmentHelper.MATAPAN_SYSTEMS.set(Era.ERA9, SystemAssignmentHelperEra9.MATAPAN_SYSTEMS);
        SystemAssignmentHelper.ASGARD_SYSTEMS.set(Era.ERA9, SystemAssignmentHelperEra9.ASGARD_SYSTEMS);
        SystemAssignmentHelper.MONICA_SYSTEMS.set(Era.ERA9, SystemAssignmentHelperEra9.MONICA_SYSTEMS);
        SystemAssignmentHelper.TORCH_SYSTEMS.set(Era.ERA9, SystemAssignmentHelperEra9.TORCH_SYSTEMS);
        SystemAssignmentHelper.PHOENIX_SYSTEMS.set(Era.ERA9, SystemAssignmentHelperEra9.PHOENIX_SYSTEMS);
        SystemAssignmentHelper.MANTICOREAN_SYSTEMS.set(Era.ERA9, SystemAssignmentHelperEra9.MANTICOREAN_SYSTEMS);
        SystemAssignmentHelper.HAVENITE_SYSTEMS.set(Era.ERA9, SystemAssignmentHelperEra9.HAVENITE_SYSTEMS);
        SystemAssignmentHelper.MALIGN_SYSTEMS.set(Era.ERA9, SystemAssignmentHelperEra9.MALIGN_SYSTEMS);
        SystemAssignmentHelper.SILESIA_SYSTEMS.set(Era.ERA9, SystemAssignmentHelperEra9.SILESIA_SYSTEMS);
        SystemAssignmentHelper.ANDERMANI_SYSTEMS.set(Era.ERA9, SystemAssignmentHelperEra9.ANDERMANI_SYSTEMS);
        SystemAssignmentHelper.SOLARIAN_SYSTEMS.set(Era.ERA9, SystemAssignmentHelperEra9.SOLARIAN_SYSTEMS);

        SystemAssignmentHelper.MIDGARD_SYSTEMS.set(Era.ERA10, SystemAssignmentHelperEra10.MIDGARD_SYSTEMS);
        SystemAssignmentHelper.MATAPAN_SYSTEMS.set(Era.ERA10, SystemAssignmentHelperEra10.MATAPAN_SYSTEMS);
        SystemAssignmentHelper.ASGARD_SYSTEMS.set(Era.ERA10, SystemAssignmentHelperEra10.ASGARD_SYSTEMS);
        SystemAssignmentHelper.MONICA_SYSTEMS.set(Era.ERA10, SystemAssignmentHelperEra10.MONICA_SYSTEMS);
        SystemAssignmentHelper.TORCH_SYSTEMS.set(Era.ERA10, SystemAssignmentHelperEra10.TORCH_SYSTEMS);
        SystemAssignmentHelper.PHOENIX_SYSTEMS.set(Era.ERA10, SystemAssignmentHelperEra10.PHOENIX_SYSTEMS);
        SystemAssignmentHelper.MANTICOREAN_SYSTEMS.set(Era.ERA10, SystemAssignmentHelperEra10.MANTICOREAN_SYSTEMS);
        SystemAssignmentHelper.HAVENITE_SYSTEMS.set(Era.ERA10, SystemAssignmentHelperEra10.HAVENITE_SYSTEMS);
        SystemAssignmentHelper.MALIGN_SYSTEMS.set(Era.ERA10, SystemAssignmentHelperEra10.MALIGN_SYSTEMS);
        SystemAssignmentHelper.SILESIA_SYSTEMS.set(Era.ERA10, SystemAssignmentHelperEra10.SILESIA_SYSTEMS);
        SystemAssignmentHelper.ANDERMANI_SYSTEMS.set(Era.ERA10, SystemAssignmentHelperEra10.ANDERMANI_SYSTEMS);
        SystemAssignmentHelper.SOLARIAN_SYSTEMS.set(Era.ERA10, SystemAssignmentHelperEra10.SOLARIAN_SYSTEMS);

        SystemAssignmentHelper.MIDGARD_SYSTEMS.set(Era.ERA11, SystemAssignmentHelperEra11.MIDGARD_SYSTEMS);
        SystemAssignmentHelper.MATAPAN_SYSTEMS.set(Era.ERA11, SystemAssignmentHelperEra11.MATAPAN_SYSTEMS);
        SystemAssignmentHelper.ASGARD_SYSTEMS.set(Era.ERA11, SystemAssignmentHelperEra11.ASGARD_SYSTEMS);
        SystemAssignmentHelper.MONICA_SYSTEMS.set(Era.ERA11, SystemAssignmentHelperEra11.MONICA_SYSTEMS);
        SystemAssignmentHelper.TORCH_SYSTEMS.set(Era.ERA11, SystemAssignmentHelperEra11.TORCH_SYSTEMS);
        SystemAssignmentHelper.PHOENIX_SYSTEMS.set(Era.ERA11, SystemAssignmentHelperEra11.PHOENIX_SYSTEMS);
        SystemAssignmentHelper.MANTICOREAN_SYSTEMS.set(Era.ERA11, SystemAssignmentHelperEra11.MANTICOREAN_SYSTEMS);
        SystemAssignmentHelper.HAVENITE_SYSTEMS.set(Era.ERA11, SystemAssignmentHelperEra11.HAVENITE_SYSTEMS);
        SystemAssignmentHelper.MALIGN_SYSTEMS.set(Era.ERA11, SystemAssignmentHelperEra11.MALIGN_SYSTEMS);
        SystemAssignmentHelper.SILESIA_SYSTEMS.set(Era.ERA11, SystemAssignmentHelperEra11.SILESIA_SYSTEMS);
        SystemAssignmentHelper.ANDERMANI_SYSTEMS.set(Era.ERA11, SystemAssignmentHelperEra11.ANDERMANI_SYSTEMS);
        SystemAssignmentHelper.SOLARIAN_SYSTEMS.set(Era.ERA11, SystemAssignmentHelperEra11.SOLARIAN_SYSTEMS);

        SystemAssignmentHelper.MIDGARD_SYSTEMS.set(Era.ERA12, SystemAssignmentHelperEra12.MIDGARD_SYSTEMS);
        SystemAssignmentHelper.MATAPAN_SYSTEMS.set(Era.ERA12, SystemAssignmentHelperEra12.MATAPAN_SYSTEMS);
        SystemAssignmentHelper.ASGARD_SYSTEMS.set(Era.ERA12, SystemAssignmentHelperEra12.ASGARD_SYSTEMS);
        SystemAssignmentHelper.MONICA_SYSTEMS.set(Era.ERA12, SystemAssignmentHelperEra12.MONICA_SYSTEMS);
        SystemAssignmentHelper.TORCH_SYSTEMS.set(Era.ERA12, SystemAssignmentHelperEra12.TORCH_SYSTEMS);
        SystemAssignmentHelper.PHOENIX_SYSTEMS.set(Era.ERA12, SystemAssignmentHelperEra12.PHOENIX_SYSTEMS);
        SystemAssignmentHelper.MANTICOREAN_SYSTEMS.set(Era.ERA12, SystemAssignmentHelperEra12.MANTICOREAN_SYSTEMS);
        SystemAssignmentHelper.HAVENITE_SYSTEMS.set(Era.ERA12, SystemAssignmentHelperEra12.HAVENITE_SYSTEMS);
        SystemAssignmentHelper.MALIGN_SYSTEMS.set(Era.ERA12, SystemAssignmentHelperEra12.MALIGN_SYSTEMS);
        SystemAssignmentHelper.SILESIA_SYSTEMS.set(Era.ERA12, SystemAssignmentHelperEra12.SILESIA_SYSTEMS);
        SystemAssignmentHelper.ANDERMANI_SYSTEMS.set(Era.ERA12, SystemAssignmentHelperEra12.ANDERMANI_SYSTEMS);
        SystemAssignmentHelper.SOLARIAN_SYSTEMS.set(Era.ERA12, SystemAssignmentHelperEra12.SOLARIAN_SYSTEMS);

        SystemAssignmentHelper.MIDGARD_SYSTEMS.set(Era.ERA13, SystemAssignmentHelperEra13.MIDGARD_SYSTEMS);
        SystemAssignmentHelper.MATAPAN_SYSTEMS.set(Era.ERA13, SystemAssignmentHelperEra13.MATAPAN_SYSTEMS);
        SystemAssignmentHelper.ASGARD_SYSTEMS.set(Era.ERA13, SystemAssignmentHelperEra13.ASGARD_SYSTEMS);
        SystemAssignmentHelper.MONICA_SYSTEMS.set(Era.ERA13, SystemAssignmentHelperEra13.MONICA_SYSTEMS);
        SystemAssignmentHelper.TORCH_SYSTEMS.set(Era.ERA13, SystemAssignmentHelperEra13.TORCH_SYSTEMS);
        SystemAssignmentHelper.PHOENIX_SYSTEMS.set(Era.ERA13, SystemAssignmentHelperEra13.PHOENIX_SYSTEMS);
        SystemAssignmentHelper.MANTICOREAN_SYSTEMS.set(Era.ERA13, SystemAssignmentHelperEra13.MANTICOREAN_SYSTEMS);
        SystemAssignmentHelper.HAVENITE_SYSTEMS.set(Era.ERA13, SystemAssignmentHelperEra13.HAVENITE_SYSTEMS);
        SystemAssignmentHelper.MALIGN_SYSTEMS.set(Era.ERA13, SystemAssignmentHelperEra13.MALIGN_SYSTEMS);
        SystemAssignmentHelper.SILESIA_SYSTEMS.set(Era.ERA13, SystemAssignmentHelperEra13.SILESIA_SYSTEMS);
        SystemAssignmentHelper.ANDERMANI_SYSTEMS.set(Era.ERA13, SystemAssignmentHelperEra13.ANDERMANI_SYSTEMS);
        SystemAssignmentHelper.SOLARIAN_SYSTEMS.set(Era.ERA13, SystemAssignmentHelperEra13.SOLARIAN_SYSTEMS);

        SystemAssignmentHelper.MIDGARD_SYSTEMS.set(Era.ERA14, SystemAssignmentHelperEra14.MIDGARD_SYSTEMS);
        SystemAssignmentHelper.MATAPAN_SYSTEMS.set(Era.ERA14, SystemAssignmentHelperEra14.MATAPAN_SYSTEMS);
        SystemAssignmentHelper.ASGARD_SYSTEMS.set(Era.ERA14, SystemAssignmentHelperEra14.ASGARD_SYSTEMS);
        SystemAssignmentHelper.MONICA_SYSTEMS.set(Era.ERA14, SystemAssignmentHelperEra14.MONICA_SYSTEMS);
        SystemAssignmentHelper.TORCH_SYSTEMS.set(Era.ERA14, SystemAssignmentHelperEra14.TORCH_SYSTEMS);
        SystemAssignmentHelper.PHOENIX_SYSTEMS.set(Era.ERA14, SystemAssignmentHelperEra14.PHOENIX_SYSTEMS);
        SystemAssignmentHelper.MANTICOREAN_SYSTEMS.set(Era.ERA14, SystemAssignmentHelperEra14.MANTICOREAN_SYSTEMS);
        SystemAssignmentHelper.HAVENITE_SYSTEMS.set(Era.ERA14, SystemAssignmentHelperEra14.HAVENITE_SYSTEMS);
        SystemAssignmentHelper.MALIGN_SYSTEMS.set(Era.ERA14, SystemAssignmentHelperEra14.MALIGN_SYSTEMS);
        SystemAssignmentHelper.SILESIA_SYSTEMS.set(Era.ERA14, SystemAssignmentHelperEra14.SILESIA_SYSTEMS);
        SystemAssignmentHelper.ANDERMANI_SYSTEMS.set(Era.ERA14, SystemAssignmentHelperEra14.ANDERMANI_SYSTEMS);
        SystemAssignmentHelper.SOLARIAN_SYSTEMS.set(Era.ERA14, SystemAssignmentHelperEra14.SOLARIAN_SYSTEMS);

        SystemAssignmentHelper.MIDGARD_SYSTEMS.set(Era.ERA15, SystemAssignmentHelperEra15.MIDGARD_SYSTEMS);
        SystemAssignmentHelper.MATAPAN_SYSTEMS.set(Era.ERA15, SystemAssignmentHelperEra15.MATAPAN_SYSTEMS);
        SystemAssignmentHelper.ASGARD_SYSTEMS.set(Era.ERA15, SystemAssignmentHelperEra15.ASGARD_SYSTEMS);
        SystemAssignmentHelper.MONICA_SYSTEMS.set(Era.ERA15, SystemAssignmentHelperEra15.MONICA_SYSTEMS);
        SystemAssignmentHelper.TORCH_SYSTEMS.set(Era.ERA15, SystemAssignmentHelperEra15.TORCH_SYSTEMS);
        SystemAssignmentHelper.PHOENIX_SYSTEMS.set(Era.ERA15, SystemAssignmentHelperEra15.PHOENIX_SYSTEMS);
        SystemAssignmentHelper.MANTICOREAN_SYSTEMS.set(Era.ERA15, SystemAssignmentHelperEra15.MANTICOREAN_SYSTEMS);
        SystemAssignmentHelper.HAVENITE_SYSTEMS.set(Era.ERA15, SystemAssignmentHelperEra15.HAVENITE_SYSTEMS);
        SystemAssignmentHelper.MALIGN_SYSTEMS.set(Era.ERA15, SystemAssignmentHelperEra15.MALIGN_SYSTEMS);
        SystemAssignmentHelper.SILESIA_SYSTEMS.set(Era.ERA15, SystemAssignmentHelperEra15.SILESIA_SYSTEMS);
        SystemAssignmentHelper.ANDERMANI_SYSTEMS.set(Era.ERA15, SystemAssignmentHelperEra15.ANDERMANI_SYSTEMS);
        SystemAssignmentHelper.SOLARIAN_SYSTEMS.set(Era.ERA15, SystemAssignmentHelperEra15.SOLARIAN_SYSTEMS);

        SystemAssignmentHelper.MIDGARD_SYSTEMS.set(Era.ERA16, SystemAssignmentHelperEra16.MIDGARD_SYSTEMS);
        SystemAssignmentHelper.MATAPAN_SYSTEMS.set(Era.ERA16, SystemAssignmentHelperEra16.MATAPAN_SYSTEMS);
        SystemAssignmentHelper.ASGARD_SYSTEMS.set(Era.ERA16, SystemAssignmentHelperEra16.ASGARD_SYSTEMS);
        SystemAssignmentHelper.MONICA_SYSTEMS.set(Era.ERA16, SystemAssignmentHelperEra16.MONICA_SYSTEMS);
        SystemAssignmentHelper.TORCH_SYSTEMS.set(Era.ERA16, SystemAssignmentHelperEra16.TORCH_SYSTEMS);
        SystemAssignmentHelper.PHOENIX_SYSTEMS.set(Era.ERA16, SystemAssignmentHelperEra16.PHOENIX_SYSTEMS);
        SystemAssignmentHelper.MANTICOREAN_SYSTEMS.set(Era.ERA16, SystemAssignmentHelperEra16.MANTICOREAN_SYSTEMS);
        SystemAssignmentHelper.HAVENITE_SYSTEMS.set(Era.ERA16, SystemAssignmentHelperEra16.HAVENITE_SYSTEMS);
        SystemAssignmentHelper.MALIGN_SYSTEMS.set(Era.ERA16, SystemAssignmentHelperEra16.MALIGN_SYSTEMS);
        SystemAssignmentHelper.SILESIA_SYSTEMS.set(Era.ERA16, SystemAssignmentHelperEra16.SILESIA_SYSTEMS);
        SystemAssignmentHelper.ANDERMANI_SYSTEMS.set(Era.ERA16, SystemAssignmentHelperEra16.ANDERMANI_SYSTEMS);
        SystemAssignmentHelper.SOLARIAN_SYSTEMS.set(Era.ERA16, SystemAssignmentHelperEra16.SOLARIAN_SYSTEMS);

        SystemAssignmentHelper.MIDGARD_SYSTEMS.set(Era.ERA17, SystemAssignmentHelperEra17.MIDGARD_SYSTEMS);
        SystemAssignmentHelper.MATAPAN_SYSTEMS.set(Era.ERA17, SystemAssignmentHelperEra17.MATAPAN_SYSTEMS);
        SystemAssignmentHelper.ASGARD_SYSTEMS.set(Era.ERA17, SystemAssignmentHelperEra17.ASGARD_SYSTEMS);
        SystemAssignmentHelper.MONICA_SYSTEMS.set(Era.ERA17, SystemAssignmentHelperEra17.MONICA_SYSTEMS);
        SystemAssignmentHelper.TORCH_SYSTEMS.set(Era.ERA17, SystemAssignmentHelperEra17.TORCH_SYSTEMS);
        SystemAssignmentHelper.PHOENIX_SYSTEMS.set(Era.ERA17, SystemAssignmentHelperEra17.PHOENIX_SYSTEMS);
        SystemAssignmentHelper.MANTICOREAN_SYSTEMS.set(Era.ERA17, SystemAssignmentHelperEra17.MANTICOREAN_SYSTEMS);
        SystemAssignmentHelper.HAVENITE_SYSTEMS.set(Era.ERA17, SystemAssignmentHelperEra17.HAVENITE_SYSTEMS);
        SystemAssignmentHelper.MALIGN_SYSTEMS.set(Era.ERA17, SystemAssignmentHelperEra17.MALIGN_SYSTEMS);
        SystemAssignmentHelper.SILESIA_SYSTEMS.set(Era.ERA17, SystemAssignmentHelperEra17.SILESIA_SYSTEMS);
        SystemAssignmentHelper.ANDERMANI_SYSTEMS.set(Era.ERA17, SystemAssignmentHelperEra17.ANDERMANI_SYSTEMS);
        SystemAssignmentHelper.SOLARIAN_SYSTEMS.set(Era.ERA17, SystemAssignmentHelperEra17.SOLARIAN_SYSTEMS);

        SystemAssignmentHelper.MIDGARD_SYSTEMS.set(Era.ERA18, SystemAssignmentHelperEra18.MIDGARD_SYSTEMS);
        SystemAssignmentHelper.MATAPAN_SYSTEMS.set(Era.ERA18, SystemAssignmentHelperEra18.MATAPAN_SYSTEMS);
        SystemAssignmentHelper.ASGARD_SYSTEMS.set(Era.ERA18, SystemAssignmentHelperEra18.ASGARD_SYSTEMS);
        SystemAssignmentHelper.MONICA_SYSTEMS.set(Era.ERA18, SystemAssignmentHelperEra18.MONICA_SYSTEMS);
        SystemAssignmentHelper.TORCH_SYSTEMS.set(Era.ERA18, SystemAssignmentHelperEra18.TORCH_SYSTEMS);
        SystemAssignmentHelper.PHOENIX_SYSTEMS.set(Era.ERA18, SystemAssignmentHelperEra18.PHOENIX_SYSTEMS);
        SystemAssignmentHelper.MANTICOREAN_SYSTEMS.set(Era.ERA18, SystemAssignmentHelperEra18.MANTICOREAN_SYSTEMS);
        SystemAssignmentHelper.HAVENITE_SYSTEMS.set(Era.ERA18, SystemAssignmentHelperEra18.HAVENITE_SYSTEMS);
        SystemAssignmentHelper.MALIGN_SYSTEMS.set(Era.ERA18, SystemAssignmentHelperEra18.MALIGN_SYSTEMS);
        SystemAssignmentHelper.SILESIA_SYSTEMS.set(Era.ERA18, SystemAssignmentHelperEra18.SILESIA_SYSTEMS);
        SystemAssignmentHelper.ANDERMANI_SYSTEMS.set(Era.ERA18, SystemAssignmentHelperEra18.ANDERMANI_SYSTEMS);
        SystemAssignmentHelper.SOLARIAN_SYSTEMS.set(Era.ERA18, SystemAssignmentHelperEra18.SOLARIAN_SYSTEMS);

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
