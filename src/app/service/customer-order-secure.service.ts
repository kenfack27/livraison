import { HttpClient, HttpContext, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from 'src/environments/environment.development';
import { CustomResponse } from '../model/custom-response';
import { catchError, tap } from 'rxjs/operators';
import { CustomerOrder } from '../model/customerOrder';
import { CustomPageResponse } from '../model/custom-response-page';
import { Page } from '../model/page';
import { ApproveCustomerOrder } from '../model/request/request-approave-order';

@Injectable({
  providedIn: 'root'
})
export class CustomerOrderSecureService {

  private readonly URL = environment.URL + `/customer-order`;

  constructor(private http: HttpClient) { }


  // scan order
  scan$ = (invoiceNumber: string) => <Observable<CustomResponse>>
    this.http
      .get<any>(`${this.URL}/scan?invoiceNumber=${invoiceNumber}`).pipe();

  getCustomerOrderAmount(storeId: number): Observable<CustomResponse> {
    return this.http.get<any>(`${this.URL}/amount?storeId=${storeId}`)
  }

  getCustomerOrderSummaryWithPackagingByStoreAndDate$ = (storeId: number, createdDate: any) => <Observable<CustomResponse>>
    this.http
      .get<any>(`${this.URL}/sales-summary/with-packaging?storeId=${storeId}&createdDate=${createdDate}`).pipe(
        catchError(this.handlerError)
      );

  getCustomerOrderSummaryByStoreAndDate$ = (storeId: number, createdDate: any) => <Observable<CustomResponse>>
    this.http
      .get<any>(`${this.URL}/sales-summary?storeId=${storeId}&createdDate=${createdDate}`).pipe(
        catchError(this.handlerError)
      );

  // customer order list for store use case (OWNER)
  customerOrderListForStore$ = (page: number = 0, size: number = 10, storeId: number) => <Observable<CustomPageResponse<Page<CustomerOrder>>>>this.http
    .get<any>(`${this.URL}/store/list?storeId=${storeId}&page=${page}&size=${size}`).pipe(
      catchError(this.handlerError)
    );

  // customer order list for Customer use case (Customer)
  customerOrderListForCustomer$ = (customerOrderId: number, page: number = 0, size: number = 10) => <Observable<CustomResponse>>
    this.http
      .get<any>(`${this.URL}/customer?customerOrderId=${customerOrderId}&page=${page}&size=${size}`).pipe(
        catchError(this.handlerError)
      );



  // Approuve the customer order (STORE OWNER).
  approve$ = (request: CustomerOrder, httpContext?: HttpContext) => <Observable<CustomResponse>>this.http
    .post<any>(`${this.URL}/approved`, request).pipe(

      catchError(this.handlerError)
    );


  // New: Approuve the customer order (STORE OWNER).
  approveOrder$ = (request: ApproveCustomerOrder, httpContext?: HttpContext) => <Observable<CustomResponse>>this.http
    .post<any>(`${this.URL}/approved`, request).pipe(

      catchError(this.handlerError)
    );

  assignDelivery$ = (request: CustomerOrder, httpContext?: HttpContext) => <Observable<CustomResponse>>this.http
    .post<any>(`${this.URL}/assign-delivery`, request).pipe();



  // Approuve the customer order (DELIVERY).
  approveByDelivery$ = (request: CustomerOrder, httpContext?: HttpContext) => <Observable<CustomResponse>>
    this.http
      .post<any>(`${this.URL}/approved-by-delivery`, request).pipe(
    );

  getCustomerOrderItemByCustomerOrder$ = (customerOrderId: number) => <Observable<CustomResponse>>this.http
    .get<any>(`${this.URL}/customer?customerOrderId=${customerOrderId}`).pipe(
      catchError(this.handlerError)
    );

  getCustomerOrderItemByCustomerOrderInStore$ = (customerOrderId: any, storeId: number) => <Observable<CustomResponse>>
    this.http
      .get<any>(`${this.URL}/customer-order-details?customerOrderId=${customerOrderId}&storeId=${storeId}`).pipe(
        catchError(this.handlerError)
      );


  getMyOrder$ = (customerOrderId: number, page: number = 0, size: number = 10) => <Observable<CustomResponse>>
    this.http
      .get<any>(`${this.URL}/customer?customerOrderId=${customerOrderId}&page=${page}&size=${size}`).pipe(
        catchError(this.handlerError)
      );

  getCustomerOrderByCustomerOrderId$ = (customerOrderId: number) => <Observable<CustomResponse>>
    this.http
      .get<any>(`${this.URL}/customer-order?customerOrderId=${customerOrderId}`).pipe(
     
      );

  handlerError(error: HttpErrorResponse): Observable<never> {
    throw new Error(`An error occured - Error code :${error.message}`);
  }
}
