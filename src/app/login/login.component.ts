import { SaveUserService } from './../service/saveUser/save-user.service';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import {MatCardModule} from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from '../service/auth/auth.service';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatInputModule} from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ 
    MatCardModule, MatFormFieldModule, MatSnackBarModule, 
    ReactiveFormsModule, MatInputModule, MatIconModule,
    MatButtonModule, RouterLink, CommonModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  private authService = inject(AuthService);
  private formBuilder = inject(FormBuilder);
  private saveUserService = inject(SaveUserService);
  private snackBar = inject(MatSnackBar);
  private router = inject(Router);

  passwordVisibility: boolean = true;
  loginForm!: FormGroup;

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required]]
    });
  }

  loginSubmit() {
      this.authService.loginUser(this.loginForm.value).subscribe((response) => {
      //this.snackBar.open("Login Success", "Close", { duration: 2000 });
      //console.log(JSON.stringify(response.body));
      this.saveUserService.saveToken(response.body.token);
      this.saveUserService.saveUser({id: response.body.id, role: response.body.role});
      if(this.saveUserService.getUserRole() == 'ADMIN') {
        this.router.navigate(['/admin/dashboard']);
      } else if(this.saveUserService.getUserRole() == 'CUSTOMER') {
        this.router.navigate(['/customer/dashboard']);
      }
    }, (error) => {
      this.snackBar.open("Bad credential", "Close", { duration: 2000 }); 
    });
  }

  togglePassword() {
    this.passwordVisibility = !this.passwordVisibility;
  }

}
