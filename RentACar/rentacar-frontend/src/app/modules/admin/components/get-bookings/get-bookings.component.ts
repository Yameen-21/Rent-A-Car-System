import { Component } from '@angular/core';
import { AdminService } from '../../services/admin.service';
import { NgZorroModule } from '../../../../NgZorroModule';
import { CommonModule } from '@angular/common';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-get-bookings',
  standalone: true,
  imports: [
    NgZorroModule,
    CommonModule,
    NzTableModule
  ],
  templateUrl: './get-bookings.component.html',
  styleUrl: './get-bookings.component.scss'
})
export class GetBookingsComponent {

  isSpinning = false;
  bookedCars: any;

  constructor(
    private service: AdminService,
    private message: NzMessageService
  ) {
    this.getBookings();
   }

  getBookings() {
    this.isSpinning = true;
    this.service.getBookings().subscribe((res) => {
      console.log(res);
      this.isSpinning = false;
      this.bookedCars = res;
    })
  }

  changeBookingStatus(bookingId: number, status: string) {
    this.isSpinning = true;
    this.service.changeStatus(bookingId, status).subscribe((res) => {
      this.isSpinning = false;
      this.getBookings();
      this.message.success("Status changed successfully", { nzDuration: 5000 });
    }, error => {
      this.message.error("Something went wrong", { nzDuration: 5000 });
    })
  }

}
