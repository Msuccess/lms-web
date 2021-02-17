import { Router } from '@angular/router';
import { ErrorService } from './../../../../../core/services/error.service';
import { AuthService } from './../../../service/auth.service';
import { AuthModel } from './../../../model/auth.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Location } from '@angular/common';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-institution-sign-up',
  templateUrl: './institution-sign-up.component.html',
  styleUrls: ['./institution-sign-up.component.scss'],
})
export class InstitutionSignUpComponent implements OnInit {
  user = {} as AuthModel;
  signUpForm: FormGroup;
  submitted = false;
  loading = new BehaviorSubject<boolean>(false);
  errors = new BehaviorSubject<any>([]);

  constructor(
    private authService: AuthService,
    private errorService: ErrorService,
    private router: Router,
    private formBuilder: FormBuilder,
    private location: Location,
    private toastrService: ToastrService
  ) {}

  initSignUpForm(): void {
    this.signUpForm = this.formBuilder.group({
      fullName: [this.user.fullName, Validators.required],
      username: [this.user.username, Validators.required],
      email: [
        this.user.email,
        Validators.compose([Validators.required, Validators.email]),
      ],
      phoneNumber: [
        this.user.phoneNumber,
        Validators.compose([Validators.required, Validators.minLength(8)]),
      ],
      password: [
        this.user.password,
        Validators.compose([Validators.required, Validators.minLength(8)]),
      ],
      role: ['institution'],
    });
  }

  get formControl(): any {
    return this.signUpForm.controls;
  }

  onSubmit(): void {
    this.submitted = true;
    if (this.signUpForm.invalid) {
      return;
    }
    this.loading.next(true);
    console.log(this.signUpForm.value);
    this.authService.signUp(this.signUpForm.value).subscribe(
      (res: any) => {
        this.loading.next(false);
        this.toastrService.success('Success', 'Registered Successfully');
        this.router.navigate(['/auth/login']);
      },
      (error: any) => {
        console.log(error);
        this.loading.next(false);
        this.toastrService.error('Error', 'Review the errors on this page ');
        this.errors.next(this.errorService.getErrors(error.error));
      }
    );
  }

  closeAlert(): any {
    this.errors.next([]);
  }

  ngOnInit(): void {
    this.initSignUpForm();
  }

  goBack(): void {
    this.location.back();
  }
}
