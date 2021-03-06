import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ApiEndPoints } from 'src/app/core/constants/api-endpoint';
import { AuthModel } from '../../auth/model/auth.model';
import { DocumentModel } from '../models/document.model';

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
      .post(this.apiEndpoint.API_UPLOAD_DOCUMENT, formData)
      .pipe(
        catchError((err) => {
          return throwError(err);
        })
      );
  }

  public createDocument(documentInfo: DocumentModel): Observable<any> {
    return this.httpClient
      .post(this.apiEndpoint.API_DOCUMENT, documentInfo)
      .pipe(
        catchError((err) => {
          return throwError(err);
        })
      );
  }

  public getAllDocuments(): Observable<any> {
    return this.httpClient.get(this.apiEndpoint.API_DOCUMENT).pipe(
      catchError((err) => {
        return throwError(err);
      })
    );
  }

  public getDocumentById(documentID: string): Observable<any> {
    return this.httpClient
      .get(`${this.apiEndpoint.API_DOCUMENT}${documentID}`)
      .pipe(
        catchError((err) => {
          return throwError(err);
        })
      );
  }

  public deleteDocument(documentId: string): Observable<any> {
    return this.httpClient
      .delete(`${this.apiEndpoint.API_DOCUMENT}${documentId}`)
      .pipe(
        catchError((err) => {
          return throwError(err);
        })
      );
  }
}
