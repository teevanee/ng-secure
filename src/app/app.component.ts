import { Component } from '@angular/core';
import { OAuthService, JwksValidationHandler, AuthConfig } from 'angular-oauth2-oidc';

export const authConfig: AuthConfig = {
  // Url of the Identity Provider
  issuer: 'https://localhost:9443/oauth2/token',

  // Login Url of the Identity Provider
  //loginUrl: '	https://localhost:9443/oauth2/authorize',

  // Login Url of the Identity Provider
  //logoutUrl: 'https://localhost:9443/oidc/logout',


  // URL of the SPA to redirect the user to after login
  redirectUri: window.location.origin,

  // The SPA's id. The SPA is registerd with this id at the auth-server
  clientId: 'm2TMqLEv0YyGMj7zqTB6YIfLfuEa',
  // set the scope for the permissions the client should request
  // The first three are defined by OIDC. Also provide user sepecific
  scope: 'openid profile email',
  strictDiscoveryDocumentValidation: false
};

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'ng-secure';

  constructor(private oauthService: OAuthService) {
    this.oauthService.configure(authConfig);
    this.oauthService.tokenValidationHandler = new JwksValidationHandler();
    this.oauthService.loadDiscoveryDocumentAndTryLogin();
  }

  login() {
    this.oauthService.initImplicitFlow();
  }

  logout() {
    this.oauthService.logOut();
  }

  get givenName() {
    const claims = this.oauthService.getIdentityClaims();
    if (!claims) {
      return null;
    }
//    return claims['username'];
    return claims['given_name'];
  }

  get email() {
    const claims = this.oauthService.getIdentityClaims();
    if (!claims) {
      return null;
    }
    return claims['email'];
  }
}
