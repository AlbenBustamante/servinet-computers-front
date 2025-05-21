import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DetailWrapperComponent } from './components/detail-wrapper/detail-wrapper.component';
import { SharedModule } from '@shared/shared.module';
import { DetailStatWrapperComponent } from './components/detail-stat-wrapper/detail-stat-wrapper.component';
import { DetailLayoutComponent } from './layouts/detail-layout/detail-layout.component';
import { DetailHeadlineComponent } from './components/detail-headline/detail-headline.component';

@NgModule({
  declarations: [
    DetailWrapperComponent,
    DetailStatWrapperComponent,
    DetailLayoutComponent,
    DetailHeadlineComponent,
  ],
  imports: [CommonModule, SharedModule],
  exports: [
    DetailWrapperComponent,
    DetailStatWrapperComponent,
    DetailLayoutComponent,
    DetailHeadlineComponent,
  ],
})
export class HomeSharedModule {}
