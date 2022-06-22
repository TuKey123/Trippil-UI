import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { User, UserInput, UserResponse } from 'src/app/core/models/user';
import { ApiService } from './api.service';
import { LocalStorageService } from './local-storage.service';

@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(
    private _localStorage: LocalStorageService,
    private _apiService: ApiService
  ) {}
  private _userProfile$ = new BehaviorSubject<any>(null);

  public get userProfile$(): BehaviorSubject<User> {
    return this._userProfile$;
  }

  public setUserProfile(userProfile: User) {
    this._userProfile$.next(userProfile);
  }

  public getToken() {
    return this._localStorage.get('token');
  }

  public setToken(token: string) {
    this._localStorage.set('token', token);
  }

  public removeToken() {
    this._localStorage.remove('token');
  }

  public login(
    user: Pick<UserInput, 'email' | 'password'>
  ): Observable<UserResponse> {
    return this._apiService.post<UserResponse>('auth/login/', user);
  }

  public sendEmail(email: string) {
    return this._apiService.post('auth/send-verify-code/', { email });
  }

  public signup(user: UserInput) {
    return this._apiService.post('auth/sign-up/', user);
  }

  public getUserProfile(): Observable<User> {
    return this._apiService.get<User>('users/me/', true);
  }

  public getUserProfileId(id: number): Observable<User> {
    return this._apiService.get<User>(`users/${id}/`);
  }
}
