import { NotifyComponent } from './../../shared/components/notify/notify.component';
import { Injectable } from '@angular/core';
import { GlobalConfig, ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  constructor(private toastr: ToastrService) {}

  success(message: string, title?: string): void {
    this.toastr.show(title, message, {
      toastComponent: NotifyComponent,
      toastClass: 'notyf confirm',
      timeOut: 5000,
      messageClass: 'success',
      progressBar: true,
      positionClass: 'toast-top-right',
    });
  }

  fail(message: string, title?: string): void {
    this.toastr.show(title, message, {
      toastComponent: NotifyComponent,
      toastClass: 'notyf confirm',
      timeOut: 5000,
      messageClass: 'danger',
      progressBar: true,
      positionClass: 'toast-top-right',
    });
  }
}
