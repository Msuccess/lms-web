import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ApiEndPoints } from 'src/app/core/constants/api-endpoint';
import { CourseModel } from '../../models/course.model';

@Injectable({
  providedIn: 'root',
})
export class CourseService {
  apiEndpoint: ApiEndPoints;
  constructor(public httpClient: HttpClient) {
    this.apiEndpoint = new ApiEndPoints();
  }

  public uploadCourse(formData: any): Observable<any> {
    return this.httpClient
      .post(this.apiEndpoint.API_UPLOAD_COURSE, formData)
      .pipe(
        catchError((err) => {
          return throwError(err);
        })
      );
  }

  public createCourse(courseInfo: CourseModel): Observable<any> {
    return this.httpClient.post(this.apiEndpoint.API_COURSE, courseInfo).pipe(
      catchError((err) => {
        return throwError(err);
      })
    );
  }
}
