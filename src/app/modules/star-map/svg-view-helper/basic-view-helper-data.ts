import {G, Path, Shape, Text} from "@svgdotjs/svg.js";
import {Component} from "@angular/core";
import {SubscriptionManager} from "../../../services/subscription.manager";
import {OrbitDefinition} from "../payload/orbit-definition";
import {Coords} from "../../../services/swagger";


@Component({
    template: ''
})
export class BasicViewHelperData extends SubscriptionManager {

    protected static readonly GROUP_SELECTOR_SUFFIX: string = "-group";
    protected static readonly CYCLING_CIRCLE_SUFFIX = "-circle-cycle";
    protected static readonly ORBIT_SUFFIX = "-orbit";

    protected static readonly CELESTIAL_BODY_SELECTOR_ID_PREFIX: string = "-celestial";
    protected static readonly ORBIT_SELECTOR_ID_PREFIX: string = "-orbit";

    protected static readonly CLICKABLE_CSS_CLASS = "clickable";
    protected static readonly CYCLING_CIRCLE_MARKER = "circle-cycle";
    protected static readonly ICON_ID_MARKER: string = "iconId-";
    protected static readonly MOVABLE_STATE_DOT_MARKER: string = "movableStateDot";
    protected static readonly TEXT_MARKER: string = "svg-text";
    protected static readonly ROUND_CAP_MARKER = "roundCap";
    protected static readonly ROUND_CAP_SUFFIX = "-roundCapSuffix";
    protected static readonly RESIZE_ON_ZOOM_MARKER = "no-resize";
    protected static readonly WORMHOLE_MARKER = "wormhole";
    protected static readonly WORMHOLE_MARKER_ID_PREFIX = "wormholeName-";
    protected static readonly WORMHOLE_MARKER_ID_CONNECTOR = "^id^";
    protected static readonly WORMHOLE_HIGHLIGHT_MARKER = "wormhole-highlight";
    protected static readonly LOW_OPACITY_MARKER = 'low-opacity';
    protected static readonly STAR_MARKER = "star";
    protected static readonly STAR_IN_SYSTEM_MARKER = "star-in-system";
    protected static readonly HYPER_LIMIT_MARKER = "hyper-limit";
    protected static readonly CENTER_COORDINATES_MARKER = "center-";
    protected static readonly CENTER_COORDINATES_SEPARATOR = "|";

    protected orbits: Coords[] = [];

    protected radiusOfCoordinateCross?: number;
    private textById: Map<string, Text> = new Map<string, Text>();
    private celestialObjectById: Map<string, Coords> = new Map<string, Coords>();
    private celestialBodyById: Map<string, Path> = new Map<string, Path>();
    private celestialOrbitById: Map<string, Coords> = new Map<string, Coords>();
    private orbitsById: Map<string, Coords> = new Map<string, Coords>();

    private groupsByID: Map<string, G> = new Map<string, G>();
    widescreenMode: boolean = false;

    constructor() {
        super();
    }

    protected clearData() {
        this.textById.clear();
        this.celestialObjectById.clear();
        this.celestialBodyById.clear();
        this.celestialOrbitById.clear();
        this.orbitsById.clear();
        this.groupsByID.clear();
    }

    protected getCelestialBodyIDs(): string[] {
        return Array.from(this.celestialBodyById.keys());
    }

    protected getOrDefaultZoomFactor(zoomFactor?: number) {
        if (!zoomFactor) {
            zoomFactor = 1;
        }
        return zoomFactor;
    }

    protected getOrbitID(orbit: Coords): string {
        return BasicViewHelperData.ORBIT_SELECTOR_ID_PREFIX + "-" + orbit.x + "-" + orbit.y;
    }

    protected getOrbitOfCelestialByID(id: string): Coords | undefined {
        return this.celestialOrbitById.get(id);
    }

    protected getCelestialByEvent(event: PointerEvent | MouseEvent): Path | undefined {
        let id = this.getIdFromEvent(event);
        return this.getCelestialByID(id);
    }

    protected getCelestialByID(id: string): Path | undefined {
        return this.celestialBodyById.get(id);
    }

    protected getCelestialObjectByID(id: string): Coords | undefined {
        return this.celestialObjectById.get(id);
    }

    protected getOrbitOfCelestialByEvent(event: PointerEvent | MouseEvent): Coords | undefined {
        let id = this.getIdFromEvent(event);
        return this.getOrbitOfCelestialByID(id);
    }

    protected getTextByEvent(event: PointerEvent | MouseEvent): Text | undefined {
        let id = this.getIdFromEvent(event);
        return this.getTextById(id);
    }

    protected getTextById(id: string) {
        return this.textById.get(id);
    }

    protected getIdFromEvent(event: PointerEvent | MouseEvent | any): string {
        let target: Shape = event.target as Shape;
        const id = target.id as unknown as string;
        if (!id) {
            const parent = event.composedPath()[1];
            return parent.id;
        }
        return id;
    }

    protected isCelestialId(id: string): boolean {
        return id.startsWith(BasicViewHelperData.CELESTIAL_BODY_SELECTOR_ID_PREFIX);
    }

    protected getCyclingCircleId(id: string) {
        return id + BasicViewHelperData.CYCLING_CIRCLE_SUFFIX;
    }

    protected getCelestialBodyID(orbit: Coords): string {
        return BasicViewHelperData.CELESTIAL_BODY_SELECTOR_ID_PREFIX + "-" + orbit.x + "-" + orbit.y;
    }

    protected setTextById(id: string, text: Text) {
        this.textById.set(id, text);
    }

    protected getGroupById(id: string): G | undefined {
        if (!id.endsWith(BasicViewHelperData.GROUP_SELECTOR_SUFFIX)) {
            id += BasicViewHelperData.GROUP_SELECTOR_SUFFIX;
        }
        return this.groupsByID.get(id);
    }

    protected setCelestialCircleById(celestialBodyID: string, circle: Path) {
        this.celestialBodyById.set(celestialBodyID, circle);
    }

    protected setCelestialObjectById(celestialBodyID: string, celestial: Coords) {
        this.celestialObjectById.set(celestialBodyID, celestial);
    }

    protected setCelestialOrbitById(celestialBodyID: string, orbit: Coords) {
        this.celestialOrbitById.set(celestialBodyID, orbit);
    }

    protected setOrbitById(orbitID: string, orbit: Coords) {
        this.orbitsById.set(orbitID, orbit);
    }

    protected setOrbits(orbits: OrbitDefinition[]) {
        this.orbits = orbits.map(od => od.celestial);
    }
}
