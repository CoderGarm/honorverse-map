import {Coords} from "../../../services/swagger";
import {ExternalMapComponent} from "../external-map/external-map.component";

/**
 * just a container to hold the orbit information and if the specified orbit is colonized by someone
 */
export class OrbitDefinition {

    readonly celestial: Coords;

    readonly color?: string;

    readonly isMain: boolean;

    constructor(celestial: Coords,
                isMain: boolean,
                color?: string) {
        this.celestial = celestial;
        this.color = color;
        this.isMain = isMain;
    }

    public static getOrbitDefinitionsForExternalStarMap(center: Coords, systems: Coords[], colors: Map<string, string>): OrbitDefinition[] {
        const od: OrbitDefinition[] = [];
        systems.forEach(system => {
            let id = ExternalMapComponent.getStarSystemCircleID(center);
            let isMain: boolean = system.name === center.name;
            od.push(new OrbitDefinition(system, isMain, colors.get(id)));
        });
        return od;
    }
}
