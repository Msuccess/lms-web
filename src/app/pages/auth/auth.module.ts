import { IndividualSignUpComponent } from './register/partials/individual-sign-up/individual-sign-up.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { AuthComponent } from './auth.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { AlertModule } from 'src/app/shared/components';
import { NgbDatepickerModule, NgbNavModule } from '@ng-bootstrap/ng-bootstrap';
import { SharedModule } from 'src/app/shared/shared.module';
import { SelectModule } from 'ng-select';
import { InstitutionSignUpComponent } from './register/partials/institution-sign-up/institution-sign-up.component';

@NgModule({
  imports: [
    CommonModule,
    AuthRoutingModule,
    AlertModule,
    NgbDatepickerModule,
    ReactiveFormsModule,
    FormsModule,
    SharedModule,
    SelectModule,
    NgbNavModule,
  ],
  declarations: [
    AuthComponent,
    RegisterComponent,
    LoginComponent,
    ForgotPasswordComponent,
    ResetPasswordComponent,
    InstitutionSignUpComponent,
    IndividualSignUpComponent,
  ],
})
export class AuthModule {}
