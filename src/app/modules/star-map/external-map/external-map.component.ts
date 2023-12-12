import {AfterViewInit, Component, ElementRef, HostListener, ViewChild} from '@angular/core';
import {InterstellarViewHelper} from "../payload/interstellar-view-helper";
import {Coords, Junction, LanguagePresence, PublicResourcesApiService} from "../../../services/swagger";
import {TranslateService} from "@ngx-translate/core";
import {OrbitDefinition} from "../payload/orbit-definition";
import {ActivatedRoute, ParamMap} from "@angular/router";
import {ColorGroup, ExternalMapManagerComponent, NamedThing, RadialGroup, SimpleCoord} from "../external-map-manager/external-map-manager.component";
import {BasicViewHelperData} from "../svg-view-helper/basic-view-helper-data";
import {interval, Observable} from "rxjs";
import {Array, Path, Point} from "@svgdotjs/svg.js";
import {BreakpointObserver} from "@angular/cdk/layout";
import {FormControl} from "@angular/forms";
import {MatAutocompleteSelectedEvent} from "@angular/material/autocomplete";
import {map, startWith} from "rxjs/operators";
import {MatDialog} from "@angular/material/dialog";
import {WikiDisplayComponent} from "../../shared-module/components/wiki-display/wiki-display.component";
import {SystemAssignmentHelper} from "../svg-view-helper/system-assignment.helper";
import {Era} from "../svg-view-helper/system-assignments/era";
import {StarHelper} from "../svg-view-helper/star-helper";

@Component({
    selector: 'app-external-map',
    templateUrl: './external-map.component.html',
    styleUrls: ['./external-map.component.scss']
})
export class ExternalMapComponent extends InterstellarViewHelper implements AfterViewInit {

    static path: string = 'external-star-map';

    private static readonly RADIAL_HIGHLIGHTING_COLOR: string = '#872727';
    public static readonly UN_FOCUSSED_COLOR: string = '#FFF';

    readonly EN_FANDOM_URL: string = 'https://honorverse.fandom.com/wiki/XYZ';
    readonly DE_FANDOM_URL: string = 'https://honor-harrington.fandom.com/de/wiki/XYZ';
    baseURL?: string;

    static CAPITOL_NAMES: string[] = [
        'Gregor', 'Manticore', 'Haven', 'Sol', 'Erewhon', 'Spindle', 'Mesa', 'Basilisk',
        "Trevor's Star", 'Hennesy', 'Sigma Draconis', 'Lynx B (Terminus)', "Marsh",
        'Matapan', 'Terra Haute', 'Joshua', 'Sasebo', 'Asgard', 'Durandel',
        'Midgard', 'Prime', 'Ajay', 'Agueda', 'Stine', 'Clarence', 'Artesia', 'Dionigi',
        'Katharina', 'Franzeki', 'Bessie', 'Idaho', 'Zunker', 'J-156-18(L)', 'Calvin',
        'Mannerheim', 'Warner', 'Nolan', 'Katharina', 'Syou-tang', 'Olivia', 'Włocławek', 'Sarduchi',
        "Visigoth", "Mesa", "Epsilon Virgo", "Titania", "Mullins", "Yildun", "Templar", "Dickerson",
        "Mascot", "Congo", "SGC-902-36-G", "Felix", "SGC-902-36-G", "Darius", "Silesia", "Breslau", "Sachsen",
        "Roulette", "Limbo"
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

    private highlightedCenterSystemName?: string;
    smallWidth: boolean = false;
    smallHeight: boolean = false;

    @ViewChild('centerInput')
    centerInput?: ElementRef<HTMLInputElement>;

    filteredCenter: Observable<Coords[]>;

    centerFormControl = new FormControl('');
    private enWikiSystems: string[] = [];
    private deWikiSystems: string[] = [];
    private wikiSystemsPresence: LanguagePresence[] = [];

    yearSelectorOpen: boolean = true;

    readonly YEARS: number[] = [
        1899, 1900, 1901, 1902, 1903, 1904, 1905, 1906, 1907, 1908, 1909, 1910, 1911,
        1912, 1913, 1914, 1915, 1916, 1917, 1918, 1919, 1920, 1921, 1922, 1923, 1924
    ];
    // fixme dindt work currently
    rebuildMap: boolean = false;

    constructor(private route: ActivatedRoute,
                private breakpointObserver: BreakpointObserver,
                private publicResourcesService: PublicResourcesApiService,
                public dialog: MatDialog,
                private translate: TranslateService) {
        super();

        let sub = this.publicResourcesService.getWikiSystemsEN().subscribe(resp => this.enWikiSystems = resp.map(w => w.title));
        this.subscriptions.push(sub);

        sub = this.publicResourcesService.getWikiSystemsDE().subscribe(resp => this.deWikiSystems = resp.map(w => w.title));
        this.subscriptions.push(sub);

        sub = this.publicResourcesService.getWikiSystemsPresence().subscribe(resp => this.wikiSystemsPresence = resp);
        this.subscriptions.push(sub);

        this.breakpointObserver.observe('(max-width: 950px)').subscribe(result => {
            this.smallWidth = result.matches;
        });

        this.breakpointObserver.observe('(max-height: 1000px)').subscribe(result => {
            this.smallHeight = result.matches;
        });

        // just make sure that the key exists
        this.translate.get('star-map.universe-map.loading-spinner-message');
        this.route.queryParamMap.subscribe(map => {
            this.detectHighlight(map);
            this.detectCenter(map);
            this.detectRadialGroups(map);
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

    private setUpCanonMap() {
        SystemAssignmentHelper.getByEra(Era.ERA1).forEach((systems, color) => this.setUpColorForSystems(systems, color));
    }


    setYear(year: number) {
        this.rebuildMap = true;
        const comparatorColorByCircle: Map<string, string> = new Map(this.colorByCircle);
        this.colorByCircle.clear();
        SystemAssignmentHelper.getByYear(year).forEach((systems, color) => this.setUpColorForSystems(systems, color));
        this.canvas!.children()
            .filter(c => c.classes().includes(ExternalMapComponent.STAR_MARKER))
            .forEach(star => {
                let id = star.id();
                let x = Number.parseFloat(star.x() + '');
                let y = Number.parseFloat(star.y() + '');
                const oldColor = comparatorColorByCircle.has(id) ? comparatorColorByCircle.get(id)! : ExternalMapComponent.UN_FOCUSSED_COLOR;
                const color = this.colorByCircle.has(id) ? this.colorByCircle.get(id)! : ExternalMapComponent.UN_FOCUSSED_COLOR;

                if (color != ExternalMapComponent.UN_FOCUSSED_COLOR) {
                    (<Path>star).plot(StarHelper.starMarked().array());
                } else {
                    (<Path>star).plot(StarHelper.star().array());
                }

                star.x(x)
                    .y(y)

                if (color != oldColor) {
                    star.fill(color);
                }
            });
        this.rebuildMap = false;
    }

    private setUpColorForSystems(systems: string[], color: string) {
        systems.forEach(name => {
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
                .click(this.clickEventForCreateCelestial)
                .click(this.clickEventForCelestialWithWiki);
        }
    }

    mouseoverForWormhole = (event: PointerEvent) => {
        let id = this.getIdFromEvent(event);
        if (id.includes(ExternalMapComponent.WORMHOLE_MARKER_ID_PREFIX) && id.includes(ExternalMapComponent.WORMHOLE_MARKER_ID_CONNECTOR)) {
            let wormholeName = id.replaceAll(ExternalMapComponent.WORMHOLE_MARKER_ID_PREFIX, '').split(ExternalMapComponent.WORMHOLE_MARKER_ID_CONNECTOR)[0];
            this.canvas!.children()
                .filter(e => this.filterWormhole(e.id(), wormholeName))
                .forEach(e => e.addClass(ExternalMapComponent.WORMHOLE_HIGHLIGHT_MARKER));
        }
    }

    private filterWormhole(id: string, wormholeName: string) {
        let fromWH = new Set<string>(wormholeName.split('|').map(s => ExternalMapManagerComponent.stripSystemName(s)));
        let fromId = new Set<string>(
            id.replaceAll(ExternalMapComponent.WORMHOLE_MARKER_ID_PREFIX, '')
                .replaceAll(ExternalMapComponent.WORMHOLE_MARKER_ID_CONNECTOR, '')
                .split('|').map(s => ExternalMapManagerComponent.stripSystemName(s)));

        let presentInWH = Array.from(fromId.keys()).filter(id => Array.from(fromWH).includes(id)).length > 0;
        let presentInID = Array.from(fromWH.keys()).filter(id => Array.from(fromId).includes(id)).length > 0;
        return presentInID || presentInWH;
    }

    mouseoutForWormhole = (event: PointerEvent) => {
        let id = this.getIdFromEvent(event);
        if (id.includes(ExternalMapComponent.WORMHOLE_MARKER_ID_PREFIX) && id.includes(ExternalMapComponent.WORMHOLE_MARKER_ID_CONNECTOR)) {
            this.canvas!.children()
                .filter(e => e.id().includes(ExternalMapComponent.WORMHOLE_MARKER_ID_PREFIX))
                .forEach(e => e.removeClass(ExternalMapComponent.WORMHOLE_HIGHLIGHT_MARKER));
        }
    }

    clickEventForCelestialWithWiki = (event: PointerEvent) => {
        if (!this.baseURL || !!this.selectedStarSystem) {
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

        let name = this.selectedStarSystem!.name;
        if (this.EN_FANDOM_URL === this.baseURL) {
            if (this.enWikiSystems.includes(name + ' System')) {
                name += '_System'
            }
        } else {
            let languagePresences = this.wikiSystemsPresence
                .filter(w => ExternalMapManagerComponent.stripSystemName(w.title) == ExternalMapManagerComponent.stripSystemName(name + ' System'));
            if (languagePresences.length > 0) {
                name = languagePresences[0].titleDE;
            } else if (this.deWikiSystems.includes(name + ' System')) {
                name += '_System'
            }
        }
        const link = this.baseURL
            .replaceAll('XYZ', name)
            .replaceAll(' ', '_');
        let dialogRef = this.dialog.open(WikiDisplayComponent, {
            data: {
                url: link
            },
            panelClass: ['confirm-mat-dialog-panel', 'mat-elevation-z8'],
            width: '80%',
            height: '80%',
            enterAnimationDuration: '500ms',
            exitAnimationDuration: '500ms'
        });
        dialogRef.afterClosed().subscribe(() => {
            const selectionRemoved = this.removeCyclingCircle(id);
            if (selectionRemoved) {
                this.selectedStarSystem = undefined;
                return;
            }
        })
    };

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
        junction.termini.forEach(terminus => name += '|' + terminus.name);
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

    highlightColor(colorCode: string) {
        this.canvas!.children()
            .filter(c => c.classes().includes(ExternalMapComponent.STAR_MARKER))
            .forEach(star => {
                if (star.fill().toLowerCase() === colorCode.toLowerCase()) {
                    star.removeClass('legend-un-highlighted');
                } else {
                    star.addClass('legend-un-highlighted');
                }
            });
    }

    resetHighlighting() {
        this.canvas!.children()
            .filter(c => c.classes().includes(ExternalMapComponent.STAR_MARKER))
            .forEach(star => star.removeClass('legend-un-highlighted'));
    }
}
