import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TripItem } from 'src/app/core/models/trip';
import { User } from 'src/app/core/models/user';
import { ApiService } from 'src/app/core/services';

@Injectable({
  providedIn: 'root',
})
export class ItemService {
  constructor(private _apiService: ApiService) {}

  public getItemDetail(id: number): Observable<TripItem & { ownerId: number }> {
    return this._apiService.get(`items/${id}/`);
  }

  public getItemOwner(id: number): Observable<User> {
    return this._apiService.get(`items/${id}/user`);
  }
}
