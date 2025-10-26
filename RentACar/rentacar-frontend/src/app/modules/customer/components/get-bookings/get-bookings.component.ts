import { Component } from '@angular/core';
import { CustomerService } from '../../services/customer.service';
import { NgZorroModule } from '../../../../NgZorroModule';
import { CommonModule } from '@angular/common';
import { NzTableModule } from 'ng-zorro-antd/table';

@Component({
  selector: 'app-get-bookings',
  standalone: true,
  imports: [
    CommonModule,
    NgZorroModule,
    NzTableModule
  ],
  templateUrl: './get-bookings.component.html',
  styleUrl: './get-bookings.component.scss'
})
export class GetBookingsComponent {

  isSpinning = false;
  bookedCars: any;

  constructor(private service: CustomerService) {
    this.getBookings();
   }

  getBookings() {
    this.isSpinning = true;
    this.service.getBookingsByUserId().subscribe((res) => {
      console.log(res);
      this.isSpinning = false;
      this.bookedCars = res;
    })
  }

}
