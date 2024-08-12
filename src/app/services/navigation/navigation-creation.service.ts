import {Route} from '@angular/router';
import {ExternalMapManagerComponent} from "../../modules/star-map/external-map-manager/external-map-manager.component";
import {ExternalMapComponent} from "../../modules/star-map/external-map/external-map.component";


export class NavigationCreationService {

    static routes(): Route[] {
        return [
            {path: ExternalMapManagerComponent.path, component: ExternalMapManagerComponent},
            {path: ExternalMapComponent.path, component: ExternalMapComponent},
            {path: '', component: ExternalMapComponent}
        ];
    }
}
