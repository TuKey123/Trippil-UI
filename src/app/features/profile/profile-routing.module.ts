import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AlbumsComponent } from './components/albums/albums.component';
import { AppreciatedComponent } from './components/appreciated/appreciated.component';
import { TripsComponent } from './components/trips/trips.component';
import { ProfileComponent } from './pages/profile/profile.component';
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
    component: ProfileComponent,
    resolve: { userProfile: ProfileResolver },
    children: children,
  },
  {
    path: ':id',
    component: ProfileComponent,
    resolve: { userProfile: ProfileResolver },
    children: children,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProfileRoutingModule {}
