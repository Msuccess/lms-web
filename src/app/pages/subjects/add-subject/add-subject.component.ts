import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject } from 'rxjs';
import { UserClassModel } from '../../users-class/models/user-class.model';
import { SubjectsModel } from '../models/subjects.model';
import { SubjectsService } from '../services/subjects.service';

@Component({
  selector: 'app-add-subject',
  templateUrl: './add-subject.component.html',
  styleUrls: ['./add-subject.component.scss'],
})
export class AddSubjectComponent implements OnInit {
  newSubject = {} as SubjectsModel;
  newSubjectForm: FormGroup;
  submitted: boolean = false;
  loading = new BehaviorSubject<Boolean>(false);
  error = new BehaviorSubject<any>([]);
  action: string = 'Add';

  selectedSubjectID: string;

  constructor(
    private subjectService: SubjectsService,
    private formBuilder: FormBuilder,
    private toastrService: ToastrService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}

  initCreateSubjectForm(): void {
    this.newSubjectForm = this.formBuilder.group({
      subjectName: [this.newSubject.subjectName, Validators.required],
    });
  }

  onSubmit(): void {
    this.submitted = true;
    if (this.newSubjectForm.invalid) {
      return;
    } else {
      if (this.selectedSubjectID) {
        this.updateSubjectInfo(
          this.newSubjectForm.value,
          this.selectedSubjectID
        );
      } else {
        this.addSubjectInfo(this.newSubjectForm.value);
      }
    }
  }

  updateSubjectInfo(subjectInfo: SubjectsModel, subjectId: string) {
    this.subjectService.updateSubject(subjectInfo, subjectId).subscribe(
      (res: any) => {
        this.toastrService.success('Success', 'Updated Successfully');
        this.loading.next(false);
        this.submitted = false;
        this.newSubjectForm.reset();
        this.router.navigate(['/app/subject/list']);
      },
      (error: any) => {
        this.loading.next(false);
        this.toastrService.error(
          'Error',
          'Sorry Something Went Wrong Whiles Updating Subject'
        );
      }
    );
  }

  addSubjectInfo(subjectInfo: SubjectsModel) {
    this.subjectService.addSubject(subjectInfo).subscribe(
      (res: any) => {
        this.toastrService.success('Success', 'Added Successfully');
        this.loading.next(false);
        this.submitted = false;
        this.newSubjectForm.reset();
      },
      (error: any) => {
        this.loading.next(false);
        this.toastrService.error('Error', 'Subject Already Exists');
      }
    );
  }

  onCancel() {
    this.router.navigate(['/app/subject/list']);
  }

  checkEditAction() {
    if (this.activatedRoute.snapshot.paramMap.get('id')) {
      this.action = 'Edit';
      this.selectedSubjectID = this.activatedRoute.snapshot.paramMap.get('id');
      this.subjectService.getSubjectById(this.selectedSubjectID).subscribe(
        (res: any) => {
          // this.newClassForm = res.data;
          this.newSubjectForm = this.formBuilder.group(res.data);
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

  get formControls(): any {
    return this.newSubjectForm.controls;
  }

  ngOnInit(): void {
    this.initCreateSubjectForm();
    this.checkEditAction();
  }
}
