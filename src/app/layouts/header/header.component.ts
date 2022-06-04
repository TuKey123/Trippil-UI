import { Component } from '@angular/core';
import { AuthService, NavigateService } from 'src/app/core/services';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  constructor(
    private _authService: AuthService,
    private _navigateService: NavigateService
  ) {}

  public logout(): void {
    this._authService.removeToken();
    this._navigateService.login();
  }
}
