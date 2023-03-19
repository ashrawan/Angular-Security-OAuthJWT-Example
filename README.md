
# Angular Security with OAuth2 and Custom JWT

- Module Based implementation (auth, core, features, shared), Angular 11 with Bootstrap 5
- Custom register/login, password-reset included
- Public & Authenticated Pages, param based routing and form validations

 Link:
- [ ] Backend: https://github.com/ashrawan/Spring-Security-OAuth-Example
- [x] Viewing Frontend: https://github.com/ashrawan/Angular-Security-OAuthJWT-Example

## __Basic Setup - Main Structure:__

- __Auth Module__ : Login, Signup and authentication related services
- __Core Module__ : Global Constants/Utils/Models, All Services, URL Constant etc. (anything global/abstract/core, and reusable tools/constant)
- __Feature Module__ : App specific components.   
__This App (Angular Sample Starter)__ : 
    - __Public Pages__ (publicy accessible related components)
    - __Dashboard__ (user dasboard, can be general or user specific. e.g Admin/Normal-User)
- __Shared Module__ : Generic Components that can be used anywhere (Buttons, Inputs, Loading, Icons, card-component etc. )


- __Additional Notes__:
    - _If App Code-Base Scales ?_ : Create or Modify feature/components/view under their own baseline module; _i.e create modules to group them_. 
        - Import modules only when required and use lazy loading.
    - _Need to add or test a new functionality ?_ : Create a seperate modules in root directory "/app", and use as required.
    - _Need custom css with component/section seperation ?_ : Create main folder "Styles" and other structure as required. Use SCSS file and import them into main styles.scss file. 

## # Initialized
This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 11.0.5.

## # Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

```cmd
ng serve
```
## # Project Structure and Overview  

- Folder Structure
```
app
    -> auth
        services
        guards
        login-page
        signup-page
        verify-request
        _auth.model.ts_
    -> core
        model (users, ....)
        services
        [app-url.constant, core.constant, core.util ...]
    -> features
        ->dashboard
            components (general components - sidebar, nav etc.)
            dash-main (main dashboard page)
            ...other pages
        -> public-pages
            components (general - top-navigation, footer etc.)
            home-page
            contact-page
            ...other pages
    -> shared
        loading
        custom-card-component
        buttons,
        etc...
    _app.module.ts_

    => assets
    => environments
    _main.ts_ (entry point)
    
    index.html  (<app-root> renders-entry-point </app-root>)
    styles.scss
    => OPTIONAL: [styles] - folder containing styles files

    angular.json
    package.json
    tsconfig.app.json
    tslint.json
```


---

## # API endpoints
- core -> _app-url.constant.ts_ API endpoint

```js
    // e.g. Authentication endpoints
    static readonly AUTH = {
        CUSTOM_USER_REGISTRATION: API_ENDPOINT + '/auth/register',
        CUSTOM_USER_LOGIN: API_ENDPOINT + '/auth/login',

        CHECK_VERIFICATION_CODE: API_ENDPOINT + '/auth/check-verification-code',
        RESEND_VERIFICATION_EMAIL: API_ENDPOINT + '/auth/resend-verification-email',
        FORGOT_PASSWORD: API_ENDPOINT + '/auth/send-forgot-password',
        PASSWORD_RESET_SET_NEW_PASS: API_ENDPOINT + '/auth/process-password-reset',


        // '/oauth2/authorize/google?redirect_uri=' + API_ENDPOINT
        GOOGLE_AUTH: API_ENDPOINT + '/oauth2/authorize/google?' + OAUTH2_UI_REDIRECT_URI,
        FACEBOOK_AUTH: API_ENDPOINT + '/oauth2/authorize/facebook?' + OAUTH2_UI_REDIRECT_URI,
        GITHUB_AUTH: API_ENDPOINT + '/oauth2/authorize/github?' + OAUTH2_UI_REDIRECT_URI,

        LOGOUT: API_ENDPOINT + '/logout',

    };
```

## # Front App Routes
- core ->

```js
export const APP_ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  REGISTER: '/register',
  VERIFY: '/verify',

  CONTACT: '/contact',
  SOLUTIONS: '/solutions',


  DASHBOARD: '/dashboard',
};
```


## # Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
