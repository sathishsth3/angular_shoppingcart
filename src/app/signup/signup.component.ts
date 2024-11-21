import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import { AuthService } from '../service/auth/auth.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import {MatInputModule} from '@angular/material/input';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [ 
    MatButtonModule, MatCardModule, MatFormFieldModule,
    MatIconModule, ReactiveFormsModule, MatInputModule,
    JsonPipe
  ],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {

  private formBuilder = inject(FormBuilder);
  private authService = inject(AuthService);
  private snackBar = inject(MatSnackBar);
  private router = inject(Router);

  signupForm!: FormGroup;
  passwordVisibility: boolean = true;
  confirmPasswordVisibility: boolean = true;
  signupUser: boolean = true;

  ngOnInit() {

    this.signupForm = this.formBuilder.group({
      userName: [null, Validators.required],
      email: [null, [Validators.required, Validators.email]],
      password: [null, Validators.required],
      confirmPassword: [null, Validators.required]
    });

  }

  togglePassword() {
    this.passwordVisibility = !this.passwordVisibility;
  }

  toggleConfirmPassword() {
    this.confirmPasswordVisibility = !this.confirmPasswordVisibility;
  }

  toggleSignupUser() {
    this.signupUser = !this.signupUser;
  }

  signupCustomer() {
    console.log("customer");

    const password = this.signupForm.get('password')?.value;
    const confirmPassword = this.signupForm.get('confirmPassword')?.value;

    if(password != confirmPassword) {
      this.snackBar.open("Password does'nt match", "Close", { duration: 2000 });
      return;
    }

    return this.authService.signupCustomer(this.signupForm.value).subscribe((response) => {
      this.snackBar.open("Customer Signup Successfully", "Close", { duration: 2000 });
      this.router.navigate(['/login']);
    }, (error) => {
      this.snackBar.open("Customer Signup Failed", "Close", { duration: 2000 });
    })
  }

  signupAdmin() {

    const password = this.signupForm.get('password')?.value;
    const confirmPassword = this.signupForm.get('confirmPassword')?.value;

    if(password != confirmPassword) {
      this.snackBar.open("Password does'nt match", "Close", { duration: 2000 });
      return;
    }

    return this.authService.signupAdmin(this.signupForm.value).subscribe((response) => {
      this.snackBar.open("Admin Signup Successfully", "Close", { duration: 2000 });
      this.router.navigate(['/login']);
    }, (error) => {
      this.snackBar.open("Admin Signup Failed", "Close", { duration: 2000 });
    })
  }

}
