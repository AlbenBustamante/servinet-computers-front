import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DetailWrapperComponent } from './components/detail-wrapper/detail-wrapper.component';
import { SharedModule } from '@shared/shared.module';
import { DetailStatWrapperComponent } from './components/detail-stat-wrapper/detail-stat-wrapper.component';
import { DetailLayoutComponent } from './layouts/detail-layout/detail-layout.component';
import { DetailHeadlineComponent } from './components/detail-headline/detail-headline.component';
import { ListHeadlineComponent } from './components/list-headline/list-headline.component';
import { ListHeadlineHeaderComponent } from './components/list-headline-header/list-headline-header.component';

@NgModule({
  declarations: [
    DetailWrapperComponent,
    DetailStatWrapperComponent,
    DetailLayoutComponent,
    DetailHeadlineComponent,
    ListHeadlineComponent,
    ListHeadlineHeaderComponent,
  ],
  imports: [CommonModule, SharedModule],
  exports: [
    DetailWrapperComponent,
    DetailStatWrapperComponent,
    DetailLayoutComponent,
    DetailHeadlineComponent,
    ListHeadlineComponent,
    ListHeadlineHeaderComponent,
  ],
})
export class HomeSharedModule {}
