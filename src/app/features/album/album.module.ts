import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlbumComponent } from './pages/album/album.component';
import { RouterModule } from '@angular/router';
import { AlbumService } from './services';
import { ComponentsModule } from 'src/app/shared/components/components.module';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [AlbumComponent],
  imports: [
    CommonModule,
    ComponentsModule,
    SharedModule,
    RouterModule.forChild([
      {
        path: ':id',
        component: AlbumComponent,
      },
    ]),
  ],
  providers: [AlbumService],
})
export class AlbumModule {}
