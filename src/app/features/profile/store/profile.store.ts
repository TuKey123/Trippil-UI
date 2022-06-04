import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Album } from 'src/app/core/models/album';
import { Trip } from 'src/app/core/models/trip';
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

  public setUserProfileStore(userProfile: User): void {
    this._userProfile$.next(userProfile);
  }

  public setTripsStore(trips: Trip[]): void {
    this._trips$.next(trips);
  }

  public setAlbumsStore(albums: Album[]): void {
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
}
