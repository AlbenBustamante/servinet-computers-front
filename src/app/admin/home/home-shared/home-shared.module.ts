import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DetailWrapperComponent } from './components/detail-wrapper/detail-wrapper.component';
import { SharedModule } from '@shared/shared.module';
import { DetailStatWrapperComponent } from './components/detail-stat-wrapper/detail-stat-wrapper.component';

@NgModule({
  declarations: [DetailWrapperComponent, DetailStatWrapperComponent],
  imports: [CommonModule, SharedModule],
  exports: [DetailWrapperComponent, DetailStatWrapperComponent],
})
export class HomeSharedModule {}
