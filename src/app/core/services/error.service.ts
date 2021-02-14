import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http/http';
import { NotificationService } from '../notification/notification.service';

@Injectable({
  providedIn: 'root',
})
export class ErrorService {
  constructor() {}

  getErrors(errs: any): any {
    try {
      return errs
        ? Object.keys(errs).map((k) => errs[k].map((e: any) => e))
        : ['Operation Failed'];
    } catch (err) {
      if (errs.message) {
        return [errs.message];
      }
      if (errs.details) {
        return [errs.detail];
      }
      return ['Operation Unsuccessful'];
    }
  }

  getErrorStatus(error: HttpErrorResponse): string {
    switch (error.status) {
      case 400:
        return 'Operation Unsuccessful Invalid Inputs';
      case 401:
        return 'Unauthorized Access';
      case 0:
        return 'Please Check Internet Connection';
      case 500:
        return 'An unexpected error occured';
      default:
        break;
    }
  }
}
