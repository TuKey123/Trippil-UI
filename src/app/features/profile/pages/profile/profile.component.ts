import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription, take } from 'rxjs';
import { AppLoadingService } from 'src/app/core/services';
import { ProfileService } from '../../services/profile.service';
import { ProfileStore } from '../../store';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit, OnDestroy {
  public userProfile$ = this._profileStore.userProfile$;
  public tabItems$ = this._profileStore.tabItems$;
  public showTripPopup$ = this._profileStore.showTripPopup$;
  public showAlbumPopup$ = this._profileStore.showAlbumPopup$;

  public isMyProfile = false;

  private _subscription = new Subscription();
  public set subs(sub: Subscription) {
    this._subscription.add(sub);
  }

  constructor(
    private _profileService: ProfileService,
    private _profileStore: ProfileStore,
    private _activedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.subs = this._activedRoute.data.subscribe(({ userProfile }) => {
      this._profileStore.setUserProfileStore(userProfile);

      this._profileService
        .getUserAlbums(userProfile?.id)
        .subscribe((albums) => this._profileStore.setAlbumsStore(albums));
    });

    this._profileStore.isMyProfile$
      .pipe(take(1))
      .subscribe((data) => (this.isMyProfile = data));
  }

  ngOnDestroy(): void {
    this.subs?.unsubscribe();
  }
}
