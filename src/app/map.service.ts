import { Injectable, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { GoogleMapsAPIWrapper } from 'angular2-google-maps/core/services/google-maps-api-wrapper';

import { GmapsOverrideDirective } from './gmaps-override.directive';
import { RestaurantService } from './restaurant.service';
import { Restaurant } from './restaurant';
import { Coordinates } from './coordinates';

declare var google: any;

@Injectable()
export class MapService {
  mapStyleKeys: string[] = ['aubergine', 'dark', 'night', 'retro', 'silver', 'standard'];
  mapMarkerDirUrl: string = '../assets/map-icons/';
  typeIconDict: Object = {
    'Bakery': 'sandwich.png',
    'Bar': 'bar-cocktail.png',
    'Café': 'coffee.png',
    'Casual Dining': 'fast-food.png',
    'Dessert Parlor': 'ice-cream.png',
    'Fine Dining': 'restaurant.png',
    'Food Court': 'cafeteria.png',
    'Kiosk': 'food-truck.png',
    'Lounge': 'beer-garden.png',
    'Quick Bites': 'fish-chips.png',
  };
  zoom: number = 13;
  styles: Object = {};
  styleKey: string = 'aubergine';
  latitude: number = 10.314512;
  longitude: number = 123.902329;
  streetViewControl: boolean = false;
  scrollwheel: boolean = false;
  mapTypeControl: boolean = false;
  usePanning: boolean = true;
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
  currentClientLocation: Coordinates;
  toggleGetDirections: boolean = false;
  directionsDirective: GmapsOverrideDirective;
  transitMode: string = 'TRANSIT';

  constructor(
    private http: Http,
    private gmapsApi: GoogleMapsAPIWrapper,
    public restaurantService: RestaurantService,
  ) {
    this.mapStyleKeys.map((s) => {
      return this.http
        .get(`../assets/gmaps-styles/${s}.json`)
        .toPromise()
        .then((res: any) => this.styles[s] = res.json())
        .catch((error: any) => console.error(error));
    });
    navigator.geolocation.getCurrentPosition(position => {
      this.currentClientLocation = {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      }
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
  }

  getDirections() {
    this.isCircleVisible = false;
    this.isMarkersVisible = false;
    this.isInfoWindowsVisible = false;
    this.directionsDirective.getDirections();
  }

}
