import {
  Component, Input, OnInit,
  trigger, state, transition, style, animate,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
// 
import { SearchService } from '../search.service';
import { RestaurantService } from '../restaurant.service';

import { Restaurant } from '../restaurant';

@Component({
  selector: 'search-subpanel',
  templateUrl: './search-subpanel.component.html',
  styleUrls: ['./search-subpanel.component.css'],
})

export class SearchSubpanelComponent implements OnInit {
  sub: any;

  constructor(
    private route: ActivatedRoute,
    public searchService: SearchService,
    public restaurantService: RestaurantService,
  ) { }

  ngOnInit() {
    this.sub = this.route.queryParams.subscribe(queryParams => {
      this.searchService.searchQuery = queryParams['q'];
      // this.searchService.setRestaurantService(RestaurantService);
      // this.searchService.filterFoodHubs();
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

}
