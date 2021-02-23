import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ApiEndPoints } from 'src/app/core/constants/api-endpoint';
import { AuthModel } from '../../auth/model/auth.model';

@Injectable({
  providedIn: 'root',
})
export class DocumentService {
  apiEndpoint: ApiEndPoints;
  constructor(public httpClient: HttpClient) {
    this.apiEndpoint = new ApiEndPoints();
  }

  public uploadDocument(formData: any): Observable<any> {
    return this.httpClient
      .post(this.apiEndpoint.API_UPLOAD_COURSE, formData)
      .pipe(
        catchError((err) => {
          return throwError(err);
        })
      );
  }

  public getAllDocuments(): Observable<any> {
    return this.httpClient.get(this.apiEndpoint.API_ADD_STUDENT).pipe(
      catchError((err) => {
        return throwError(err);
      })
    );
  }

  public getStudentById(StudentID: string): Observable<any> {
    return this.httpClient
      .get(`${this.apiEndpoint.API_ADD_STUDENT}${StudentID}`)
      .pipe(
        catchError((err) => {
          return throwError(err);
        })
      );
  }

  public addStudent(StudentInfo: AuthModel): Observable<any> {
    return this.httpClient
      .post(this.apiEndpoint.API_ADD_STUDENT, StudentInfo)
      .pipe(
        catchError((err) => {
          return throwError(err);
        })
      );
  }
  public updateStudent(
    StudentInfo: AuthModel,
    StudentID: string
  ): Observable<any> {
    return this.httpClient
      .put(`${this.apiEndpoint.API_ADD_STUDENT}${StudentID}`, StudentInfo)
      .pipe(
        catchError((err) => {
          return throwError(err);
        })
      );
  }
  public deleteStudent(StudentID: string): Observable<any> {
    return this.httpClient
      .delete(`${this.apiEndpoint.API_ADD_STUDENT}${StudentID}`)
      .pipe(
        catchError((err) => {
          return throwError(err);
        })
      );
  }
}
