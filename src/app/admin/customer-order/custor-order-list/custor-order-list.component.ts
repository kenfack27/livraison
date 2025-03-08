import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { DataState } from 'src/app/model/utils/data-state';
import { Store } from 'src/app/model/store';
import { NotificationService } from 'src/app/service/notification.service';
import { StoreService } from 'src/app/service/storeService.service';
import { CustomerOrder } from 'src/app/model/customerOrder';
import { OrderStatus } from 'src/app/model/enum/order-status';
import { CustomerOrderSecureService } from 'src/app/service/customer-order-secure.service';
@Component({
  selector: 'app-custor-order-list',
  templateUrl: './custor-order-list.component.html',
  styleUrls: ['./custor-order-list.component.css']
})
export class CustorOrderListComponent implements OnInit {

  customerOrderList: CustomerOrder[] = [];
  storeID: any;
  private store: Store = {
    createdAt: '',
    createdBy: '',
    id: 0,
    name: '',
    latitude: 0,
    longitude: 0,
    phoneNumber: '',
    email: '',
    address: '',
    active: false,
  }

  appState: DataState = DataState.LOADING_STATE;
  readonly DataState = DataState;
  readonly orderStatus = OrderStatus;


  constructor(private location: Location, private router: Router, private storeService: StoreService,
    private notifier: NotificationService, private customerOrderSecureService: CustomerOrderSecureService
  ) { }

  ngOnInit(): void {
    this.storeID = this.storeService.getStoreID();
    this.getStoreByUUID(this.storeID);
  }

  private getStoreByUUID(uuid: string): void {
    this.storeService.storeUUID$(this.storeID).subscribe({
      next: (response) => {
        this.store = response.data.store;
        this.getCustomerOrderByStore(response.data.store.id);
      },
      error: (error) => {
        this.notifier.onError('Not store found. Login again');
        console.error(error);
      }
    });
  }


  private getCustomerOrderByStore(storeId: number): void {
    this.appState = DataState.LOADING_STATE;
    this.customerOrderSecureService.customerOrderListForStore$(0, 1000, storeId).subscribe({
      next: (response => {
        this.customerOrderList = response.data.page.content;
        console.log(this.customerOrderList)
        this.notifier.onDefault(response.message);
        this.appState = DataState.LOADED_STATE;
      }),
      error: (error) => {
        console.error(error);
        this.notifier.onError("Oups! something whent wrong !");
        if (error) {
          this.appState = DataState.ERROR_STATE
        }
      },
      complete: () => {
        this.appState = DataState.LOADED_STATE;
      }
    });
  }


  onDetails(customerOrderId: number) {
    this.router.navigate(["/admin/customer-order/", customerOrderId])
  }

  onGoToPurchaseProduct() {
    this.router.navigate(['/admin/add-purchase']);
  }

  onGoBack() {
    this.location.back();
  }


}
