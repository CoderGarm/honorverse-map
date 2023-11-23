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

    constructor(@Inject(MAT_DIALOG_DATA) public data: DialogData) {
    }

}
