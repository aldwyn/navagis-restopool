import { Injectable, OnInit } from '@angular/core';
import { Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { Restaurant } from './restaurant';

@Injectable()
export class RestaurantService {
  currentRouted: number;
  restaurants: Restaurant[];
  restaurantsDict: Object = {};
  cuisinesDict: Object = {};
  typeDict: Object = {};

  constructor(private http: Http) {
    this.getRestaurants()
      .then((restaurants: Restaurant[]) => {
        this.restaurants = restaurants;
        restaurants.map((r: Restaurant, i: number) => {
          this.restaurantsDict[r.id] = i;
          
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
      });
  }

  getRestaurants() {
    return this.http
      .get('../assets/restaurants.json')
      .toPromise()
      .then((res: any) => this.restaurants = Restaurant.parseList(res.json()))
      .catch((error: any) => console.error(error));
  }

}
