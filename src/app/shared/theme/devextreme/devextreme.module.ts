import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  DxButtonModule,
  DxTextBoxModule,
  DxValidatorModule,
  DxProgressBarModule,
  DxFormModule,
  DxToolbarModule,
  DxTabsModule,
  DxDropDownButtonModule,
  DxScrollViewModule,
  DxPopupModule,
  DxPopoverModule,
} from 'devextreme-angular';

const DEVEXTREME_MODULES = [
  DxButtonModule,
  DxTextBoxModule,
  DxValidatorModule,
  DxProgressBarModule,
  DxFormModule,
  DxToolbarModule,
  DxTabsModule,
  DxDropDownButtonModule,
  DxScrollViewModule,
  DxPopupModule,
  DxPopoverModule,
];

const IMPORTS = [...DEVEXTREME_MODULES];

const EXPORTS = [...DEVEXTREME_MODULES];

@NgModule({
  declarations: [],
  imports: IMPORTS,
  exports: EXPORTS,
})
export class DevextremeModule {}
