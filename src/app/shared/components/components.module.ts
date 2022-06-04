import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TripCardComponent } from './trip-card/trip-card.component';
import { LoadingComponent } from './loading/loading.component';
import { AlbumCardComponent } from './album-card/album-card.component';
import { SharedModule } from '../shared.module';

@NgModule({
  declarations: [TripCardComponent, LoadingComponent, AlbumCardComponent],
  imports: [CommonModule, SharedModule],
  exports: [TripCardComponent, AlbumCardComponent, LoadingComponent],
})
export class ComponentsModule {}
