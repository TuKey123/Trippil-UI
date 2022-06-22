import { HttpEvent } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from 'src/app/core/services';

@Injectable({
  providedIn: 'root',
})
export class UploadFileService {
  constructor(private _apiService: ApiService) {}

  public uploadImage(files: File[]): Observable<HttpEvent<{ image: string }>> {
    return this._apiService.postFile('upload-image/', files);
  }
}
