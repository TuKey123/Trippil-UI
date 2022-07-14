import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Observable } from 'rxjs';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { AuthenticationInterceptor } from './core/interceptors';
import { AppLoadService } from './core/services';
import { LayoutsModule } from './layouts/layouts.module';
import { SharedModule } from './shared/shared.module';
import { ComponentsModule } from './shared/components/components.module';
import { NavigationsModule } from './navigations/navigations.module';

function initializeApp(appLoadService: AppLoadService) {
  return (): Observable<any> => {
    return appLoadService.init();
  };
}

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    CoreModule,
    SharedModule,
    LayoutsModule,
    NavigationsModule,
    ComponentsModule,
  ],
  providers: [
    AppLoadService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthenticationInterceptor,
      multi: true,
    },
    {
      provide: APP_INITIALIZER,
      useFactory: initializeApp,
      deps: [AppLoadService],
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
