import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CourseRoutingModule } from './course-routing.module';
import { CourseComponent } from './course.component';
import { AddCourseComponent } from './add-course/add-course.component';
import { CourseGridComponent } from './partials/course-grid/course-grid.component';
import { CourseListComponent } from './partials/course-list/course-list.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { NgbDatepickerModule } from '@ng-bootstrap/ng-bootstrap';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { FileUploadModule } from '@iplab/ngx-file-upload';

@NgModule({
  declarations: [
    CourseComponent,
    AddCourseComponent,
    CourseGridComponent,
    CourseListComponent,
  ],
  imports: [
    CommonModule,
    CourseRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    FormsModule,
    NgbDatepickerModule,
    FileUploadModule,
  ],
})
export class CourseModule {}
