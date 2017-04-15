import { Component, OnInit, Input } from '@angular/core';

import { MapService } from '../map.service';
import { RestaurantService } from '../restaurant.service';
import { Restaurant } from '../restaurant';

@Component({
  selector: 'map-overlay',
  templateUrl: './map-overlay.component.html',
  styleUrls: ['./map-overlay.component.css']
})

export class MapOverlayComponent implements OnInit {

  constructor(
    public mapService: MapService,
    public restaurantService: RestaurantService,
  ) { }

  ngOnInit() {
    
  }

}
