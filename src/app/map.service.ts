import { Injectable, OnInit } from '@angular/core';
import { Http } from '@angular/http';

import { RestaurantService } from './restaurant.service';
import { Restaurant } from './restaurant';
import { Coordinates } from './coordinates';

declare var google: any;

@Injectable()
export class MapService {
  mapStyleKeys: string[] = ['aubergine', 'dark', 'night', 'retro', 'silver', 'standard'];
  zoom: number = 15;
  styles: Object = {};
  styleKey: string = 'aubergine';
  latitude: number = 10.322408;
  longitude: number = 123.897866;
  streetViewControl: boolean = false;
  scrollwheel: boolean = false;
  mapTypeControl: boolean = false;
  preOpenedInfoWindow: number[] = [17815792, 18166794, 17816660, 17829448];
  isCircleVisible: boolean = false;
  isMarkersVisible: boolean = true;
  isInfoWindowsVisible: boolean = true;
  foodHubCountWithinRadius: number = 0;
  circleCenter: Coordinates = {
    latitude: 10.330057,
    longitude: 123.904904,
  };;
  circleRadius: number = 500;
  circleFillColor: string = 'red';
  circleDraggable: boolean = true;

  constructor(
    private http: Http,
    public restaurantService: RestaurantService,
  ) {
    this.mapStyleKeys.map((s) => {
      return this.http
        .get(`../assets/gmaps-styles/${s}.json`)
        .toPromise()
        .then((res: any) => this.styles[s] = res.json())
        .catch((error: any) => console.error(error));
    });
  }

  getFoodHubsCountWithRadius(e) {
    this.circleRadius = e;
    this.getFoodHubsCountWithinRadius();
  }

  getFoodHubsCountWithCenter(e) {
    this.circleCenter = { latitude: e.lat, longitude: e.lng };
    this.getFoodHubsCountWithinRadius();
  }

  getFoodHubsCountWithinRadius() {
    let center = new google.maps.LatLng(
      this.circleCenter['latitude'], this.circleCenter['longitude']);
    this.foodHubCountWithinRadius = this.restaurantService.restaurants.filter(m => {
      let currCoord = new google.maps.LatLng(m.latitude, m.longitude);
      return google.maps.geometry.spherical
        .computeDistanceBetween(center, currCoord) <= this.circleRadius;
    }).length;
    console.log(this.foodHubCountWithinRadius);
  }

  getDirections(source: Coordinates, destination: Coordinates) {

  }

}
