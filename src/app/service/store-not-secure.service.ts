import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { CustomResponse } from '../model/custom-response';

@Injectable({
  providedIn: 'root'
})
export class StoreNotSecureService {
  private url='https://kapexpert.cloud:8087/api/v1/fast-gaz';

  private readonly URL = this.url + `/no-secure-store`;
  private readonly STORE_ID = "STORE_ID";
  customerOrderService: any;

  constructor(private http: HttpClient) { }
  

  getAllActiveStore$ = () => <Observable<CustomResponse>>this.http
    .get<any>(`${this.URL}/active-store`).pipe(
      tap(console.log));
}
