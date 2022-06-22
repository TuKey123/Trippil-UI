import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable } from 'rxjs';
import { User } from 'src/app/core/models/user';
import { AuthService } from 'src/app/core/services';
import { ProfileStore } from './store';

@Injectable({ providedIn: 'root' })
export class ProfileResolver implements Resolve<User> {
  constructor(
    private _authService: AuthService,
    private _profileStore: ProfileStore
  ) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<User> {
    const userId = Number(route.paramMap.get('id')?.toString());

    this.initProfile(userId);
    this.initTabItems(userId);

    return userId
      ? this._authService.getUserProfileId(userId)
      : this._authService.getUserProfile();
  }

  public initProfile(userId: number): void {
    const isMyProfile = userId ? false : true;

    this._profileStore.setIsMyProfileStore(isMyProfile);
  }

  public initTabItems(userId: number): void {
    const tabItems = [
      {
        routerLink: userId
          ? `/profile/public/${userId}/trips`
          : '/profile/public/trips',
        name: 'TRIPS',
      },
      {
        routerLink: userId
          ? `/profile/public/${userId}/albums`
          : '/profile/public/albums',
        name: 'ALBUMS',
      },
      {
        routerLink: userId
          ? `/profile/public/${userId}/appreciated`
          : '/profile/public/appreciated',
        name: 'APRRECIATED',
      },
    ];

    this._profileStore.setTabItemsStore(tabItems);
  }
}
