import { AuthService } from './../../pages/auth/service/auth.service';

import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpErrorResponse,
  HttpResponse,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, finalize } from 'rxjs/operators';

@Injectable()
export class HttpRequestInterceptor implements HttpInterceptor {
  constructor(private auth: AuthService) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // this.loaderService.show();

    if (!this.auth.isTokenExpired() && this.auth.isAuthenticated()) {
      request = this.addToken(request, this.auth.getToken());
    }

    return next.handle(request).pipe(
      map((event: HttpEvent<any>) => {
        if (event instanceof HttpResponse) {
          console.log('HttpResponse >>>', event);

          // this.loaderService.hide();
        } else if (event instanceof HttpErrorResponse) {
          console.log('HttpErrorResponse >>>', event);

          // this.loaderService.hide();
        }
        return event;
      })
      // finalize(() => this.loaderService.hide())
    );
  }

  private addToken(request: HttpRequest<any>, token: any): any {
    return request.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
}
