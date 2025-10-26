import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomerService } from '../../services/customer.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NgZorroModule } from '../../../../NgZorroModule';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { StorageService } from '../../../../auth/services/storage/storage.service';

@Component({
  selector: 'app-book-car',
  standalone: true,
  imports: [
    CommonModule,
    NzGridModule,
    NgZorroModule,
    FormsModule,
    ReactiveFormsModule,
    NzDatePickerModule
  ],
  templateUrl: './book-car.component.html',
  styleUrl: './book-car.component.scss'
})
export class BookCarComponent {

  car: any;
  carId!: number;
  bookACarForm!: FormGroup;
  isSpinning = false;
  dateFormat = "yyyy-MM-dd";

  constructor(
    private customerService: CustomerService,
    private message: NzMessageService,
    private activated: ActivatedRoute,
    private fb: FormBuilder
  ) { 
    this.carId = this.activated.snapshot.params["id"];
    this.bookACarForm = this.fb.group({
      fromDate: [null, Validators.required],
      toDate: [null, Validators.required]
    })
    this.getCarById(); 
  }

  getCarById() {
    this.customerService.getCarById(this.carId).subscribe((res: any) => {
      res.processedImg = 'data:image/jpeg;base64,' + res.returnedImage;
      this.car = res;
    })
  }

  bookCar(formData: any) {
    this.isSpinning = true;
    let obj = {
      fromDate:formData.fromDate,
      toDate:formData.toDate,
      userId: StorageService.getUserId()
    }
    this.customerService.bookACar(this.carId, obj).subscribe((res) => {
      this.isSpinning = false;
      this.message.success("Car booked successfully", { nzDuration: 5000 });
    }, error => {
      this.message.error("Something went wrong", { nzDuration: 5000 });
    })
  }

}
