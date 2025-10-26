import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgZorroModule } from '../../../../NgZorroModule';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { CustomerService } from '../../services/customer.service';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-search-car',
  standalone: true,
  imports: [
    CommonModule,
    NgZorroModule,
    ReactiveFormsModule, 
    NzSelectModule,
    NzFormModule,
    NzInputModule
  ],
  templateUrl: './search-car.component.html',
  styleUrl: './search-car.component.scss'
})
export class SearchCarComponent {

  isSpinning = false;
  searchCarForm! : FormGroup;
  listOfBrands = ["BMW", "AUDI", "FERRARI", "TESLA", "VOLVO", "TOYOTA", "HONDA", "FORD", "NISSAN", "HYUNDAI", "LEXUS", "KIA"];
  listOfType = ["Petrol", "Hybrid", "Diesel", "Electric", "CNG"];
  listOfColor = ["Red", "White", "Blue", "Black", "Orange", "Grey", "Silver"];
  listOfTransmission = ["Manual", "Automatic"];
  cars: any = [];

  constructor(
    private fb: FormBuilder,
    private service: CustomerService,
    private message: NzMessageService
  ) {
    this.searchCarForm = this.fb.group({
      brand: [null],
      type: [null],
      color: [null],
      transmission: [null]
    })
  }

searchCar() {
  this.isSpinning = true;
  this.cars = [];
  this.service.searchCar(this.searchCarForm.value).subscribe({
      next: (res) => {
          this.isSpinning = false;
          console.log(res);

          if (res.carDtoList && res.carDtoList.length > 0) {
              res.carDtoList.forEach((element: any) => {
                  element.processedImg = 'data:image/jpeg;base64,' + element.returnedImage;
                  this.cars.push(element);
              });
          } else {
              this.message.warning("No such car found", { nzDuration: 5000 });
          }
      },
      error: (err) => {
          this.isSpinning = false;
          this.message.error("An error occurred while searching for cars", { nzDuration: 5000 });
          console.error(err);
      }
  });
}

}
