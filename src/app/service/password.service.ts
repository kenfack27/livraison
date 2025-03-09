import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { CustomResponse } from '../model/custom-response';

@Injectable({
  providedIn: 'root'
})
export class PasswordService {


  private url='https://kapexpert.cloud:8087/api/v1/fast-gaz';


  readonly URL: string = this.url+ `/password`;

  constructor(private http: HttpClient) { }



  updatePassword$ = (passworsRequest: any) => <Observable<CustomResponse>>
    this.http
      .put<CustomResponse>(`${this.URL}/save-new-password`, passworsRequest)
      .pipe(tap());




  forgotPassword$ = (email: string) => <Observable<CustomResponse>>
    this.http
      .get<CustomResponse>(`${this.URL}/forgot-password?email=${email}`)
      .pipe(tap());
}
