import { Component, EventEmitter, Output } from '@angular/core';
import { CashRegisterDetailMovementService } from '@services/cash-register-detail-movement.service';

@Component({
  selector: 'app-header-stats',
  templateUrl: './header-stats.component.html',
  styleUrls: ['./header-stats.component.css'],
})
export class HeaderStatsComponent {
  @Output() open = new EventEmitter();
  readonly movement;

  constructor(
    private readonly cashRegisterDetailMovementService: CashRegisterDetailMovementService
  ) {
    this.movement = this.cashRegisterDetailMovementService.movement;
  }

  emitOpen() {
    this.open.emit();
  }

  get numeral() {
    return (
      this.movement()?.reports.cashRegisterDetail.cashRegister.numeral ?? 0
    );
  }
}
