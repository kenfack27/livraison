import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { Configuration } from '../model/configuration';
import { CustomResponse } from '../model/custom-response';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ConfigurationService {
  private url='https://kapexpert.cloud:8087/api/v1/fast-gaz';

  private readonly apiUrl = this.url + '/configuration';
  constructor(private http: HttpClient) { }

  // Fonction pour charger la configuration
  getConfiguration$ = () => <Observable<CustomResponse>>
    this.http.get<any>(this.apiUrl).pipe(
     
    );

  updateConfiguration(configuration: Configuration): Observable<CustomResponse> {
    return this.http.put<any>(this.apiUrl, configuration);
  }
}
