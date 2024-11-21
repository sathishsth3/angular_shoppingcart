import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';

export const routes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'signup', component: SignupComponent },
    //{ path: 'admin', loadComponent: () => import('./admin/admin.component').then(c => c.AdminComponent) },
    //{ path: 'customer', loadComponent: () => import('./customer/customer.component').then(c => c.CustomerComponent) }
    { path: 'admin', loadChildren: () => import('./admin/admin.routes').then(routes => routes.routes) },
    { path: 'customer', loadChildren: () => import('./customer/customer.routes').then(routes => routes.routes) }
];
