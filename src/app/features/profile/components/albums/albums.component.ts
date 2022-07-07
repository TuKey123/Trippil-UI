import { Component, OnDestroy, OnInit } from '@angular/core';
import { finalize, Subscription } from 'rxjs';
import { Album } from 'src/app/core/models/album';
import { Trip } from 'src/app/core/models/trip';
import { User } from 'src/app/core/models/user';
import { AppLoadingService, NavigateService } from 'src/app/core/services';
import { ProfileService } from '../../services/profile.service';
import { ProfileStore } from '../../store';

@Component({
  selector: 'app-albums',
  templateUrl: './albums.component.html',
  styleUrls: ['./albums.component.scss'],
})
export class AlbumsComponent implements OnInit, OnDestroy {
  public albums$ = this._profileStore.albums$;
  public isMyProfile$ = this._profileStore.isMyProfile$;
  public showAlbumPopup$ = this._profileStore.showAlbumPopup$;

  public loading = false;
  public isSidePanelOpened = false;
  public showAlbumPopup = false;
  public albumName = '';
  public userProfile!: User;

  public albumDetails!: Album;

  private _subscription = new Subscription();
  public set subs(sub: Subscription) {
    this._subscription.add(sub);
  }

  constructor(
    private _profileService: ProfileService,
    private _profileStore: ProfileStore,
    private _navigateService: NavigateService,
    private _appLoadingService: AppLoadingService
  ) {}

  ngOnInit(): void {
    this.subs = this.showAlbumPopup$.subscribe(
      (data) => (this.showAlbumPopup = data)
    );

    this.subs = this._profileStore.userProfile$.subscribe((userProfile) => {
      this.userProfile = userProfile;
      this.getUserAlbums(userProfile);
    });
  }

  ngOnDestroy(): void {
    this.showAlbumPopup$.next(false);
    this.subs?.unsubscribe();
  }

  public getUserAlbums(userProfile: User): void {
    this.loading = true;

    this._profileService
      .getUserAlbums(userProfile?.id)
      .pipe(finalize(() => (this.loading = false)))
      .subscribe((albums) => this._profileStore.setAlbumsStore(albums));
  }

  public showAlbumDetails(album: Album): void {
    this.loading = true;

    this._profileService
      .getAlbumDetails(album.id)
      .pipe(finalize(() => (this.loading = false)))
      .subscribe((data) => {
        this.isSidePanelOpened = true;
        this.albumDetails = data;
      });
  }

  public onAddNewAlbum(): void {
    this.showAlbumPopup = false;

    this._appLoadingService.show();

    this._profileService
      .createAlbum(this.albumName)
      .pipe(finalize(() => this._appLoadingService.hide()))
      .subscribe((data) => this._profileStore.createAlbumStore(data));

    this.albumName = '';
  }

  public onRemoveAlbum(album: Album): void {
    this.loading = true;

    this._profileService
      .removeAlbum(album.id)
      .pipe(finalize(() => (this.loading = false)))
      .subscribe(() => this._profileStore.removeAlbumStore(album));
  }

  public onRemoveTrip(trip: Trip): void {
    this.loading = true;
    this.isSidePanelOpened = false;

    this._profileService
      .removeTripFromAlbum(this.albumDetails, trip)
      .pipe(finalize(() => (this.loading = false)))
      .subscribe(() => this.getUserAlbums(this.userProfile));
  }

  public onSave(): void {
    this.loading = true;
    this.isSidePanelOpened = false;

    this._profileService
      .updateAlbum(this.albumDetails)
      .pipe(finalize(() => (this.loading = false)))
      .subscribe(() => this.getUserAlbums(this.userProfile));
  }

  public onClick(album: Album): void {
    this._navigateService.albumDetails(album.id);
  }
}
