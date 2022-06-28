import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ItemDetailsComponent } from './pages/item-details/item-details.component';
import { RouterModule } from '@angular/router';
import { TripModule } from '../trip/trip.module';
import { ComponentsModule } from 'src/app/shared/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    ComponentsModule,
    RouterModule.forChild([
      {
        path: ':id',
        component: ItemDetailsComponent,
      },
    ]),
  ],
  declarations: [ItemDetailsComponent],
})
export class ItemModule {}
