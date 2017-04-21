import { Directive, Input } from '@angular/core';
import { SebmGoogleMap, GoogleMapsAPIWrapper } from 'angular2-google-maps/core';
import { GoogleMap, Marker } from 'angular2-google-maps/core/services/google-maps-types';
import 'js-marker-clusterer/src/markerclusterer.js';

import { Restaurant } from './restaurant';
import { MapService } from './map.service';
import { RestaurantService } from './restaurant.service';

declare const google;
declare const MarkerClusterer;

@Directive({
  selector: '[gmaps-override]'
})
export class GmapsOverrideDirective {
  clusterIconUrl = 'https://googlemaps.github.io/js-marker-clusterer/images/m';
  directionsService: any;
  directionsDisplay: any;
  hasRoutes: boolean = false;

  constructor(
    private gmapsApi: GoogleMapsAPIWrapper,
    public mapService: MapService,
    public restaurantService: RestaurantService,
  ) {
    this.loadMarkerClusters();
    this.mapService.directionsDirective = this;
  }

  loadMarkerClusters() {
    this.gmapsApi.getNativeMap().then(map => {
      let markers = this.restaurantService.restaurants
        .map((r: Restaurant) => {
          return new google.maps.Marker({
            position: { lat: r.latitude, lng: r.longitude }
          });
        });
      (new MarkerClusterer(map, markers, { imagePath: this.clusterIconUrl }));
    });
  }

  getDirections() {
    this.gmapsApi.getNativeMap().then(map => {
      this.directionsService = new google.maps.DirectionsService;
      this.directionsDisplay = new google.maps.DirectionsRenderer;
      this.directionsDisplay.setMap(map);
      this.directionsService.route({
        origin: {
          lat: this.restaurantService.focusedFoodHub.latitude,
          lng: this.restaurantService.focusedFoodHub.longitude,
        },
        destination: {
          lat: this.mapService.currentClientLocation.latitude,
          lng: this.mapService.currentClientLocation.longitude,
        },
        waypoints: [],
        optimizeWaypoints: true,
        travelMode: this.mapService.transitMode,
      }, (response, status) => {
        if (status === 'OK') {
          this.hasRoutes = true;
          this.directionsDisplay.setDirections(response);
          this.directionsDisplay.setPanel(document.getElementById('directions-panel'));
        } else {
          window.alert(`Direction request failed due to ${status}.`);
        }
      })
    });
  }

  clearRoutes() {
    if (this.hasRoutes) {
      this.directionsDisplay.setMap(null);
      this.hasRoutes = false;
      let directionsPanel = document.getElementById('directions-panel');
      if (directionsPanel) {
        directionsPanel.innerHTML = '';
      }
    }
  }

  toggleTransitMode(mode) {
    this.clearRoutes();
    this.mapService.transitMode = mode;
    this.mapService.getDirections();
  }

}
