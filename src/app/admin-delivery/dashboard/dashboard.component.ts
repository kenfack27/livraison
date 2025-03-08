import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { Delivery } from 'src/app/model/delivery';
import { DeliveryService } from 'src/app/service/delivery.service';
import { NotificationService } from 'src/app/service/notification.service';
import { StoreService } from 'src/app/service/storeService.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  delivery:Delivery = {
    latitude: 0,
    longitude: 0,
    benefice: 0,
    users: {
      id: 0,
      lastName: '',
      firstName: '',
      email: '',
      password: '',
      imageUrl: '',
      fullName: '',
      username: ''
    }
  }
  isAdelivery$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor(private router: Router, private storeService: StoreService, private notifier: NotificationService, private deliveryService: DeliveryService, private location: Location) { }


  ngOnInit(): void {
    this.isAdelivery();
  }
  onGoToCreateDelivery() {
    if(!this.isAdelivery$.value){
      this.router.navigate(["/delivery/becomme-delivery"]);
    }else{
      this.notifier.onWarning('You have already');
    }
    
  }

  isAdelivery(): void {
    this.deliveryService.isAdelivery$().subscribe({
      next: (response) => {
        this.isAdelivery$.next(response.data.isDelivery);
        
      },
      error: (error) => {
        this.notifier.onInfo("Login if you want more access");
        console.error(error);
        this.router.navigate(["/login"])
      }
    });
  }



  onGoToScan() {
    if(this.isAdelivery$.value){
      this.router.navigate(["/delivery/scanner"]);

    }else{
      this.notifier.onWarning('You have not permission to');
    }
    
  }

  onGoToCustomerOrderList() {
    this.router.navigate(["/delivery/orders"])
  }

  onGoBack() {
    this.location.back();
  }


}
