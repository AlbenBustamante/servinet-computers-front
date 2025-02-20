import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ICashRegisterDetailReportsDto } from '@models/cash-register.model';

@Component({
  selector: 'app-header-stats',
  templateUrl: './header-stats.component.html',
  styleUrls: ['./header-stats.component.css'],
})
export class HeaderStatsComponent {
  @Output() open = new EventEmitter();
  @Input({ required: true }) reports!:
    | ICashRegisterDetailReportsDto
    | undefined;

  emitOpen() {
    this.open.emit();
  }
}
