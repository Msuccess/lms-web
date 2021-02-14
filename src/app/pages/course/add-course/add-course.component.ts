import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl,
} from '@angular/forms';
import { FileUploadValidators } from '@iplab/ngx-file-upload';
import { BehaviorSubject } from 'rxjs';
import { AuthService } from '../../auth/service/auth.service';
import { CourseModule } from '../models/course.module';

@Component({
  selector: 'app-add-course',
  templateUrl: './add-course.component.html',
  styleUrls: ['./add-course.component.scss'],
})
export class AddCourseComponent implements OnInit {
  newCourse = {} as CourseModule;
  addCourseForm: FormGroup;
  submitted: boolean = false;
  loading = new BehaviorSubject<Boolean>(false);
  error = new BehaviorSubject<any>([]);

  private filesControl = new FormControl(
    null,
    FileUploadValidators.filesLimit(2)
  );

  constructor(private formBuilder: FormBuilder) {}

  initCreateStudentForm(): void {
    this.addCourseForm = this.formBuilder.group({
      title: [this.newCourse.title, Validators.required],
      subject: [this.newCourse.subject, Validators.required],
      description: [this.newCourse.description, Validators.required],
      relatedClass: [this.newCourse.relatedClass, Validators.required],
      course: this.filesControl,
    });
  }

  onSubmit(): void {
    this.submitted = true;
    if (this.addCourseForm.invalid) {
      return;
    } else {
      console.log(this.addCourseForm.value);
    }
  }

  get formControls(): any {
    return this.addCourseForm.controls;
  }

  ngOnInit(): void {
    this.initCreateStudentForm();
  }
}
