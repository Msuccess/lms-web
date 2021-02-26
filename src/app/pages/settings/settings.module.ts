import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SettingsRoutingModule } from './settings-routing.module';
import { SettingsComponent } from './settings.component';
import { ViewPersonalInfoComponent } from './personal-info/view-personal-info/view-personal-info.component';
import { UpdatePersonalInfoComponent } from './personal-info/update-personal-info/update-personal-info.component';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [
    SettingsComponent,
    ViewPersonalInfoComponent,
    UpdatePersonalInfoComponent,
  ],
  imports: [CommonModule, SharedModule, SettingsRoutingModule],
})
export class SettingsModule {}
