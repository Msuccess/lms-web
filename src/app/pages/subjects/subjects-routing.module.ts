import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddSubjectComponent } from './add-subject/add-subject.component';
import { SubjectsComponent } from './subjects.component';

const routes: Routes = [
  { path: '', component: SubjectsComponent },
  { path: 'list', component: SubjectsComponent },
  { path: 'add', component: AddSubjectComponent },
  { path: 'edit/:id', component: AddSubjectComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SubjectRoutingModule {}
