import { ErrorService } from './../../../../../core/services/error.service';
import { Component, Input, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthModel } from '../../../model/auth.model';
import { Router } from '@angular/router';
import { AuthService } from '../../../service/auth.service';

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
    private formBuilder: FormBuilder
  ) {}

  initSignUpIndividualForm(): void {
    this.signUpForm = this.formBuilder.group({
      fullName: [this.user.fullName, Validators.required],
      class: [this.user.class],
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

    this.auth.signin(this.signUpForm.value).subscribe(
      (res: any) => {
        this.loading.next(false);
        this.router.navigate(['/app/dashboard']);
      },
      (error: any) => {
        this.loading.next(false);
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
