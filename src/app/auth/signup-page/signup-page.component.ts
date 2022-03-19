import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { appBrandName } from '@app/core/core.constant';
import { CoreUtil } from '@app/core/core.util';
import { OAuth2Provider, RegisterContext } from '../auth.model';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-signup-page',
  templateUrl: './signup-page.component.html',
  styleUrls: ['./signup-page.component.scss']
})
export class SignupPageComponent implements OnInit {

  readonly appBrandName = appBrandName;
  readonly OAuth2Provider = OAuth2Provider;

  loading: boolean = false;
  hasError: boolean = false;
  responseMessage: string = '';

  // Form state
  registrationForm!: FormGroup;
  isTermsChecked: boolean = false;
  isSubmitted = false;

  constructor(private formBuilder: FormBuilder,
    private authenticationService: AuthenticationService) {
  }

  ngOnInit(): void {
    this.initializeRegistrationForm();
  }

  initializeRegistrationForm(): void {
    this.registrationForm = this.formBuilder.group({
      fullName: ['', [Validators.required]],
      email: ['', [Validators.required]],
      password: ['', [Validators.required]],
      passwordConfirm: ['', Validators.required]
    }, {
      validator: CoreUtil.ConfirmedValidator('password', 'passwordConfirm')
    });
  }


  get formControls(): { [p: string]: AbstractControl } {
    return this.registrationForm.controls;
  }

  onRegisterSubmit(): void {
    this.isSubmitted = true;
    if (this.registrationForm.invalid) {
      return;
    }
    const formValue = this.registrationForm.value;
    const registerContext: RegisterContext = {
      fullName: formValue.fullName,
      email: formValue.email,
      password: formValue.password
    };
    this.loading = true;
    this.responseMessage = '';
    this.authenticationService.registerUser(registerContext, false)
      .pipe()
      .subscribe(
        res => {
          this.loading = false;
          this.hasError = false;
          this.responseMessage = 'Registration Successful, Please check your email for verification.';
          this.isSubmitted = false;
          this.registrationForm.reset();
          console.log('registration response ', res);
        },
        err => {
          this.loading = false;
          this.hasError = true;
          this.responseMessage = err?.error?.response || 'Sorry! Something went wrong !!!';
        }
      );
  }

  public onOAuth2SocialButtonClick(oauth2Provider: OAuth2Provider) {
    this.authenticationService.onOAuth2ButtonClick(oauth2Provider, {});
  }

}
