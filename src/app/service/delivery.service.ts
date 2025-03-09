import { HttpClient, HttpContext, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { CustomResponse } from '../model/custom-response';
import { DeliveryRequest } from '../model/request/delivery-request';

@Injectable({
  providedIn: 'root'
})
export class DeliveryService {

  private url='https://kapexpert.cloud:8087/api/v1/fast-gaz';


  private readonly URL = this.url + `/delivery`;


  constructor(private http: HttpClient) { }



  findDeliveryByUser$ = (userId: number) => <Observable<CustomResponse>>
    this.http
      .get<any>(`${this.URL}/users/${userId}`)
      .pipe();

  isAdelivery$ = (httpContent?: HttpContext) => <Observable<CustomResponse>>
    this.http
      .get<any>(`${this.URL}/isDelivery`);

  deliveryForStore$ = (deliveryId: number, storeId: number) => <Observable<CustomResponse>>this.http
    .get<any>(`${this.URL}?storeId=${deliveryId}&storeId=${storeId}`)
    .pipe();


  delivery$ = (deliveryId: number) => <Observable<CustomResponse>>this.http
    .get<any>(`${this.URL}/${deliveryId}`)
    .pipe();


  deliveryList$ = (storeId: any) => <Observable<CustomResponse>>
    this.http
      .get<any>(`${this.URL}/list?storeId=${storeId}`)
      .pipe(catchError(this.handlerError));


  deliveryListAll$ = () => <Observable<CustomResponse>>
    this.http
      .get<any>(`${this.URL}/list/all`)
      .pipe(catchError(this.handlerError));

  becommeDelivery$ = (request: DeliveryRequest) => <Observable<CustomResponse>>
    this.http
      .post<any>(`${this.URL}/add`, request);


  noActivedeliveryList$ = (storeId: number) => <Observable<CustomResponse>>
    this.http
      .get<any>(`${this.URL}/inactive?storeId=${storeId}`)
      .pipe(tap(console.log));

  handlerError(error: HttpErrorResponse): Observable<never> {
    throw new Error(`An error occured - Error code :${error.message}`);
  }
}
