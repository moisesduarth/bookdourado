import { Injectable } from '@angular/core';
import { CanActivateChild, UrlTree, RouterStateSnapshot, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../../service/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardChildService implements CanActivateChild {

  constructor(private router: Router, private authService:AuthService) { }
  canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    const currentUser = this.authService.currentLoginValue;
    if (currentUser){
      return true;
    }
    this.router.navigate(['/login'], {queryParams: {returnUrl: state.url}});
    return false;
  }
}
