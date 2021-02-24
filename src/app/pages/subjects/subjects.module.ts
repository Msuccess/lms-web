import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SubjectRoutingModule } from './subjects-routing.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AlertModule } from 'src/app/shared/components';
import { SharedModule } from 'src/app/shared/shared.module';
import { AddSubjectComponent } from './add-subject/add-subject.component';
import { SubjectsComponent } from './subjects.component';

@NgModule({
  declarations: [AddSubjectComponent, SubjectsComponent],
  imports: [
    CommonModule,
    SharedModule,
    AlertModule,
    ReactiveFormsModule,
    FormsModule,
    SubjectRoutingModule,
  ],
})
export class SubjectsModule {}
