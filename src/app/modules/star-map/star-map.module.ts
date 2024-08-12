import {NgModule} from '@angular/core';
import {SharedModuleModule} from "../shared-module/shared-module.module";
import {ExternalMapComponent} from './external-map/external-map.component';
import {ExternalMapManagerComponent} from './external-map-manager/external-map-manager.component';
import {EraSelectorComponent} from "./era-selector/era-selector.component";


@NgModule({
    declarations: [
        ExternalMapComponent,
        ExternalMapManagerComponent,
        EraSelectorComponent,
    ],
    imports: [
        SharedModuleModule,
    ]
})
export class StarMapModule {
}
