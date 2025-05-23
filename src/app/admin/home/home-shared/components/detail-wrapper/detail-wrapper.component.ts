import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-detail-wrapper',
  templateUrl: './detail-wrapper.component.html',
})
export class DetailWrapperComponent {
  @Input({ required: true }) headline!: string;
  @Input({ required: true }) loading!: boolean;
  @Input() align!: 'left' | 'center' | 'right';
}
