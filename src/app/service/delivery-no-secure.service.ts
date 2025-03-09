import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CustomResponse } from '../model/custom-response';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DeliveryNoSecureService {
  private url='https://kapexpert.cloud:8087/api/v1/fast-gaz';

  private readonly URL = this.url + `/no-secure-delivery`;


  constructor(private http: HttpClient) { }

  noActivedeliveryList$ = (storeId: number) => <Observable<CustomResponse>>
    this.http
      .get<any>(`${this.URL}/inactive?storeId=${storeId}`)
      .pipe(tap(console.log));
}
