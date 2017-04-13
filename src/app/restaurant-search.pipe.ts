import { Pipe, PipeTransform } from '@angular/core';

import { Restaurant } from './restaurant';

@Pipe({
  name: 'restaurantSearch'
})
export class RestaurantSearchPipe implements PipeTransform {

  transform(
    restaurants: Restaurant[],
    searchQuery: string,
    filterBy: string,
    searchResult: any,
    cuisinesDict: any,
  ): any {
    let query = searchQuery.toLowerCase().trim();

    if (query == '') {
      searchResult.count = 0;
      return [null];
    } else {
      let filteredList: any[];
      if (filterBy === 'cuisines') {
        let filteredKeys = Object.keys(cuisinesDict).filter(c => c.toLowerCase().indexOf(query) !== -1);
        let filteredKeySet = new Set<number>();
        filteredKeys.map(c => {
          cuisinesDict[c].map(r => filteredKeySet.add(r));
        });
        filteredList = restaurants.filter(r => filteredKeySet.has(r.id));
      } else {
        filteredList = restaurants.filter(r => r[filterBy].toLowerCase().indexOf(query) !== -1);
      }

      searchResult.count = filteredList.length;
      return filteredList.length > 0 ? filteredList : [null];
    }
  }

}
