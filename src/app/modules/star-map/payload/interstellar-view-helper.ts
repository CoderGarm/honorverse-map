import {OrbitDefinition} from "./orbit-definition";
import {RadialGroup} from "../external-map-manager/external-map-manager.component";
import {ExternalMapComponent} from "../external-map/external-map.component";
import {BasicViewHelper} from "../svg-view-helper/basic-view-helper";

export class InterstellarViewHelper extends BasicViewHelper {

    constructor() {
        super();
    }

    drawOrbits(orbits: OrbitDefinition[]) {
        this.setOrbits(orbits);
        const homeDef = orbits.filter(od => od.isMain)[0];
        this.setViewBox(homeDef.celestial);
        this.setViewBoxForMinimap();

        orbits.forEach(orbitDefinition => this.drawCelestial(orbitDefinition));
    }

    drawRadialGroups(radialGroups: RadialGroup[]) {
        if (radialGroups.length == 0) {
            return;
        }

        radialGroups.forEach(rg => {
            const coord = rg.coord;
            const id = ExternalMapComponent.getStarSystemCircleID(coord);
            const x = coord.x;
            const y = coord.y;
            const radius = rg.radius;
            this.canvas!.circle()
                .x(x)
                .y(y)
                .id("radius-" + id)
                .fill(BasicViewHelper.NONE_FILL_COLOR)
                .addClass(BasicViewHelper.HYPER_LIMIT_MARKER)
                .radius(radius);
        });
    }
}
