import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { MapService } from '../map.service';
import { RestaurantService } from '../restaurant.service';
import { SearchService } from '../search.service';
import { Restaurant } from '../restaurant';

import 'rxjs/add/operator/switchMap';

@Component({
  selector: 'details-subpanel',
  templateUrl: './details-subpanel.component.html',
  styleUrls: ['./details-subpanel.component.css']
})
export class DetailsSubpanelComponent implements OnInit, OnDestroy {
  sub: any;

  constructor(
    private route: ActivatedRoute,
    public mapService: MapService,
    public restaurantService: RestaurantService,
    public searchService: SearchService,
  ) { }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      let id = +params['id'];
      if (id in this.restaurantService.restaurantsDict) {
        let index = this.restaurantService.restaurantsDict[id];
        this.restaurantService.focusedFoodHub = this.restaurantService.restaurants[index];
      }
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

}
