import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Album } from 'src/app/core/models/album';
import { Trip, TripItem } from 'src/app/core/models/trip';
import { User } from 'src/app/core/models/user';

@Injectable()
export class ProfileStore {
  constructor() {}
  private _userProfile$ = new BehaviorSubject<any>(null);

  public get userProfile$(): BehaviorSubject<User> {
    return this._userProfile$;
  }

  private _albums$ = new BehaviorSubject<Album[]>([]);
  public get albums$(): BehaviorSubject<Album[]> {
    return this._albums$;
  }

  private _trips$ = new BehaviorSubject<Trip[]>([]);
  public get trips$(): BehaviorSubject<Trip[]> {
    return this._trips$;
  }

  private _itemsShared$ = new BehaviorSubject<TripItem[]>([]);
  public get itemsShared$(): BehaviorSubject<TripItem[]> {
    return this._itemsShared$;
  }

  private _isMyProfile$ = new BehaviorSubject<boolean>(false);
  public get isMyProfile$(): BehaviorSubject<boolean> {
    return this._isMyProfile$;
  }

  private _tabItems$ = new BehaviorSubject<
    { routerLink: string; name: string }[]
  >([]);
  public get tabItems$(): BehaviorSubject<
    { routerLink: string; name: string }[]
  > {
    return this._tabItems$;
  }

  private _showTripPopup$ = new BehaviorSubject<boolean>(false);
  public get showTripPopup$(): BehaviorSubject<boolean> {
    return this._showTripPopup$;
  }

  private _showAlbumPopup$ = new BehaviorSubject<boolean>(false);
  public get showAlbumPopup$(): BehaviorSubject<boolean> {
    return this._showAlbumPopup$;
  }

  public setUserProfileStore(userProfile: User): void {
    this._userProfile$.next(userProfile);
  }

  public updateUserProfileLikes(increase: boolean): void {
    const userPofile = this._userProfile$.value;
    userPofile.numberOfLikes = userPofile.numberOfLikes + (increase ? 1 : -1);

    this._userProfile$.next(userPofile);
  }

  public setTripsStore(trips: Trip[]): void {
    this._trips$.next(trips);
  }

  public setAlbumsStore(albums: Album[]): void {
    this._albums$.next(albums);
  }

  public removeAlbumStore(album: Album): void {
    const albums = this._albums$.value.filter((data) => data.id !== album.id);

    this._albums$.next(albums);
  }

  public updateTripStore(data: Trip): void {
    const trips = this._trips$.value.map((trip) =>
      trip?.id === data.id ? data : trip
    );

    this._trips$.next(trips);
  }

  public createAlbumStore(data: Album): void {
    const albums = this._albums$.value.concat(data);

    this.albums$.next(albums);
  }

  public setIsMyProfileStore(value: boolean): void {
    this._isMyProfile$.next(value);
  }

  public setTabItemsStore(value: { routerLink: string; name: string }[]): void {
    this._tabItems$.next(value);
  }

  public setShowTripPopup(value: boolean): void {
    this._showTripPopup$.next(value);
  }

  public setShowAlbumPopup(value: boolean): void {
    this._showAlbumPopup$.next(value);
  }

  public addNewTrip(data: Trip): void {
    const trips = this._trips$.value;
    this._trips$.next([...trips, data]);
  }

  public removeTrip(id: number): void {
    const trips = this._trips$.value.filter((trip) => trip?.id !== id);
    this._trips$.next(trips);
  }

  public setItemsSharedStore(items: TripItem[]): void {
    this._itemsShared$.next(items);
  }
}
