import { ErrorService } from './../../../../../core/services/error.service';
import { Component, Input, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthModel } from '../../../model/auth.model';
import { Router } from '@angular/router';
import { AuthService } from '../../../service/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-individual-sign-up',
  templateUrl: './individual-sign-up.component.html',
  styleUrls: ['./individual-sign-up.component.scss'],
})
export class IndividualSignUpComponent implements OnInit {
  user = {} as AuthModel;
  signUpForm: FormGroup;
  submitted = false;
  loading = new BehaviorSubject<boolean>(false);
  errors = new BehaviorSubject<any>([]);
  simpleOption = [];
  constructor(
    private auth: AuthService,
    private errorService: ErrorService,
    private router: Router,
    private formBuilder: FormBuilder,
    private toastrService: ToastrService
  ) {}

  initSignUpIndividualForm(): void {
    this.signUpForm = this.formBuilder.group({
      fullName: [this.user.fullName, Validators.required],
      userClass: [this.user.class],
      username: [this.user.username, Validators.required],
      email: [
        this.user.email,
        Validators.compose([Validators.required, Validators.email]),
      ],
      phoneNumber: [this.user.phoneNumber, Validators.required],
      password: [
        this.user.password,
        Validators.compose([Validators.required, Validators.minLength(8)]),
      ],
      gender: [this.user.gender],
      dateOfBirth: [this.user.dateOfBirth],
      role: 'student',
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

    this.auth.signUp(this.signUpForm.value).subscribe(
      (res: any) => {
        this.toastrService.success('Success', 'Registered Successfully');
        this.loading.next(false);
        this.router.navigate(['/auth/login']);
      },
      (error: any) => {
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
    this.initSignUpIndividualForm();
  }
}
