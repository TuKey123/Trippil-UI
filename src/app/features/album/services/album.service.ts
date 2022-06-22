import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Album } from 'src/app/core/models/album';
import { ApiService } from 'src/app/core/services';

@Injectable()
export class AlbumService {
  constructor(private _apiService: ApiService) {}

  public getAlbumDetails(id: number): Observable<Album> {
    return this._apiService.get<Album>(`albums/${id}/`);
  }
}
