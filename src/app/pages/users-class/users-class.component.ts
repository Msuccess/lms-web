import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserClassService } from './service/user-class.service';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-users-class',
  templateUrl: './users-class.component.html',
  styleUrls: ['./users-class.component.scss'],
})
export class UsersClassComponent implements OnInit {
  constructor(
    private classService: UserClassService,
    private toastrService: ToastrService,
    private router: Router
  ) {
    this.getClasses();
  }

  classList: any[];

  dtOptions: any = {};
  dtTrigger: Subject<any> = new Subject<any>();

  getClasses() {
    this.classService.getAllClasses().subscribe(
      (res: any) => {
        this.classList = res.data;
        this.dtTrigger.next();
        console.log(this.classList);
      },
      (error: any) => {
        this.toastrService.error('Error', 'Something Went Wrong Fetching Data');
      }
    );
  }

  editClass(classID: string) {
    this.router.navigate(['app/class/edit', classID]);
  }

  deleteClass(classID: string, className: string) {
    Swal.fire({
      title: `Are you sure you want to delete ${className} ?`,
      text: 'Once deleted, you will not be able to recover this class!',
      type: 'warning',
      showCloseButton: true,
      showCancelButton: true,
    }).then((willDelete) => {
      if (willDelete.dismiss) {
        Swal.fire('', 'Operation Cancelled', 'error');
      } else {
        this.classService.deleteClass(classID).subscribe(
          (res: any) => {
            Swal.fire('', 'Class Deleted Successfully', 'success').then(() => {
              this.router.navigate(['app/class/list']);
            });
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
    this.dtOptions = { pageLength: 2 };
  }

  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }
}
