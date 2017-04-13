import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AgmCoreModule } from 'angular2-google-maps/core';

import { MapService } from './map.service';
import { RestaurantService } from './restaurant.service';

import { AppComponent } from './app.component';
import { RestaurantSearchPipe } from './restaurant-search.pipe';

@NgModule({
  declarations: [
    AppComponent,
    RestaurantSearchPipe
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyAp2JYyf56opEm6FIt9Yj1Hg1RDH7oO1h4',
    }),
  ],
  providers: [
    MapService,
    RestaurantService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
