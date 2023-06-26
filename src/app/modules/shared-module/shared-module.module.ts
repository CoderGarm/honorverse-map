import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MaterialComponentsModule} from "./material.module";
import {HttpClientModule} from "@angular/common/http";
import {BrowserModule} from "@angular/platform-browser";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {AppRoutingModule} from "../../app-routing.module";
import {ApiModule} from "../../services/swagger";
import {NumericCounterComponent} from './components/numeric-counter/numeric-counter.component';
import {TranslateModule} from "@ngx-translate/core";
import {NumberShortPipe} from "../../services/pipes/number-short.pipe";
import {NumberThousandSeparatorPipe} from "../../services/pipes/number-thousand-separator.pipe";
import {NumberShortComponent} from "./components/number-short/number-short.component";
import {NumericSliderCounterComponent} from "./components/numeric-slider-counter/numeric-slider-counter.component";
import {NumberRomanPipe} from "../../services/pipes/number-roman.pipe";
import {OutlinedComponent} from './components/outlined/outlined.component';
import {ChipSelectorComponent} from "./components/chip-selector/chip-selector.component";
import {ClipboardModule} from "@angular/cdk/clipboard";
import {ColorPickerModule} from "ngx-color-picker";
import {OverlayModule} from "@angular/cdk/overlay";
import {SafePipe} from "../../services/pipes/safe.pipe";

@NgModule({
    declarations: [
        NumericCounterComponent,
        NumberShortComponent,
        NumberShortPipe,
        NumberRomanPipe,
        NumberThousandSeparatorPipe,
        SafePipe,
        OutlinedComponent,
        ChipSelectorComponent,
        NumericSliderCounterComponent,
    ],
    imports: [
        CommonModule,
        HttpClientModule,
        BrowserModule,
        BrowserAnimationsModule,
        FormsModule,
        ReactiveFormsModule,
        AppRoutingModule,
        ApiModule,
        MaterialComponentsModule,
        OverlayModule,
        TranslateModule,
        ClipboardModule,
        ColorPickerModule,
    ],
    exports: [
        CommonModule,
        HttpClientModule,
        BrowserModule,
        BrowserAnimationsModule,
        FormsModule,
        ReactiveFormsModule,
        AppRoutingModule,
        ApiModule,
        OverlayModule,
        TranslateModule,
        NumberShortPipe,
        NumberRomanPipe,
        NumberThousandSeparatorPipe,
        SafePipe,
        OutlinedComponent,
        ChipSelectorComponent,
        MaterialComponentsModule,
        NumericCounterComponent,
        NumberShortComponent,
        NumericSliderCounterComponent,
        ClipboardModule,
        ColorPickerModule,
    ]
})
export class SharedModuleModule {
}
