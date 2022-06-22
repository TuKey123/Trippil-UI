import { Component, OnInit } from '@angular/core';
import { finalize, map, Subscription, take } from 'rxjs';
import { User } from 'src/app/core/models/user';
import { AppLoadingService, AuthService } from 'src/app/core/services';
import { ProfileService } from '../../services/profile.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
})
export class SettingsComponent implements OnInit {
  public userProfile!: User;

  constructor(
    private _authService: AuthService,
    private _profileSerivice: ProfileService,
    private _appLoadingService: AppLoadingService
  ) {}

  ngOnInit(): void {
    this._authService.userProfile$
      .pipe(take(1))
      .subscribe((data) => (this.userProfile = data));
  }

  public handleFileInput(e: any): void {
    this._appLoadingService.show();

    const files = [e.files['0']];
    this._profileSerivice
      .uploadAvatar(files)
      .pipe(
        map((data) => {
          const res = data as any;
          return res['body'];
        }),
        finalize(() => this._appLoadingService.hide())
      )
      .subscribe((data) => {
        if (!data) return;

        this.userProfile.image = data.image;
        this._authService.setUserProfile(this.userProfile);
      });
  }

  public onSubmit(e: any): void {
    e.preventDefault();

    this._appLoadingService.show();

    this._profileSerivice
      .updateProfile(this.userProfile)
      .pipe(finalize(() => this._appLoadingService.hide()))
      .subscribe();
  }
}
