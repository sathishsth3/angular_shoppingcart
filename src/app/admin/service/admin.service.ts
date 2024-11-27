import { SaveUserService } from './../../service/saveUser/save-user.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminService {


  baseUrl: string = "http://localhost:8080";

  private httpClient = inject(HttpClient);
  private saveUserService = inject(SaveUserService);

  constructor() { }

  createCategory(categoryRequest: any): Observable<any> {
    return this.httpClient.post(`${this.baseUrl}/api/admin/create_category`, categoryRequest, { headers: this.createHeaders() })
  }

  getAllCategories(): Observable<any> {
    return this.httpClient.get(`${this.baseUrl}/api/admin`, { headers: this.createHeaders() })
  }

  addProduct(formData: FormData): Observable<any> {
    return this.httpClient.post(`${this.baseUrl}/api/admin/product`, formData, { headers: this.createHeaders() })
  }

  getAllProducts(): Observable<any> {
    return this.httpClient.get(`${this.baseUrl}/api/admin/products`, { headers: this.createHeaders() })
  }

  private createHeaders(): HttpHeaders {

    const token =  this.saveUserService.getToken();
    let headers = new HttpHeaders();
    headers = headers.set('Authorization', 'Bearer '+token)
    return headers;

  }
}
