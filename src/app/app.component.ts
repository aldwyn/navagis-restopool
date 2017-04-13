import {
  Component, OnInit,
  trigger, state, style, transition, animate,
} from '@angular/core';

import { MapService } from './map.service';
import { RestaurantService } from './restaurant.service';

import { Restaurant } from './restaurant';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [
    trigger('slideInOut', [
      state('in', style({
        transform: 'translate3d(0, 0, 0)'
      })),
      state('out', style({
        transform: 'translate3d(100%, 0, 0)'
      })),
      transition('in => out', animate('.5s ease-in-out')),
      transition('out => in', animate('.5s ease-in-out'))
    ]),
  ]
})

export class AppComponent implements OnInit {
  title: string = 'RestoPool';
  restaurants: Restaurant[];
  cuisinesDict: Object = {};
  typeDict: Object = {};
  searchQuery: string = '';
  filterBy: string = 'name';
  searchResult: Object = { count: 0 };

  constructor(
    public mapService: MapService,
    public restaurantService: RestaurantService,
  ) {}

  ngOnInit() {
    this.restaurantService.getRestaurants()
      .then((restaurants: Restaurant[]) => {
        this.restaurants = restaurants;
        restaurants.map((r: Restaurant, i: number) => {
          if (r.cuisines.length > 0) {
            r.cuisines.map((c) => {
              if (c in this.cuisinesDict) {
                this.cuisinesDict[c].push(r.id);
              } else {
                this.cuisinesDict[c] = [r.id];
              }
            });
          }
          if (r.type in this.typeDict) {
            this.typeDict[r.type].push(r.id);
          } else {
            this.typeDict[r.type] = [r.id];
          }
        });
        console.log(this.cuisinesDict);
      });
  }
  
}
