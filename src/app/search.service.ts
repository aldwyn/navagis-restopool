import { Injectable, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { RestaurantService } from './restaurant.service';
import { Restaurant } from './restaurant';


@Injectable()
export class SearchService implements OnInit  {
  searchQuery: string = '';
  filterBy: string = 'name';
  searchResult: Object = { count: 0 };
  filteredList: any[] = [null];
  filteredListCount: number = 0;

  constructor(private router: Router,
    public restaurantService: RestaurantService
  ) { }

  ngOnInit() {
    this.filterFoodHubs();
  }

  setRestaurantService(restaurantService) {
    this.restaurantService = restaurantService;
  }

  navigateToSearch() {
    this.filterFoodHubs();
    this.router.navigate(['search'], {
      queryParams: { query: this.searchQuery }
    })
  }

  filterFoodHubs() {
    let query = this.searchQuery.toLowerCase().trim();

    if (query == '') {
      this.filteredListCount = 0;
      this.filteredList = [null];
    } else {
      let filteredList: any = [];
      if (this.filterBy === 'cuisines') {
        let filteredKeys = Object.keys(this.restaurantService.cuisinesDict)
          .filter(c => c.toLowerCase().indexOf(query) !== -1);
        let filteredKeySet = new Set<number>();
        filteredKeys.map(c => {
          this.restaurantService.cuisinesDict[c].map(r => filteredKeySet.add(r));
        });
        filteredList = this.restaurantService.restaurants
          .filter(r => filteredKeySet.has(r.id));
      } else {
        filteredList = this.restaurantService.restaurants
          .filter(r => r[this.filterBy].toLowerCase().indexOf(query) !== -1);
      }

      this.filteredListCount = filteredList.length;
      this.filteredList = (filteredList.length > 0) ? filteredList : [null];
    }
  }

}