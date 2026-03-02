import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { HttpHandlerFn, HttpRequest, provideHttpClient, withInterceptors } from '@angular/common/http';
import { routes } from './app.routes';

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
      withInterceptors([loggingInterceptor])
    ),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes)
  ]
};
