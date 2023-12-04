import {AfterViewInit, Component, ElementRef, ViewChild} from '@angular/core';
import {Coords, PublicResourcesApiService, WikiEntry} from "../../../services/swagger";
import {Observable} from "rxjs";
import {COMMA, ENTER} from "@angular/cdk/keycodes";
import {FormControl} from "@angular/forms";
import {map, startWith} from "rxjs/operators";
import {MatAutocompleteSelectedEvent} from "@angular/material/autocomplete";
import {CdkDragDrop, moveItemInArray, transferArrayItem} from "@angular/cdk/drag-drop";
import {SubscriptionManager} from "../../../services/subscription.manager";
import {environment} from "../../../../environments/environment";
import {ExternalMapComponent} from "../external-map/external-map.component";
import {BasicViewHelper} from "../svg-view-helper/basic-view-helper";
import {SystemAssignmentHelper} from "../svg-view-helper/system-assignment.helper";
import {Era} from "../svg-view-helper/system-assignments/era";


export interface ColorGroup {
    color: string;
    simpleCoords: SimpleCoord[];
    coords: Coords[];
}

export interface SimpleCoord {
    x: number;
    y: number;
}

export interface RadialGroup {
    coord: SimpleCoord,
    radius: number
}

export interface NamedThing {
    name: string;
}

@Component({
    selector: 'app-external-map-manager',
    templateUrl: './external-map-manager.component.html',
    styleUrls: ['./external-map-manager.component.scss']
})
export class ExternalMapManagerComponent extends SubscriptionManager implements AfterViewInit {

    public static readonly LS_TO_LY_FACTOR = 3.159;

    static path: string = '';

    allCoords: Coords[] = [];
    coords: Coords[] = [];

    centerCoord?: Coords;
    radiusCoords: Coords[] = [];
    radialGroups: RadialGroup[] = [];

    separatorKeysCodes: number[] = [ENTER, COMMA];
    highlightFormControl = new FormControl('');
    centerFormControl = new FormControl('');
    radiusFormControl = new FormControl('');
    filtered: Observable<Coords[]>;
    filteredCenter: Observable<Coords[]>;
    filteredRadius: Observable<Coords[]>;

    @ViewChild('coordInput')
    coordInput?: ElementRef<HTMLInputElement>;

    @ViewChild('centerInput')
    centerInput?: ElementRef<HTMLInputElement>;

    @ViewChild('radiusInput')
    radiusInput?: ElementRef<HTMLInputElement>;

    url: string = '';

    iFrameTxt: string = '';
    readonly frontendPath: string;

    color: string = '#5e8c6a';

    colorGroups: ColorGroup[] = [];
    isCanonMapPreselected: boolean = false;
    iFrameHeight: number = 600;
    iFrameWidth: number = 900;

    constructor(private publicResourcesService: PublicResourcesApiService) {
        super();
        this.filtered = this.highlightFormControl.valueChanges.pipe(
            startWith(null),
            map((c: string | null) => (c ? this._filter(c) : this.coords.slice()))
        );
        this.filteredCenter = this.centerFormControl.valueChanges.pipe(
            startWith(null),
            map((c: string | null) => (c ? this._filter(c) : this.coords.slice()))
        );
        this.filteredRadius = this.radiusFormControl.valueChanges.pipe(
            startWith(null),
            map((c: string | null) => (c ? this._filter(c) : this.coords.slice()))
        );
        this.frontendPath = environment.frontendServer;
    }

    ngAfterViewInit(): void {
        let sub = this.publicResourcesService.getAllSystemCoordinates().subscribe(resp => {
            this.allCoords = resp;
            this.centerCoord = resp.filter(sys => sys.name === 'Manticore')[0];
            this.canonPreselection();
        });
        this.subscriptions.push(sub);
    }

    private canonPreselection() {
        this.isCanonMapPreselected = true;
        this.defineMapPreselection();
        this.buildURL();
    }

    buildColorGroups() {
        this.addToColorGroup();
        this.rebuildExistingColorGroups();
    }

    private rebuildExistingColorGroups() {
        const map: Map<string, Coords[]> = new Map<string, Coords[]>();
        this.colorGroups.forEach(cg => {
            if (cg.coords.length > 0) {
                map.set(cg.color, cg.coords);
            }
        });
        const result: ColorGroup[] = [];
        map.forEach((coords, color) => {
            result.push({
                color: color,
                coords: coords,
                simpleCoords: coords.map(c => <SimpleCoord>{
                    x: c.x,
                    y: c.y
                })
            });
        });
        this.colorGroups = result;
    }

    addToColorGroup() {
        const toAdd = this.coords.filter(c => this.getColor(c) === '');
        if (toAdd.length > 0) {
            this.colorGroups.push({
                color: this.color,
                simpleCoords: toAdd.map(c => <SimpleCoord>{
                    x: c.x,
                    y: c.y
                }),
                coords: toAdd.map(c => <Coords>{
                    x: c.x,
                    y: c.y,
                    name: c.name
                })
            });
        }
    }

    private cleanColorGroup(coord: Coords) {
        this.colorGroups.forEach(cg => {
            const coords = cg.coords.filter(c => ExternalMapManagerComponent.matches(c, coord));
            const simpleCoords = cg.simpleCoords.filter(c => ExternalMapManagerComponent.matches(c, coord));
            if (coords.length > 0) {
                let indexOf = cg.coords.indexOf(coords[0]);
                cg.coords.splice(indexOf, 1);
                indexOf = cg.simpleCoords.indexOf(simpleCoords[0]);
                cg.simpleCoords.splice(indexOf, 1);
            }
        });
    }

    defineMapPreselection() {
        if (this.isCanonMapPreselected) {
            SystemAssignmentHelper.getByEra(Era.ERA1).forEach((systems, color) => this.addToColors(color, this.extractCoordsByName(systems)));
        } else {
            SystemAssignmentHelper.getByEra(Era.ERA1).forEach((systems, color) => this.extractCoordsByName(systems).forEach(c => this.remove(c)));
        }
    }

    private extractCoordsByName(toSearch: string[]) {
        let found: Coords[] = [];
        toSearch.forEach(name => {
            let f: Coords[] = this.allCoords!.filter(known => ExternalMapManagerComponent.compareSystemNames(known.name, name));
            if (f.length > 0) {
                found.push(f[0]);
            }
        });
        return found;
    }

    static getSystemNameFromEntry(c: WikiEntry) {
        return c.title;
    }

    static compareSystemNames(o1: string, o2: string) {
        return ExternalMapManagerComponent.stripSystemName(o1) === ExternalMapManagerComponent.stripSystemName(o2);
    }

    static stripSystemName(name: string) {
        return name
            .replace('-System', '')
            .replace('_System', '')
            .replace('system', '')
            .replace('System', '')
            .replace('Stern', '')
            .replace('Star', '')
            .replace('Neu', '')
            .replace('New', '')
            .replace('_', '')
            .replace('-', '')
            .replace(' ', '')
            .replace('’', '')
            .replace("'", '')
            .trim()
            .toLowerCase();
    }


    addToColors(color: string, coords: Coords[]) {
        if (coords.length > 0) {
            this.coords.push(...coords);
            this.colorGroups.push({
                color: color,
                simpleCoords: coords.map(c => <SimpleCoord>{
                    x: c.x,
                    y: c.y
                }),
                coords: coords
            });
        }
    }

    buildURL() {
        if (this.coords.length == 0 || !this.centerCoord) {
            return;
        }
        let center = this.centerCoord.name + '_System';
        let highlight = JSON.stringify(this.colorGroups, function (key, val) {
            if (key !== "coords")
                return val;
        });
        this.url = this.frontendPath + '/' + ExternalMapComponent.path;
        this.addUrlParamConnector();
        this.url += 'center=' + encodeURIComponent(center);
        if (!this.isCanonMapPreselected) {
            this.addUrlParamConnector();
            this.url += 'highlight=' + encodeURIComponent(highlight);
        }
        this.buildIFrame();
    }

    buildIFrame() {
        this.iFrameTxt = '<iframe width="' + this.iFrameWidth + 'px" height="' + this.iFrameHeight + 'px" src="' + this.url + '"></iframe>';
    }

    private addUrlParamConnector() {
        if (this.url.endsWith(ExternalMapComponent.path)) {
            this.url += '?';
        } else {
            this.url += '&';
        }
    }

    buildRadialGroupURL() {
        let radialGroup = JSON.stringify(this.radialGroups);
        this.url = this.frontendPath + '/' + ExternalMapComponent.path + '?radialGroup=' + encodeURIComponent(radialGroup);
        this.buildIFrame();
        this.printRadialGroups();
    }

    remove(coord: Coords): void {
        let index = this.coords.indexOf(coord);
        const filter = this.coords.filter(c => ExternalMapManagerComponent.matches(c, coord));
        if (index <= 0 && filter.length > 0) {
            index = this.coords.indexOf(filter[0]);
        }
        this.coords.splice(index, 1);
        this.cleanColorGroup(coord);
        this.isCanonMapPreselected = false;
    }

    removeRadius(coord: Coords): void {
        const isPresent = this.radiusCoords.filter(rc => ExternalMapManagerComponent.matches(rc, coord));
        if (isPresent.length == 1) {
            let indexOf = this.radiusCoords.indexOf(isPresent[0]);
            this.radiusCoords.splice(indexOf, 1);

            let groups = this.radialGroups.filter(rd => ExternalMapManagerComponent.matches(rd.coord, coord));
            if (groups.length == 1) {
                let indexOf = this.radialGroups.indexOf(groups[0]);
                this.radialGroups.splice(indexOf, 1);
            }
        }
    }

    private printRadialGroups() {
        console.log('----------------------------------')
        this.radialGroups.forEach(group => {
            let coord = group.coord;
            this.allCoords
                .filter(c => ExternalMapManagerComponent.matches(c, coord))
                .forEach(c => console.log('Radial group ', c.name, ' with radius of ', group.radius / ExternalMapManagerComponent.LS_TO_LY_FACTOR, ' ly'));

            this.allCoords
                .filter(c => BasicViewHelper.calculateDistanceOfPoints(c, coord) <= group.radius)
                .forEach(c => console.log(c.name))
        });


    }

    selectedRadius(event: MatAutocompleteSelectedEvent): void {
        const item = <Coords>event.option.value;
        const isPresent = this.radiusCoords.filter(rc => ExternalMapManagerComponent.matches(rc, item)).length > 0;
        if (!isPresent) {
            this.radiusCoords.push(item);
        }
        if (!!this.radiusInput) {
            this.radiusInput.nativeElement.value = '';
        }
        this.radiusFormControl.setValue(null);
    }

    selectedCenter(event: MatAutocompleteSelectedEvent): void {
        this.centerCoord = event.option.value;
        if (!!this.centerInput) {
            this.centerInput.nativeElement.value = '';
        }
        this.centerFormControl.setValue(null);
    }

    selected(event: MatAutocompleteSelectedEvent): void {
        this.coords.push(event.option.value);
        if (!!this.coordInput) {
            this.coordInput.nativeElement.value = '';
        }
        this.highlightFormControl.setValue(null);
        this.isCanonMapPreselected = false;
    }

    private _filter(value: string): Coords[] {
        let filterValue = '';
        try {
            filterValue = value.toLowerCase();
        } catch (e) {
            filterValue = (<Coords><unknown>value).name.toLowerCase();
        }
        return this.allCoords!.filter(c => c.name.toLowerCase().includes(filterValue));
    }

    getColor(coord: Coords) {
        let color = '';
        for (let i = 0; i < this.colorGroups.length; i++) {
            const cg = this.colorGroups[i];
            const isPresent = cg.simpleCoords.filter(c => ExternalMapManagerComponent.matches(c, coord)).length > 0;
            if (isPresent) {
                color = cg.color;
                break;
            }
        }
        return color;
    }

    drop(event: CdkDragDrop<Coords[]>) {
        if (event.previousContainer === event.container) {
            moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
        } else {
            transferArrayItem(
                event.previousContainer.data,
                event.container.data,
                event.previousIndex,
                event.currentIndex,
            );
        }
        this.buildColorGroups();
    }

    static matches(o1: Coords | SimpleCoord, o2: Coords | SimpleCoord) {
        return o1.x === o2.x && o1.y === o2.y;
    }

    addRadius(coord: Coords, input: HTMLInputElement) {
        const radius = <number><unknown>input.value * ExternalMapManagerComponent.LS_TO_LY_FACTOR;
        const filter = this.radialGroups.filter(rg => ExternalMapManagerComponent.matches(coord, rg.coord));
        const isPresent = filter.length > 0;
        if (isPresent) {
            filter[0].radius = radius;
        } else {
            this.radialGroups.push({
                coord: {
                    x: coord.x,
                    y: coord.y
                },
                radius: radius
            });
        }
    }
}
