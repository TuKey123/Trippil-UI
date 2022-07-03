import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileComponent } from './pages/profile/profile.component';
import { ProfileRoutingModule } from './profile-routing.module';
import { LayoutsModule } from 'src/app/layouts/layouts.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { ProfileService } from './services/profile.service';
import { TripsComponent } from './components/trips/trips.component';
import { AlbumsComponent } from './components/albums/albums.component';
import { ComponentsModule } from 'src/app/shared/components/components.module';
import { ProfileResolver } from './profile.resolver';
import { ProfileStore } from './store';
import { SettingsComponent } from './pages/settings/settings.component';
import { ItemsSharedComponent } from './components/items-shared/items-shared.component';

@NgModule({
  declarations: [
    ProfileComponent,
    TripsComponent,
    AlbumsComponent,
    SettingsComponent,
    ItemsSharedComponent,
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
