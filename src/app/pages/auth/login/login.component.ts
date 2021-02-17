import { ErrorService } from './../../../core/services/error.service';
import { AuthService } from './../service/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { AuthModel } from '../model/auth.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  user = {} as AuthModel;
  signInForm: FormGroup;
  loading = new BehaviorSubject<boolean>(false);
  errors = new BehaviorSubject<any>([]);
  submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private errorService: ErrorService,
    private router: Router
  ) {}

  initSignInForm(): void {
    this.signInForm = this.formBuilder.group({
      username: [this.user.username, [Validators.required]],
      password: [
        this.user.password,
        Validators.compose([Validators.required, Validators.minLength(8)]),
      ],
    });
  }

  get formControl(): any {
    return this.signInForm.controls;
  }

  onSubmit(): void {
    this.submitted = true;
    if (this.signInForm.invalid) {
      return;
    }
    this.loading.next(true);

    this.authService.signIn(this.signInForm.value).subscribe(
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
    this.initSignInForm();
  }
}
