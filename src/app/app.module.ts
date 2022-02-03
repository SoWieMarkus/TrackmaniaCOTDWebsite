import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {DailyComponent} from './daily/daily.component';
import {MonthlyComponent} from './monthly/monthly.component';
import {GlobalComponent} from './global/global.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {MatCardModule} from "@angular/material/card";
import {GlobeComponent} from './countries/globe/globe.component';
import {HttpClientModule} from "@angular/common/http";
import {CountriesComponent} from './countries/countries.component';
import {MapComponent} from './map/map.component';
import {DailyTotdComponent} from './daily/daily-totd/daily-totd.component';
import {MatTabsModule} from "@angular/material/tabs";
import {FlagComponent} from './flag/flag.component';
import {LeaderboardComponent} from './leaderboard/leaderboard.component';
import { CountryComponent } from './country/country.component';

@NgModule({
  declarations: [
    AppComponent,
    DailyComponent,
    MonthlyComponent,
    GlobalComponent,
    GlobeComponent,
    CountriesComponent,
    MapComponent,
    DailyTotdComponent,
    FlagComponent,
    LeaderboardComponent,
    CountryComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    MatProgressSpinnerModule,
    MatTabsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
