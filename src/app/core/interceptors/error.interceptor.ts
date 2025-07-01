import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { catchError, EMPTY, finalize, Observable } from 'rxjs';
import { LoadingService } from '@services/loading.service';

@Injectable()
export class HttpRequestInterceptor implements HttpInterceptor {
  constructor(private readonly _loadingService: LoadingService) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    this._loadingService.setLoading(true);

    return next.handle(request).pipe(
      catchError((error) => {
        alert(error.error.message);
        return EMPTY;
      }),
      finalize(() => this._loadingService.setLoading(false))
    );
  }
}
