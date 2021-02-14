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

  private filesControl = new FormControl(
    null,
    FileUploadValidators.filesLimit(2)
  );

  constructor(private formBuilder: FormBuilder) {}

  initCreateStudentForm(): void {
    this.addDocumentForm = this.formBuilder.group({
      title: [this.newDocument.title, Validators.required],
      subject: [this.newDocument.subject, Validators.required],
      description: [this.newDocument.description, Validators.required],
      relatedClass: [this.newDocument.relatedClass, Validators.required],
      document: this.filesControl,
    });
  }

  onSubmit(): void {
    this.submitted = true;
    if (this.addDocumentForm.invalid) {
      return;
    } else {
      console.log(this.addDocumentForm.value);
    }
  }

  get formControls(): any {
    return this.addDocumentForm.controls;
  }

  ngOnInit(): void {
    this.initCreateStudentForm();
  }
}
