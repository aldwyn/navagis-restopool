import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

@Injectable()
export class MapService {
  mapStyleKeys: string[] = ['aubergine', 'dark', 'night', 'retro', 'silver', 'standard'];
  styles: Object = {};
  styleKey: string = 'aubergine';
  latitude: number = 10.322408;
  longitude: number = 123.897866;
  streetViewControl: boolean = false;
  scrollwheel: boolean = false;
  mapTypeControl: boolean = false;
  preOpenedInfoWindow: number[] = [17815792, 18166794, 17816660, 17829448];
  zoom: number = 15;

  constructor(private http: Http) {
    this.getMapStyles();
  }

  getMapStyles() {
    this.mapStyleKeys.map((s) => {
      return this.http
        .get(`../assets/gmaps-styles/${s}.json`)
        .toPromise()
        .then((res: any) => this.styles[s] = res.json())
        .catch((error: any) => console.error(error));
    });
  }

}
