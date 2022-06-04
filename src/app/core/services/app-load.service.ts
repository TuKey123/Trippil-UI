import { Injectable } from '@angular/core';
import { catchError, Observable, of, switchMap, tap } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class AppLoadService {
  constructor(private _authService: AuthService) {}

  public init(): Observable<any> {
    return this._authService.getUserProfile().pipe(
      switchMap((userProfile) => {
        this._authService.setUserProfile(userProfile);
        return of(userProfile);
      }),
      catchError(() => {
        return of(null);
      })
    );
  }
}
