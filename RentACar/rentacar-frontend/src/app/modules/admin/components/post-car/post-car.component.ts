import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { AdminService } from '../../services/admin.service';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { NzSelectComponent, NzOptionComponent } from 'ng-zorro-antd/select';
import { NzYearPickerComponent, NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NgZorroModule } from "../../../../NgZorroModule";



@Component({
  selector: 'app-post-car',
  standalone: true,
  imports: [
    NgZorroModule, 
    NzSelectComponent, 
    NzOptionComponent, 
    ReactiveFormsModule, 
    NzYearPickerComponent,
    NzDatePickerModule,
    CommonModule
  ],
  templateUrl: './post-car.component.html',
  styleUrl: './post-car.component.scss'
})
export class PostCarComponent {
  isSpinning: boolean = false;
  postCarForm! : FormGroup;
  selectedFile: File | null = null;
  imagePreview: string | ArrayBuffer | null = null; 
  listOfOption: Array<{ label: string; value: string}> = [];
  listOfBrands = ["BMW", "AUDI", "FERRARI", "TESLA", "VOLVO", "TOYOTA", "HONDA", "FORD", "NISSAN", "HYUNDAI", "LEXUS", "KIA"];
  listOfType = ["Petrol", "Hybrid", "Diesel", "Electric", "CNG"];
  listOfColor = ["Red", "White", "Blue", "Black", "Orange", "Grey", "Silver"];
  listOfTransmission = ["Manual", "Automatic"];

  constructor(private fb: FormBuilder,
    private adminService: AdminService,
    private router: Router,
    private notification: NzNotificationService,
  ) { }

  ngOnInit() {
    this.postCarForm = this.fb.group({
      name: [null, Validators.required],
      brand: [null, Validators.required],
      type: [null, Validators.required],
      transmission: [null, Validators.required],
      color: [null, Validators.required],
      price: [null, Validators.required],
      description: [null, Validators.required],
      modelYear: [null, Validators.required]
    })
  }

  postCar() {
    console.log(this.postCarForm.value);
    const formData: FormData = new FormData();
    formData.append('image', this.selectedFile!);
    formData.append('brand', this.postCarForm.get('brand')!.value); 
    formData.append('name', this.postCarForm.get('name')!.value);
    formData.append('type', this.postCarForm.get('type')!.value);
    formData.append('color', this.postCarForm.get('color')!.value);
    formData.append('modelYear', this.postCarForm.get('modelYear')!.value);
    formData.append('transmission', this.postCarForm.get('transmission')!.value);
    formData.append('description', this.postCarForm.get('description')!.value);
    formData.append('price', this.postCarForm.get('price')!.value);  
    this.adminService.postCar(formData).subscribe((res) => {
        console.log(res);
        this.notification.success('Success', 'Car posted successfully', { nzDuration: 5000 });
        this.router.navigateByUrl('/admin/dashboard');
      }, (error) => {
        this.notification.error('ERROR', 'Error while posting car', { nzDuration: 5000 });
      });
  }

  onFileSelected(event: any){
    this.selectedFile = event.target.files[0];
    this.previewImage();
  }

  previewImage() {
    if (this.selectedFile){
      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreview = reader.result;
      }
      reader.readAsDataURL(this.selectedFile);
      }
  }

}

