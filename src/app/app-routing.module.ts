// import { NgModule } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { BrowserModule } from '@angular/platform-browser';
// import { Routes, RouterModule } from '@angular/router';

// import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
// import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';

// const routes: Routes = [
//   {
//     path: '',
//     redirectTo: 'book',
//     pathMatch: 'full'
//   },
//   {
//     path: '',
//     component: AdminLayoutComponent,
//     children: [
//       {
//         path: '',
//         loadChildren:
//           './layouts/admin-layout/admin-layout.module#AdminLayoutModule'
//       }
//     ]
//   }, {
//     path: '',
//     component: AuthLayoutComponent,
//     children: [
//       {
//         path: '',
//         loadChildren: './layouts/auth-layout/auth-layout.module#AuthLayoutModule'
//       }
//     ]
//   },
//   {
//     path: '**',
//     redirectTo: 'dashboard'
//   }
// ];



// @NgModule({
//   imports: [
//     CommonModule,
//     BrowserModule,
//     RouterModule.forRoot(routes, {
//       useHash: true
//     })
//   ],
//   exports: [RouterModule]
// })
// export class AppRoutingModule {}



import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NotFoundComponent } from './pages/not-found/not-found.component';
import { AuthGuardService } from './security/auth/auth-guard/auth-guard.service';
import { AuthGuardChildService } from './security/auth/auth-guard/child/auth-guard-child.service';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';

const routes: Routes = [
  // after login
  {
    path: '',
    component: AdminLayoutComponent,
    canActivateChild: [AuthGuardChildService],
    children: [
      {
        path: '',
        loadChildren: () => import('./pages/books/book.module').then(mod => mod.BookModule),
        canActivate: [AuthGuardService]
      },
      {
        path: 'user',
        loadChildren: () => import('./pages/user/user.module').then(mod => mod.UserModule),
        canActivate: [AuthGuardService]
      },
      {
        path: 'book',
        loadChildren: () => import('./pages/books/book.module').then(mod => mod.BookModule),
        canActivate: [AuthGuardService]
      },
    ]
  },
  // before login
  {
    path: '',
    component: AuthLayoutComponent,
    children: [
      {
        path: 'login',
        loadChildren: () => import('./security/security.module').then(mod => mod.SecurityModule)
      }
    ]
  },

  { path: '', redirectTo: '', pathMatch: 'full' },

  { path: '**', component: NotFoundComponent }
];


@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true, onSameUrlNavigation: 'reload', enableTracing: false })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
