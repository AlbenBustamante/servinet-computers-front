import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DetailWrapperComponent } from './components/detail-wrapper/detail-wrapper.component';
import { SharedModule } from '@shared/shared.module';

@NgModule({
  declarations: [DetailWrapperComponent],
  imports: [CommonModule, SharedModule],
  exports: [DetailWrapperComponent],
})
export class HomeSharedModule {}
