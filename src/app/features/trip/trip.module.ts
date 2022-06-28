import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DetailsComponent } from './pages/details/details.component';
import { GoogleMapsModule } from '@angular/google-maps';
import { SharedModule } from 'src/app/shared/shared.module';
import { NgxEditorModule } from 'ngx-editor';
import { FormsModule } from '@angular/forms';
import { TripRoutingModule } from './trip-routing.module';
import { ComponentsModule } from 'src/app/shared/components/components.module';
import { DragDropModule } from '@angular/cdk/drag-drop';

@NgModule({
  imports: [
    TripRoutingModule,
    CommonModule,
    GoogleMapsModule,
    SharedModule,
    NgxEditorModule,
    FormsModule,
    ComponentsModule,
    DragDropModule,
  ],
  declarations: [DetailsComponent],
})
export class TripModule {}
