import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';

import { AgmCoreModule } from 'angular2-google-maps/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppRoutesModule } from './app.routing';
import { MapService } from './map.service';
import { SearchService } from './search.service';
import { RestaurantService } from './restaurant.service';

import { AppComponent } from './app.component';
import { SearchSubpanelComponent } from './search-subpanel/search-subpanel.component';
import { DetailsSubpanelComponent } from './details-subpanel/details-subpanel.component';
import { MapOverlayComponent } from './map-overlay/map-overlay.component';
import { GmapsOverrideDirective } from './gmaps-override.directive';

@NgModule({
  declarations: [
    AppComponent,
    SearchSubpanelComponent,
    DetailsSubpanelComponent,
    MapOverlayComponent,
    GmapsOverrideDirective,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpModule,
    AppRoutesModule,
    NgbModule.forRoot(),
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyAp2JYyf56opEm6FIt9Yj1Hg1RDH7oO1h4',
    }),
  ],
  providers: [
    MapService,
    SearchService,
    RestaurantService,
  ],
  bootstrap: [AppComponent]
})

export class AppModule { }
