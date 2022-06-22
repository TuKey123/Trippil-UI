import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AlbumsComponent } from './components/albums/albums.component';
import { AppreciatedComponent } from './components/appreciated/appreciated.component';
import { TripsComponent } from './components/trips/trips.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { SettingsComponent } from './pages/settings/settings.component';
import { ProfileResolver } from './profile.resolver';

const children = [
  {
    path: '',
    redirectTo: 'trips',
  },
  {
    path: 'trips',
    component: TripsComponent,
  },
  {
    path: 'albums',
    component: AlbumsComponent,
  },
  {
    path: 'appreciated',
    component: AppreciatedComponent,
  },
];

const routes: Routes = [
  {
    path: '',
    redirectTo: 'public',
    pathMatch: 'full',
  },
  {
    path: 'public',
    component: ProfileComponent,
    resolve: { userProfile: ProfileResolver },
    children: children,
  },
  {
    path: 'public/:id',
    component: ProfileComponent,
    resolve: { userProfile: ProfileResolver },
    children: children,
  },
  {
    path: 'settings',
    component: SettingsComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProfileRoutingModule {}
