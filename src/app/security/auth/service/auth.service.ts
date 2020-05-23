import { Injectable } from '@angular/core';
import { CanActivate, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { Login } from 'src/app/security/model/login';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { APP_URL, CONSTANT_URL } from 'src/app/constants/constant-rest';
import { AbstractCrudService } from 'src/app/shared/abstract-crud.service';


@Injectable({
  providedIn: 'root'
})
export class AuthService extends AbstractCrudService<Login>{
  private currentLoginSubject: BehaviorSubject<Login>;
  public currentLogin: Observable<Login>
  constructor(http: HttpClient) {
    super(http,  CONSTANT_URL.LOGIN);
    this.currentLoginSubject = new BehaviorSubject<Login>(JSON.parse(sessionStorage.getItem('session-data')));
    this.currentLogin = this.currentLoginSubject.asObservable();
  }
  public get currentLoginValue(): Login {
    return this.currentLoginSubject.value;
  }

  login(obj) {
    let login = obj.username;
    let password = obj.password;
    return this.http.post<any>(`${APP_URL}users/login`, { login, password })
      .pipe(map(user => {
        // store user details and basic auth credentials in local storage to keep user logged in between page refreshes
        user = window.btoa(login + ':' + password);
        localStorage.setItem('session-data', JSON.stringify(user));
        this.currentLoginSubject.next(user);
        return user;
      }));
  }
}
