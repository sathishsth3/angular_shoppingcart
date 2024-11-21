import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SaveUserService {

  TOKEN: string = "ecom_token";
  USER: string = "ecom_user";

  public saveToken(token: string): void {
    localStorage.removeItem(this.TOKEN);
    localStorage.setItem(this.TOKEN, token);
  }

  public saveUser(user: any): void {
    localStorage.removeItem(this.USER);
    localStorage.setItem(this.USER, JSON.stringify(user));
  }

  public getToken(): string {
    const token = localStorage.getItem(this.TOKEN);
    if(token == null) {
      return '';
    }
    return token;
  }

  public getUser(): any {
    const user = localStorage.getItem(this.USER);
    if(user == null) {
      return '';
    }
    return JSON.parse(user);
  }

  public getUserId(): string {
    const user = this.getUser();
    if(user == null) {
      return '';
    }
    return user.id;
  }

  public getUserRole(): string {
    const user = this.getUser();
    if(user == null) {
      return '';
    }
    return user.role;
  }

  public isAdminLogedIn(): boolean {
    const role = this.getUserRole();
    if(role == null) {
      return false;
    }
    return role == 'ADMIN'; 
  }

  public isCustomerLogedIn(): boolean {
    const role = this.getUserRole();
    if(role == null) {
      return false;
    }
    return role == 'CUSTOMER'; 
  }

  public signout() {
    localStorage.removeItem(this.TOKEN);
    localStorage.removeItem(this.USER);
  }

}
