import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {NavigationCreationService} from "./services/navigation/navigation-creation.service";

const routes: Routes = NavigationCreationService.routes();

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
