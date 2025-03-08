import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { DataState } from 'src/app/model/utils/data-state';
import { Inventory } from 'src/app/model/inventory';
import { MovementType } from 'src/app/model/enum/movmentType';
import { inventoryService } from 'src/app/service/inventory.service';
import { NotificationService } from 'src/app/service/notification.service';
import { StoreService } from 'src/app/service/storeService.service';

@Component({
  selector: 'app-inventory-list',
  templateUrl: './inventory-list.component.html',
  styleUrls: ['./inventory-list.component.css']
})
export class InventoryListComponent {
  inventoryList: Inventory[] = [];
  storeID: any;
  appState: DataState = DataState.LOADING_STATE;
  readonly DataState = DataState;
  readonly MovementType = MovementType;

  constructor(private location: Location, private inventoryService: inventoryService, private router: Router, private storeService: StoreService,
    private notifier: NotificationService
  ) { }

  ngOnInit(): void {
    this.storeID = this.storeService.getStoreID();
    this.getStoreByUUID(this.storeID);
  }



  onDetails(inventory: Inventory) {
    this.router.navigate(['/admin/inventory-details/', inventory.id]);
  }

  onGoBack() {
    this.location.back();
  }

  private getStoreByUUID(uuid: string): void {
    this.storeService.storeUUID$(this.storeID).subscribe({
      next: (response) => {
        this.getInventories(response.data.store.id);
      },
      error: (error) => {
        this.notifier.onError('Not store found. Login again');
        console.error(error);

      }
    });
  }

  private getInventories(storeId: number): void {
    this.appState = DataState.LOADING_STATE;
    this.inventoryService.inventories$(0, 200, storeId).subscribe({
      next: (response => {
        this.inventoryList = response.data.page.content;
        this.notifier.onDefault(response.message);
        this.appState = DataState.LOADED_STATE;
      }),
      error: (error) => {
        console.error(error);
        this.notifier.onError("Oups! Cannot load transaction history!");
        this.appState = DataState.ERROR_STATE
      }
    });
  }

}
