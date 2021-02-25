import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject } from 'rxjs';
import { SubjectsService } from '../../subjects/services/subjects.service';
import { UserClassService } from '../../users-class/service/user-class.service';
import { CourseModel } from '../models/course.model';
import { CourseService } from './services/course.service';

@Component({
  selector: 'app-add-course',
  templateUrl: './add-course.component.html',
  styleUrls: ['./add-course.component.scss'],
})
export class AddCourseComponent implements OnInit {
  newCourse = {} as CourseModel;
  addCourseForm: FormGroup;
  submitted: boolean = false;
  loading = new BehaviorSubject<Boolean>(false);
  error = new BehaviorSubject<any>([]);
  files: File[] = [];
  classList: any[];
  subjectList: any[];

  constructor(
    private formBuilder: FormBuilder,
    private classService: UserClassService,
    private toastrService: ToastrService,
    private subjectService: SubjectsService,
    private courseService: CourseService
  ) {}

  initCreateCourseForm(): void {
    this.addCourseForm = this.formBuilder.group({
      title: [this.newCourse.title, Validators.required],
      subject: [this.newCourse.subject, Validators.required],
      description: [this.newCourse.description, Validators.required],
      userClass: [this.newCourse.relatedClass, Validators.required],
      courseUrl: [this.newCourse.courseUrl],
    });
  }

  onSubmit() {
    this.submitted = true;
    if (this.addCourseForm.invalid) {
      console.log(this.addCourseForm.value);
      return;
    } else {
      this.uploadCourse();
    }
  }

  uploadCourse() {
    this.toastrService.info('Info', 'Uploading Course.... ');
    const formData = new FormData();
    for (var i = 0; i < this.files.length; i++) {
      formData.append('file', this.files[0]);
    }
    this.courseService.uploadCourse(formData).subscribe(
      (res: any) => {
        this.addCourseForm.patchValue({ courseUrl: res.data.filename });
        this.courseService.createCourse(this.addCourseForm.value).subscribe(
          (res: any) => {
            this.toastrService.success(
              'Success',
              'Course Uploaded Successfully'
            );
          },
          (error: any) => {
            this.toastrService.error(
              'Error',
              'Sorry Something Went Wrong Whiles Uploading Course'
            );
            console.log(error);
          }
        );
      },
      (error: any) => {
        this.toastrService.error(
          'Error',
          'Sorry Something Went Wrong Whiles Uploading Course'
        );
        console.log(error);
      }
    );
  }

  onSelect(event) {
    console.log(event);
    this.files.push(...event.addedFiles);
  }

  onRemove(event) {
    console.log(event);
    this.files.splice(this.files.indexOf(event), 1);
  }

  get formControls(): any {
    return this.addCourseForm.controls;
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
          'Sorry Something Went Wrong Whiles Fetching Classes'
        );
      }
    );
  }

  getAllSubjects() {
    this.subjectService.getAllSubjects().subscribe(
      (res: any) => {
        this.subjectList = res.data;
        console.log(this.subjectList);
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
    this.getAllSubjects();
    this.initCreateCourseForm();
  }
}
