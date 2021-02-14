import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import { AuthModel } from '../../auth/model/auth.model';
import { AuthService } from '../../auth/service/auth.service';

@Component({
  selector: 'app-add-student',
  templateUrl: './add-student.component.html',
  styleUrls: ['./add-student.component.scss']
})
export class AddStudentComponent implements OnInit {

  newStudent = {} as AuthModel;
  registrationForm : FormGroup;
  submitted: boolean = false;
  loading = new BehaviorSubject<Boolean>(false)
  error = new BehaviorSubject<any>([]);


  constructor(private authService: AuthService, private formBuilder: FormBuilder) { }
  

  initCreateStudentForm():void {
    this.registrationForm = this.formBuilder.group({
      fullName: [this.newStudent.fullName, Validators.required],
      class: [this.newStudent.class,Validators.required],
      username: [this.newStudent.username, Validators.required],
      email: [
      this.newStudent.email,Validators.compose([Validators.required, Validators.email]),
      ],
      phoneNumber: [this.newStudent.phoneNumber,  Validators.compose(
        [Validators.minLength(10),Validators.maxLength(20), Validators.required])],
      password: [
      this.newStudent.password,
      Validators.compose([Validators.required, Validators.minLength(8)]),
      ],
      gender: [this.newStudent.gender],
      dateOfBirth: [this.newStudent.dateOfBirth,Validators.required],
    })
  }

    onSubmit(): void {
      this.submitted = true;
    if (this.registrationForm.invalid) {
    return;
    } else {
      console.log(this.registrationForm.value);
    }

}
  
  get formControls():any {
    return this.registrationForm.controls;
  }

  ngOnInit(): void {
    this.initCreateStudentForm();
  }

}
