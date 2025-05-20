import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-detail-wrapper',
  templateUrl: './detail-wrapper.component.html',
  styleUrls: ['./detail-wrapper.component.css'],
})
export class DetailWrapperComponent {
  @Input({ required: true }) headline!: string;
  @Input({ required: true }) loading!: boolean;
}
