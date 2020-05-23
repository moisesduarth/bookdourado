import { Routes } from '@angular/router';
import { BookListComponent } from 'src/app/pages/books/book-list/book-list.component';
import { UserFormComponent } from 'src/app/pages/user/user-form/user-form.component';

export const AdminLayoutRoutes: Routes = [
  // { path: 'dashboard', component: DashboardComponent },
  { path: 'user', component: UserFormComponent },
  { path: 'book', component: BookListComponent },
];
