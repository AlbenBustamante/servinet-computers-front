import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-cash-box-stat-card',
  templateUrl: './cash-box-stat-card.component.html',
})
export class CashBoxStatCardComponent {
  @Output() open = new EventEmitter();
  @Input({ required: true }) stat!: string;
  @Input({ required: true }) value!: number | undefined;

  emitOpen() {
    this.open.emit();
  }
}
