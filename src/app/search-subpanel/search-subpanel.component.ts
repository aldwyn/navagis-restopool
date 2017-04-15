import {
  Component, Input,
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

export class SearchSubpanelComponent {

  constructor(
    public searchService: SearchService,
    public restaurantService: RestaurantService,
  ) { }

}
