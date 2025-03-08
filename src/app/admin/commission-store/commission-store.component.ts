import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommissionStore } from 'src/app/model/commission-store';
import { DataState } from 'src/app/model/utils/data-state';
import { CommissionService } from 'src/app/service/commission.service';
import { NotificationService } from 'src/app/service/notification.service';
import { StoreService } from 'src/app/service/storeService.service';

@Component({
  selector: 'app-commission-store',
  templateUrl: './commission-store.component.html',
  styleUrls: ['./commission-store.component.css']
})
export class CommissionStoreComponent implements OnInit {

  storeID: any;
  appState: DataState = DataState.LOADING_STATE;
  readonly DataState = DataState;
  commissions: CommissionStore[] = [];


  constructor(private location: Location,
    private commissionService: CommissionService,
    private storeService: StoreService,
    private notifier: NotificationService
  ) { }

  ngOnInit(): void {
    this.storeID = this.storeService.getStoreID();
    this.getStoreByUUID(this.storeID);
  }

  /** @param uuid List product form this store*/
  private getStoreByUUID(uuid: string): void {
    this.storeService.storeUUID$(this.storeID).subscribe({
      next: (response) => {
        this.getCommission(response.data.store.id);
      },
      error: (error) => {
        this.notifier.onInfo('Not store found. Login again');
        console.error(error);
      }
    });
  }

  private getCommission(storeId: number): void {
    this.appState = DataState.LOADING_STATE;
    this.commissionService.getCommisionByStore$(storeId).subscribe(
      {
        next: (response) => {
          this.commissions = response.data.commissionStores;
          this.appState = DataState.LOADED_STATE;
          this.notifier.onDefault(response.message);
        },
        error: (error) => {
          console.error(error);
          this.notifier.onError("Cannot fetch product");
          this.appState = DataState.ERROR_STATE;
        }
      }
    )
  }


  onGoBack() {
    this.location.back();
  }
}
