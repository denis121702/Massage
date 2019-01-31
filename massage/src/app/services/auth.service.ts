import { Injectable } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { map } from 'rxjs/operators';

import {ConfigurationService} from './configuration.service';

@Injectable()
export class AuthService {

  public get loginUrl() { return this.configurations.loginUrl; }
  public get homeUrl() { return this.configurations.homeUrl; }

  public loginRedirectUrl: string;
  public logoutRedirectUrl: string;

  constructor(private router: Router,
              private configurations: ConfigurationService) {
  }

  redirectLogoutUser() {
    const redirect = this.logoutRedirectUrl ? this.logoutRedirectUrl : this.loginUrl;
    this.logoutRedirectUrl = null;

    this.router.navigate([redirect]);
  }

  redirectForLogin() {
    this.loginRedirectUrl = this.router.url;
    this.router.navigate([this.loginUrl]);
  }

  login(userName: string, password: string, rememberMe?: boolean) {

    if (this.isLoggedIn) {
      this.logout();
    }

    return this.endpointFactory.getLoginEndpoint<LoginResponse>(userName, password).pipe(
      map(response => this.processLoginResponse(response, rememberMe)));
  }

  get isLoggedIn(): boolean {
    return this.currentUser != null;
  }

  get rememberMe(): boolean {
    return this.localStorage.getDataObject<boolean>(DBkeys.REMEMBER_ME) === true;
  }
}
