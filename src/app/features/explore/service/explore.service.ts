import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Trip, TripItem } from 'src/app/core/models/trip';
import { User } from 'src/app/core/models/user';
import { ApiService } from 'src/app/core/services';

@Injectable()
export class ExploreService {
  constructor(private _apiService: ApiService) {}

  public getUsers(searchTerm: string): Observable<User[]> {
    return this._apiService.get(`users/?search=${searchTerm}`);
  }

  public getTrips(searchTerm: string): Observable<Trip[]> {
    return this._apiService.get(`trips/all/?search=${searchTerm}`);
  }

  public getItems(searchTerm: string): Observable<TripItem[]> {
    return this._apiService.get(`items/shared/all/?search=${searchTerm}`);
  }

  public likeTrip(tripId: number): Observable<any> {
    return this._apiService.update(`trips/${tripId}/like/`, {});
  }

  public likeItem(itemId: number): Observable<any> {
    return this._apiService.update(`items/${itemId}/like/`, {});
  }
}
