import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-platform-detail-balance',
  templateUrl: './platform-detail-balance.component.html',
  styleUrls: ['./platform-detail-balance.component.css'],
})
export class PlatformDetailBalanceComponent {
  @Input({ required: true }) headline!: string;
  @Input({ required: true }) balance!: number | undefined;
}
