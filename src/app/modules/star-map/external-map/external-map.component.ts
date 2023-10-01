import {AfterViewInit, Component, HostListener} from '@angular/core';
import {InterstellarViewHelper} from "../payload/interstellar-view-helper";
import {Coords, CoordsBlob, PublicResourcesApiService} from "../../../services/swagger";
import {TranslateService} from "@ngx-translate/core";
import {OrbitDefinition} from "../payload/orbit-definition";
import {ActivatedRoute, ParamMap} from "@angular/router";
import {ColorGroup, ExternalMapManagerComponent, RadialGroup, SimpleCoord} from "../external-map-manager/external-map-manager.component";
import {BasicViewHelperData} from "../svg-view-helper/basic-view-helper-data";
import {interval} from "rxjs";
import {Point} from "@svgdotjs/svg.js";

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

    starSystemCreationState: boolean = false;
    selectedStarSystem?: Coords;

    showBackgroundNav: boolean = false;
    showUpload: boolean = false;

    backgroundImage?: File;
    backgroundTranslateX: number = 0;
    backgroundTranslateY: number = 0;

    lockedToBackground: boolean = false;

    maxGranularity: boolean = false;

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
            canvas
                .mouseover(this.mouseoverForCelestial)
                .mouseout(this.mouseoutForCelestial)
                .click(this.clickEventForCelestial)
                .click(this.clickEventForCreateCelestial);
        }
    }

    clickEventForCreateCelestial = (event: PointerEvent) => {
        let id = this.getIdFromEvent(event);
        if (id === 'universe-canvas' && !this.starSystemCreationState) {
            let box = this.canvas!.viewbox();

            let {x, y} = this.getSvgCoordinateFromPointerEvent(event);

            let insideViewbox = this.isInsideViewbox(box, x, y);

            this.starSystemCreationState = true;
            this.selectedStarSystem = {
                name: 'new System',
                x: x,
                y: y
            }
            let o: OrbitDefinition = new OrbitDefinition(this.selectedStarSystem, false, 'red');
            let celestialBodyID = this.getCelestialBodyID(this.selectedStarSystem);
            this.drawCelestial(o);
            this.drawCyclingCircle(x, y, celestialBodyID, false);
        }
    }


    clickEventForCelestial = (event: PointerEvent) => {
        let id = this.getIdFromEvent(event);
        if (!this.isCelestialId(id)) {
            return;
        }

        const celestialCircle = this.getCelestialByEvent(event);
        if (!celestialCircle) {
            return;
        }
        // noinspection JSUnusedLocalSymbols
        let x = celestialCircle.cx();
        // noinspection JSUnusedLocalSymbols
        let y = celestialCircle.cy();
        const celestial = this.getCelestialObjectByID(id);
        if (!celestial) {
            return;
        }
        this.handleClickedStarSystem(x, y, id);
    };

    private handleClickedStarSystem(x: number, y: number, id: string) {

        const selectionRemoved = this.removeCyclingCircle(id);
        if (selectionRemoved) {
            this.selectedStarSystem = undefined;
            return;
        }

        if (!!this.selectedStarSystem) {
            return;
        }
        // add selected system
        this.drawCyclingCircle(x, y, id, false);
        this.selectedStarSystem = this.hoveredSystem;
    }

    static getStarSystemCircleID(orbit: SimpleCoord): string {
        return BasicViewHelperData.CELESTIAL_BODY_SELECTOR_ID_PREFIX + "-" + orbit.x + "-" + orbit.y;
    }

    mouseoutForCelestial = () => {
        this.hoveredSystem = !!this.selectedStarSystem ? this.selectedStarSystem : this.center;
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

    uploadCoordinates(file: File) {
        let parse: Coords[] | undefined;
        let reader = new FileReader();
        reader.onloadend = function () {
            let content = reader.result!.toString();
            parse = JSON.parse(content);
        }
        if (file) {
            reader.readAsText(file);
            const source = interval(100);
            let sub = source.subscribe(() => {
                if (!!parse) {
                    this.createUniverseMap(parse);
                    sub.unsubscribe();
                }
            });
            this.subscriptions.push(sub);
        }
    }

    private createUniverseMap(coords?: Coords[]) {
        this.clearData();

        let sub = this.publicResourcesApiService.getAllSystemCoordinates().subscribe(resp => {
            this.coords = !!coords ? coords : resp;
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
            if (!this.center) {
                this.center = this.coords[0];
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
                    this.canvas!
                        .line(junction.position.x, junction.position.y, terminus.x, terminus.y)
                        .addClass(BasicViewHelperData.RESIZE_ON_ZOOM_MARKER)
                        .addClass(BasicViewHelperData.WORMHOLE_MARKER)
                        .addClass(BasicViewHelperData.LOW_OPACITY_MARKER)
                        .stroke({width: 1, color: 'irrelevant'});
                });
            });
        });
        this.subscriptions.push(sub);
    }

    setBackground(file: File) {
        this.backgroundImage = file;

        let newImg = new Image();
        newImg.onload = function () {
            let htmlElement = document.getElementById('universe')!;
            htmlElement.style.backgroundSize = newImg.naturalWidth + "px " + newImg.naturalHeight + "px";
        }

        let reader = new FileReader();
        reader.onloadend = function () {
            document.getElementById('universe')!.style.backgroundImage = "url(" + reader.result + ")";
            // noinspection RegExpUnnecessaryNonCapturingGroup
            newImg.src = document.getElementById('universe')!.style.backgroundImage
                .replace(/(?:^url\(["']?|["']?\)$)/g, "");
        }
        if (file) {
            reader.readAsDataURL(file);
            this.resetBackgroundModification();
            this.canvas!.children().filter(c => c.classes().includes(ExternalMapComponent.WORMHOLE_MARKER))
                .forEach(c => c.removeClass(ExternalMapComponent.LOW_OPACITY_MARKER));
        }
    }

    removeBackground() {
        this.resetBackgroundModification();
        document.getElementById('universe')!.style.backgroundImage = "";
    }

    resetBackgroundModification() {
        let htmlElement = document.getElementById('universe')!;
        this.backgroundTranslateX = 0;
        this.backgroundTranslateY = 0;
        htmlElement.style.backgroundSize = "100% " + "100%";
        htmlElement.style.backgroundPosition = this.backgroundTranslateX + "px " + this.backgroundTranslateY + "px";

        this.canvas!.children().filter(c => c.classes().includes(ExternalMapComponent.WORMHOLE_MARKER))
            .forEach(c => c.addClass(ExternalMapComponent.LOW_OPACITY_MARKER));

    }

    handlePosChange(key: string) {
        if (!this.selectedStarSystem) {
            return;
        }
        let celestialBodyID = this.removeSelectedSystemFromCanvas();

        switch (key) {
            case 'i':
                this.selectedStarSystem.y -= 1;
                break;
            case 'k':
                this.selectedStarSystem.y += 1;
                break;
            case 'j':
                this.selectedStarSystem.x -= 1;
                break;
            case 'l':
                this.selectedStarSystem.x += 1;
                break;
            default:
                break;
        }

        let selectedColor = this.colorByCircle.has(celestialBodyID) ? this.colorByCircle.get(celestialBodyID)! : ExternalMapComponent.UN_FOCUSSED_COLOR;
        let orbitDefinition: OrbitDefinition = {
            celestial: this.selectedStarSystem,
            color: selectedColor,
            isMain: false
        };
        let circle = this.drawCelestial(orbitDefinition);
        this.colorByCircle.set(circle.id(), selectedColor);
        this.drawCyclingCircle(this.selectedStarSystem.x, this.selectedStarSystem.y, circle.id(), false);
    }

    private removeSelectedSystemFromCanvas() {
        if (!this.selectedStarSystem) {
            return '';
        }
        let celestialBodyID = this.getCelestialBodyID(this.selectedStarSystem);
        let celestialByID = this.getCelestialByID(celestialBodyID);
        if (!!celestialByID) {
            this.canvas!.removeElement(celestialByID);
        }

        let roundCapMarkers = this.canvas!.children()
            .filter(c => c.id() === celestialBodyID + BasicViewHelperData.ROUND_CAP_SUFFIX);
        roundCapMarkers.forEach(m => this.canvas!.removeElement(m));

        this.removeCyclingCircle(celestialBodyID);
        return celestialBodyID;
    }

    handleButtonPress(key: string) {
        if (this.controlsInvalid(key)) {
            return;
        }

        let htmlElement = document.getElementById('universe')!;
        let split = htmlElement.style.backgroundSize.split(' ');
        let backgroundScaleX = split.length < 1 ? 0 : Number.parseFloat(
            split[0].replaceAll('px', '').replaceAll('%', ''));
        let backgroundScaleY = split.length < 2 ? 0 : Number.parseFloat(
            split[1].replaceAll('px', '').replaceAll('%', ''));

        let viewBox = this.canvas!.viewbox();
        const modifier: number = this.maxGranularity ? 0.001 : 0.01;
        switch (key) {
            case '+':
                backgroundScaleX += backgroundScaleX * modifier;
                backgroundScaleY += backgroundScaleY * modifier;
                break;
            case '-':
                backgroundScaleX -= backgroundScaleX * modifier;
                backgroundScaleY -= backgroundScaleY * modifier;
                break;
            case 'w':
                this.backgroundTranslateY += backgroundScaleY * modifier;
                if (this.lockedToBackground) {
                    this.canvas?.viewbox(viewBox.x, viewBox.y - viewBox.height * modifier, viewBox.height, viewBox.width);
                }
                break;
            case 's':
                this.backgroundTranslateY -= backgroundScaleY * modifier;
                if (this.lockedToBackground) {
                    this.canvas?.viewbox(viewBox.x, viewBox.y + viewBox.height * modifier, viewBox.height, viewBox.width);
                }
                break;
            case 'a':
                this.backgroundTranslateX -= backgroundScaleX * modifier;
                if (this.lockedToBackground) {
                    this.canvas?.viewbox(viewBox.x + viewBox.width * modifier, viewBox.y, viewBox.height, viewBox.width);
                }
                break;
            case 'd':
                this.backgroundTranslateX += backgroundScaleX * modifier;
                if (this.lockedToBackground) {
                    this.canvas?.viewbox(viewBox.x - viewBox.width * modifier, viewBox.y, viewBox.height, viewBox.width);
                }
                break;
            case 'ArrowUp':
                backgroundScaleY += backgroundScaleY * modifier;
                break;
            case 'ArrowDown':
                backgroundScaleY -= backgroundScaleY * modifier;
                break;
            case 'ArrowLeft':
                backgroundScaleX -= backgroundScaleX * modifier;
                break;
            case 'ArrowRight':
                backgroundScaleX += backgroundScaleX * modifier;
                break;
            case 'i':
            case 'k':
            case 'j':
            case 'l':
                this.handlePosChange(key);
                break;
            case 'Escape':
                this.lockedToBackground = !this.lockedToBackground;
                this.setPanZoomByState();
                return;
            case 'Home':
                this.maxGranularity = !this.maxGranularity;
                this.setPanZoomByState();
                return;
            default:
                return;
        }
        htmlElement.style.backgroundSize = backgroundScaleX + "px " + backgroundScaleY + "px";
        htmlElement.style.backgroundPosition = this.backgroundTranslateX + "px " + this.backgroundTranslateY + "px";
    }

    setPanZoomByState() {
        // @ts-ignore
        let opts;
        if (this.lockedToBackground) {
            opts = {panning: false, wheelZoom: false};
        } else if (this.maxGranularity) {
            opts = ExternalMapComponent.PAN_ZOOM_MAX_ZOOM_GRANULARITY_OPTIONS;
        } else {
            opts = ExternalMapComponent.PAN_ZOOM_STANDARD_OPTIONS;
        }
        console.log(opts)
        this.canvas?.panZoom(opts);
    }

    @HostListener('document:keydown', ['$event'])
    handleKeyboardEvent(event: KeyboardEvent) {
        this.handleButtonPress(event.key);
    }

    download() {
        const result: Coords[] = [];
        let stars = this.canvas!.children()
            .filter(c => c.classes().filter(css => css === BasicViewHelperData.STAR_MARKER).length > 0);
        stars.forEach(celestial => {
            let name = this.getNameFromCircle(celestial);
            result.push({
                name: name!,
                x: Math.ceil(<number>celestial.x()),
                y: Math.ceil(<number>celestial.y())
            });
        });
        let stringify = JSON.stringify(result);

        let element = document.createElement('a');
        element.setAttribute('href', 'data:text/csv;charset=utf-8,' + encodeURIComponent(stringify));
        element.setAttribute('download', 'coordinates.json');
        element.style.display = 'none';
        document.body.appendChild(element);
        element.click();
        document.body.removeChild(element);
    }


    zoomTo() {
        if (!this.selectedStarSystem) {
            return;
        }
        let x = this.selectedStarSystem!.x!;
        let y = this.selectedStarSystem!.y!;
        this.canvas!.zoom(0).animate().zoom(2, new Point(x, y));
    }

    private controlsInvalid(key: string) {
        switch (key) {
            case '+':
            case '-':
                return this.lockedToBackground;
            case 'w':
            case 's':
            case 'a':
            case 'd':
            case 'ArrowUp':
            case 'ArrowDown':
            case 'ArrowLeft':
            case 'ArrowRight':
            default:
            case 'Escape':
                return !this.backgroundImage;
            case 'Home':
            case 'i':
            case 'k':
            case 'j':
            case 'l':
                return false;
        }
    }

    deselectSystem() {
        this.selectedStarSystem = undefined;
        this.starSystemCreationState = false;
        this.dropCyclingCircles();
    }

    dropSystem() {
        this.removeSelectedSystemFromCanvas();
        this.deselectSystem();
    }
}
