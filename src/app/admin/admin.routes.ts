import { Component } from "@angular/core";
import { DashboardComponent } from "./components/dashboard/dashboard.component";
import { Routes } from "@angular/router";
import { CreateCategoryComponent } from "./components/create-category/create-category.component";
import { AddProductComponent } from "./components/add-product/add-product.component";

export const routes: Routes = [
    { path: 'dashboard', component: DashboardComponent },
    { path: 'category', component: CreateCategoryComponent },
    { path: 'product', component: AddProductComponent }
];