import { AddTeacherComponent } from './add-teacher/add-teacher.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TeacherComponent } from './teacher.component';

const routes: Routes = [
  { path: '', component: TeacherComponent },
  { path: 'list', component: TeacherComponent },
  { path: 'add', component: AddTeacherComponent },
  { path: 'edit/:id', component: AddTeacherComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TeacherRoutingModule {}
