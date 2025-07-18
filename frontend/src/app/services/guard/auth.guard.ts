import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const isLoginPage = state.url === '/login';
    if (this.authService.isLoggedIn()) {
      if (isLoginPage) {
        this.router.navigate(['/principal']);
        return false;
      }
      return true;
    } else {
      if (isLoginPage) {
        return true;
      }
      this.router.navigate(['/login']);
      return false;
    }
  }
}
