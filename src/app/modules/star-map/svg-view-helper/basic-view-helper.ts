import {ArrayXY, Box, Circle, CurveCommand, Dom, Element, LineCommand, Path, PathArrayAlias, Rect, Shape, StrokeData, SVG, Svg, Text} from "@svgdotjs/svg.js";
import {Component, HostListener} from "@angular/core";
import {BasicViewHelperData} from "./basic-view-helper-data";
import {OrbitDefinition} from "../payload/orbit-definition";
import '@svgdotjs/svg.panzoom.js'
import {Coords} from "../../../services/swagger";
import {ExternalMapComponent} from "../external-map/external-map.component";
import {StarHelper} from "./star-helper";
import {SimpleCoord} from "../external-map-manager/external-map-manager.component";
import {SystemAssignmentHelper} from "./system-assignment.helper";

interface ElementToParent {
    parent: Dom;
    element?: Element;
}

@Component({
    template: ''
})
export class BasicViewHelper extends BasicViewHelperData {

    protected canvas?: Svg;
    protected minimap?: Svg;
    private minimapRect?: Rect;

    public static readonly PAN_ZOOM_STANDARD_OPTIONS = {
        zoomFactor: 0.1, // zooming per wheel tick
        zoomMin: 0.1, // zoom max out to display the full svg payload as 20% of the screen
        zoomMax: 4 // zoom max 4 times in
    };
    public static readonly PAN_ZOOM_MAX_ZOOM_GRANULARITY_OPTIONS = {
        zoomFactor: 0.01, // zooming per wheel tick
        zoomMin: 0.1, // zoom max out to display the full svg payload as 20% of the screen
        zoomMax: 4 // zoom max 4 times in
    };

    constructor() {
        super();
    }

    protected static readonly ROUND_CAP_MARKER_X_PIXEL_SHIFT: number = 9;
    protected static readonly ROUND_CAP_MARKER_Y_PIXEL_SHIFT: number = 8;

    public static readonly NONE_FILL_COLOR = "none";

    private static readonly COORD_CROSS = "coordCross";

    protected static readonly PLANET_RADIUS = 5;
    protected static readonly STAR_RADIUS = 5;
    protected static readonly STAR_RADIUS_IN_SYSTEM = 15;

    protected aspectRatio: number = 1;

    protected zoomLevel: number = 1;

    private showNames: boolean = false;

    // noinspection JSUnusedLocalSymbols
    @HostListener('window:resize', ['$event'])
    onResize(event?: UIEvent) {
        this.determineAspectRatio();
    }

    // noinspection JSUnusedLocalSymbols
    @HostListener('window:click', ['$event'])
    onClick(event?: UIEvent) {
        this.determineAspectRatio();
    }

    private determineAspectRatio() {
        let screenHeight = window.innerHeight;
        let screenWidth = window.innerWidth;
        this.aspectRatio = screenWidth / screenHeight;
    }

    override clearData() {
        if (!!this.canvas) {
            // remove all elements from canvas a little bit more performant
            this.canvas.node.innerHTML = '';
            super.clearData();
        }
    }

    createMiniMap(clickMinimap: any) {
        this.minimap = SVG().id('universe-minimap-canvas').addTo('#universe-minimap');
        this.minimap.click(clickMinimap);
        this.minimapRect = this.minimap.id('minimap-indicator').rect(0, 0).fill('transparent').stroke({width: 5, color: 'irrelevant'});
    }

    createCanvas(id: string, parentCssId: string): Svg {
        if (!this.canvas) {
            this.canvas = SVG().id(id).addTo(parentCssId).panZoom(BasicViewHelper.PAN_ZOOM_STANDARD_OPTIONS);
            this.canvas
                .on('zoom', this.zoomModification)
                .on('zoom', this.panZoomMinimap)
                .on('panning', this.panZoomMinimap)
                .mouseover(this.mouseoverForText)
                .mouseout(this.mouseoutForText);
        }
        return this.canvas;
    }

    private zoomModification = (ev: any) => {
        this.zoomLevel = ev.detail.level;
        this.zoomResizableContents();
        // must be zoomed after all others
        this.zoomTexts();
    }

    panZoomMinimap = () => {
        this.resizeMinimapRect();
        this.centerMinimapRect();
    }

    private centerMinimapRect() {
        let box = this.canvas!.viewbox();
        const x = box.cx;
        const y = box.cy;
        this.minimapRect!.cx(x).cy(y);
    }

    private resizeMinimapRect() {
        let box = this.canvas!.viewbox();
        this.minimapRect!.width(box.width).height(box.height);
    }

    private zoomTexts() {
        if (this.zoomLevel <= 1) {
            return;
        }

        let texts = this.canvas!.children()
            // dont resize dot texts
            .filter(c => c.classes().filter(css => css == BasicViewHelperData.MOVABLE_STATE_DOT_MARKER).length == 0)
            .filter(c => c.classes().filter(css => css == BasicViewHelperData.TEXT_MARKER).length > 0);
        texts.forEach(text => this.resizeText(<Text>text));
    }

    protected zoomStroke(strokeData: StrokeData) {
        const stroke = strokeData;
        const width = stroke.width! / this.zoomLevel;
        stroke.width = width < 0.3 ? 0.3 : width;
        if (!!stroke.dasharray) {
            let number = stroke.width * 3 < 4 ? 4 : stroke.width * 3;
            stroke.dasharray = (number / this.zoomLevel) + "px";
        }
        return stroke;
    }

    private zoomResizableContents() {
        const elements = this.canvas!.children().filter(c => c.classes().filter(c => c == BasicViewHelperData.RESIZE_ON_ZOOM_MARKER).length != 0);
        elements!.forEach(c => {
            if ('radius' in c) {
                this.resizeCelestial(c);
            }
            if (c.classes().filter(c => c == BasicViewHelperData.ROUND_CAP_MARKER).length != 0) {
                this.repositioningRoundCapMarker(c);
            }
            if (c.classes().filter(c => c == BasicViewHelperData.WORMHOLE_MARKER).length != 0) {
                c.stroke(this.zoomStroke({width: 1, color: 'irrelevant'}));
            }
        });
    }


    dropCyclingCircles() {
        const circles: Element[] = this.canvas!.children().filter(elem => elem.id().endsWith(BasicViewHelperData.CYCLING_CIRCLE_SUFFIX));
        circles.forEach(e => this.canvas?.removeElement(e));
    }

    private repositioningRoundCapMarker(c: Element) {
        const path = <Path>c;
        const center = this.getCoordsFromCenterMarker(path);
        if (!!center) {
            const x = center[0];
            const y = center[1];
            let xShifter = undefined;
            let yShifter = undefined;
            if (this.zoomLevel > 1) {
                xShifter = BasicViewHelper.ROUND_CAP_MARKER_X_PIXEL_SHIFT / this.zoomLevel;
                yShifter = BasicViewHelper.ROUND_CAP_MARKER_Y_PIXEL_SHIFT / this.zoomLevel;
            }
            let arr = this.createRoundCapMarkerNorthPoints(x, y, xShifter, yShifter);
            path.plot(arr)
        }
    }

    private resizeCelestial(c: Element) {
        // fixme zoom marker or remove
        let baseRadius = BasicViewHelper.PLANET_RADIUS;
        const isStar = c.classes().filter(c => c == BasicViewHelperData.STAR_MARKER).length != 0;
        if (isStar) {
            baseRadius = BasicViewHelper.STAR_RADIUS;
        }
        const isStarInSystem = c.classes().filter(c => c == BasicViewHelperData.STAR_IN_SYSTEM_MARKER).length != 0;
        if (isStarInSystem) {
            baseRadius = BasicViewHelper.STAR_RADIUS_IN_SYSTEM;
        }

        const circle = <Circle>c;

        let newRadius = baseRadius
        if (this.zoomLevel > 1) {
            newRadius = baseRadius / this.zoomLevel;
        }
        const radius = circle.node.r.baseVal.value;
        if (newRadius != radius) {
            circle.radius(newRadius);
        }
    }

    protected drawCelestial(orbitDefinition: OrbitDefinition) {
        const orbit: Coords = orbitDefinition.celestial;
        let orbitID = this.getOrbitID(orbit);
        let celestialBodyID = this.getCelestialBodyID(orbit);

        this.setOrbitById(orbitID, orbit);

        let circle = this.createStarSystemPath(orbitDefinition);

        this.setCelestialCircleById(celestialBodyID, circle);
        this.setCelestialOrbitById(celestialBodyID, orbit);
        this.setCelestialObjectById(orbitID, orbitDefinition.celestial);
        this.setCelestialObjectById(celestialBodyID, orbitDefinition.celestial);
        this.createTextForCelestial(celestialBodyID, orbitDefinition.celestial.name, circle);

        let circleMinimap = this.createStarSystemPath(orbitDefinition);
        this.minimap!.add(circleMinimap);

        return circle;
    }

    private createStarSystemPath(orbitDefinition: OrbitDefinition): Path {
        const orbit: Coords = orbitDefinition.celestial;
        let celestialBodyID = this.getCelestialBodyID(orbit);

        const x = orbit.x;
        const y = orbit.y;
        let circle = StarHelper.star()
        if (orbitDefinition.colorMarker != SystemAssignmentHelper.UNFOCUSSED_COLOR_MARKER) {
            circle = StarHelper.starMarked();
        }

        circle
            .x(x - 7)
            .y(y - 7)
            .addClass(orbitDefinition.colorMarker)
            .addClass('name<>' + orbitDefinition.celestial.name.replaceAll(' ', '<|>'))
            .id(celestialBodyID);
        this.canvas!.add(circle);

        circle.addClass(BasicViewHelperData.RESIZE_ON_ZOOM_MARKER);
        circle.addClass(BasicViewHelperData.STAR_MARKER);
        return circle;
    }

    private createTextForCelestial(celestialBodyID: string, name: string, circle: Path) {
        let text: Text = new Text()
            .addClass(BasicViewHelperData.TEXT_MARKER)
            .addClass(BasicViewHelperData.ICON_ID_MARKER + celestialBodyID)
            .text(name)
            .x(circle.cx() + 10)
            .y(circle.cy() - 20);

        this.setTextOptions(text);
        this.setTextById(celestialBodyID, text);

        if (this.widescreenMode || ExternalMapComponent.CAPITOL_NAMES.includes(name)) {
            this.canvas?.add(text);
        }

        return text;
    }

    getNameFromCircle(celestial: Element): string | undefined {
        return celestial.classes().filter(c => c.startsWith('name'))[0].split('<>')[1].replaceAll('<|>', ' ');
    }

    toggleNames() {

        this.showNames = !this.showNames;

        let bodyIDs = this.getCelestialBodyIDs();
        let box = this.canvas!.viewbox();

        // remove all text
        bodyIDs.forEach(celestialId => this.canvas!.children()
            .filter(t => t === this.getTextById(celestialId)!)
            .forEach(t => this.removeText(<Text>t)));

        // add in viewport
        bodyIDs.forEach(celestialId => {
            let circle = this.getCelestialByID(celestialId)!;
            let insideViewbox = this.isInsideViewbox(box, <number>circle.x(), <number>circle.y());
            if (insideViewbox && this.showNames) {
                let text = this.getTextById(celestialId);
                this.addResizedText(text);
                //this.canvas!.add(this.createTextForCelestial(celestialId, this.getNameFromCircle(circle)!, circle));
            }
        });
    }

    isInsideViewbox(box: Box, x: number, y: number) {
        let x1 = box.x;
        let x2 = x1 + box.width;

        let y1 = box.y;
        let y2 = y1 + box.height;

        let xFit: boolean = false;
        let yFit: boolean = false;
        if (x >= x1 && x <= x2) {
            xFit = true;
        }
        if (y >= y1 && y <= y2) {
            yFit = true;
        }

        return xFit && yFit;
    }

    private getCoordsFromCenterMarker(element: Element): ArrayXY | undefined {
        const markers = element.classes().filter(c => c.startsWith(BasicViewHelperData.CENTER_COORDINATES_MARKER));
        if (!!markers && markers.length == 1) {
            const center = this.getCenterCoordinatesFromMarker(markers[0]);
            if (!!center) {
                const x = center[0];
                const y = center[1];
                return [x, y];
            }
        }
        return undefined;
    }

    createRoundCapMarkerNorthPoints(x: number, y: number, xShifter: number | undefined, yShifter: number | undefined) {
        if (!xShifter) {
            xShifter = BasicViewHelper.ROUND_CAP_MARKER_X_PIXEL_SHIFT;
        }
        if (!yShifter) {
            yShifter = BasicViewHelper.ROUND_CAP_MARKER_Y_PIXEL_SHIFT;
        }
        let x1 = x - xShifter;
        let y1 = y - yShifter;
        let x2 = x + xShifter;
        let y2 = y + yShifter;

        let p1: LineCommand = ["M", x1, y1];
        let p2: CurveCommand = ["A", 1, 1, 1, 1, 1, x2, y2];

        let arr: PathArrayAlias = [p1, p2];
        return arr;
    }

    getCenterCoordinatesFromMarker(cssClass: string): ArrayXY | undefined {
        const split = cssClass.replace(BasicViewHelperData.CENTER_COORDINATES_MARKER, '').split(BasicViewHelperData.CENTER_COORDINATES_SEPARATOR);
        if (!split) {
            return undefined;
        }
        const x = split[0];
        const y = split[1];
        return [Number.parseFloat(x), Number.parseFloat(y)];
    }

    // noinspection JSUnusedLocalSymbols
    private getRadius(element: Element, zoomFactor: number) {
        const box = element.bbox();
        let diameter = Math.ceil(Math.sqrt(Math.pow(Math.ceil(box.width), 2) + Math.pow(Math.ceil(box.height), 2)));

        const linkedElements = this.canvas!.children()
            .filter(c => c.id().startsWith(element.id()))
            .filter(c => !c.id().endsWith(BasicViewHelperData.ORBIT_SUFFIX));
        linkedElements.forEach(inner => {
            const iBox = inner.bbox();
            const dia = Math.ceil(Math.sqrt(Math.pow(Math.ceil(iBox.width), 2) + Math.pow(Math.ceil(iBox.height), 2)));
            if (dia > diameter) {
                diameter = dia;
            }
        });
        // todo bbox is broken and returns incorrect value https://github.com/svgdotjs/svgdom/issues/89
        const zoomedRadius = (diameter / 2);// / zoomFactor; todo zoom needed
        return Math.ceil(zoomedRadius);
    }

    private findElementAndParentById(id: string): ElementToParent {
        let parent: Dom = this.canvas!;
        let element: Element | undefined;
        let elements = this.canvas!.children().filter(value => value.id() == id);
        if (elements.length == 1) {
            element = elements[0];
            parent = this.canvas!;
        } else {
            elements = this.canvas!.children().filter(value => value.id() == id);
            if (elements.length == 1) {
                element = elements[0];
            }
        }

        return {
            parent: parent,
            element: element
        }
    }

    drawCyclingCircle(x: number, y: number, id: string) {
        const zoomFactor = this.getOrDefaultZoomFactor(this.zoomLevel);

        const elementToParent = this.findElementAndParentById(id);
        let parent: Dom = elementToParent.parent;
        let element: Element | undefined = elementToParent.element;
        if (!!element) {
            const radius = this.getRadius(element, zoomFactor);
            const circle = new Circle().x(x).y(y)
                .radius(radius)
                .fill(BasicViewHelper.NONE_FILL_COLOR)
                .addClass(BasicViewHelper.CYCLING_CIRCLE_MARKER)
                .addClass(BasicViewHelper.CLICKABLE_CSS_CLASS)
                .addClass(BasicViewHelperData.ICON_ID_MARKER + id)
                .id(this.getCyclingCircleId(id));

            BasicViewHelper.attachClickMarker(circle);

            parent.removeElement(element);
            parent.add(circle);
            parent.add(element);
        }
    }

    removeCyclingCircle(id: string) {
        if (!id.endsWith(BasicViewHelperData.CYCLING_CIRCLE_SUFFIX)) {
            id = this.getCyclingCircleId(id);
        }

        const elementToParent = this.findElementAndParentById(id);
        let parent: Dom = elementToParent.parent;
        let element: Element | undefined = elementToParent.element;
        if (!!element) {
            parent.removeElement(element);
        }
        return !!element;
    }

    private getStarSystemByEvent = (event: PointerEvent): Coords | undefined => {
        return this.getOrbitOfCelestialByEvent(event);
    };

    mouseoverForText = (event: PointerEvent) => {
        const text = this.getTextByEvent(event);
        this.addResizedText(text);
    }

    protected addResizedText(text?: Text) {
        if (!!text) {
            this.resizeText(text);
            if (!this.canvas?.has(text)) {
                this.canvas?.add(text);
            }
        }
    }

    private resizeText(text: Text) {
        const idMarker = text.classes().filter(css => css.startsWith(BasicViewHelperData.ICON_ID_MARKER));
        if (idMarker.length > 0) {
            const id = idMarker[0].replace(BasicViewHelperData.ICON_ID_MARKER, '');
            const celestial: Path | undefined = this.getCelestialByID(id);
            let x = undefined;
            let y = undefined;
            if (!!celestial) {
                x = celestial.cx() + (10 / this.zoomLevel);
                y = celestial.cy() - (20 / this.zoomLevel);
            }
            if (!!x && !!y) {
                text.x(x).y(y);
            }
            this.setTextOptions(text);
        }
    }

    private setTextOptions(text: Text) {
        text.font({
            size: 10 / this.zoomLevel
        });
    }

    mouseoutForText = (event: PointerEvent) => {
        const text = this.getTextByEvent(event);
        this.removeText(text);
    }

    removeText(text: Text | undefined) {
        if (!!text) {
            if (!ExternalMapComponent.CAPITOL_NAMES.includes(text.text())) {
                this.canvas?.removeElement(text)
            }
        }
    }

    public static calculateDistance(firstCoordinate: number, secondCoordinate: number): number {
        return Math.sqrt(Math.pow(firstCoordinate, 2) + Math.pow(secondCoordinate, 2));
    }

    protected getWidestExpanse(): { x: number, y: number } {

        let smallestX = this.orbits!.reduce((a, b) => a.x >= b.x ? b : a).x;
        let biggestX = this.orbits!.reduce((a, b) => a.x >= b.x ? a : b).x;
        let smallestY = this.orbits!.reduce((a, b) => a.y >= b.y ? b : a).y;
        let biggestY = this.orbits!.reduce((a, b) => a.y >= b.y ? a : b).y;

        let x = Math.max(Math.abs(smallestX), Math.abs(biggestX));
        let y = Math.max(Math.abs(smallestY), Math.abs(biggestY));

        return {x, y};
    }

    public setViewBox(orbit: Coords) {

        let {x, y} = this.getWidestExpanse();
        let radius = BasicViewHelper.calculateDistance(x, y) / 3;
        let width = radius;
        let height = radius;
        let startX = -width;
        let startY = -height / this.aspectRatio;

        let xOffset = 0;
        let yOffset = 0;
        if (!!orbit) {
            xOffset = orbit.x;
            yOffset = orbit.y;
        }

        let viewBoxDef: string = (startX + xOffset) + " " + (startY + yOffset) + " " + width * 2 + " " + height * 2;
        this.canvas!.viewbox(viewBoxDef);
    }

    public setViewBoxForMinimap() {
        /* if the universe gets some new clusters - ha ha
        let smallestX = this.orbits!.reduce((a, b) => a.x >= b.x ? b : a).x;
        let biggestX = this.orbits!.reduce((a, b) => a.x >= b.x ? a : b).x;
        let smallestY = this.orbits!.reduce((a, b) => a.y >= b.y ? b : a).y;
        let biggestY = this.orbits!.reduce((a, b) => a.y >= b.y ? a : b).y;
        let x = Math.max(Math.abs(smallestX), Math.abs(biggestX));
        let y = Math.max(Math.abs(smallestY), Math.abs(biggestY));
        let viewBoxDef: string = smallestX + " " + smallestY + " " + x * 2 + " " + y * 2;
        */
        if (this.widescreenMode) {
            this.minimap!.viewbox('-2585 -3553 4905 5797');
        } else {
            this.minimap!.viewbox('-3000 -3500 5500 6500');
        }
    }

    getSvgCoordinateFromMinimapPointerEvent(event: PointerEvent) {
        let p = new DOMPoint(event.clientX, event.clientY).matrixTransform(this.minimap!.screenCTM().inverse());
        return {x: p.x, y: p.y};
    }

    getSvgCoordinateFromPointerEvent(event: PointerEvent) {
        let p = new DOMPoint(event.clientX, event.clientY).matrixTransform(this.canvas!.screenCTM().inverse());
        return {x: p.x, y: p.y};
    }

    static calculateDistanceOfPoints(first: SimpleCoord, second: SimpleCoord): number {
        return Math.sqrt(Math.pow(first.x - second.x, 2) + Math.pow(first.y - second.y, 2));
    }

    protected override setOrbits(orbits: OrbitDefinition[]) {
        super.setOrbits(orbits);
        this.createPolarCoordinateSystem(this.canvas!);
        // nope, it's too unübersichtlich this.createPolarCoordinateSystem(this.minimap!, 'minimap-');
    }

    private createPolarCoordinateSystem(canvas: Svg, prefix: string = '') {
        let {x, y} = this.getWidestExpanse();
        this.radiusOfCoordinateCross = BasicViewHelper.calculateDistance(x, y);
        this.radiusOfCoordinateCross *= 1.1;

        let sol = this.orbits.find(o => o.name == 'Sol')!;

        this.createLocalPolarCoordinateSystem(canvas, sol.x, sol.y, this.radiusOfCoordinateCross, prefix);
    }

    protected createLocalPolarCoordinateSystem(canvas: Svg, xBase: number, yBase: number, radius: number, prefix: string = '') {
        const group = canvas.group().id(BasicViewHelper.COORD_CROSS);
        let steps = 6;
        const radiusSteps = radius / steps;
        for (let i = 1; i < steps; i++) {
            group.circle()
                .x(xBase)
                .y(yBase)
                .fill(BasicViewHelper.NONE_FILL_COLOR)
                .id(BasicViewHelper.COORD_CROSS + i)
                .addClass(prefix + BasicViewHelper.COORD_CROSS)
                .radius(radiusSteps * i);
        }
        const degree = 12;
        for (let j = 1; j <= 30; j++) {
            const angle = j * degree;
            const x = radius * Math.cos(angle * Math.PI / 180);
            const y = radius * Math.sin(angle * Math.PI / 180);
            const points: ArrayXY[] = [[xBase, yBase], [xBase + x, yBase + y]];
            group.line(points)
                .id(BasicViewHelper.COORD_CROSS + "-line" + j)
                .addClass(BasicViewHelper.COORD_CROSS)
        }
    }

    static attachClickMarker(shape: Shape) {
        const number = 1.3;
        shape
            .animate(100, 500, 'after').transform({scale: [number, number]}).css({'opacity': '0.5'})
            .animate(100, 100, 'after').transform({scale: [1, 1]}).css({'opacity': '1'})
            .animate(100, 100, 'after').transform({scale: [number, number]}).css({'opacity': '0.5'})
            .animate(100, 100, 'after').transform({scale: [1, 1]}).css({'opacity': '1'})
            .loop(500, true, 1500);
    }
}
