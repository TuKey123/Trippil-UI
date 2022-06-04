import { Component } from '@angular/core';
import { UserInput } from 'src/app/core/models/user';
import { AuthService, NavigateService } from 'src/app/core/services';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  public user: Pick<UserInput, 'email' | 'password'> = {
    email: '',
    password: '',
  };

  constructor(
    private _authService: AuthService,
    private _navigateService: NavigateService
  ) {}

  public onSubmit(e: any): void {
    e.preventDefault();

    this._authService.login(this.user).subscribe((data) => {
      this._authService.setToken(data.access);
      this._authService.setUserProfile(data.userProfile);
      this._navigateService.homepage();
    });
  }
}
