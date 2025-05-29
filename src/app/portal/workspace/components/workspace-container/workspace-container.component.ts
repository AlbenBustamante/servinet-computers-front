import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-workspace-container',
  templateUrl: './workspace-container.component.html',
})
export class WorkspaceContainerComponent {
  @Input({ required: true }) formHeadline!: string;
}
