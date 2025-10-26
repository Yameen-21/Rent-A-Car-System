import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminService } from '../../services/admin.service';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NgZorroModule } from '../../../../NgZorroModule';
import { NzMessageService } from 'ng-zorro-antd/message';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    NzGridModule,
    NgZorroModule,
    RouterLink
  ],
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.scss'
})
export class AdminDashboardComponent {

  cars: any = [];

  constructor(
    private adminService: AdminService,
    private message: NzMessageService
  ) { 
    this.getAllCars();
  }

  getAllCars() {
    this.adminService.getAllCars().subscribe((res: any[]) => {
      console.log(res);
      res.forEach((element: any) => {
        element.processedImg = 'data:image/jpeg;base64,' + element.returnedImage;
        this.cars.push(element);
      });
    })
  }

  deleteCar(id: number) {
    this.cars = [];
    this.adminService.deleteCar(id).subscribe((res) => {
      this.message.success("Car deleted successfully", { nzDuration: 5000 });
      this.getAllCars();
    })
  }

}
