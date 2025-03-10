import { Component, OnInit } from '@angular/core';
import { ApiApiService } from './service/api-api.service';
import { CountryInfo } from './model/utils/country-info';
import { Position } from './model/utils/position';
import { StatusBar,Style } from '@capacitor/status-bar';
import { Platform } from '@ionic/angular';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

   constructor(
    private platform: Platform,
    private apiIp: ApiApiService
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      StatusBar.setOverlaysWebView({ overlay: false }); // Empêche le contenu de passer sous la barre
      StatusBar.setStyle({ style: Style.Dark });
    });
  }

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
