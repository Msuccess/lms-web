import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject } from 'rxjs';
import { ErrorService } from 'src/app/core/services/error.service';
import { AuthModel } from '../../../model/auth.model';
import { AuthService } from '../../../service/auth.service';

@Component({
  selector: 'app-teacher-sign-up',
  templateUrl: './teacher-sign-up.component.html',
  styleUrls: ['./teacher-sign-up.component.scss'],
})
export class TeacherSignUpComponent implements OnInit {
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
      role: 'teacher',
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
