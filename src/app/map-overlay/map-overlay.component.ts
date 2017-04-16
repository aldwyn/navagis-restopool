import {
  Component, OnInit, Input,
  trigger, state, style, transition, animate
} from '@angular/core';

import { MapService } from '../map.service';
import { SearchService } from '../search.service';
import { RestaurantService } from '../restaurant.service';
import { Restaurant } from '../restaurant';

@Component({
  selector: 'map-overlay',
  templateUrl: './map-overlay.component.html',
  styleUrls: ['./map-overlay.component.css'],
  animations: [
    trigger('mapOverlayTransition', [
      state('in', style({
        width: '100%',
      })),
      state('out', style({
        width: '60%',
      })),
      transition('in => out', animate('.5s ease-in-out')),
      transition('out => in', animate('.5s ease-in-out'))
    ]),
  ],
})

export class MapOverlayComponent implements OnInit {

  constructor(
    public mapService: MapService,
    public searchService: SearchService,
    public restaurantService: RestaurantService,
  ) { }

  ngOnInit() {
    
  }

}
