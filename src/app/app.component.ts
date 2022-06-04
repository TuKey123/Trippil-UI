import { Component } from '@angular/core';
import { AppLoadingService } from './core/services';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  public loading$ = this._appLoadingService.loading$;

  constructor(private _appLoadingService: AppLoadingService) {}
}
