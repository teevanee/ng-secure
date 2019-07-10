# ng-secure
Angular 7 app with OIDC and WSO2


Inspired by: https://developer.okta.com/blog/2018/12/04/angular-7-oidc-oauth2-pkce

This version has minor changes to make it work with WSO2-IS


# Adjustments in WSO2:
1) enable CORS => https://docs.wso2.com/display/IS530/Invoking+an+Endpoint+from+a+Different+Domain

2) Library expects for OpenID Connect Discovery:
 <issuer>/.well-known/openid-configuration
Therfore change the WSO2 default setting by folowing the guidlines in https://docs.wso2.com/display/IS570/OpenID+Connect+Discovery


# Changes made in ng-secure app

app.components.ts   =>  use given_name
```
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
```

app.components.ts =>  add strictDiscoveryDocumentValidation: false

```
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
```
