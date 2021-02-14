import { AddDocumentComponent } from './add-document/add-document.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DocumentComponent } from './document.component';

const routes: Routes = [
  { path: '', component: DocumentComponent },
  { path: 'list', component: DocumentComponent },
  { path: 'add', component: AddDocumentComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DocumentRoutingModule {}
