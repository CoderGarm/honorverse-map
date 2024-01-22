import {Component} from '@angular/core';
import {ColorSchemeService} from "../../../../services/color-scheme.service";

@Component({
    selector: 'app-toggle-view-mode',
    templateUrl: './toggle-view-mode.component.html',
    styleUrls: ['./toggle-view-mode.component.scss']
})
export class ToggleViewModeComponent {


    isDark: boolean = true;

    constructor(private colorSchemeService: ColorSchemeService) {

        this.colorSchemeService.getSchemaEmitter().subscribe(schema => {
            switch (schema) {
                case 'dark':
                    this.isDark = true;
                    break;
                case 'light':
                    this.isDark = false;
                    break;
            }
        });
    }

    toggleDarkMode() {
        this.colorSchemeService.toggle();
    }

}
