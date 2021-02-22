import { AddStudentComponent } from './add-student/add-student.component';
import { SharedModule } from '../../shared/shared.module';

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StudentRoutingModule } from './student-routing.module';
import { StudentComponent } from './student.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbDatepickerModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule } from '@angular/router';
import { SelectModule } from 'ng-select';

@NgModule({
  declarations: [StudentComponent, AddStudentComponent],
  imports: [
    CommonModule,
    RouterModule,
    StudentRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    FormsModule,
    NgbDatepickerModule,
    SelectModule,
  ],
})
export class StudentModule {}
