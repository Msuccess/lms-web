import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddClassComponent } from './add-class/add-class.component';
import { UsersClassComponent } from './users-class.component';

const routes: Routes = [
  { path: '', component: UsersClassComponent },
  { path: 'list', component: UsersClassComponent },
  { path: 'add', component: AddClassComponent },
  { path: 'edit/:id', component: AddClassComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserCLassRoutingModule {}
