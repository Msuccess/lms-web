import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IOption } from 'ng-select';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject } from 'rxjs';
import { AuthModel } from '../../auth/model/auth.model';
import { UserClassService } from '../../users-class/service/user-class.service';
import { StudentService } from '../services/student.service';

@Component({
  selector: 'app-add-student',
  templateUrl: './add-student.component.html',
  styleUrls: ['./add-student.component.scss'],
})
export class AddStudentComponent implements OnInit {
  newStudent = {} as AuthModel;
  registrationForm: FormGroup;
  submitted: boolean = false;
  loading = new BehaviorSubject<Boolean>(false);
  error = new BehaviorSubject<any>([]);
  classList: any[];
  action = 'Add';
  selectedStudentID: string;

  constructor(
    private formBuilder: FormBuilder,
    private studentService: StudentService,
    private toastrService: ToastrService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private classService: UserClassService
  ) {}

  initCreateStudentForm(): void {
    this.registrationForm = this.formBuilder.group({
      fullName: [this.newStudent.fullName, Validators.required],
      userClass: [this.newStudent.class, Validators.required],
      username: [this.newStudent.username, Validators.required],
      email: [
        this.newStudent.email,
        Validators.compose([Validators.required, Validators.email]),
      ],
      phoneNumber: [
        this.newStudent.phoneNumber,
        Validators.compose([
          Validators.minLength(10),
          Validators.maxLength(20),
          Validators.required,
        ]),
      ],
      password: [
        this.newStudent.password,
        Validators.compose([Validators.required, Validators.minLength(8)]),
      ],
      gender: [this.newStudent.gender],
      dateOfBirth: [this.newStudent.dateOfBirth, Validators.required],
      role: 'student',
    });
  }

  onSubmit(): void {
    this.submitted = true;
    if (this.registrationForm.invalid) {
      return;
    } else {
      if (this.selectedStudentID) {
        this.updateStudentInfo(
          this.registrationForm.value,
          this.selectedStudentID
        );
      } else {
        this.addStudentInfo(this.registrationForm.value);
      }
    }
  }

  updateStudentInfo(studentInfo: AuthModel, studentID: string) {
    this.studentService.updateStudent(studentInfo, studentID).subscribe(
      (res: any) => {
        this.toastrService.success('Success', 'Updated Successfully');
        this.loading.next(false);
        this.registrationForm.reset();
        this.router.navigate(['/app/student/list']);
      },
      (error: any) => {
        this.loading.next(false);
        this.toastrService.error(
          'Error',
          'Sorry Something Went Wrong Whiles Updating Class'
        );
      }
    );
  }

  addStudentInfo(studentInfo: AuthModel) {
    this.studentService.addStudent(studentInfo).subscribe(
      (res: any) => {
        this.toastrService.success('Success', 'Added Successfully');
        this.loading.next(false);
        this.registrationForm.reset();
      },
      (error: any) => {
        this.loading.next(false);
        this.toastrService.error('Error', 'Something went wrong');
      }
    );
  }

  onCancel() {
    this.router.navigate(['/app/student/list']);
  }

  checkEditAction() {
    if (this.activatedRoute.snapshot.paramMap.get('id')) {
      this.action = 'Edit';
      this.selectedStudentID = this.activatedRoute.snapshot.paramMap.get('id');
      this.studentService.getStudentById(this.selectedStudentID).subscribe(
        (res: any) => {
          this.registrationForm = this.formBuilder.group(res.data);
          console.log(res);
        },
        (error: any) => {
          this.toastrService.error(
            'Error',
            'Sorry, Something Went Wrong While Fetching Data'
          );
        }
      );
    }
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

  get formControls(): any {
    return this.registrationForm.controls;
  }

  ngOnInit(): void {
    this.getAllClasses();
    this.initCreateStudentForm();
    this.checkEditAction();
  }
}
