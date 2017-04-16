import { Directive, Input, OnInit } from '@angular/core';
import { GoogleMapsAPIWrapper } from 'angular2-google-maps/core/services/google-maps-api-wrapper';

import { MapService } from './map.service';
import { RestaurantService } from './restaurant.service';
import { Coordinates } from './coordinates';

declare var google: any;

@Directive({
  selector: 'agm-directions'
})
export class AgmDirectionsDirective implements OnInit {
  @Input() mapService: MapService;
  @Input() restaurantService: RestaurantService;
  directionsService: any;
  directionsDisplay: any;
  directions: any;

  constructor(private gmapsApi: GoogleMapsAPIWrapper) { }

  ngOnInit() {
    this.mapService.directionsDirective = this;
    this.gmapsApi.getNativeMap().then(map => {
      this.directionsService = new google.maps.DirectionsService;
      this.directionsDisplay = new google.maps.DirectionsRenderer;
      this.directionsDisplay.setMap(map);
    });
  }

  getDirections() {
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
        this.directions = response;
        this.directionsDisplay.setDirections(response);
        this.directionsDisplay.setPanel(document.getElementById('directions-panel'));
      } else {
        window.alert(`Direction request failed due to ${status}.`);
      }
    })
  }

}
