import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Trip, TripDetail, TripItem } from 'src/app/core/models/trip';
import { ApiService } from 'src/app/core/services';

@Injectable()
export class TripDetailService {
  constructor(private _apiService: ApiService) {}

  public getTripDetail(id: number): Observable<TripDetail> {
    return this._apiService.get(`trips/${id}/`);
  }

  public updateTripDetails(
    tripDetail: Omit<TripDetail, 'items' | 'owner' | 'collaborators'>
  ): Observable<Omit<TripDetail, 'items' | 'owner' | 'collaborators'>> {
    return this._apiService.update(`trips/${tripDetail.id}/`, tripDetail);
  }

  public addTripItem(
    tripItem: Omit<TripItem, 'id' | 'marker'>
  ): Observable<Omit<TripItem, 'marker'>> {
    return this._apiService.post(`items/`, tripItem);
  }

  public removeTripItem(tripId: number, itemId: number): Observable<number> {
    return this._apiService.delete(`trips/${tripId}/items/${itemId}`);
  }
}
