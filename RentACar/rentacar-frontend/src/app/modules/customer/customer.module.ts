import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CustomerRoutingModule } from './customer-routing.module';
import { CustomerDashboardComponent } from './components/customer-dashboard/customer-dashboard.component';
import { NgZorroModule } from '../../NgZorroModule';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    CustomerRoutingModule,
    CustomerDashboardComponent,
    NgZorroModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class CustomerModule { }
