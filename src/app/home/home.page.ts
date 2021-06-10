import { Component } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { Map, tileLayer, marker } from 'leaflet';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  public showMap: boolean = false;

  private map: Map;

  constructor(private geolocation: Geolocation) {}

  public fetchLocation(): void {
    this.geolocation.getCurrentPosition()
    .then((resp) => {
      this.showMap = true;
      this.loadMap(resp.coords.latitude, resp.coords.longitude);
    })
    .catch((error) => {
      console.log('Error getting location', error);
    });
  }

  private loadMap(lat: number, lon: number): void {
    this.map = new Map('mapId').setView([lat, lon], 13);

    tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      { attribution: 'Map data © OpenStreetMap' }
    )
    .addTo(this.map);

    marker([lat, lon], {draggable: false}).addTo(this.map);
  }
}