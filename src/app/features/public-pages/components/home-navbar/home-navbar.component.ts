import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '@app/auth/services/authentication.service';
import { appBrandName } from '@app/core/core.constant';
import { CredentialsService } from '@app/auth/services/credentials.service';

@Component({
  selector: 'app-home-navbar',
  templateUrl: './home-navbar.component.html',
  styleUrls: ['./home-navbar.component.scss']
})
export class HomeNavbarComponent implements OnInit {

  readonly appBrandName = appBrandName;

  isNavCollapse: boolean = true;
  isLoggedIn: boolean = false;
  firstName: string | undefined; // TODO replace with firstname, fullname or substring email..

  constructor(private credentialsService: CredentialsService, private authenticationService: AuthenticationService) { }

  ngOnInit(): void {
    this.initializeLoggedInDetails();
  }

  private initializeLoggedInDetails() {
    this.isLoggedIn = this.credentialsService.isAuthenticated();
    if (this.isLoggedIn) {
      const credentials = this.credentialsService.getCredentials();
      this.firstName = credentials?.email;
    }
  }

  toggleNavbarClass(): void {
    this.isNavCollapse = !this.isNavCollapse;
  }

  logout() {
    this.authenticationService.logout();
  }

}
