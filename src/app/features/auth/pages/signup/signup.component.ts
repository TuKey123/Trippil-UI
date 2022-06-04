import { Component } from '@angular/core';
import { UserInput } from 'src/app/core/models/user';
import { AuthService } from 'src/app/core/services';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent {
  public progressValue = 30;

  public user: UserInput = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    verifyCode: '',
  };

  constructor(private _authService: AuthService) {}

  public signup(user: UserInput): void {
    this.user = { ...this.user, ...user };

    this._authService
      .sendEmail(this.user.email)
      .subscribe(() => (this.progressValue += 30));
  }

  public sendVerifyCode(verifyCode: string): void {
    this.user = { ...this.user, verifyCode: verifyCode };

    this._authService
      .signup(this.user)
      .subscribe(() => (this.progressValue += 30));
  }
}
