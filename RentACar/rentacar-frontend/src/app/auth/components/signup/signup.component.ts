import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { NgZorroModule } from '../../../NgZorroModule';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [RouterModule, CommonModule, NgZorroModule, ReactiveFormsModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})
export class SignupComponent {
  isSpinning: boolean = false;
  signupform! : FormGroup;

  constructor(private fb: FormBuilder,
     private authService: AuthService,
     private router: Router,
     private notification: NzNotificationService
    ) {}
  
  ngOnInit() {
    this.signupform = this.fb.group({
      email: [null, [Validators.required, Validators.email]],
      name: [null, [Validators.required]],
      password: [null, [Validators.required]],
      comfirmPassword: [null, [Validators.required, this.confirmationValidate]],
    })
  }

  confirmationValidate = (control: FormControl): { [s: string]: boolean } => {
    if (!control.value) {
      return { required: true};
    } else if (control.value !== this.signupform.controls['password'].value) {
      return { confirm: true, error: true};
    }
    return {};

  }

  signup() {
    console.log(this.signupform.value);
    this.authService.register(this.signupform.value).subscribe((res) => {
      console.log(res);
      this.notification.success('Success', 'Car posted successfully', { nzDuration: 5000 });
        this.router.navigateByUrl('/login');
      }, (error) => {
        this.notification.error('ERROR', 'Error while posting car', { nzDuration: 5000 });
    });
  }

}
