import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { TeacherService } from './services/teacher.service';
import Swal from 'sweetalert2/dist/sweetalert2.js';

@Component({
  selector: 'app-teacher',
  templateUrl: './teacher.component.html',
  styleUrls: ['./teacher.component.scss'],
})
export class TeacherComponent implements OnInit {
  constructor(
    private teacherService: TeacherService,
    private toastrService: ToastrService,
    private router: Router
  ) {}

  teachersList: any[];

  getTeachers() {
    this.teacherService.getAllTeachers().subscribe(
      (res: any) => {
        this.teachersList = res.data;
        console.log(this.teachersList);
      },
      (error: any) => {
        this.toastrService.error('Error', 'Something Went Wrong Fetching Data');
      }
    );
  }

  editTeacher(teacherId: string) {
    this.router.navigate(['app/teacher/edit', teacherId]);
  }

  deleteTeacher(teacherId: string, teacherName: string) {
    Swal.fire({
      title: `Are you sure you want to delete ${teacherName} ?`,
      text: 'Once deleted, you will not be able to recover this teacher!',
      type: 'warning',
      showCloseButton: true,
      showCancelButton: true,
    }).then((willDelete) => {
      if (willDelete.dismiss) {
        Swal.fire('', 'Operation Cancelled', 'error');
      } else {
        this.teacherService.deleteTeacher(teacherId).subscribe(
          (res: any) => {
            Swal.fire('', 'Teacher Deleted Successfully', 'success').then(
              () => {
                this.router.navigate(['app/teacher/list']);
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
    this.getTeachers();
  }
}
