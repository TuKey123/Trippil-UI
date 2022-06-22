import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { finalize, map, Subscription, take } from 'rxjs';
import { Trip } from 'src/app/core/models/trip';
import { AppLoadingService, UploadFileService } from 'src/app/core/services';
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

  public showAlbumPopup = false;
  public showTripPopup = false;
  public isMyProfile = false;
  public albumName = '';

  public trip!: Trip;

  private _subscription = new Subscription();
  public set subs(sub: Subscription) {
    this._subscription.add(sub);
  }

  constructor(
    private _profileService: ProfileService,
    private _profileStore: ProfileStore,
    private _appLoadingService: AppLoadingService,
    private _activedRoute: ActivatedRoute,
    private _uploadFileService: UploadFileService
  ) {}

  ngOnInit(): void {
    this.resetTripData();

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

  public resetTripData(): void {
    this.trip = {
      id: 0,
      name: '',
      location: '',
    };
  }

  public onAddNewTrip(event: any): void {
    event.preventDefault();
  }

  public onRemoveTripImage(): void {
    this.trip.image = '';
  }

  public onAddNewAlbum(e: any): void {
    e.preventDefault();

    this.showAlbumPopup = false;

    this._appLoadingService.show();

    this._profileService
      .createAlbum(this.albumName)
      .pipe(finalize(() => this._appLoadingService.hide()))
      .subscribe((data) => this._profileStore.createAlbumStore(data));

    this.albumName = '';
  }

  public onFileSelect(event: any): void {
    this._appLoadingService.show();

    const files = [event.target.files['0']];
    this._uploadFileService
      .uploadImage(files)
      .pipe(
        map((data) => {
          const res = data as any;
          return res.body;
        }),
        finalize(() => this._appLoadingService.hide())
      )
      .subscribe((data) => {
        if (!data) return;
        this.trip.image = data.image;
      });
  }
}
