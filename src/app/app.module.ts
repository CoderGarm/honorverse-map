import {Injector, NgModule} from '@angular/core';
import {AppComponent} from './app.component';
import {StarMapModule} from "./modules/star-map/star-map.module";
import {SharedModuleModule} from "./modules/shared-module/shared-module.module";
import {TranslateLoader, TranslateModule} from "@ngx-translate/core";
import {HttpClient} from "@angular/common/http";
import {TranslateHttpLoader} from "@ngx-translate/http-loader";
import {BasicViewHelperData} from "./modules/star-map/svg-view-helper/basic-view-helper-data";
import {BasicViewHelper} from "./modules/star-map/svg-view-helper/basic-view-helper";
import {SubscriptionManager} from "./services/subscription.manager";
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

export let AppInjector: Injector;

@NgModule({
  declarations: [
    AppComponent,
    SubscriptionManager,
    BasicViewHelperData,
    BasicViewHelper,
  ],
  imports: [
    TranslateModule.forRoot({
      defaultLanguage: 'en',
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [HttpClient]
      }
    }),
    SharedModuleModule,
    StarMapModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
