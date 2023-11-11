import {AfterViewInit, Component, ElementRef, HostListener, ViewChild} from '@angular/core';
import {InterstellarViewHelper} from "../payload/interstellar-view-helper";
import {Coords, Junction, PublicResourcesApiService, WikiEntry} from "../../../services/swagger";
import {TranslateService} from "@ngx-translate/core";
import {OrbitDefinition} from "../payload/orbit-definition";
import {ActivatedRoute, ParamMap} from "@angular/router";
import {ColorGroup, ExternalMapManagerComponent, NamedThing, RadialGroup, SimpleCoord} from "../external-map-manager/external-map-manager.component";
import {BasicViewHelperData} from "../svg-view-helper/basic-view-helper-data";
import {interval, Observable} from "rxjs";
import {Point} from "@svgdotjs/svg.js";
import {BreakpointObserver} from "@angular/cdk/layout";
import {FormControl} from "@angular/forms";
import {MatAutocompleteSelectedEvent} from "@angular/material/autocomplete";
import {map, startWith} from "rxjs/operators";

@Component({
    selector: 'app-external-map',
    templateUrl: './external-map.component.html',
    styleUrls: ['./external-map.component.scss']
})
export class ExternalMapComponent extends InterstellarViewHelper implements AfterViewInit {

    static path: string = 'external-star-map';

    private static readonly RADIAL_HIGHLIGHTING_COLOR: string = '#872727';
    public static readonly UN_FOCUSSED_COLOR: string = '#FFF';

    static CAPITOL_NAMES: string[] = [
        'Gregor', 'Manticore', 'Haven', 'Sol', 'Erewhon', 'Spindle', 'Mesa', 'Basilisk',
        "Trevor's Star", 'Hennesy', 'Sigma Draconis', 'Lynx B (Terminus)',
        'Matapan', 'Terra Haute', 'Joshua', 'Sasebo', 'Asgard', 'Durandel',
        'Midgard', 'Prime', 'Ajay', 'Agueda', 'Stine', 'Clarence', 'Artesia', 'Dionigi',
        'Katharina', 'Franzeki', 'Bessie', 'Idaho', 'Zunker', 'J-156-18(L)', 'Calvin',
        'Mannerheim', 'Warner', 'Nolan', 'Katharina', 'Syou-tang', 'Olivia', 'Włocławek', 'Sarduchi'
    ];
    private static queryParam: string[] = ['highlight', 'center', 'radialGroup'];
    highlight?: ColorGroup[];
    colorByCircle: Map<string, string> = new Map<string, string>();
    highlightedCenter?: SimpleCoord;

    coords: Coords[] = [];

    center?: Coords;
    hoveredSystem?: Coords;

    radialGroups: RadialGroup[] = [];

    starSystemCreationState: boolean = false;
    selectedStarSystem?: Coords;
    searchedStarSystem?: Coords;

    showBackgroundNav: boolean = false;
    showUpload: boolean = false;

    backgroundImage?: File;
    backgroundTranslateX: number = 0;
    backgroundTranslateY: number = 0;

    lockedToBackground: boolean = false;

    isCanonMapPreselected: boolean = false;

    showBackgroundManipulation: boolean = false;

    maxGranularity: boolean = false;
    private junctions: Junction[] = [];
    private solarianSystems: WikiEntry[] = [];
    private manticoreSystems: WikiEntry[] = [];
    private andermanSystems: WikiEntry[] = [];
    private havenSystems: WikiEntry[] = [];
    private highlightedCenterSystemName?: string;
    smallWidth: boolean = false;

    @ViewChild('centerInput')
    centerInput?: ElementRef<HTMLInputElement>;

    filteredCenter: Observable<Coords[]>;

    centerFormControl = new FormControl('');

    constructor(private route: ActivatedRoute,
                private breakpointObserver: BreakpointObserver,
                private publicResourcesService: PublicResourcesApiService,
                private translate: TranslateService) {
        super();

        this.breakpointObserver.observe('(max-width: 950px)').subscribe(result => {
            this.smallWidth = result.matches;
        });

        // just make sure that the key exists
        this.translate.get('star-map.universe-map.loading-spinner-message');
        this.route.queryParamMap.subscribe(map => {
            this.detectHighlight(map);
            this.detectCenter(map);
            this.detectRadialGroups(map);
            this.fetchCanonMap();
            this.createUniverseMap();
        });

        this.filteredCenter = this.centerFormControl.valueChanges.pipe(
            startWith(null),
            map((c: string | null) => (c ? this._filter(c) : this.coords.slice()))
        );
    }

    private detectRadialGroups(map: ParamMap) {
        const radialGroups = map.get(ExternalMapComponent.queryParam[2]);
        if (!!radialGroups) {
            this.radialGroups = JSON.parse(radialGroups);
            this.radialGroups.forEach(rg => this.colorByCircle.set(ExternalMapComponent.getStarSystemCircleID(rg.coord), ExternalMapComponent.RADIAL_HIGHLIGHTING_COLOR));
        }
    }

    private detectCenter(map: ParamMap) {
        const center = map.get(ExternalMapComponent.queryParam[1]);
        if (!!center) {
            if (center.includes('{')) {
                this.highlightedCenter = JSON.parse(center);
            } else {
                this.highlightedCenterSystemName = encodeURIComponent(center);
            }
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
        this.isCanonMapPreselected = !highlight;
    }

    private fetchCanonMap() {
        let sub = this.publicResourcesService.getSolarianSystems().subscribe(systems => this.solarianSystems = systems);
        this.subscriptions.push(sub);
        sub = this.publicResourcesService.getManticorianSystems().subscribe(systems => this.manticoreSystems = systems);
        this.subscriptions.push(sub);
        sub = this.publicResourcesService.getHaveniteSystems().subscribe(systems => this.havenSystems = systems);
        this.subscriptions.push(sub);
        sub = this.publicResourcesService.getAndermanSystems().subscribe(systems => this.andermanSystems = systems);
        this.subscriptions.push(sub);
    }

    private setUpCanonMap() {
        this.setUpCanonColor(this.solarianSystems, ExternalMapManagerComponent.SOLARIAN_LEAGUE_COLOR);
        this.setUpCanonColor(this.manticoreSystems, ExternalMapManagerComponent.MANTICORE_COLOR);
        this.setUpCanonColor(this.havenSystems, ExternalMapManagerComponent.HAVEN_COLOR);
        this.setUpCanonColor(this.andermanSystems, ExternalMapManagerComponent.ANDERMAN_COLOR);
    }

    private setUpCanonColor(systems: WikiEntry[], color: string) {
        systems.forEach(e => {
            let name = ExternalMapManagerComponent.getSystemNameFromEntry(e);
            let coord = this.getBySystemName(name);
            if (!!coord) {
                const id = ExternalMapComponent.getStarSystemCircleID(coord);
                this.colorByCircle.set(id, color);
            }
        });
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
                .mouseover(this.mouseoverForWormhole)
                .mouseout(this.mouseoutForWormhole)
                .click(this.clickEventForCelestial)
                .click(this.clickEventForCreateCelestial);
        }
    }

    mouseoverForWormhole = (event: PointerEvent) => {
        let id = this.getIdFromEvent(event);
        if (id.includes(ExternalMapComponent.WORMHOLE_MARKER_ID_PREFIX) && id.includes(ExternalMapComponent.WORMHOLE_MARKER_ID_CONNECTOR)) {
            let wormholeName = id.replaceAll(ExternalMapComponent.WORMHOLE_MARKER_ID_PREFIX, '').split(ExternalMapComponent.WORMHOLE_MARKER_ID_CONNECTOR)[0];
            this.canvas!.children()
                .filter(e => e.id().includes(wormholeName))
                .forEach(e => e.addClass(ExternalMapComponent.WORMHOLE_HIGHLIGHT_MARKER));
        }
    }

    mouseoutForWormhole = (event: PointerEvent) => {
        let id = this.getIdFromEvent(event);
        if (id.includes(ExternalMapComponent.WORMHOLE_MARKER_ID_PREFIX) && id.includes(ExternalMapComponent.WORMHOLE_MARKER_ID_CONNECTOR)) {
            this.canvas!.children()
                .filter(e => e.id().includes(ExternalMapComponent.WORMHOLE_MARKER_ID_PREFIX))
                .forEach(e => e.removeClass(ExternalMapComponent.WORMHOLE_HIGHLIGHT_MARKER));
        }
    }

    clickEventForCreateCelestial = (event: PointerEvent) => {
        if (!this.showBackgroundManipulation || !this.lockedToBackground || !!this.selectedStarSystem) {
            return;
        }
        let id = this.getIdFromEvent(event);
        if (id === 'universe-canvas' && !this.starSystemCreationState && !this.selectedStarSystem) {
            this.starSystemCreationState = true;
            let {x, y} = this.getSvgCoordinateFromPointerEvent(event);
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
        if (!this.showBackgroundManipulation || !!this.selectedStarSystem) {
            return;
        }

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

        this.fetchJunctions();
        let sub = this.publicResourcesService.getAllSystemCoordinates().subscribe(resp => {
            this.coords = !!coords ? coords : resp;
            this.setUpCanonMap();
            const colors: Map<string, string> = new Map<string, string>();
            this.coords.forEach(coord => {
                let id = ExternalMapComponent.getStarSystemCircleID(coord);
                const color = this.colorByCircle.has(id) ? this.colorByCircle.get(id) : ExternalMapComponent.UN_FOCUSSED_COLOR;
                colors.set(id, color!);
            });

            if (this.radialGroups.length > 0) {
                this.highlightedCenter = this.radialGroups[0].coord;
            }
            if (!!this.highlightedCenterSystemName) {
                this.highlightedCenter = this.getBySystemName(this.highlightedCenterSystemName);
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

            this.drawJunctions();
            let orbitDefinitions: OrbitDefinition[] = OrbitDefinition.getOrbitDefinitionsForExternalStarMap(this.center, this.coords, colors);
            this.drawRadialGroups(this.radialGroups);
            this.drawOrbits(orbitDefinitions);
            setTimeout(() => {
                this.zoomToCenter();
            }, 20);
        });
        this.subscriptions.push(sub);
    }

    private zoomToCenter() {
        let level: number = this.smallWidth ? 0.5 : 0.8;
        this.canvas!.zoom(0).animate().zoom(level, new Point(this.center!.x, this.center!.y));
    }

    private drawJunctions() {
        this.canvas!.children().filter(c => c.hasClass(BasicViewHelperData.WORMHOLE_MARKER)).forEach(c => this.canvas!.removeElement(c));
        this.junctions.forEach(junction => {
            junction.termini.forEach(terminus => {
                let nexus = this.getBySystemName(junction.nexus.name)!;
                let terminal = this.getBySystemName(terminus.name)!;
                this.canvas!
                    .line(nexus.x!, nexus.y!, terminal.x!, terminal.y!)
                    .id(this.getIdForWormhole(junction, terminus))
                    .addClass(BasicViewHelperData.RESIZE_ON_ZOOM_MARKER)
                    .addClass(BasicViewHelperData.WORMHOLE_MARKER)
                    .addClass(BasicViewHelperData.LOW_OPACITY_MARKER)
                    .stroke({width: 1, color: 'irrelevant'});
            });
        });
    }

    private getIdForWormhole(junction: Junction, terminus: NamedThing) {
        return BasicViewHelperData.WORMHOLE_MARKER_ID_PREFIX + this.getWormholeTrip(junction) + BasicViewHelperData.WORMHOLE_MARKER_ID_CONNECTOR + terminus.name;
    }

    private getWormholeTrip(junction: Junction) {
        let name = junction.nexus.name;
        junction.termini.forEach(terminus => name += '-' + terminus.name);
        return name;
    }

    private fetchJunctions() {
        let sub = this.publicResourcesService.getAllWormholeJunctions().subscribe(junctions => {
            this.junctions = junctions;
        });
        this.subscriptions.push(sub);
    }

    private getBySystemName(name: string): Coords | undefined {
        let filteredByName = this.coords!.filter(c => ExternalMapManagerComponent.compareSystemNames(c.name, name));
        if (filteredByName.length == 0) {
            console.log("A system for the name wasn't found: " + name);
            return undefined;
        }
        return filteredByName[0];
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
        if (!this.selectedStarSystem || !this.selectedStarSystem.x || !this.selectedStarSystem.y) {
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
        this.drawJunctions();
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
        if (!this.showBackgroundManipulation || this.controlsInvalid(key)) {
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


    zoomTo(coords?: Coords) {
        if (!coords) {
            return;
        }
        this.canvas!.zoom(0).animate().zoom(2, new Point(coords.x, coords.y));
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

    private _filter(value: string): Coords[] {
        let filterValue = '';
        try {
            filterValue = value.toLowerCase();
        } catch (e) {
            filterValue = (<Coords><unknown>value).name.toLowerCase();
        }
        return this.coords!.filter(c => c.name.toLowerCase().includes(filterValue));
    }

    selectedCenter(event?: MatAutocompleteSelectedEvent): void {

        if (!!event) {
            this.searchedStarSystem = event.option.value;
        } else {
            this.searchedStarSystem = undefined;
        }
        if (!!this.searchedStarSystem) {
            this.centerFormControl.setValue(this.searchedStarSystem.name);
        } else {
            this.centerFormControl.setValue(null);
        }
    }
}
