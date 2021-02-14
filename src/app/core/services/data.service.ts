import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';

import { IBaseSerializer, Resource } from '../model/resource.model';
import { environment } from '../../../environments/environment.prod';

export class DataService<T extends Resource> {
    baseEndPoint = environment.baseUrl;

    constructor(
        private httpClient: HttpClient,
        private endPoint: string,
        private subEndPoint?: string,
        private serializer?: IBaseSerializer
    ) {}

    public handleError(result?: any): any {
        if (result.error instanceof ErrorEvent) {
            console.error('An error occurred:', result.error.message);
        } else {
            console.error(
                `Backend returned code ${result.status}, ` +
                    `body was: ${result.error}`
            );
        }
        return throwError('Something bad happened; please try again later.');
    }

    public create(data: T): Observable<T> {
        return this.httpClient
            .post<T>(
                `${this.baseEndPoint}/${this.endPoint}/`,
                this.serializer.toJson(data)
            )
            .pipe(
                map((result) => this.serializer.fromJson(result) as T),
                catchError((err) => {
                    this.handleError([]);
                    return throwError(err);
                })
            );
    }

    public update(id: string, data: T): Observable<any> {
        return this.httpClient
            .put<T>(
                `${this.baseEndPoint}/${this.endPoint}/${id}/`,
                this.serializer.toJson(data)
            )
            .pipe(
                map((result) => this.serializer.fromJson(result) as T),
                catchError((err) => {
                    this.handleError([]);
                    return throwError(err);
                })
            );
    }

    public getById(id: string): Observable<T> {
        return this.httpClient
            .get(`${this.baseEndPoint}/${this.endPoint}/${id}/`)
            .pipe(
                map((data: any) => this.serializer.fromJson(data) as T),
                catchError((err) => {
                    this.handleError([]);
                    return throwError(err);
                })
            );
    }

    public getList(): Observable<T[]> {
        return this.httpClient
            .get(`${this.baseEndPoint}/${this.endPoint}/`)
            .pipe(
                map((data: any) => this.convertData(data)),

                catchError((err) => {
                    this.handleError([]);
                    return throwError(err);
                })
            );
    }

    public getListWithQueryOptions(queryOptions?: any): Observable<T[]> {
        return this.httpClient
            .get(
                `${this.baseEndPoint}/${
                    this.endPoint
                }?${queryOptions.toQueryString()}`
            )
            .pipe(
                map((data: any) => this.convertData(data)),
                catchError((err) => {
                    this.handleError([]);
                    return throwError(err);
                })
            );
    }

    public delete(id: string): Observable<any> {
        return this.httpClient
            .delete(`${this.baseEndPoint}/${this.endPoint}/${id}`)
            .pipe(
                catchError((err) => {
                    this.handleError([]);
                    return throwError(err);
                })
            );
    }

    private convertData(response: any): T[] {
        if (response) {
            console.log(response);
            return response.data.map((result: any) =>
                this.serializer.fromJson(result)
            );
        }
        return;
    }
}
