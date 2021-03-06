import { Injectable } from '@angular/core';
import { of, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TokenStorage {
  /**
   * Get access token
   * @returns Observable<string>
   */
  public getAccessToken(returnString?: boolean): any {
    let token = '';
    if (localStorage.getItem('accessToken')) {
      token = localStorage.getItem('accessToken');
    } else {
      token = sessionStorage.getItem('accessToken');
    }

    if (returnString) {
      return token;
    } else {
      return of(token);
    }
  }

  /**
   * Get refresh token
   * @returns Observable<string>
   */
  public getRefreshToken(returnString?: boolean): Observable<string> | string {
    let token = '';
    if (localStorage.getItem('refreshToken')) {
      token = localStorage.getItem('refreshToken');
    } else {
      token = sessionStorage.getItem('refreshToken');
    }

    if (returnString) {
      return token;
    } else {
      return of(token);
    }
  }

  /**
   * Get user roles in JSON string
   * @returns Observable<any>
   */
  public getUserRoles(): Observable<any> {
    const roles: any = localStorage.getItem('userRoles');
    try {
      return of(JSON.parse(roles.split(',')));
    } catch (e) {
      return of([]);
    }
  }

  /**
   * Get user in JSON string
   * @returns Observable<any>
   */
  public getUser(): Observable<any> {
    const user: any = localStorage.getItem('user');
    try {
      return of(JSON.parse(user.split(',')));
    } catch (e) {
      return of([]);
    }
  }

  /**
   * Get  Organization in JSON string
   * @returns Observable<any>
   */
  public getOrganization(): any {
    const retrievedObject = localStorage.getItem('organization');
    try {
      return of(JSON.parse(retrievedObject));
    } catch (error) {
      return of([]);
    }
  }

  /**
   * Set Organization
   * @param roles: any
   * @returns TokenStorage
   */
  public setOrganization(data: any): any {
    if (data != null) {
      localStorage.setItem('organization', JSON.stringify(data));
    }
    return this;
  }

  /**
   * Set access token
   * @returns TokenStorage
   */
  public setAccessToken(
    token: { token: string; expiresIn: string },
    rememberMe?: boolean
  ): TokenStorage {
    if (rememberMe) {
      localStorage.setItem('accessToken', token.token);
      debugger;
    } else {
      localStorage.setItem('accessToken', token.token);
      debugger;
    }

    return this;
  }

  /**
   * Set refresh token
   * @returns TokenStorage
   */
  public setRefreshToken(
    token: {
      token: string;
      expiresIn: string;
    },
    rememberMe: boolean
  ): TokenStorage {
    if (rememberMe) {
      localStorage.setItem('refreshToken', token.token);
      debugger;
    } else {
      localStorage.setItem('refreshToken', token.token);
      debugger;
    }

    return this;
  }

  /**
   * Set user roles
   * @param roles: any
   * @returns TokenStorage
   */
  public setUserRoles(roles: any, rememberMe?: boolean): any {
    if (roles != null) {
      if (rememberMe) {
        localStorage.setItem('userRoles', JSON.stringify(roles));
      } else {
        sessionStorage.setItem('userRoles', JSON.stringify(roles));
      }
    }

    return this;
  }

  /**
   * Set user roles
   * @param roles: any
   * @returns TokenStorage
   */
  public setUser(user: any, rememberMe?: boolean): any {
    if (user != null) {
      if (rememberMe) {
        localStorage.setItem('user', JSON.stringify(user));
      } else {
        sessionStorage.setItem('user', JSON.stringify(user));
      }
    }

    return this;
  }

  /**
   * Set valid To
   * @returns TokenStorage
   */
  setValidToDate(validTo: string, rememberMe?: boolean): TokenStorage {
    if (rememberMe) {
      localStorage.setItem('validTo', validTo);
    } else {
      sessionStorage.setItem('validTo', validTo);
    }
    return this;
  }

  /**
   * Remove tokens
   */
  public clear(): void {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('userRoles');
    localStorage.removeItem('user');
    localStorage.removeItem('organizationAccess');

    sessionStorage.removeItem('accessToken');
    sessionStorage.removeItem('refreshToken');
    sessionStorage.removeItem('userRoles');
    sessionStorage.removeItem('user');
    sessionStorage.removeItem('organizationAccess');
  }
}
