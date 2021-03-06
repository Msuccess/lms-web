import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject } from 'rxjs';
import { UserClassModel } from '../models/user-class.model';
import { UserClassService } from '../service/user-class.service';

@Component({
  selector: 'app-add-class',
  templateUrl: './add-class.component.html',
  styleUrls: ['./add-class.component.scss'],
})
export class AddClassComponent implements OnInit {
  newClass = {} as UserClassModel;
  newClassForm: FormGroup;
  submitted: boolean = false;
  loading = new BehaviorSubject<Boolean>(false);
  error = new BehaviorSubject<any>([]);
  action: string = 'Add';

  selectedClassID: string;

  constructor(
    private classService: UserClassService,
    private formBuilder: FormBuilder,
    private toastrService: ToastrService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}

  initCreateClassForm(): void {
    this.newClassForm = this.formBuilder.group({
      className: [this.newClass.className, Validators.required],
    });
  }

  onSubmit(): void {
    this.submitted = true;
    if (this.newClassForm.invalid) {
      return;
    } else {
      if (this.selectedClassID) {
        this.updateClassInfo(this.newClassForm.value, this.selectedClassID);
      } else {
        this.addClassInfo(this.newClassForm.value);
      }
    }
  }

  updateClassInfo(classInfo: UserClassModel, classID: string) {
    this.classService.updateClass(classInfo, classID).subscribe(
      (res: any) => {
        this.toastrService.success('Success', 'Updated Successfully');
        this.loading.next(false);
        this.submitted = false;
        this.newClassForm.reset();
        this.router.navigate(['/app/class/list']);
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

  addClassInfo(classInfo: UserClassModel) {
    this.classService.addClass(classInfo).subscribe(
      (res: any) => {
        this.toastrService.success('Success', 'Added Successfully');
        this.loading.next(false);
        this.submitted = false;
        this.newClassForm.reset();
      },
      (error: any) => {
        this.loading.next(false);
        this.toastrService.error('Error', 'Class Already Exists');
      }
    );
  }

  onCancel() {
    this.router.navigate(['/app/class/list']);
  }

  checkEditAction() {
    if (this.activatedRoute.snapshot.paramMap.get('id')) {
      this.action = 'Edit';
      this.selectedClassID = this.activatedRoute.snapshot.paramMap.get('id');
      this.classService.getClassById(this.selectedClassID).subscribe(
        (res: any) => {
          // this.newClassForm = res.data;
          this.newClassForm = this.formBuilder.group(res.data);
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
    return this.newClassForm.controls;
  }

  ngOnInit(): void {
    this.initCreateClassForm();
    this.checkEditAction();
  }
}
