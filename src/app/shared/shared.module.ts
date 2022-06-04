import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DevextremeModule } from './theme/devextreme/devextreme.module';

@NgModule({
  declarations: [],
  imports: [CommonModule, DevextremeModule],
  exports: [DevextremeModule],
})
export class SharedModule {}
