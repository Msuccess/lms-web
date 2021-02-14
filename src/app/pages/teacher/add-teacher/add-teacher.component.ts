import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import { AuthModel } from '../../auth/model/auth.model';
import { AuthService } from '../../auth/service/auth.service';

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

  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder
  ) {}

  initCreateStudentForm(): void {
    this.registrationForm = this.formBuilder.group({
      fullName: [this.newTeacher.fullName, Validators.required],
      class: [this.newTeacher.class, Validators.required],
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
    });
  }

  onSubmit(): void {
    this.submitted = true;
    if (this.registrationForm.invalid) {
      return;
    } else {
      console.log(this.registrationForm.value);
    }
  }

  get formControls(): any {
    return this.registrationForm.controls;
  }

  ngOnInit(): void {
    this.initCreateStudentForm();
  }
}
