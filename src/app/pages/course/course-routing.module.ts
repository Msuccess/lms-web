import { AddCourseComponent } from './add-course/add-course.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CourseComponent } from './course.component';

const routes: Routes = [
  { path: '', component: CourseComponent },
  { path: 'list', component: CourseComponent },
  { path: 'add', component: AddCourseComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CourseRoutingModule {}
