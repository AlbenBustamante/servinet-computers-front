import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WorkspaceRoutingModule } from './workspace-routing.module';
import { WorkspaceComponent } from './workspace.component';
import { SharedModule } from '@shared/shared.module';
import { RouterModule } from '@angular/router';
import { WorkspaceNavComponent } from './components/workspace-nav/workspace-nav.component';
import { WorkspaceTableSectionComponent } from './components/workspace-table-section/workspace-table-section.component';

@NgModule({
  declarations: [
    WorkspaceComponent,
    WorkspaceNavComponent,
    WorkspaceTableSectionComponent,
  ],
  imports: [CommonModule, WorkspaceRoutingModule, SharedModule, RouterModule],
  exports: [WorkspaceTableSectionComponent],
})
export default class WorkspaceModule {}
