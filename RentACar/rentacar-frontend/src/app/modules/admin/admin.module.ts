import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { PostCarComponent } from './components/post-car/post-car.component';
import { NgZorroModule } from '../../NgZorroModule';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    NgZorroModule,
    AdminRoutingModule,
    AdminDashboardComponent,
    PostCarComponent,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class AdminModule { }
