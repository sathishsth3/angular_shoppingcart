
import { routes } from './../../app.routes';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  baseUrl: string = "http://localhost:8080"

  constructor(private httpClient: HttpClient) { }

  signupCustomer(signupRequest: any): Observable<any> {
    return this.httpClient.post(`${this.baseUrl}/signup-customer`, signupRequest);
  }

  signupAdmin(signupRequest: any): Observable<any> {
    return this.httpClient.post(`${this.baseUrl}/signup-admin`, signupRequest);
  }

  loginUser(loginForm: any): Observable<any> {
    const headers = new HttpHeaders();
    headers.set('content-type', 'application/json');
    return this.httpClient.post(`${this.baseUrl}/authenticate`, loginForm, { headers, observe: 'response', responseType: 'json' });
  }

}
