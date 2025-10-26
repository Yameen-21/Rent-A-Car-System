import { Component } from '@angular/core';
import { CustomerService } from '../../services/customer.service';
import { CommonModule } from '@angular/common';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NgZorroModule } from '../../../../NgZorroModule';
import { NzMessageService } from 'ng-zorro-antd/message';
import { RouterLink } from '@angular/router';


@Component({
  selector: 'app-customer-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    NzGridModule,
    NgZorroModule,
    RouterLink
  ],
  templateUrl: './customer-dashboard.component.html',
  styleUrl: './customer-dashboard.component.scss'
})
export class CustomerDashboardComponent {

  cars: any = [];

  constructor(
    private customerService: CustomerService,
    private message: NzMessageService
  ) { 
    this.getAllCars();
  }

  getAllCars() {
    this.customerService.getAllCars().subscribe((res: any[]) => {
      console.log(res);
      res.forEach((element: any) => {
        element.processedImg = 'data:image/jpeg;base64,' + element.returnedImage;
        this.cars.push(element);
      });
    })
  }

}
