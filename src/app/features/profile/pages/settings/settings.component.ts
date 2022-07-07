import { Component, OnInit } from '@angular/core';
import { filter, finalize, map, take } from 'rxjs';
import { User } from 'src/app/core/models/user';
import {
  AppLoadingService,
  AuthService,
  UploadFileService,
} from 'src/app/core/services';
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
    private _appLoadingService: AppLoadingService,
    private _uploadFileService: UploadFileService
  ) {}

  ngOnInit(): void {
    this._authService.userProfile$
      .pipe(take(1))
      .subscribe((data) => (this.userProfile = { ...data }));
  }

  public handleFileInput(event: any): void {
    this._appLoadingService.show();

    const files = [event.target.files['0']];
    this._uploadFileService
      .uploadImage(files)
      .pipe(
        map((data) => (data as any).body),
        filter((data) => !!data),
        finalize(() => this._appLoadingService.hide())
      )
      .subscribe((data) => (this.userProfile.image = data.image));
  }

  public onSubmit(e: any): void {
    e.preventDefault();

    this._appLoadingService.show();

    const dateOfBirth = this.userProfile.dateOfBirth as Date;

    this._profileSerivice
      .updateProfile({
        firstName: this.userProfile.firstName,
        lastName: this.userProfile.lastName,
        about: this.userProfile.about,
        dateOfBirth:
          typeof dateOfBirth === 'string'
            ? dateOfBirth
            : dateOfBirth?.toISOString().split('T')[0],
        image: this.userProfile?.image ?? '',
      })
      .pipe(finalize(() => this._appLoadingService.hide()))
      .subscribe((profile) =>
        this._authService.setUserProfile({
          ...this.userProfile,
          about: profile?.about,
          firstName: profile?.firstName,
          lastName: profile?.lastName,
          image: profile?.image,
          dateOfBirth: profile?.dateOfBirth,
        })
      );
  }
}
