import {
  Component, OnInit,
  trigger, state, style, transition, animate,
} from '@angular/core';
import { Router } from '@angular/router';
import { GoogleMapsAPIWrapper } from 'angular2-google-maps/core/services/google-maps-api-wrapper';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/fromEvent';

import { MapService } from './map.service';
import { SearchService } from './search.service';
import { RestaurantService } from './restaurant.service';
import { Restaurant } from './restaurant';


@Component({
  providers: [MapService, SearchService, RestaurantService, GoogleMapsAPIWrapper],
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
    // trigger('routerTransition', [
    //   state('void', style({position:'fixed', width:'100%'}) ),
    //   state('*', style({position:'fixed', width:'100%'}) ),
    //   transition(':enter', [  // before 2.1: transition('void => *', [
    //     style({transform: 'translateX(100%)'}),
    //     animate('0.5s ease-in-out', style({transform: 'translateX(0%)'}))
    //   ]),
    //   transition(':leave', [  // before 2.1: transition('* => void', [
    //     style({transform: 'translateX(0%)'}),
    //     animate('0.5s ease-in-out', style({transform: 'translateX(-100%)'}))
    //   ])
    // ]),
  ]
})

export class AppComponent {
  title: string = 'RestoPool';
  
  constructor(
    private router: Router,
    public mapService: MapService,
    public searchService: SearchService,
    public restaurantService: RestaurantService,
  ) {

  }
  
}
