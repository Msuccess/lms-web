import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { DocumentService } from './services/document.service';
import Swal from 'sweetalert2/dist/sweetalert2.js';

@Component({
  selector: 'app-document',
  templateUrl: './document.component.html',
  styleUrls: ['./document.component.scss'],
})
export class DocumentComponent implements OnInit {
  constructor(
    private documentService: DocumentService,
    private toastrService: ToastrService,
    private router: Router
  ) {}

  documentList: any[];

  getDocuments() {
    this.documentService.getAllDocuments().subscribe(
      (res: any) => {
        this.documentList = res.data;
        console.log(this.documentList);
      },
      (error: any) => {
        this.toastrService.error('Error', 'Something Went Wrong Fetching Data');
      }
    );
  }

  viewDocument(documentId: string) {
    this.router.navigate(['app/teacher/edit', documentId]);
  }

  deleteDocument(documentId: string, teacherName: string) {
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
        this.documentService.deleteDocument(documentId).subscribe(
          (res: any) => {
            Swal.fire('', 'Document Deleted Successfully', 'success').then(
              () => {
                this.router.navigate(['app/document/list']);
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
    this.getDocuments();
  }
}
