import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TripCardComponent } from './trip-card/trip-card.component';
import { LoadingComponent } from './loading/loading.component';
import { AlbumCardComponent } from './album-card/album-card.component';
import { SharedModule } from '../shared.module';
import { SidePanelComponent } from './side-panel/side-panel.component';
import { RouterModule } from '@angular/router';
import { ItemComponent } from './item/item.component';
import { FormsModule } from '@angular/forms';
import { NgxEditorModule } from 'ngx-editor';
import { ItemCardComponent } from './item-card/item-card.component';
import { UserCardComponent } from './user-card/user-card.component';

@NgModule({
  declarations: [
    TripCardComponent,
    LoadingComponent,
    AlbumCardComponent,
    SidePanelComponent,
    ItemComponent,
    ItemCardComponent,
    UserCardComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    SharedModule,
    NgxEditorModule,
    FormsModule,
  ],
  exports: [
    TripCardComponent,
    AlbumCardComponent,
    LoadingComponent,
    SidePanelComponent,
    ItemComponent,
    ItemCardComponent,
    UserCardComponent,
  ],
})
export class ComponentsModule {}
