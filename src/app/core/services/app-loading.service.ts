import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AppLoadingService {
  public loading$ = new BehaviorSubject<boolean>(false);

  // public get loading$(): BehaviorSubject<boolean> {
  //   return this.loading$;
  // }

  constructor() {}

  public show(): void {
    this.loading$.next(true);
  }

  public hide(): void {
    this.loading$.next(false);
  }
}
