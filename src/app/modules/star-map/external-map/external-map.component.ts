import {AfterViewInit, Component} from '@angular/core';
import {InterstellarViewHelper} from "../payload/interstellar-view-helper";
import {Coords, CoordsBlob, PublicResourcesApiService} from "../../../services/swagger";
import {TranslateService} from "@ngx-translate/core";
import {OrbitDefinition} from "../payload/orbit-definition";
import {ActivatedRoute, ParamMap} from "@angular/router";
import {
    ColorGroup,
    ExternalMapManagerComponent,
    RadialGroup,
    SimpleCoord
} from "../external-map-manager/external-map-manager.component";
import {BasicViewHelperData} from "../svg-view-helper/basic-view-helper-data";

@Component({
    selector: 'app-external-map',
    templateUrl: './external-map.component.html',
    styleUrls: ['./external-map.component.scss']
})
export class ExternalMapComponent extends InterstellarViewHelper implements AfterViewInit {

    static path: string = 'external-star-map';

    private static readonly RADIAL_HIGHLIGHTING_COLOR: string = '#872727';
    public static readonly UN_FOCUSSED_COLOR: string = '#FB8C00';

    private static queryParam: string[] = ['highlight', 'center', 'radialGroup'];
    highlight?: ColorGroup[];
    colorByCircle: Map<string, string> = new Map<string, string>();
    highlightedCenter?: SimpleCoord;

    coords?: CoordsBlob;

    center?: Coords;
    hoveredSystem?: Coords;

    radialGroups: RadialGroup[] = [];

    constructor(private route: ActivatedRoute,
                private publicResourcesApiService: PublicResourcesApiService,
                private translate: TranslateService) {
        super();

        // just make sure that the key exists
        this.translate.get('star-map.universe-map.loading-spinner-message');
        this.route.queryParamMap.subscribe(map => {
            this.detectHighlight(map);
            this.detectCenter(map);
            this.detectRadialGroups(map);
            this.createUniverseMap();
        });
    }

    private detectRadialGroups(map: ParamMap) {
        const center = map.get(ExternalMapComponent.queryParam[2]);
        if (!!center) {
            this.radialGroups = JSON.parse(center);
            this.radialGroups.forEach(rg => this.colorByCircle.set(ExternalMapComponent.getStarSystemCircleID(rg.coord), ExternalMapComponent.RADIAL_HIGHLIGHTING_COLOR));
        }
    }

    private detectCenter(map: ParamMap) {
        const center = map.get(ExternalMapComponent.queryParam[1]);
        if (!!center) {
            this.highlightedCenter = JSON.parse(center);
        }
    }

    private detectHighlight(map: ParamMap) {
        const highlight = map.get(ExternalMapComponent.queryParam[0]);
        if (!!highlight) {
            this.highlight = JSON.parse(highlight);
            this.highlight!.forEach(cg => {
                cg.simpleCoords.forEach(coord => {
                    const id = ExternalMapComponent.getStarSystemCircleID(coord);
                    this.colorByCircle.set(id, cg.color);
                });
            });
        }
    }

    ngAfterViewInit(): void {
        // unfortunately necessary in this constellation - ng destroy is called by ng template in tab view on tab switch
        const length = document.getElementById('universe')!.childNodes.length;
        if (length == 0) {
            // called twice but never cleared why
            const canvas = this.createCanvas("universe-canvas", '#universe', 'ext-');
            canvas.mouseover(this.mouseoverForCelestial).mouseout(this.mouseoutForCelestial);
            this.createUniverseMap();
        }
    }

    static getStarSystemCircleID(orbit: SimpleCoord): string {
        return BasicViewHelperData.CELESTIAL_BODY_SELECTOR_ID_PREFIX + "-" + orbit.x + "-" + orbit.y;
    }

    mouseoutForCelestial = () => {
        this.hoveredSystem = this.center;
    }

    mouseoverForCelestial = (event: PointerEvent) => {
        let id = this.getIdFromEvent(event);
        if (!this.isCelestialId(id)) {
            return;
        }
        let celestial = <Coords>this.getCelestialObjectByID(id);
        if (!!celestial) {
            this.hoveredSystem = celestial;
        }
    }

    private createUniverseMap() {
        this.clearData();

        let sub = this.publicResourcesApiService.getAllSystemCoordinates().subscribe(resp => {
            this.coords = resp;
            const colors: Map<string, string> = new Map<string, string>();
            this.coords.forEach(coord => {
                let id = ExternalMapComponent.getStarSystemCircleID(coord);
                const color = this.colorByCircle.has(id) ? this.colorByCircle.get(id) : ExternalMapComponent.UN_FOCUSSED_COLOR;
                colors.set(id, color!);
            });

            if (this.radialGroups.length > 0) {
                this.highlightedCenter = this.radialGroups[0].coord;
            }

            if (!!this.highlightedCenter) {
                this.center = this.coords.filter(sys => ExternalMapManagerComponent.matches(this.highlightedCenter!, sys))[0];
            } else {
                this.center = this.coords.filter(sys => sys.name === 'Sol')[0];
            }
            this.hoveredSystem = this.center;

            let orbitDefinitions: OrbitDefinition[] = OrbitDefinition.getOrbitDefinitionsForExternalStarMap(this.center, this.coords, colors);
            this.drawRadialGroups(this.radialGroups);
            this.drawOrbits(orbitDefinitions);
            this.drawJunctions();
        });
        this.subscriptions.push(sub);
    }

    private drawJunctions() {
        let sub = this.publicResourcesApiService.getAllWormholeJunctions().subscribe(junctions => {
            junctions.forEach(junction => {
                junction.termini.forEach(terminus => {
                    const mainCelestialGroup = this.getOrCreateMainCelestialGroup();
                    mainCelestialGroup
                        .line(junction.position.x, junction.position.y, terminus.x, terminus.y)
                        .addClass(BasicViewHelperData.RESIZE_ON_ZOOM_MARKER)
                        .addClass(BasicViewHelperData.WORMHOLE_MARKER)
                        .stroke({width: 1, color: 'irrelevant'});
                });
            });
        });
        this.subscriptions.push(sub);
    }
}
