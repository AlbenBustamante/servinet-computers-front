import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WorkspaceRoutingModule } from './workspace-routing.module';
import { WorkspaceComponent } from './workspace.component';
import { SharedModule } from '@shared/shared.module';
import { RouterModule } from '@angular/router';
import { HomeNavComponent } from './components/home-nav/home-nav.component';
import { HomeTableSectionComponent } from './components/home-table-section/home-table-section.component';

@NgModule({
  declarations: [WorkspaceComponent, HomeNavComponent, HomeTableSectionComponent],
  imports: [CommonModule, WorkspaceRoutingModule, SharedModule, RouterModule],
  exports: [HomeTableSectionComponent],
})
export default class WorkspaceModule {}
