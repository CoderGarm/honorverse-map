import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA} from "@angular/material/dialog";

class DialogData {
}

@Component({
    selector: 'app-wiki-display',
    templateUrl: './wiki-display.component.html',
    styleUrls: ['./wiki-display.component.scss']
})
export class WikiDisplayComponent {

    /* fixme slocum haven und silesia */
    constructor(@Inject(MAT_DIALOG_DATA) public data: DialogData) {
    }

}
