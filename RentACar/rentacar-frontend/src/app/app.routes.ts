import { Routes } from '@angular/router';
import { LoginComponent } from './auth/components/login/login.component';
import { SignupComponent } from './auth/components/signup/signup.component';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/login' },
  { path: 'login', component: LoginComponent },  
  { path: 'register', component: SignupComponent }, 
  { path: 'admin', loadChildren: () => import("./modules/admin/admin.module").then(m => m.AdminModule) },
  { path: 'customer', loadChildren: () => import("./modules/customer/customer.module").then(c => c.CustomerModule) }
];
