import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject } from 'rxjs';
import { AuthModel } from '../../auth/model/auth.model';
import { TeacherService } from '../services/teacher.service';

@Component({
  selector: 'app-add-teacher',
  templateUrl: './add-teacher.component.html',
  styleUrls: ['./add-teacher.component.scss'],
})
export class AddTeacherComponent implements OnInit {
  newTeacher = {} as AuthModel;
  registrationForm: FormGroup;
  submitted: boolean = false;
  loading = new BehaviorSubject<Boolean>(false);
  error = new BehaviorSubject<any>([]);
  selectedTeacherID: string;
  action = 'Add';

  constructor(
    private teacherService: TeacherService,
    private formBuilder: FormBuilder,
    private toastrService: ToastrService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  initCreateTeacherForm(): void {
    this.registrationForm = this.formBuilder.group({
      fullName: [this.newTeacher.fullName, Validators.required],
      username: [this.newTeacher.username, Validators.required],
      email: [
        this.newTeacher.email,
        Validators.compose([Validators.required, Validators.email]),
      ],
      phoneNumber: [
        this.newTeacher.phoneNumber,
        Validators.compose([
          Validators.minLength(10),
          Validators.maxLength(20),
          Validators.required,
        ]),
      ],
      password: [
        this.newTeacher.password,
        Validators.compose([Validators.required, Validators.minLength(8)]),
      ],
      gender: [this.newTeacher.gender],
      dateOfBirth: [this.newTeacher.dateOfBirth, Validators.required],
      role: 'teacher',
    });
  }

  onSubmit(): void {
    this.submitted = true;
    if (this.registrationForm.invalid) {
      return;
    } else {
      if (this.selectedTeacherID) {
        this.updateTeacherInfo(
          this.registrationForm.value,
          this.selectedTeacherID
        );
      } else {
        this.addTeacherInfo(this.registrationForm.value);
      }
    }
  }

  updateTeacherInfo(teacherInfo: AuthModel, teacherId: string) {
    this.teacherService.updateTeacher(teacherInfo, teacherId).subscribe(
      (res: any) => {
        this.toastrService.success('Success', 'Updated Successfully');
        this.loading.next(false);
        this.submitted = false;
        this.registrationForm.reset();
        this.router.navigate(['/app/teacher/list']);
      },
      (error: any) => {
        this.loading.next(false);
        this.toastrService.error(
          'Error',
          'Sorry Something Went Wrong Whiles Updating Teacher Details'
        );
      }
    );
  }

  addTeacherInfo(teacherInfo: AuthModel) {
    this.teacherService.addTeacher(teacherInfo).subscribe(
      (res: any) => {
        this.toastrService.success('Success', 'Added Successfully');
        this.loading.next(false);
        this.submitted = false;
        this.registrationForm.reset();
      },
      (error: any) => {
        this.loading.next(false);
        this.toastrService.error(
          'Error',
          'Something went wrong Whiles Adding Teacher'
        );
      }
    );
  }

  onCancel() {
    this.router.navigate(['/app/teacher/list']);
  }

  checkEditAction() {
    if (this.activatedRoute.snapshot.paramMap.get('id')) {
      this.action = 'Edit';
      this.selectedTeacherID = this.activatedRoute.snapshot.paramMap.get('id');
      this.teacherService.getTeacherById(this.selectedTeacherID).subscribe(
        (res: any) => {
          this.registrationForm = this.formBuilder.group(res.data);
          console.log(res);
        },
        (error: any) => {
          this.toastrService.error(
            'Error',
            'Sorry, Something Went Wrong While Fetching Teacher Data'
          );
        }
      );
    }
  }

  get formControls(): any {
    return this.registrationForm.controls;
  }

  ngOnInit(): void {
    this.initCreateTeacherForm();
    this.checkEditAction();
  }
}
