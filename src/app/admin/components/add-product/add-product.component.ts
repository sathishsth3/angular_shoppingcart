import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { AdminService } from '../../service/admin.service';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-product',
  standalone: true,
  imports: [
    ReactiveFormsModule, MatFormFieldModule,
    MatSelectModule, MatInputModule,
    MatButtonModule, MatIconModule
  ],
  templateUrl: './add-product.component.html',
  styleUrl: './add-product.component.css'
})
export class AddProductComponent {

  productForm!: FormGroup;
  categoryLists: any = [];
  selectedFile!: any;
  imagePreview!: File | string;

  private formBuilder = inject(FormBuilder);
  private adminService = inject(AdminService);
  private snackBar = inject(MatSnackBar);
  private router = inject(Router);

  ngOnInit(): void {

    this.productForm = this.formBuilder.group({
      categoryId: [null, Validators.required],
      productName: [null, Validators.required],
      price: [null, Validators.required],
      description: [null, Validators.required],
    });

    this.getAllCategories();

  }

  getAllCategories() {
    this.adminService.getAllCategories().subscribe((response) => {
      this.categoryLists = response;
    });
  }

  productSubmit() {

    const formData = new FormData();
    formData.append("image", this.selectedFile);
    formData.append("categoryId", this.productForm.get('categoryId')?.value);
    formData.append("productName", this.productForm.get('productName')?.value);
    formData.append("price", this.productForm.get('price')?.value);
    formData.append("description", this.productForm.get('description')?.value);

    if(formData.get("image") == null || formData.get("image") == "undefined") {

      this.snackBar.open("Upload image & try again", "Close", { duration: 2000 });
     
    } else {
      
      this.adminService.addProduct(formData).subscribe((response) => {
          this.snackBar.open("Product added successfully", "Close", { duration: 2000 });
          this.router.navigate(['/admin/dashboard']);
      }, (error) => {
        //this.snackBar.open("Failed to add product", "Close", { duration: 2000 });
      })

    }

  }

  onFileSelect(event: any) {

    this.selectedFile = event.target.files[0];

    const reader = new FileReader();
    reader.onload = (e: any) => {
      this.imagePreview = e.target.result as string;
    }
    reader.readAsDataURL(this.selectedFile);
  }

}
