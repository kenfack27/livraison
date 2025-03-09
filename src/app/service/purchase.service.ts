import { HttpClient, HttpContext, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { catchError, tap } from "rxjs/operators";
import { Purchase } from '../model/purchase';
import { CustomPageResponse } from '../model/custom-response-page';
import { Page } from '../model/page';
import { CustomResponse } from '../model/custom-response';
import { PurchaseRequest } from '../model/request/purchase-request';

@Injectable({
  providedIn: 'root'
})
export class PurchaseService {
  private url='https://kapexpert.cloud:8087/api/v1/fast-gaz';

  private readonly URL = this.url + `/purchase`;

  constructor(private http: HttpClient) { }


  getPuchaseAmount(storeId: number): Observable<CustomResponse> {
    return this.http.get<any>(`${this.URL}/amount?storeId=${storeId}`)
  }
  getNumberPurchase(storeId: number): Observable<CustomResponse> {
    return this.http.get<any>(`${this.URL}/total?storeId=${storeId}`)
  }

  // List of Purchase form a store
  purchase$ = (page: number = 0, size: number = 10, storeId: number) => <Observable<CustomPageResponse<Page<Purchase>>>>this.http
    .get<any>(`${this.URL}/page/purchases?page=${page}&size=${size}&storeId=${storeId}`)
    .pipe(catchError(this.handlerError));

  // clear Item to the cart
  clearToCart$ = () => <Observable<CustomResponse>>this.http
    .get<any>(`${this.URL}/clear`);

  // Add Item to the cart
  addToCart$ = (request: PurchaseRequest, httpContext?: HttpContext) => <Observable<CustomResponse>>this.http
    .post<any>(`${this.URL}/add`, request).pipe(
      tap(console.log)
    );

  handlerError(error: HttpErrorResponse): Observable<never> {
    throw new Error(`An error occured - Error code :${error.message}`);
  }
}
