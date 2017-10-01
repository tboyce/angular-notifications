import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';

import {PushNotificationsModule} from 'angular2-notifications';

import {AppComponent} from './app.component';
import {WindowRef} from "./windowRef";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {MatListModule, MatChipsModule, MatSlideToggleModule} from '@angular/material';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    PushNotificationsModule,
    MatListModule,
    MatChipsModule,
    MatSlideToggleModule
  ],
  providers: [WindowRef],
  bootstrap: [AppComponent]
})
export class AppModule {
}
