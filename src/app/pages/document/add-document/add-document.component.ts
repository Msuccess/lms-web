import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  FormBuilder,
  Validators,
} from '@angular/forms';
import { FileUploadValidators } from '@iplab/ngx-file-upload';
import { BehaviorSubject } from 'rxjs';
import { DocumentModel } from '../models/document.model';
import { DocumentService } from '../services/document.service';

@Component({
  selector: 'app-add-document',
  templateUrl: './add-document.component.html',
  styleUrls: ['./add-document.component.scss'],
})
export class AddDocumentComponent implements OnInit {
  newDocument = {} as DocumentModel;
  addDocumentForm: FormGroup;
  submitted: boolean = false;
  loading = new BehaviorSubject<Boolean>(false);
  error = new BehaviorSubject<any>([]);
  documentData: File = null;

  private fileUploadControl = new FormControl(
    null,
    FileUploadValidators.filesLimit(1)
  );

  constructor(
    private formBuilder: FormBuilder,
    private documentService: DocumentService
  ) {}

  initCreateStudentForm(): void {
    this.addDocumentForm = this.formBuilder.group({
      title: [this.newDocument.title, Validators.required],
      subject: [this.newDocument.subject, Validators.required],
      description: [this.newDocument.description, Validators.required],
      relatedClass: [this.newDocument.relatedClass, Validators.required],
      // document: [this.fileUploadControl, Validators.required],
    });
  }

  onSubmit(): void {
    this.submitted = true;
    if (this.addDocumentForm.invalid) {
      return;
    } else {
      console.log(this.addDocumentForm.value);
      const formData = new FormData();
      formData.append('file', this.addDocumentForm.get('document').value);
      this.documentService.uploadDocument(formData).subscribe((res) => {
        console.log(res);
        alert('SUCCESS !!');
      });
    }
  }

  get formControls(): any {
    return this.addDocumentForm.controls;
  }

  ngOnInit(): void {
    this.initCreateStudentForm();
  }
}
