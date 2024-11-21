import { Component, inject } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { SaveUserService } from './service/saveUser/save-user.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet, MatToolbarModule, MatButtonModule,
    RouterLink, MatIconModule, CommonModule
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {

  title = 'shopping_cart_web';

  private saveUserService = inject(SaveUserService);
  private router = inject(Router);

  isAdminLogedIn: boolean = this.saveUserService.isAdminLogedIn();
  isCustomerLogedIn: boolean = this.saveUserService.isCustomerLogedIn();

  ngOnInit() {
    this.router.events.subscribe((response) => {
      this.isAdminLogedIn = this.saveUserService.isAdminLogedIn();
      this.isCustomerLogedIn = this.saveUserService.isCustomerLogedIn();
    });
  }

  logout() {
    this.saveUserService.signout();
    this.router.navigate(['/login']);
  }

}
