import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpEvent, HttpRequest, HttpHandler } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../../service/auth.service';

@Injectable({
  providedIn: 'root'
})
export class HttpInterceptorService implements HttpInterceptor {

  constructor(private authService: AuthService) { }
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const currentUser = this.authService.currentLoginValue;
        if (currentUser && currentUser.strToken) {
            request = request.clone({
                setHeaders: {
                    Authorization: `Basic ${currentUser.strToken}`
                }
            });
        }
        return next.handle(request);
  }
}
