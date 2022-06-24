import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DetailsComponent } from './pages/details/details.component';
import { RouterModule } from '@angular/router';
import { GoogleMapsModule } from '@angular/google-maps';
import { SharedModule } from 'src/app/shared/shared.module';
import { ItemDetailsComponent } from './components/item-details/item-details.component';
import { NgxEditorModule } from 'ngx-editor';
import { FormsModule } from '@angular/forms';
import { TripDetailService } from './services';

@NgModule({
  declarations: [DetailsComponent, ItemDetailsComponent],
  imports: [
    CommonModule,
    GoogleMapsModule,
    SharedModule,
    NgxEditorModule,
    FormsModule,
    RouterModule.forChild([
      {
        path: ':id',
        component: DetailsComponent,
      },
    ]),
  ],
  providers: [TripDetailService],
})
export class TripModule {}
