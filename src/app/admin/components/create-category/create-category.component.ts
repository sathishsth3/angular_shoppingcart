import { AdminService } from './../../service/admin.service';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import {MatCardModule} from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatSnackBar } from '@angular/material/snack-bar';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';

@Component({
  selector: 'app-create-category',
  standalone: true,
  imports: [
    MatCardModule, MatFormFieldModule,
    ReactiveFormsModule, MatInputModule,
    MatButtonModule
  ],
  templateUrl: './create-category.component.html',
  styleUrl: './create-category.component.css'
})
export class CreateCategoryComponent {

  categoryForm!: FormGroup;

  private formBuilder = inject(FormBuilder);
  private adminService = inject(AdminService);
  private snackBar = inject(MatSnackBar);

  ngOnInit() {
    this.categoryForm = this.formBuilder.group({
      name: [null, Validators.required],
      description: [null, Validators.required]
    })
  }

  createCategory() {

    const category = this.categoryForm.value;
    this.adminService.createCategory(category).subscribe((response) => {
      if(response.categoryId != null) {
        this.snackBar.open("Category successfully created", "Close", { duration: 2000 });
      } else {
        this.categoryForm.markAllAsTouched();
      }
    }, (error) => {
      this.snackBar.open("Error", "Close", { duration: 2000 });
      //console.log(error);
    });
  }

}
