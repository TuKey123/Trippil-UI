import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigationBaseComponent } from './navigation-base/navigation-base.component';
import { LayoutsModule } from '../layouts/layouts.module';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [NavigationBaseComponent],
  imports: [CommonModule, LayoutsModule, RouterModule],
  exports: [NavigationBaseComponent],
})
export class NavigationsModule {}
