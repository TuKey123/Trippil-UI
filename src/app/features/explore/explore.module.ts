import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExploreComponent } from './pages/explore/explore.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { UserComponent } from './componets/user/user.component';
import { ExploreStore } from './store/explore.store';
import { ExploreService } from './service/explore.service';
import { ComponentsModule } from 'src/app/shared/components/components.module';
import { TripComponent } from './componets/trip/trip.component';
import { ItemComponent } from './componets/item/item.component';

@NgModule({
  declarations: [ExploreComponent, UserComponent, TripComponent, ItemComponent],
  imports: [
    CommonModule,
    SharedModule,
    ComponentsModule,
    RouterModule.forChild([
      {
        path: '',
        component: ExploreComponent,
        children: [
          {
            path: '',
            redirectTo: 'user',
          },
          {
            path: 'user',
            component: UserComponent,
          },
          {
            path: 'trip',
            component: TripComponent,
          },
          {
            path: 'item',
            component: ItemComponent,
          },
        ],
      },
    ]),
  ],
  providers: [ExploreStore, ExploreService],
})
export class ExploreModule {}
