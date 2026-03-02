import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { HTTP_INTERCEPTORS, HttpHandlerFn, HttpRequest, provideHttpClient, withInterceptors, withInterceptorsFromDi } from '@angular/common/http';
import { routes } from './app.routes';
import { LoggingInterceptor } from './logging-interceptor';

function loggingInterceptor(
  request: HttpRequest<unknown>, 
  next: HttpHandlerFn) {
    const req = request.clone({
      headers: request.headers.set('X-DEBUG', 'TESTING')
    })
    console.log('[Outgoing Request]');
    console.log(req);
    return next(req);
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideHttpClient(
      withInterceptors([loggingInterceptor]),
      withInterceptorsFromDi()
    ),
    {provide: HTTP_INTERCEPTORS, useClass: LoggingInterceptor, multi: true},
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes)
  ]
};
