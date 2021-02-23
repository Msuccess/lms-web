import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ApiEndPoints } from 'src/app/core/constants/api-endpoint';
import { AuthModel } from '../../auth/model/auth.model';

@Injectable({
  providedIn: 'root',
})
export class TeacherService {
  apiEndpoint: ApiEndPoints;
  constructor(public httpClient: HttpClient) {
    this.apiEndpoint = new ApiEndPoints();
  }

  public getAllTeachers(): Observable<any> {
    return this.httpClient.get(this.apiEndpoint.API_ADD_TEACHER).pipe(
      catchError((err) => {
        return throwError(err);
      })
    );
  }

  public getTeacherById(teacherID: string): Observable<any> {
    return this.httpClient
      .get(`${this.apiEndpoint.API_ADD_TEACHER}${teacherID}`)
      .pipe(
        catchError((err) => {
          return throwError(err);
        })
      );
  }

  public addTeacher(teacherInfo: AuthModel): Observable<any> {
    return this.httpClient
      .post(this.apiEndpoint.API_ADD_TEACHER, teacherInfo)
      .pipe(
        catchError((err) => {
          return throwError(err);
        })
      );
  }
  public updateTeacher(
    teacherInfo: AuthModel,
    teacherId: string
  ): Observable<any> {
    return this.httpClient
      .put(`${this.apiEndpoint.API_ADD_TEACHER}${teacherId}`, teacherInfo)
      .pipe(
        catchError((err) => {
          return throwError(err);
        })
      );
  }
  public deleteTeacher(teacherId: string): Observable<any> {
    return this.httpClient
      .delete(`${this.apiEndpoint.API_ADD_TEACHER}${teacherId}`)
      .pipe(
        catchError((err) => {
          return throwError(err);
        })
      );
  }
}
