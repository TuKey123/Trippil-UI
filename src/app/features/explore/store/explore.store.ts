import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Trip, TripItem } from 'src/app/core/models/trip';
import { User } from 'src/app/core/models/user';

@Injectable()
export class ExploreStore {
  private _searchTerm$ = new BehaviorSubject<string>(' ');

  public get searchTerm$(): BehaviorSubject<string> {
    return this._searchTerm$;
  }

  public setSerchTermStore(value: string): void {
    this.searchTerm$.next(value);
  }

  private _users$ = new BehaviorSubject<any>(null);

  public get users$(): BehaviorSubject<User[]> {
    return this._users$;
  }

  public setUsersStore(users: User[]): void {
    this._users$.next(users);
  }

  private _trips$ = new BehaviorSubject<any>(null);

  public get trips$(): BehaviorSubject<Trip[]> {
    return this._trips$;
  }

  public setTripsStore(trips: Trip[]): void {
    this._trips$.next(trips);
  }

  private _items$ = new BehaviorSubject<any>(null);

  public get items$(): BehaviorSubject<TripItem[]> {
    return this._items$;
  }

  public setItemsStore(items: TripItem[]): void {
    this._items$.next(items);
  }

  public setDefaultData(): void {
    this._users$.next([]);
    this._trips$.next([]);
    this._items$.next([]);
  }
}
