import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './core/guards';
import { NavigationBaseComponent } from './navigations/navigation-base/navigation-base.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'profile',
    pathMatch: 'full',
  },
  {
    path: 'auth',
    loadChildren: () =>
      import('./features/auth/auth.module').then((m) => m.AuthModule),
  },
  {
    path: 'profile',
    component: NavigationBaseComponent,
    loadChildren: () =>
      import('./features/profile/profile.module').then((m) => m.ProfileModule),
    canActivate: [AuthGuard],
  },
  {
    path: 'albums',
    component: NavigationBaseComponent,
    loadChildren: () =>
      import('./features/album/album.module').then((m) => m.AlbumModule),
    canActivate: [AuthGuard],
  },
  {
    path: 'items',
    component: NavigationBaseComponent,
    loadChildren: () =>
      import('./features/item/item.module').then((m) => m.ItemModule),
    canActivate: [AuthGuard],
  },
  {
    path: 'trips',
    component: NavigationBaseComponent,
    loadChildren: () =>
      import('./features/trip/trip.module').then((m) => m.TripModule),
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
