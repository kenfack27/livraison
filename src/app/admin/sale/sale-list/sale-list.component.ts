import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataState } from 'src/app/model/utils/data-state';
import { Sale } from 'src/app/model/sale';
import { SaleItem } from 'src/app/model/sale-item';
import { SaleStatus } from 'src/app/model/sale-status';
import { Store } from 'src/app/model/store';
import { NotificationService } from 'src/app/service/notification.service';
import { SaleService } from 'src/app/service/sale.service';
import { StoreService } from 'src/app/service/storeService.service';

@Component({
  selector: 'app-sale-list',
  templateUrl: './sale-list.component.html',
  styleUrls: ['./sale-list.component.css']
})
export class SaleListComponent implements OnInit {

  readonly saleStatus = SaleStatus;
  saleItemList: SaleItem[] = [];
  saleList: Sale[] = [];
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

  constructor(private location: Location, private saleService: SaleService, private route: ActivatedRoute, private router: Router, private storeService: StoreService,
    private notifier: NotificationService
  ) { }

  ngOnInit(): void {
    this.storeID = this.storeService.getStoreID();
    this.getStoreByUUID(this.storeID);
  }
  
  private getStoreByUUID(uuid: string): void {
    this.storeService.storeUUID$(this.storeID).subscribe({
      next: (response) => {
        this.store = response.data.store;
        this.getSale(response.data.store.id);
      },
      error: (error) => {
        this.notifier.onInfo('Not store found. Login again');
        console.error(error);

      }
    })
  }


  private getSale(storeId:number): void {
    this.appState = DataState.LOADING_STATE;
    this.saleService.sales$(0, 10, storeId).subscribe({
      next: (response => {
        this.saleList = response.data.page.content;
        this.notifier.onDefault(response.message);
        this.appState = DataState.LOADED_STATE;
        console.log(response)
      }),
      error: (error) => {
        console.error(error);
        this.notifier.onError("Oups! something whent wrong !");
        this.appState = DataState.ERROR_STATE;
      }
    });
  }

  onGoToSaleProduct() {
    this.router.navigate(['/admin/add-sale']);
  }

  onGoBack() {
    this.location.back();
  }
}
