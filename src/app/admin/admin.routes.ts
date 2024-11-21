import { Component } from "@angular/core";
import { DashboardComponent } from "./components/dashboard/dashboard.component";
import { Routes } from "@angular/router";

export const routes: Routes = [
    { path: 'dashboard', component: DashboardComponent }
];