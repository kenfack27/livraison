import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CustomResponse } from '../model/custom-response';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommissionService {
    private url='https://kapexpert.cloud:8087/api/v1/fast-gaz';
  private readonly URL = this.url + `/commission`;

  constructor(private http: HttpClient) { }

  getCommission$ = (storeId: number, customerOrderId: number) => <Observable<CustomResponse>>
  this.http.get<any>(`${this.URL}/commission?storeId=${storeId}&customerOrderId=${customerOrderId}`);

  getCommissionSummary$ = (storeId: number) => <Observable<CustomResponse>>
  this.http.get<any>(`${this.URL}/commission-summary?storeId=${storeId}`);

  getCommissionByUser$ = (): Observable<CustomResponse> => <Observable<CustomResponse>>
  this.http.get<any>(`${this.URL}/system`);

  getCommisionByStore$ = (storeId: number) => <Observable<CustomResponse>>
  this.http.get<any>(`${this.URL}/store?storeId=${storeId}`);

  getCommissionByDelivery$ = (context?:HttpContext ) => <Observable<CustomResponse>>
  this.http.get<any>(`${this.URL}/delivery`);
}
