import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DocumentRoutingModule } from './document-routing.module';
import { DocumentComponent } from './document.component';
import { AddDocumentComponent } from './add-document/add-document.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { FileUploadModule } from '@iplab/ngx-file-upload';
import { NgbDatepickerModule } from '@ng-bootstrap/ng-bootstrap';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [DocumentComponent, AddDocumentComponent],
  imports: [
    CommonModule,
    DocumentRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    FormsModule,
    NgbDatepickerModule,
    FileUploadModule,
  ],
})
export class DocumentModule {}
