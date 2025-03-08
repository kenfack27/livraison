import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataState } from 'src/app/model/utils/data-state';
import { Purchase } from 'src/app/model/purchase';
import { Store } from 'src/app/model/store';
import { LoadingService } from 'src/app/service/loading.service';
import { NotificationService } from 'src/app/service/notification.service';
import { PurchaseService } from 'src/app/service/purchase.service';
import { StoreService } from 'src/app/service/storeService.service';

@Component({
  selector: 'app-purchase-list',
  templateUrl: './purchase-list.component.html',
  styleUrls: ['./purchase-list.component.css']
})
export class PurchaseListComponent implements OnInit {

  purchaseList: Purchase[] = [];
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
    active: false
  }

  appState: DataState = DataState.LOADING_STATE;
  readonly DataState = DataState;

  constructor(private location: Location,
    private purchaseService: PurchaseService,
    private router: Router, private storeService: StoreService,
    private notifier: NotificationService, private loadingService: LoadingService
  ) { }

  ngOnInit(): void {
    this.storeID = this.storeService.getStoreID();
    this.getStoreByUUID(this.storeID);
  }

  private getStoreByUUID(uuid: string): void {
    this.storeService.storeUUID$(this.storeID).subscribe({
      next: (response) => {
        this.store = response.data.store;
        this.getPurchase(response.data.store.id);
      },
      error: (error) => {
        this.notifier.onError('Not store found. Login again');
        console.error(error);

      }
    });
  }


  private getPurchase(storeId: number): void {
    this.appState = DataState.LOADING_STATE;
    this.purchaseService.purchase$(0, 100, storeId).subscribe({
      next: (response => {
        this.purchaseList = response.data.page.content;
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

  onGoToPurchaseProduct() {
    this.router.navigate(['/admin/add-purchase']);
  }

  onGoBack() {
    this.location.back();
  }


}
