import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { StudentService } from './services/student.service';
import Swal from 'sweetalert2/dist/sweetalert2.js';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.scss'],
})
export class StudentComponent implements OnInit {
  constructor(
    private studentService: StudentService,
    private toastrService: ToastrService,
    private router: Router
  ) {}

  studentsList: any[];

  getStudents() {
    this.studentService.getAllStudents().subscribe(
      (res: any) => {
        this.studentsList = res.data;
        console.log(this.studentsList);
      },
      (error: any) => {
        this.toastrService.error('Error', 'Something Went Wrong Fetching Data');
      }
    );
  }

  editStudent(studentID: string) {
    this.router.navigate(['app/student/edit', studentID]);
  }

  deleteStudent(studentID: string, studentName: string) {
    Swal.fire({
      title: `Are you sure you want to delete ${studentName} ?`,
      text: 'Once deleted, you will not be able to recover this student!',
      type: 'warning',
      showCloseButton: true,
      showCancelButton: true,
    }).then((willDelete) => {
      if (willDelete.dismiss) {
        Swal.fire('', 'Operation Cancelled', 'error');
      } else {
        this.studentService.deleteStudent(studentID).subscribe(
          (res: any) => {
            Swal.fire('', 'Student Deleted Successfully', 'success').then(
              () => {
                this.router.navigate(['app/student/list']);
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
    this.getStudents();
  }
}
