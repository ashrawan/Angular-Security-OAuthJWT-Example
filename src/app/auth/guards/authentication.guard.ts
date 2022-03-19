import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { APP_ROUTES, QueryParamKey } from '@app/core/core.constant';
import { Observable } from 'rxjs';
import { CredentialsService } from '../services/credentials.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationGuard implements CanActivate {

  constructor(private router: Router, private credentialsService: CredentialsService) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (this.credentialsService.isAuthenticated()) {
      return true;
    }

    console.log('Not authenticated, redirecting and adding redirect url...');
    const LoginRoutePath = APP_ROUTES.LOGIN;
    this.router.navigate([LoginRoutePath], { queryParams: { [QueryParamKey.ORIGINAL_REQUEST_URI]: state.url }, replaceUrl: true });
    return false;
  }

}
