import {Component, EventEmitter, Input, Output} from '@angular/core';
import {BooleanInput, coerceBooleanProperty} from "@angular/cdk/coercion";
import {NestedTreeControl} from "@angular/cdk/tree";
import {MatTreeNestedDataSource} from "@angular/material/tree";
import {WikiDisplayComponent} from "../../shared-module/components/wiki-display/wiki-display.component";
import {MatDialog} from "@angular/material/dialog";
import {BasicViewHelperData} from "../svg-view-helper/basic-view-helper-data";

interface EraNode {
    headYear: number;
    children: EraNode[];
}

@Component({
    selector: 'app-era-selector',
    templateUrl: './era-selector.component.html',
    styleUrls: ['./era-selector.component.scss']
})
export class EraSelectorComponent {

    readonly YEARS: number[] = BasicViewHelperData.YEARS;

    _showLYearBox = false;

    //@formatter:off
    @Input()
    get showLYearBox() { return this._showLYearBox; }
    set showLYearBox(value: BooleanInput) {
        this._showLYearBox = coerceBooleanProperty(value);
    }
    _cinematicMode = false;

    @Input()
    get cinematicMode() { return this._cinematicMode; }
    set cinematicMode(value: BooleanInput) {
        this._cinematicMode = coerceBooleanProperty(value);
    }
    //@formatter:on

    @Input()
    baseURL?: string;

    @Output()
    yearsChange: EventEmitter<number> = new EventEmitter<number>();

    treeControl = new NestedTreeControl<EraNode>(node => node.children);
    dataSource = new MatTreeNestedDataSource<EraNode>();

    toLink: EraNode[] = [];
    toHighlight: EraNode[] = [];

    constructor(private dialog: MatDialog) {

        let map = this.groupByDecade(this.YEARS);
        const toExpand: EraNode[] = [];
        map.forEach((value, headYear) => {
            let eraNode: EraNode | undefined = this.dataSource.data.find(era => era.headYear == headYear);
            if (!eraNode) {
                eraNode = {
                    headYear: headYear,
                    children: []
                }
                this.dataSource.data.push(eraNode);
                toExpand.push(eraNode);
                this.toLink.push(eraNode);
            }

            value.forEach(decadeYears => {
                let decadeHeadYear = String(decadeYears[0]).substring(0, 3) + 0;
                let decadeNode: EraNode | undefined = eraNode!.children.find(era => String(era.headYear).startsWith(decadeHeadYear));
                if (!decadeNode) {
                    decadeNode = {
                        headYear: Number(decadeHeadYear),
                        children: []
                    }
                    eraNode!.children.push(decadeNode);
                }
                decadeYears.forEach(year => {
                    let yearsNode = {headYear: year, children: []};
                    decadeNode!.children.push(yearsNode);
                });
            });
        });
        this.treeControl.dataNodes = this.dataSource.data;
        toExpand.forEach(node => this.treeControl.expand(node));
        this.detectNodesToHighlight(BasicViewHelperData.BASE_YEAR);
        this.toHighlight.forEach(node => this.treeControl.expand(node));
    }

    hasChild = (_: number, node: EraNode) => !!node.children && node.children.length > 0;

    groupByDecade(years: number[]): Map<number, number[][]> {
        const groupedYears = new Map<number, number[][]>();

        years.forEach(year => {
            const century = Math.floor(year / 100) * 100;
            const decade = Math.floor((year % 100) / 10) * 10;

            if (!groupedYears.has(century)) {
                groupedYears.set(century, []);
            }

            const decadesArray = groupedYears.get(century)!;
            let decadeArray = decadesArray.find(d => d.length > 0 && Math.floor(d[0] % 100 / 10) * 10 === decade);

            if (!decadeArray) {
                decadeArray = [];
                decadesArray.push(decadeArray);
            }

            decadeArray.push(year);
        });

        // Sort each array of decades
        groupedYears.forEach(decades => {
            decades.forEach(decadeArray => {
                decadeArray.sort((a, b) => a - b);
            });

            decades.sort((a, b) => (a[0] % 100) - (b[0] % 100));
        });

        return groupedYears;
    }

    setYear(year: number) {
        this.yearsChange.emit(year);

        this.detectNodesToHighlight(year);
    }

    private detectNodesToHighlight(year: number) {
        this.toHighlight = [];
        let century = (year + '').substring(0, 2);
        let decade = (year + '').substring(2, 3);
        let yearCode = (year + '').substring(3, 4);

        this.dataSource.data.forEach(eraNode => {
            if ((eraNode.headYear + '').substring(0, 2) == century) {
                this.toHighlight.push(eraNode);
                eraNode.children.forEach(decadeNode => {
                    if ((decadeNode.headYear + '').substring(2, 3) == decade) {
                        this.toHighlight.push(decadeNode);
                        decadeNode.children.forEach(yearsNode => {
                            if ((yearsNode.headYear + '').substring(3, 4) == yearCode) {
                                this.toHighlight.push(yearsNode);
                            }
                        });
                    }
                });
            }
        });
    }

    openTimelineWiki(year: number) {

        if (!this.baseURL) {
            return;
        }

        let substring = ((year + 100) + '').substring(0, 2);
        const link: string = this.baseURL + substring + 'th_Century_PD';

        this.dialog.open(WikiDisplayComponent, {
            data: {
                url: link
            },
            panelClass: ['confirm-mat-dialog-panel', 'mat-elevation-z8'],
            width: '80%',
            height: '80%',
            enterAnimationDuration: '500ms',
            exitAnimationDuration: '500ms'
        });
    }
}
