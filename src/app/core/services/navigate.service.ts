import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class NavigateService {
  constructor(private _router: Router) {}

  public login(): void {
    this._router.navigate(['/auth/login']);
  }

  public homepage(): void {
    this._router.navigate(['/']);
  }
}
