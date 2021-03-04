import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SettingsRoutingModule } from './settings-routing.module';
import { SettingsComponent } from './settings.component';
import { ViewPersonalInfoComponent } from './personal-info/view-personal-info/view-personal-info.component';
import { UpdatePersonalInfoComponent } from './personal-info/update-personal-info/update-personal-info.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { ViewContactInfoComponent } from './contact-info/view-contact-info/view-contact-info.component';
import { UpdateContactInfoComponent } from './contact-info/update-contact-info/update-contact-info.component';
import { ViewChangePasswordComponent } from './change-password/view-change-password/view-change-password.component';
import { UpdatePasswordComponent } from './change-password/update-password/update-password.component';

@NgModule({
  declarations: [
    SettingsComponent,
    ViewPersonalInfoComponent,
    UpdatePersonalInfoComponent,
    ViewContactInfoComponent,
    UpdateContactInfoComponent,
    ViewChangePasswordComponent,
    UpdatePasswordComponent,
  ],
  imports: [CommonModule, SharedModule, SettingsRoutingModule],
})
export class SettingsModule {}
