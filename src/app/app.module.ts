import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { ToastrModule } from 'ngx-toastr';

import { AppComponent } from './app.component';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppRoutingModule } from './app-routing.module';
import { ComponentsModule } from './components/components.module';
import { DialogComponent } from './shared/dialog/dialog.component';
import { ToastGlobalComponent } from './shared/toast/toast-global/toast-global.component';
import { ToastsContainer } from './shared/toast/toasts-container/toasts-container.component';
import { HttpInterceptorService } from './security/auth/interceptors/http/http-interceptor.service';

@NgModule({
  imports: [
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    ComponentsModule,
    NgbModule,
    RouterModule,
    AppRoutingModule,
    ToastrModule.forRoot(),
  ],
  exports: [
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  declarations: [AppComponent, AdminLayoutComponent, AuthLayoutComponent, ToastGlobalComponent, ToastsContainer ],
  providers: [ {
    provide: HTTP_INTERCEPTORS,
    useClass: HttpInterceptorService,
    multi: true
  } ],
  bootstrap: [ AppComponent ]
})
export class AppModule {}
