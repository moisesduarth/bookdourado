import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { AdminLayoutRoutes } from './admin-layout.routing';
import { DashboardComponent } from '../../pages/dashboard/dashboard.component';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BookFormComponent } from 'src/app/pages/books/book-form/book-form.component';
import { BookListComponent } from 'src/app/pages/books/book-list/book-list.component';
import { UserFormComponent } from 'src/app/pages/user/user-form/user-form.component';
import { UserListComponent } from 'src/app/pages/user/user-list/user-list.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AdminLayoutRoutes),
    FormsModule,
    HttpClientModule,
    NgbModule,
  ],
  declarations: [
    DashboardComponent,
    UserFormComponent,
    UserListComponent,
    BookFormComponent,
    BookListComponent
  ]
})
export class AdminLayoutModule {}
