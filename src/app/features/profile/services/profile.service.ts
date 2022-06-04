import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Album } from 'src/app/core/models/album';
import { Trip } from 'src/app/core/models/trip';
import { ApiService } from 'src/app/core/services';

@Injectable()
export class ProfileService {
  constructor(private _apiService: ApiService) {}
  public getTrips(): Observable<Trip[]> {
    return this._apiService.get<Trip[]>('trips/');
  }

  public getUserTrips(userId: number): Observable<Trip[]> {
    return this._apiService.get<Trip[]>(`trips/users/${userId}/`);
  }

  public getAlbums(): Observable<Album[]> {
    return this._apiService.get<Album[]>('albums/');
  }

  public getUserAlbums(userId: number): Observable<Album[]> {
    return this._apiService.get<Album[]>(`albums/users/${userId}/`);
  }

  public updateAlbumSelection(trip: Trip): Observable<any> {
    const payload = trip.album ? { album: trip.album } : {};

    return this._apiService.update<any>(
      `trips/${trip.id}/update-album/`,
      payload
    );
  }

  public createAlbum(name: string): Observable<Album> {
    return this._apiService.post<Album>('albums/', { name });
  }
}
