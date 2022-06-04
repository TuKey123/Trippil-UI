import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileComponent } from './pages/profile/profile.component';
import { ProfileRoutingModule } from './profile-routing.module';
import { LayoutsModule } from 'src/app/layouts/layouts.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { ProfileService } from './services/profile.service';
import { TripsComponent } from './components/trips/trips.component';
import { AlbumsComponent } from './components/albums/albums.component';
import { AppreciatedComponent } from './components/appreciated/appreciated.component';
import { ComponentsModule } from 'src/app/shared/components/components.module';
import { ProfileResolver } from './profile.resolver';
import { ProfileStore } from './store';

@NgModule({
  declarations: [
    ProfileComponent,
    TripsComponent,
    AlbumsComponent,
    AppreciatedComponent,
  ],
  imports: [
    CommonModule,
    ProfileRoutingModule,
    LayoutsModule,
    SharedModule,
    ComponentsModule,
  ],
  providers: [ProfileService, ProfileStore, ProfileResolver],
})
export class ProfileModule {}