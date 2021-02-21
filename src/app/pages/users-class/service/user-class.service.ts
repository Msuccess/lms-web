import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ApiEndPoints } from 'src/app/core/constants/api-endpoint';
import { UserClassModel } from '../models/user-class.model';

@Injectable({
  providedIn: 'root',
})
export class UserClassService {
  apiEndpoint: ApiEndPoints;
  constructor(public httpClient: HttpClient) {
    this.apiEndpoint = new ApiEndPoints();
  }

  public getAllClasses(): Observable<any> {
    return this.httpClient.get(this.apiEndpoint.API_ADD_CLASS).pipe(
      catchError((err) => {
        return throwError(err);
      })
    );
  }

  public getClassById(classID: string): Observable<any> {
    return this.httpClient
      .get(`${this.apiEndpoint.API_ADD_CLASS}${classID}`)
      .pipe(
        catchError((err) => {
          return throwError(err);
        })
      );
  }

  public addClass(classInfo: UserClassModel): Observable<any> {
    return this.httpClient.post(this.apiEndpoint.API_ADD_CLASS, classInfo).pipe(
      catchError((err) => {
        return throwError(err);
      })
    );
  }
  public updateClass(
    classInfo: UserClassModel,
    classID: string
  ): Observable<any> {
    return this.httpClient
      .put(`${this.apiEndpoint.API_ADD_CLASS}${classID}`, classInfo)
      .pipe(
        catchError((err) => {
          return throwError(err);
        })
      );
  }
  public deleteClass(classID: string): Observable<any> {
    return this.httpClient
      .delete(`${this.apiEndpoint.API_ADD_CLASS}${classID}`)
      .pipe(
        catchError((err) => {
          return throwError(err);
        })
      );
  }
}
