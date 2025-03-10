import { Component, OnInit } from '@angular/core';
import { ApiApiService } from './service/api-api.service';
import { CountryInfo } from './model/utils/country-info';
import { Position } from './model/utils/position';
import { StatusBar } from '@capacitor/status-bar';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  StatusBar.setOverlaysWebView({ overlay: false });  // La barre ne doit pas être recouverte
  StatusBar.setStyle({ style: 'dark' });  // Icônes en noir sur fond clair (ou "light" si fond sombre)

  positions: Position[] = [
    {
      lat: 6,
      lng: 12
    },
    {
      lat: 20,
      lng: 6
    }
  ];
  currentLatitude: number;
  currentLongitude: number;
  currentInfo: CountryInfo;
  ip: string;

  constructor(private apiIp: ApiApiService) { }


  ngOnInit(): void {
    // this.onWachtPosition();
    // this.getUserIp();
  }

  
  findASeller() {
   
  }

  onWachtPosition(): void {
    const watchID = navigator.geolocation.watchPosition(
      position => {
        console.log(position.coords.latitude, position.coords.longitude);
      },
      error => { },
      {
        enableHighAccuracy: true,
        timeout: 500,
        maximumAge: 0
      }
    )
    // clear thr navition position aftter.
  }

  locationInfo(ip: string): void {
    this.apiIp.userCurrentPositionInfo$(ip).subscribe(
      {
        next: (response => {
          this.currentInfo = response;
          console.log(response);
        }),
        error: error => {
          console.log(error)
        }
      }
    );
  }


  getUserIp(): void {
    this.apiIp.ipAddress$.subscribe(
      {
        next: (response => {
          this.ip = response.ip;
          console.log("Api addres " + this.ip);
          this.locationInfo(response.ip);
        }),
        error: error => {
          console.log(error)
        }
      }
    )
  }


}
