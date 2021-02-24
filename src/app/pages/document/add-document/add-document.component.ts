import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  FormBuilder,
  Validators,
} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

import { BehaviorSubject } from 'rxjs';
import { UserClassService } from '../../users-class/service/user-class.service';
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
  files: File[] = [];
  classList: any[];
  setDbDocumentUrl: string;

  constructor(
    private classService: UserClassService,
    private formBuilder: FormBuilder,
    private documentService: DocumentService,
    private toastrService: ToastrService
  ) {}

  initCreateStudentForm(): void {
    this.addDocumentForm = this.formBuilder.group({
      title: [this.newDocument.title, Validators.required],
      subject: [this.newDocument.subject, Validators.required],
      description: [this.newDocument.description, Validators.required],
      userClass: [this.newDocument.userClass, Validators.required],
      documentUrl: [this.newDocument.documentUrl],
    });
  }

  onSubmit(): void {
    this.submitted = true;
    if (this.addDocumentForm.invalid) {
      console.log(this.addDocumentForm.value);
      return;
    } else {
      this.uploadDocument();
      if (
        typeof this.setDbDocumentUrl !== 'object' &&
        this.setDbDocumentUrl !== null
      ) {
        //Save document in DB
        this.addDocumentForm.patchValue({ documentUrl: this.setDbDocumentUrl });
        this.documentService
          .uploadDocument(this.addDocumentForm.value)
          .subscribe(
            (res: any) => {
              this.toastrService.success(
                'Success',
                'Document Added Successfully'
              );
            },
            (error: any) => {
              this.toastrService.error(
                'Error',
                'Sorry Something Went Wrong Whiles Uploading Document'
              );
              console.log(error);
            }
          );
      }
    }
  }

  uploadDocument() {
    const formData = new FormData();
    for (var i = 0; i < this.files.length; i++) {
      formData.append('file', this.files[0]);
    }
    this.documentService.uploadDocument(formData).subscribe(
      (res: any) => {
        this.setDbDocumentUrl = res.data;
      },
      (error: any) => {
        this.toastrService.error(
          'Error',
          'Sorry Something Went Wrong Whiles Uploading Document'
        );
        console.log(error);
      }
    );
  }

  get formControls(): any {
    return this.addDocumentForm.controls;
  }

  onSelect(event) {
    console.log(event);
    this.files.push(...event.addedFiles);
  }

  onRemove(event) {
    console.log(event);
    this.files.splice(this.files.indexOf(event), 1);
  }

  getAllClasses() {
    this.classService.getAllClasses().subscribe(
      (res: any) => {
        this.classList = res.data;
        console.log(this.classList);
      },
      (error: any) => {
        this.toastrService.error(
          'Error',
          'Sorry Something Went Wrong Whiles Fetching Data'
        );
      }
    );
  }

  ngOnInit(): void {
    this.getAllClasses();
    this.initCreateStudentForm();
  }
}
