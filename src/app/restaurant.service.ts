import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { Restaurant } from './restaurant';

@Injectable()
export class RestaurantService {

  constructor(private http: Http) { }

  getRestaurants() {
    return this.http
      .get('../assets/restaurants.json')
      .toPromise()
      .then((res: any) => Restaurant.parseList(res.json()))
      .catch((error: any) => console.error(error));
  }

}
