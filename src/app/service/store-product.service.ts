import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, tap } from 'rxjs';
import { CustomResponse } from '../model/custom-response';

@Injectable({
  providedIn: 'root'
})
export class StoreProductService {
  private url='https://kapexpert.cloud:8087/api/v1/fast-gaz';

  private readonly URL = this.url+ `/store-product`;


  constructor(private http: HttpClient) { }

  productList$ = () => <Observable<CustomResponse>>
    this.http
      .get<any>(`${this.URL}`)
      .pipe();


  handlerError(error: HttpErrorResponse): Observable<never> {
    throw new Error(`An error occured - Error code :${error.message}`);
  }
}
