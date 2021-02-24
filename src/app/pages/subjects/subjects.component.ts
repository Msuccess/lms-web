import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { SubjectsService } from './services/subjects.service';

@Component({
  selector: 'app-subjects',
  templateUrl: './subjects.component.html',
  styleUrls: ['./subjects.component.scss'],
})
export class SubjectsComponent implements OnInit {
  constructor(
    private subjectService: SubjectsService,
    private toastrService: ToastrService,
    private router: Router
  ) {}

  subjectList: any[];

  dtOptions: any = {};
  dtTrigger: Subject<any> = new Subject<any>();

  getSubjects() {
    this.subjectService.getAllSubjects().subscribe(
      (res: any) => {
        this.subjectList = res.data;
        console.log(this.subjectList);
      },
      (error: any) => {
        this.toastrService.error('Error', 'Something Went Wrong Fetching Data');
      }
    );
  }

  editSubject(subjectId: string) {
    this.router.navigate(['app/subject/edit', subjectId]);
  }

  deleteSubject(subjectId: string, subjectName: string) {
    Swal.fire({
      title: `Are you sure you want to delete ${subjectName} ?`,
      text: 'Once deleted, you will not be able to recover this Subject!',
      type: 'warning',
      showCloseButton: true,
      showCancelButton: true,
    }).then((willDelete) => {
      if (willDelete.dismiss) {
        Swal.fire('', 'Operation Cancelled', 'error');
      } else {
        this.subjectService.deleteSubject(subjectId).subscribe(
          (res: any) => {
            Swal.fire('', 'Subject Deleted Successfully', 'success').then(
              () => {
                this.router.navigate(['app/subject/list']);
              }
            );
          },
          (error: any) => {
            this.toastrService.error(
              'Error',
              'Something Went Wrong Deleting Data'
            );
          }
        );
      }
    });
  }

  ngOnInit(): void {
    this.getSubjects();
  }
}
