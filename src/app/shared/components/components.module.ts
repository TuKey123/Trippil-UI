import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TripCardComponent } from './trip-card/trip-card.component';
import { LoadingComponent } from './loading/loading.component';
import { AlbumCardComponent } from './album-card/album-card.component';
import { SharedModule } from '../shared.module';
import { SidePanelComponent } from './side-panel/side-panel.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    TripCardComponent,
    LoadingComponent,
    AlbumCardComponent,
    SidePanelComponent,
  ],
  imports: [CommonModule, RouterModule, SharedModule],
  exports: [
    TripCardComponent,
    AlbumCardComponent,
    LoadingComponent,
    SidePanelComponent,
  ],
})
export class ComponentsModule {}
