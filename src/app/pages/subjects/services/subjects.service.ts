import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ApiEndPoints } from 'src/app/core/constants/api-endpoint';
import { SubjectsModel } from '../models/subjects.model';

@Injectable({
  providedIn: 'root',
})
export class SubjectsService {
  apiEndpoint: ApiEndPoints;
  constructor(public httpClient: HttpClient) {
    this.apiEndpoint = new ApiEndPoints();
  }

  public getAllSubjects(): Observable<any> {
    return this.httpClient.get(this.apiEndpoint.API_SUBJECT).pipe(
      catchError((err) => {
        return throwError(err);
      })
    );
  }

  public getSubjectById(subjectId: string): Observable<any> {
    return this.httpClient
      .get(`${this.apiEndpoint.API_SUBJECT}${subjectId}`)
      .pipe(
        catchError((err) => {
          return throwError(err);
        })
      );
  }

  public addSubject(subjectInfo: SubjectsModel): Observable<any> {
    return this.httpClient.post(this.apiEndpoint.API_SUBJECT, subjectInfo).pipe(
      catchError((err) => {
        return throwError(err);
      })
    );
  }
  public updateSubject(
    subjectInfo: SubjectsModel,
    subjectId: string
  ): Observable<any> {
    return this.httpClient
      .put(`${this.apiEndpoint.API_SUBJECT}${subjectId}`, subjectInfo)
      .pipe(
        catchError((err) => {
          return throwError(err);
        })
      );
  }
  public deleteSubject(subjectId: string): Observable<any> {
    return this.httpClient
      .delete(`${this.apiEndpoint.API_SUBJECT}${subjectId}`)
      .pipe(
        catchError((err) => {
          return throwError(err);
        })
      );
  }
}
