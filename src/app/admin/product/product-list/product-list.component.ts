import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { DataState } from 'src/app/model/utils/data-state';
import { Product } from 'src/app/model/product';
import { SaleItem } from 'src/app/model/sale-item';
import { Store } from 'src/app/model/store';
import { NotificationService } from 'src/app/service/notification.service';
import { ProductService } from 'src/app/service/product.service';
import { StoreService } from 'src/app/service/storeService.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  storeID: string = '';
  products: Product[] = [];
  // productList$:Observable<CustomPageResponse<Page<>>>;
  saleItemList: SaleItem[] = [];
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
    private productService: ProductService,
    private route: ActivatedRoute,
    private router: Router,
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
        this.store = response.data.store;
        this.getProducts(response.data.store.id);
      },
      error: (error) => {
        this.notifier.onInfo('Not store found. Login again');
        console.error(error);
      }
    });
  }


  private getProducts(storeId: number): void {
    this.appState = DataState.LOADING_STATE;
    this.productService.productsInMyStore$(0, 10, storeId).subscribe(
      {
        next: (response) => {
          console.log(response);
          this.products = response.data.page.content;
          this.appState = DataState.LOADED_STATE;
        },
        error: (error) => {
          console.error(error);
          this.notifier.onError("Cannot fetch product");
          this.appState = DataState.ERROR_STATE;
        }
      }
    )
  }


  onGoToAddProduct() {
    this.router.navigate(['/admin/add-product']);
  }

  onGoBack() {
    this.location.back();
  }
}
