import { Injectable } from '@angular/core';
import { StoreDistance } from '../model/utils/store-distance';
import { Store } from '../model/store';
import { Observable, from } from 'rxjs';
import { CustomerLocation } from '../model/utils/customer-location';

@Injectable({
  providedIn: 'root'
})
export class GooleMapCalculatorService {

  findNearestStore(userLocation: CustomerLocation, stores: Store[]): Observable<StoreDistance> {
    return from(new Promise<StoreDistance>((resolve, reject) => {
      const service = new google.maps.DistanceMatrixService();

      service.getDistanceMatrix({
        origins: [new google.maps.LatLng(userLocation.lat, userLocation.lng)],
        destinations: stores.map(store =>
          new google.maps.LatLng(store.latitude, store.longitude)
        ),
        travelMode: google.maps.TravelMode.DRIVING
      }, (response, status) => {
        if (status === 'OK' && response) {
          const distances = response.rows[0].elements;
          let shortestDistance = distances[0].distance.value;
          let nearestIndex = 0;

          distances.forEach((element, index) => {
            if (element.distance.value < shortestDistance) {
              shortestDistance = element.distance.value;
              nearestIndex = index;
            }
          });

          resolve({
            store: stores[nearestIndex],
            distance: shortestDistance / 1000 // Convert to kilometers
          });
        } else {
          reject(new Error('Failed to calculate distances'));
        }
      });
    }));
  }
}
