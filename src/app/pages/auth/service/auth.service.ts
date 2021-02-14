import { TokenStorage } from './../../../core/helpers/token-storage.service';
import { HttpClient } from '@angular/common/http';
import { AuthEndPoints } from './../../../core/constants/api-endpoint';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { tap } from 'rxjs/internal/operators/tap';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  authEndpoint: AuthEndPoints;
  constructor(
    public httpClient: HttpClient,
    private tokenStorage: TokenStorage
  ) {
    this.authEndpoint = new AuthEndPoints();
  }

  public signin(credential: any): Observable<any> {
    return this.httpClient
      .post(this.authEndpoint.API_AUTH_LOGIN, credential)
      .pipe(
        tap((res: any) => {
          this.tokenStorage.setAccessToken(res.token, true);
          this.tokenStorage.setUser(res.user, true);
        }),
        catchError((err) => {
          return throwError(err);
        })
      );
  }

  public signup(credential: any): Observable<any> {
    const newCredential = { ...credential };
    return this.httpClient
      .post(this.authEndpoint.API_AUTH_REGISTER, newCredential)
      .pipe(
        tap((res: any) => {
          this.tokenStorage.setAccessToken(res.token, true);
          this.tokenStorage.setUser(res.user, true);
        }),
        catchError((err) => {
          return throwError(err);
        })
      );
  }

  public changePassword(updatePassword: any): Observable<any> {
    return this.httpClient
      .post(this.authEndpoint.API_AUTH_CHANGE_PASSWORD, updatePassword)
      .pipe(
        catchError((err) => {
          return throwError(err);
        })
      );
  }

  public resetPassword(credential: any): Observable<any> {
    const newCredential = { ...credential };
    return this.httpClient
      .post(this.authEndpoint.API_AUTH_RESET_PASSWORD, newCredential)
      .pipe(
        catchError((err) => {
          return throwError(err);
        })
      );
  }

  public signOut(): Observable<any> {
    return this.httpClient.post(this.authEndpoint.API_AUTH_LOGOUT, null).pipe(
      tap((res: any) => this.tokenStorage.clear()),
      catchError((err) => {
        return throwError(err);
      })
    );
  }

  public verifyPhone(phoneCode: any): Observable<any> {
    return this.httpClient
      .post(this.authEndpoint.API_AUTH_VERIFY_PHONE, phoneCode)
      .pipe(
        catchError((err) => {
          return throwError(err);
        })
      );
  }

  public refreshToken(): any {
    return;
  }

  isTokenExpired(): boolean {
    return false;
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }

  getToken(): string {
    return this.tokenStorage.getAccessToken(true);
  }

  getRoles(): string[] {
    return [];
  }

  decodeJwtToken(): any {
    const base64Url = this.getToken().split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    return JSON.parse(window.atob(base64));
  }
}
