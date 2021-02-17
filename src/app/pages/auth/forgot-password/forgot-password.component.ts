import { ErrorService } from './../../../core/services/error.service';
import { NotificationService } from './../../../core/notification/notification.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../service/auth.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import { AuthModel } from '../model/auth.model';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss'],
})
export class ForgotPasswordComponent implements OnInit {
  user = {} as AuthModel;
  resetPasswordForm: FormGroup;
  loading = new BehaviorSubject<boolean>(false);
  errors = new BehaviorSubject<any>([]);
  submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private auth: AuthService,
    private errorService: ErrorService,
    private router: Router,
    private notify: NotificationService
  ) {}

  // initResetPasswordForm(): void {
  //   this.resetPasswordForm = this.formBuilder.group({
  //     email: [
  //       this.user.email,
  //       Validators.compose([Validators.required, Validators.email]),
  //     ],
  //   });
  // }

  // get formControl(): any {
  //   return this.resetPasswordForm.controls;
  // }

  // onSubmit(): void {
  //   this.submitted = true;
  //   if (this.resetPasswordForm.invalid) {
  //     return;
  //   }
  //   this.loading.next(true);

  //   this.auth.resetPassword(this.resetPasswordForm.value).subscribe(
  //     (res: any) => {
  //       this.loading.next(false);
  //       this.notify.success(
  //         'Reset Link Sent',
  //         'Check your email password reset instructions.'
  //       );
  //       this.router.navigate(['/auth/emailsent'], {
  //         queryParams: {
  //           email: this.resetPasswordForm.value.email,
  //           mode: 'resetPassword',
  //         },
  //       });
  //     },
  //     (error: any) => {
  //       console.log('Error', error);
  //       this.loading.next(false);
  //       // this.errors.next(this.errorService.getErrors(error.error));
  //     }
  //   );
  // }

  // closeAlert(): any {
  //   this.errors.next([]);
  // }

  ngOnInit(): void {
    // this.initResetPasswordForm();
  }
}
