import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersClassComponent } from './users-class.component';
import { UserCLassRoutingModule } from './user-class-routing.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { NgbDatepickerModule } from '@ng-bootstrap/ng-bootstrap';
import { AddClassComponent } from './add-class/add-class.component';
import { AlertModule } from 'src/app/shared/components';

@NgModule({
  declarations: [UsersClassComponent, AddClassComponent],
  imports: [
    CommonModule,
    SharedModule,
    AlertModule,
    ReactiveFormsModule,
    FormsModule,
    UserCLassRoutingModule,
    NgbDatepickerModule,
    // DataTablesModule,
  ],
})
export class UsersClassModule {}
