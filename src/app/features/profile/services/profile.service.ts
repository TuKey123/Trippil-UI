import { HttpEvent } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Album } from 'src/app/core/models/album';
import { Trip, TripItem } from 'src/app/core/models/trip';
import { User } from 'src/app/core/models/user';
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

  public getItemsShared(userId: number): Observable<TripItem[]> {
    return this._apiService.get<TripItem[]>(`items/shared/users/${userId}`);
  }

  public getUserAlbums(userId: number): Observable<Album[]> {
    return this._apiService.get<Album[]>(`albums/users/${userId}/`);
  }

  public getAlbumDetails(id: number): Observable<Album> {
    return this._apiService.get<Album>(`albums/${id}/`);
  }

  public removeAlbum(id: number): Observable<number> {
    return this._apiService.delete<number>(`albums/${id}/`);
  }

  public removeTripFromAlbum(album: Album, trip: Trip): Observable<number> {
    return this._apiService.delete<number>(
      `albums/${album.id}/trips/${trip.id}/`
    );
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

  public updateAlbum(album: Album): Observable<Album> {
    return this._apiService.update<Album>(`albums/${album.id}/`, {
      name: album.name,
    });
  }

  public uploadAvatar(files: File[]): Observable<HttpEvent<{ image: string }>> {
    return this._apiService.postFile('users/upload-image/', files);
  }

  public updateProfile(user: any): Observable<User> {
    return this._apiService.update<User>(`users/me/profile/`, user);
  }

  public createTrip(trip: Trip): Observable<Trip> {
    return this._apiService.post<Trip>(`trips/`, trip);
  }

  public removeTrip(id: number): Observable<number> {
    return this._apiService.delete<number>(`trips/${id}`);
  }

  public likeTrip(tripId: number): Observable<any> {
    return this._apiService.update(`trips/${tripId}/like/`, {});
  }

  public likeItem(itemId: number): Observable<any> {
    return this._apiService.update(`items/${itemId}/like/`, {});
  }
}
