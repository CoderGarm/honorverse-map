import {
    ArrayXY,
    Circle,
    CurveCommand,
    Dom,
    Element,
    G,
    LineCommand,
    Path,
    PathArrayAlias,
    StrokeData,
    SVG,
    Svg,
    Text
} from "@svgdotjs/svg.js";
import {Component, HostListener} from "@angular/core";
import {BasicViewHelperData} from "./basic-view-helper-data";
import {OrbitDefinition} from "../payload/orbit-definition";
import '@svgdotjs/svg.panzoom.js'
import {Coords} from "../../../services/swagger";
import {ExternalMapComponent} from "../external-map/external-map.component";

interface ElementToParent {
    parent: Dom;
    element?: Element;
}

@Component({
    template: ''
})
export class BasicViewHelper extends BasicViewHelperData {

    protected canvas?: Svg;

    public static readonly PAN_ZOOM_OPTIONS = {
        // https://github.com/svgdotjs/svg.panzoom.js/blob/master/readme.md
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

    protected static readonly HIGHLIGHTED_SYSTEM_MARKER_CSS_CLASS = "highlighted";

    protected static readonly PLANET_RADIUS = 5;
    protected static readonly STAR_RADIUS = 5;
    protected static readonly STAR_RADIUS_IN_SYSTEM = 15;

    protected static readonly INVISIBLE_CLASS = "invisible";

    /**
     * If the map is used as external this prefix will be added to all necessary css selectors.
     * Is an ugly idea, but it works until a full rework and separating the external map from the internal one.
     */
    private externalMapPrefix: string = '';

    protected aspectRatio: number = 1;

    protected zoomLevel: number = 1;

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

    createCanvas(id: string, parentCssId: string, externalMapPrefix: string = ''): Svg {
        if (!this.canvas) {
            this.externalMapPrefix = externalMapPrefix;
            this.canvas = SVG().id(id).addTo(parentCssId).panZoom(BasicViewHelper.PAN_ZOOM_OPTIONS);
            this.canvas
                .on('zoom', this.zoomModification)
                .mouseover(this.mouseoverForText)
                .mouseout(this.mouseoutForText);
        }
        return this.canvas;
    }

    private zoomModification = (ev: any) => {
        this.zoomLevel = ev.detail.level;
        this.zoomResizableContents();
        // must be zoomed after all others
        this.zoomCyclingCircles();
        this.zoomTexts();
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

    private zoomCyclingCircles() {
        if (this.zoomLevel <= 1) {
            return;
        }

        const circles: Element[] = this.canvas!.children().filter(elem => elem.id().endsWith(BasicViewHelperData.CYCLING_CIRCLE_SUFFIX));
        circles.forEach(dot => {
            if (dot instanceof Circle) {
                const cssClass = dot.classes().filter(css => css.startsWith(BasicViewHelperData.ICON_ID_MARKER));
                const id = cssClass![0].replace(BasicViewHelperData.ICON_ID_MARKER, '');
                const isInvisible = dot.classes().filter(css => css === BasicViewHelper.INVISIBLE_CLASS).length > 0;
                const fleet: G | undefined = this.getGroupById(id);
                const celestial: Circle | undefined = this.getCelestialByID(id);
                let element: Element | undefined = !!fleet ? fleet : !!celestial ? celestial : undefined;
                if (!!element) {
                    this.canvas?.removeElement(dot)
                    this.drawCyclingCircle(element.cx(), element.cy(), id, isInvisible);
                }
            }
        });
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

        const x = orbit.x;
        const y = orbit.y;
        if (orbitDefinition.color != ExternalMapComponent.UN_FOCUSSED_COLOR) {
            this.createRoundCapMarkerNorth(celestialBodyID, x, y);
        }

        const circle = this.canvas!.circle()
            .x(x)
            .y(y)
            .fill(orbitDefinition.color)
            .addClass('name<>' + orbitDefinition.celestial.name.replaceAll(' ', '<|>'))
            .id(celestialBodyID);

        if (orbitDefinition.color === ExternalMapComponent.UN_FOCUSSED_COLOR) {
            circle.addClass(BasicViewHelper.OPAQUE_CSS_CLASS)
        }

        circle.addClass(BasicViewHelperData.RESIZE_ON_ZOOM_MARKER);
        circle.addClass(BasicViewHelperData.STAR_MARKER);
        circle.radius(BasicViewHelper.STAR_RADIUS);

        this.setCelestialCircleById(celestialBodyID, circle);
        this.setCelestialOrbitById(celestialBodyID, orbit);
        this.setCelestialObjectById(orbitID, orbitDefinition.celestial);
        this.setCelestialObjectById(celestialBodyID, orbitDefinition.celestial);

        let text: Text = new Text()
            .addClass(BasicViewHelperData.TEXT_MARKER)
            .addClass(BasicViewHelperData.ICON_ID_MARKER + celestialBodyID)
            .text(orbitDefinition.celestial.name)
            .x(circle.cx() + 10)
            .y(circle.cy() - 20);

        this.setTextOptions(text);
        this.setTextById(celestialBodyID, text);
        return circle;
    }

    toggleNames() {
        let bodyIDs = this.getCelestialBodyIDs();
        bodyIDs.forEach(celestialId => {
            let text = this.getTextById(celestialId)!;
            let present = this.canvas!.children().filter(t => t === text).length > 0;
            if (present) {
                this.canvas!.removeElement(text);
            } else {
                this.canvas!.add(text);
            }
        })
    }

    createRoundCapMarkerNorth(id: string, x: number, y: number, xShifter?: number, yShifter?: number) {
        let arr = this.createRoundCapMarkerNorthPoints(x, y, xShifter, yShifter);
        this.canvas!.path(arr)
            .fill(BasicViewHelper.NONE_FILL_COLOR)
            .id(id + BasicViewHelperData.ROUND_CAP_SUFFIX)
            .addClass(BasicViewHelper.HIGHLIGHTED_SYSTEM_MARKER_CSS_CLASS)
            .addClass(BasicViewHelperData.RESIZE_ON_ZOOM_MARKER)
            .addClass(BasicViewHelperData.ROUND_CAP_MARKER)
            .addClass(this.getCenterMarker(x, y));
    }

    private getCenterMarker(x: number, y: number) {
        return BasicViewHelperData.CENTER_COORDINATES_MARKER + x + BasicViewHelperData.CENTER_COORDINATES_SEPARATOR + y;
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

    drawCyclingCircle(x: number, y: number, id: string, isInvisible: boolean) {
        const zoomFactor = this.getOrDefaultZoomFactor(this.zoomLevel);

        const elementToParent = this.findElementAndParentById(id);
        let parent: Dom = elementToParent.parent;
        let element: Element | undefined = elementToParent.element;
        if (!!element) {
            const radius = this.getRadius(element, zoomFactor);
            const circle = new Circle().x(x).y(y)
                .radius(radius)
                .addClass(BasicViewHelper.CYCLING_CIRCLE_MARKER)
                .addClass(BasicViewHelper.CLICKABLE_CSS_CLASS)
                .addClass(BasicViewHelperData.ICON_ID_MARKER + id)
                .id(this.getCyclingCircleId(id));

            if (isInvisible) {
                circle.addClass(BasicViewHelper.INVISIBLE_CLASS);
            }

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
        if (!!text) {
            this.resizeText(text);
            this.canvas?.add(text)
        }
    }

    private resizeText(text: Text) { // todo text positioned false the first time - why?
        const idMarker = text.classes().filter(css => css.startsWith(BasicViewHelperData.ICON_ID_MARKER));
        if (idMarker.length > 0) {
            const id = idMarker[0].replace(BasicViewHelperData.ICON_ID_MARKER, '');
            const celestial: Circle | undefined = this.getCelestialByID(id);
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
        if (!!text) {
            this.canvas?.removeElement(text)
        }
    }

    public static calculateDistance(firstCoordinate: number, secondCoordinate: number): number {
        return Math.sqrt(Math.pow(firstCoordinate, 2) + Math.pow(secondCoordinate, 2));
    }

    protected getWidestExpanse(): { x: number, y: number } {
        let coords = this.orbits!.sort((a, b) => a.x - b.x);

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
        let radius = BasicViewHelper.calculateDistance(x, y) / 3; /* todo factor must be parametrized */
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
}
