import {Coords} from "../../../services/swagger";
import {ExternalMapComponent} from "../external-map/external-map.component";
import {SystemAssignmentHelper} from "../svg-view-helper/system-assignment.helper";

/**
 * just a container to hold the orbit information and if the specified orbit is colonized by someone
 */
export class OrbitDefinition {

    readonly celestial: Coords;

    readonly colorMarker: string;

    readonly isMain: boolean;

    constructor(celestial: Coords,
                isMain: boolean,
                colorMarker: string) {
        this.celestial = celestial;
        this.colorMarker = colorMarker;
        this.isMain = isMain;
    }

    public static getOrbitDefinitionsForExternalStarMap(center: Coords, systems: Coords[], colorMarkers: Map<string, string>): OrbitDefinition[] {
        const od: OrbitDefinition[] = [];
        systems.forEach(system => {
            let id = ExternalMapComponent.getStarSystemCircleID(system);
            let isMain: boolean = system.name === center.name;
            const colorMarker = colorMarkers.has(id) ? colorMarkers.get(id)! : SystemAssignmentHelper.UNFOCUSSED_COLOR_MARKER;
            od.push(new OrbitDefinition(system, isMain, colorMarker));
        });
        return od;
    }
}
