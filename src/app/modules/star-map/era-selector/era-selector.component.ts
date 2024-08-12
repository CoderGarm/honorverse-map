import {AfterViewInit, Component, EventEmitter, Input, Output} from '@angular/core';
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
export class EraSelectorComponent implements AfterViewInit {

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
    @Output()
    yearsChange: EventEmitter<number> = new EventEmitter<number>();
    //@formatter:on

    treeControl = new NestedTreeControl<EraNode>(node => node.children);
    dataSource = new MatTreeNestedDataSource<EraNode>();

    constructor(private dialog: MatDialog) {

        let map = this.groupByDecade(this.YEARS);
        map.forEach((value, headYear) => {
            let eraNode: EraNode | undefined = this.dataSource.data.find(era => era.headYear == headYear);
            if (!eraNode) {
                eraNode = {
                    headYear: headYear,
                    children: []
                }
                this.dataSource.data.push(eraNode);
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
                    decadeNode!.children.push({headYear: year, children: []})
                });
            });
        });
    }

    ngAfterViewInit() {
        //this.dataSource.data.flatMap(a => a.children).filter(a => a.headYear == 3000 || a.headYear == 3020).forEach(node => this.treeControl.expand(node)); fixme expand 3000 and 3020
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
    }

    openTimelineWiki(year: number) {
        this.dialog.open(WikiDisplayComponent, {
            data: {
                url: 'https://www.sarna.net/wiki/' + year /* fixme change link */
            },
            panelClass: ['confirm-mat-dialog-panel', 'mat-elevation-z8'],
            width: '80%',
            height: '80%',
            enterAnimationDuration: '500ms',
            exitAnimationDuration: '500ms'
        });
    }
}
