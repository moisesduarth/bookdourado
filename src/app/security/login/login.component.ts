import { Component, OnInit, Directive, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../auth/service/auth.service';
import { Login } from '../model/login';
import { AbstractFormComponent } from 'src/app/shared/abstract-form';
import { DialogComponent } from 'src/app/shared/dialog/dialog.component';
import { ToastsContainer } from 'src/app/shared/toast/toasts-container/toasts-container.component';
import { NgbModal, NgbToast } from '@ng-bootstrap/ng-bootstrap';
import { ToastService } from 'src/app/shared/toast/toast-service/toast.service';
import { SessionData } from '../model/session-data';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent extends AbstractFormComponent<Login, AuthService> {
  hide = true;
  public loginForm = new FormGroup({
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required])
  });
  get username() {
    return this.loginForm.get('username');
  }
  get password() {
    return this.loginForm.get('password');
  }
  constructor(
    service: AuthService,
    router: Router,
    activatedRoute: ActivatedRoute,
    dialog: NgbModal,
    snack: ToastService,
  ) {
    super(service, Login, router, activatedRoute, dialog, snack);
  }


  login() {
    this.service.login(this.obj).subscribe(
      success => {
        let data = new SessionData();
        data.id = success.id;
        data.login = success.login;
        data.strToken = success.strToken;
        // data.profile = success.profile;
        sessionStorage.setItem("session-data", JSON.stringify(data));
        this.router.navigate(['/']);
      },
      error => {
        this.toast("Usuário ou Senha inválidos", "", "Error")
      }
    );
  }
}
