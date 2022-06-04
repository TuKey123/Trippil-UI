import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ApiService,
  AuthService,
  LocalStorageService,
  AppLoadService,
  NavigateService,
  AppLoadingService,
} from './services';
import { AuthGuard } from './guards';

@NgModule({
  declarations: [],
  imports: [CommonModule],
  providers: [
    ApiService,
    LocalStorageService,
    AuthService,
    AppLoadService,
    NavigateService,
    AppLoadingService,
    AuthGuard,
  ],
})
export class CoreModule {}
