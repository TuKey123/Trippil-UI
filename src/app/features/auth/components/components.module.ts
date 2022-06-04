import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FinishComponent } from './finish/finish.component';
import { SignupFormComponent } from './signup-form/signup-form.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { VerifyCodeComponent } from './verify-code/verify-code.component';

@NgModule({
  declarations: [FinishComponent, SignupFormComponent, VerifyCodeComponent],
  imports: [CommonModule, SharedModule],
  exports: [SignupFormComponent, VerifyCodeComponent, FinishComponent],
})
export class ComponentsModule {}
