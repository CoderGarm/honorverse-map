import {Component} from '@angular/core';
import {Router} from "@angular/router";
import {ColorSchemeService} from "./services/color-scheme.service";

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {

    constructor(private colorSchemeService: ColorSchemeService,
                private router: Router) {
        this.colorSchemeService.load();

        this.router.events.subscribe(event => {
            if ('snapshot' in event && !!event.snapshot.routeConfig && !!event.snapshot.routeConfig.path) {
                //this.isNoScroll = event.snapshot.routeConfig.path.startsWith(ExternalMapComponent.path);
            }
        });
    }
}
