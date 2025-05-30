import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-workspace-subtitle',
  templateUrl: './workspace-subtitle.component.html',
})
export class WorkspaceSubtitleComponent {
  @Input({ required: true }) subtitle!: string;
}
