import {Component} from '@angular/core';
import {Router} from "@angular/router";

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {

    // not needed
    isNoScroll: boolean = false;

    constructor(private router: Router) {

        this.router.events.subscribe(event => {
            if ('snapshot' in event && !!event.snapshot.routeConfig && !!event.snapshot.routeConfig.path) {
                //this.isNoScroll = event.snapshot.routeConfig.path.startsWith(ExternalMapComponent.path);
            }
        });
    }
}
