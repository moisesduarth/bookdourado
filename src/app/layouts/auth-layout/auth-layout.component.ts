import { Component, OnInit, OnDestroy } from '@angular/core';
import { Login } from 'src/app/security/model/login';
import { AuthService } from 'src/app/security/auth/service/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastService } from 'src/app/shared/toast/toast-service/toast.service';
import { AbstractFormComponent } from 'src/app/shared/abstract-form';
import { SessionData } from 'src/app/security/model/session-data';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-auth-layout',
  templateUrl: './auth-layout.component.html',
  styleUrls: ['./auth-layout.component.scss']
})

export class AuthLayoutComponent extends AbstractFormComponent<Login, AuthService> implements OnInit, OnDestroy {

  data : Date = new Date();
  focus;
  focus1;

  public loginForm = new FormGroup({
    login: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required])
  });

  constructor(
    service: AuthService,
    router: Router,
    activatedRoute: ActivatedRoute,
    dialog: NgbModal,
    snack: ToastService,
  ) {
    super(service, Login, router, activatedRoute, dialog, snack);
  }

  ngOnInit() {
      super.ngOnInit();

      const body = document.getElementsByTagName('body')[0];
      body.classList.add('login-page');

      // var navbar = document.getElementsByTagName('nav')[0];
      // navbar.classList.add('navbar-transparent');

  }
  ngOnDestroy(){

    const body = document.getElementsByTagName('body')[0];
      body.classList.remove('login-page');

      // var navbar = document.getElementsByTagName('nav')[0];
      // navbar.classList.remove('navbar-transparent');
  }

  hide = true;

  get login() {
    return this.loginForm.get('login');
  }
  get password() {
    return this.loginForm.get('password');
  }

  logon() {
    this.service.login(this.obj).subscribe(
      success => {
        let data = new SessionData();
        data.id = success.pid;
        data.employee = success.employee;
        data.strToken = success.strToken;
        sessionStorage.setItem("session-data", JSON.stringify(data));
        this.router.navigate(['/']);
      },
      error => {
        this.toast("Usuário ou Senha inválidos", "", "Error")
      }
    );
  }

}

