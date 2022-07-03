import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TripDetail, TripItem } from 'src/app/core/models/trip';
import { User } from 'src/app/core/models/user';
import { ApiService } from 'src/app/core/services';

@Injectable({
  providedIn: 'root',
})
export class TripDetailService {
  constructor(private _apiService: ApiService) {}

  public getTripDetail(id: number): Observable<TripDetail> {
    return this._apiService.get(`trips/${id}/`);
  }

  public updateTripDetails(
    tripDetail: Pick<
      TripDetail,
      'id' | 'name' | 'description' | 'startDate' | 'endDate' | 'image'
    >
  ): Observable<TripDetail> {
    return this._apiService.update(`trips/${tripDetail.id}/`, tripDetail);
  }

  public addTripItem(
    tripItem: Pick<TripItem, 'trip' | 'lat' | 'lng' | 'location'>
  ): Observable<TripItem> {
    return this._apiService.post(`items/`, tripItem);
  }

  public removeTripItem(tripId: number, itemId: number): Observable<number> {
    return this._apiService.delete(`trips/${tripId}/items/${itemId}`);
  }

  public updateTripItem(
    tripItem: Omit<TripItem, 'ordinal' | 'marker' | 'isShared'>
  ): Observable<Omit<TripItem, 'marker'>> {
    return this._apiService.update(`items/${tripItem.id}/`, tripItem);
  }

  public shareItem(itemId: number, isShared: boolean): Observable<any> {
    return this._apiService.update(`items/${itemId}/share/`, { isShared });
  }

  public usersSharedItem(
    itemId: number
  ): Observable<(User & { numberOfLikes: number; itemId: number })[]> {
    return this._apiService.get(`items/${itemId}/users_shared/`);
  }

  public likeItem(itemId: number): Observable<any> {
    return this._apiService.update(`items/${itemId}/like/`, {});
  }

  public updateItemOrdinal(itemId: number, ordinal: number): Observable<any> {
    return this._apiService.update(`items/${itemId}/update_ordinal/`, {
      ordinal,
    });
  }

  public getItemDetail(tripId: number, itemId: number): Observable<TripItem> {
    return this._apiService.get(`trips/${tripId}/item_details/${itemId}/`);
  }
}
